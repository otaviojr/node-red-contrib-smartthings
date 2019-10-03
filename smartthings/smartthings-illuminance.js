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

        this.updateStatus = function(currentStatus, currentUnit){
            this.currentStatus = currentStatus;
            this.currentUnit = currentUnit;
            let msg = {
                topic: "illuminance",
                payload: {
                    deviceId: this.device,
                    name: this.name,
                    value: this.currentStatus,
                    unit: this.currentUnit
                }
            };
            this.send(msg);
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
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-illuminance", SmartthingsIlluminanceNode);

};
