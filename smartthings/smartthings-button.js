var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsButtonNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsButtonNode")

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;

        this.reportStatus = function(original) {
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "switch",
                    name: this.name,
                    value: this.currentStatus
                }
            };

            if(original !== undefined){
                Object.assign(msg,original);
            }

            this.send(msg);
        }

        this.updateStatus = function(currentStatus){
            this.currentStatus = currentStatus;
            this.reportStatus();
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("Button("+this.name+") Callback called");
                console.debug(evt);
                this.error("Button("+this.name+") Callback called");
                this.error(evt);
                if(evt["name"] == "button"){
                    //this.updateStatus((evt["value"].toLowerCase() === "on" ? 1 : 0));
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/button").then( (status) => {
                console.debug("Button("+this.name+") Status Refreshed");
                this.error("Button("+this.name+") Status Refreshed");

                //current = status["switch"]["value"];
                //if(current){
                //    this.updateStatus((current.toLowerCase() == "on" ? 1 : 0));
                //}
            }).catch( err => {
                console.error("Ops... error getting device state (Button)");
                console.error(err);
            });

            this.on('input', msg => {
                console.debug("Input Message Received");
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-button", SmartthingsButtonNode);
};
