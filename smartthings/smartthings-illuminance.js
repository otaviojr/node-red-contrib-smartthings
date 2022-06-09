var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsIlluminanceNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsIlluminanceNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;
        this.currentUnit = "";

        this.reportStatus = function(send, done, original) {
            send = send || function() { node.send.apply(node,arguments) };
            done = done || function() { };
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "illuminance",
                    name: this.name,
                    value: this.currentStatus,
                    unit: this.currentUnit,
                    timestamp: new Date().toISOString()
                }
            };

            if(original !== undefined){
              original.payload = msg.payload;
              Object.assign(msg,original);
            }

            send(msg);
            done();
        }

        this.updateStatus = function(currentStatus, currentUnit, send, done){
            this.currentStatus = currentStatus;
            this.currentUnit = currentUnit;
            this.reportStatus(send, done);
        }

        this.pullStatus = function(){
            this.conf.getDeviceStatus(this.device,"main/capabilities/illuminanceMeasurement").then( (status) => {
                console.debug("IlluminanceDevice("+this.name+") Status Refreshed");
                console.debug(status);

                current = parseFloat(status["illuminance"]["value"]);
                unit = status["illuminance"]["unit"];
                if(current){
                    this.updateStatus(current, unit);
                }
            }).catch( err => {
                console.error("Ops... error getting device state (IlluminanceDevice)");
                console.error(err);
            });
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("IlluminanceDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["attribute"] == "illuminance"){
                    this.updateStatus(parseFloat(evt["value"]),evt["unit"]);
                }
            }

            this.conf.registerCallback(this, this.device, callback);
            this.pullState();

            this.on('input', (msg, send, done) => {
                send = send || function() { node.send.apply(node,arguments) };
                done = done || function() { };
                console.debug("Input Message Received");
                console.log(msg);

                if(msg && msg.topic !== undefined){
                    switch(msg.topic){
                        case "pull":
                            this.pullStatus();
                            break;

                        case "update":
                            this.reportStatus(send, done, msg);
                            break;

                        default:
                            done("Invalid Topic");
                            break;
                    }
                } else {
                    done("Invalid Message");
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
