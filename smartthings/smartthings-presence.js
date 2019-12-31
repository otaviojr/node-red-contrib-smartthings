var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsPresenceNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsPresenceNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;

        this.reportStatus = function(original){
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "presence",
                    name: this.name,
                    value: this.currentStatus
                }
            };

            if(original !== undefined){
              original.payload = msg.payload;
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
                console.debug("PresenceDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "presence"){
                    this.updateStatus((evt["value"].toLowerCase() == "present" ? 1 : 0));
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/presenceSensor").then( (status) => {
                console.debug("PresenceDevice("+this.name+") Status Refreshed");
                console.debug(status);

                current = status["presence"]["value"];
                if(current){
                    this.updateStatus((current.toLowerCase() == "present" ? 1 : 0));
                }
            }).catch( err => {
                console.error("Ops... error getting device state (PresenceDevice)");
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

    RED.nodes.registerType("smartthings-node-presence", SmartthingsPresenceNode);

};
