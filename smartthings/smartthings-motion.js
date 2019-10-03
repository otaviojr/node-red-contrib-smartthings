var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsMotionNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsMotionNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;

        this.updateStatus = function(currentStatus){
            this.currentStatus = currentStatus;
            let msg = {
                topic: "status",
                payload: {
                    deviceId: this.device,
                    name: this.name,
                    value: this.currentStatus
                }
            };
            this.send(msg);
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("MotionDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "motion"){
                    this.updateStatus((evt["value"].toLowerCase() == "on" ? 1 : 0));
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/motion").then( (status) => {
                console.debug("MotionDevice("+this.name+") Status Refreshed");
                console.debug(status);

                current = status["motion"]["value"];
                if(current){
                    this.updateStatus((current.toLowerCase() == "on" ? 1 : 0));
                }
            }).catch( err => {
                console.error("Ops... error getting device state");
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-motion", SmartthingsMotionNode);

};
