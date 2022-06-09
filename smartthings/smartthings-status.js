var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsStatusNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsStatusNode")
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
                    name: this.name,
                    status: this.currentStatus,
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

        this.pullStatus = function(){
            this.conf.getDeviceStatus(this.device).then( (status) => {
                console.debug("StatusDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.updateStatus(status);
            }).catch( err => {
                console.error("Ops... error getting device state (StatusDevice)");
                console.error(err);
            });
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("StatusDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt){
                    this.pullStatus();
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

    RED.nodes.registerType("smartthings-node-status", SmartthingsStatusNode);
};
