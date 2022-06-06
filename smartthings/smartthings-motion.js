var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsMotionNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsMotionNode")
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
                    deviceType: "motion",
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

        this.pullStatus = function() {
            this.conf.getDeviceStatus(this.device,"main/capabilities/motionSensor").then( (status) => {
                console.debug("MotionDevice("+this.name+") Status Refreshed");
                console.debug(status);

                current = status["motion"]["value"];
                if(current){
                    this.updateStatus((current.toLowerCase() == "active" ? 1 : 0));
                }
            }).catch( err => {
                console.error("Ops... error getting device state (MotionDevice)");
                console.error(err);
            });
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("MotionDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["attribute"] == "motion"){
                    this.updateStatus((evt["value"].toLowerCase() == "active" ? 1 : 0));
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
                          done("Invalid Topic")
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

    RED.nodes.registerType("smartthings-node-motion", SmartthingsMotionNode);

};
