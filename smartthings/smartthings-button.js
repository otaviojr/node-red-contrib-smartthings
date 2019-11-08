var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsButtonNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsButtonNode")

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = "";
        this.lastEvent = DeteTime.now();

        this.reportStatus = function(original) {
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "button",
                    name: this.name,
                    value: this.currentStatus,
                    lastEvent: this.lastEvent
                }
            };

            if(original !== undefined){
                Object.assign(msg,original);
            }

            this.send(msg);
        }

        this.updateStatus = function(currentStatus, lastEvent){
            this.currentStatus = currentStatus;
            this.lastEvent = lastEvent;
            this.reportStatus();
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("Button("+this.name+") Callback called");
                console.debug(evt);
                this.error("Button("+this.name+") Callback called");
                this.error(evt);
                if(evt["name"] == "button"){
                    this.updateStatus(evt["value"], DateTime.now());
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/main").then( (status) => {
                console.debug("Button("+this.name+") Status Refreshed");
                this.error("Button("+this.name+") Status Refreshed");

                current = status["button"]["value"];
                if(current){
                    this.updateStatus(current, DateTime.now());
                }
            }).catch( err => {
                console.error("Ops... error getting device state (Button)");
                console.error(err);
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-button", SmartthingsButtonNode);
};
