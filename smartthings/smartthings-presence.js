var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsPresenceNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsPresenceNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;

        this.reportStatus = function(send, done, original){
            send = send || function() { node.send.apply(node,arguments) };
            done = done || function() { };
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

            send(msg);
            done();
        }

        this.updateStatus = function(currentStatus, send, done){
            this.currentStatus = currentStatus;
            this.reportStatus(send, done);
        }

        this.pullStatus = function(){
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
            this.pullStatus();
            
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

    RED.nodes.registerType("smartthings-node-presence", SmartthingsPresenceNode);

};
