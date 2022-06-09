var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsWaterNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsWaterNode")
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
                    deviceType: "water",
                    name: this.name,
                    value: this.state.value,
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

        this.setState = function(value, send, done){
            Object.assign(this.state, value);
            this.reportState(send, done);
        };

        this.pullState = function(value, send, done){
            this.conf.getDeviceStatus(this.device,"main/capabilities/waterSensor").then( (status) => {
                console.debug("WaterDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.setState({
                    value: (status["water"]["value"].toLowerCase() === "wet" ? 1 : 0),
                });

            }).catch( err => {
                console.error("Ops... error getting device state (WaterDevice)");
                console.error(err);
            });
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("WaterDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["attribute"] == "water"){
                    this.setState({
                        value:(evt["value"].toLowerCase() === "wet" ? 1 : 0)
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

    RED.nodes.registerType("smartthings-node-water", SmartthingsWaterNode);
};
