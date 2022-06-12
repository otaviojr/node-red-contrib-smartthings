var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsOpenCloseNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsOpenCloseNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;
        this.closeAsActive = config.closeAsActive;

        this.currentStatus = 0;

        this.reportStatus = function(send, done, original){
            send = send || function() { node.send.apply(node,arguments) };
            done = done || function() { };
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "contact",
                    name: this.name,
                    value: this.currentStatus,
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

        this.updateStatus = function(currentStatus, send, done){
            this.currentStatus = currentStatus;
            this.reportStatus(send, done);
        }

        this.pullStatus = function() {
            this.conf.getDeviceStatus(this.device,"main/capabilities/contactSensor").then( (status) => {
                console.debug("OpenCloseDevice("+this.name+") Status Refreshed");
                console.debug(status);

                current = status["contact"]["value"];
                if(current){
                    if(active){
                      this.updateStatus((current.toLowerCase() == "closed" ? 1 : 0));
                    } else {
                      this.updateStatus((current.toLowerCase() == "open" ? 1 : 0));
                    }
                }
            }).catch( err => {
                console.error("Ops... error getting device state (OpenCloseDevice)");
                console.error(err);
            });
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("OpenCloseDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["attribute"] == "contact"){
                  if(active){
                    this.updateStatus((evt["value"].toLowerCase() == "closed" ? 1 : 0));
                  } else {
                    this.updateStatus((evt["value"].toLowerCase() == "open" ? 1 : 0));
                  }
                }
            }

            this.conf.registerCallback(this, this.device, callback);
            this.pullStatus();

            this.on('input', (msg, send, done) => {
                send = send || function() { node.send.apply(node,arguments) };
                done = done || function() { };
                console.debug("Input Message Received");
                console.log(msg);

                if(msg && msg.topic !== undefined){
                    switch(msg.topic){
                        case "pull":
                            this.pullStatus(send, done, msg);
                            break;

                        case "update":
                            this.reportStatus(send, done, msg);
                            break;

                        default:
                            done("Invalid topic");
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

    RED.nodes.registerType("smartthings-node-openclose", SmartthingsOpenCloseNode);
};
