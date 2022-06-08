var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsSmokeDetectorNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsSmokeDetectorNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            value: 0
        };

        this.reportState = function(send, done, original) {
            send = send || function() { node.send.apply(node,arguments) };
            done = done || function() { };
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "smoke",
                    name: this.name,
                    value: this.state.value,
                }
            };

            if(original !== undefined){
              original.payload = msg.payload;
              Object.assign(msg,original);
            }

            send(msg);
            done();
        }

        this.setState = function(value, send, done){
            Object.assign(this.state, value);
            this.reportState(send, done);
        };

        this.pullState = function(value, send, done){
            this.conf.getDeviceStatus(this.device,"main/capabilities/smokeDetector").then( (status) => {
                console.debug("SmokeDetectorDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.setState({
                    value: status["smoke"]["value"],
                });

            }).catch( err => {
                console.error("Ops... error getting device state (SmokeDetectorDevice)");
                console.error(err);
            });
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("SmokeDetectorDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["attribute"] == "smoke"){
                    this.setState({
                        value: evt["value"]
                    });
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
                            this.pullState();
                            break;

                        case "update":
                            this.reportState(send, done, msg);
                            break;

                        default:
                            done("Invalid topic");
                            break;
                    }
                } else {
                    done("Invalid message");
                }
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-smoke-detector", SmartthingsSmokeDetectorNode);
};
