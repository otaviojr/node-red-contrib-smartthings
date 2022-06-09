var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsAccelerationNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsAccelerationNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            value: 0,
            timestamp: new Date().toISOString()
        };

        this.reportState = function(send, done, original) {
            send = send || function() { node.send.apply(node,arguments) };
            done = done || function() { };
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "acceleration",
                    name: this.name,
                    value: this.state.value,
                    timestamp: this.state.timestamp
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
            this.conf.getDeviceStatus(this.device,"main/capabilities/accelerationSensor").then( (status) => {
                console.debug("AccelerationDevice("+this.name+") Status Refreshed");
                console.debug(status);

                current = status["acceleration"]["value"];
                this.setState({
                    value: (current.toLowerCase() == "active" ? 1 : 0),
                    timestamp: status["acceleration"]["timestamp"]
                });

            }).catch( err => {
                console.error("Ops... error getting device state (AccelerationDevice)");
                console.error(err);
            });
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("AccelerationDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["attribute"] == "acceleration"){
                    this.setState({
                        value: (evt["value"].toLowerCase() == "active" ? 1 : 0),
                        timestamp: evt["timestamp"]
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

    RED.nodes.registerType("smartthings-node-accel", SmartthingsAccelerationNode);
};
