var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsOpenCloseNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsOpenCloseNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;

        this.updateStatus = function(currentStatus){
            this.currentStatus = currentStatus;
            let msg = {
                topic: "contact",
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
                console.debug("OpenCloseDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "contact"){
                    this.updateStatus((evt["value"].toLowerCase() == "open" ? 1 : 0));
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/contactSensor").then( (status) => {
                console.debug("OpenCloseDevice("+this.name+") Status Refreshed");
                console.debug(status);

                current = status["contact"]["value"];
                if(current){
                    this.updateStatus((current.toLowerCase() == "open" ? 1 : 0));
                }
            }).catch( err => {
                console.error("Ops... error getting device state (OpenCloseDevice)");
                console.error(err);
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-openclose", SmartthingsOpenCloseNode);
};
