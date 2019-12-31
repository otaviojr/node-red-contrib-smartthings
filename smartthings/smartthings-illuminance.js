var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsIlluminanceNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsIlluminanceNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;
        this.currentUnit = "";

        this.reportStatus = function(original) {
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "illuminance",
                    name: this.name,
                    value: this.currentStatus,
                    unit: this.currentUnit
                }
            };

            if(original !== undefined){
              original.payload = msg.payload;
              Object.assign(msg,original);
            }

            this.send(msg);
        }

        this.updateStatus = function(currentStatus, currentUnit){
            this.currentStatus = currentStatus;
            this.currentUnit = currentUnit;
            this.reportStatus();
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("IlluminanceDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "illuminance"){
                    this.updateStatus(evt["value"],evt["unit"]);
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/illuminanceMeasurement").then( (status) => {
                console.debug("IlluminanceDevice("+this.name+") Status Refreshed");
                console.debug(status);

                current = status["illuminance"]["value"];
                unit = status["illuminance"]["unit"];
                if(current){
                    this.updateStatus(current, unit);
                }
            }).catch( err => {
                console.error("Ops... error getting device state (IlluminanceDevice)");
                console.error(err);
            });

            this.on('input', msg => {
                console.debug("Input Message Received");
                console.log(msg);

                if(msg && msg.topic !== undefined){
                    switch(msg.topic){
                        case "update":
                            this.reportStatus(msg);
                            break;
                    }
                }
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-illuminance", SmartthingsIlluminanceNode);

};
