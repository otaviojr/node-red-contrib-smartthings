var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsPowerMeterNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsPowerMeterNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            value: 0,
            unit: "",
        };

        this.reportState = function(send, done, original) {
            send = send || function() { node.send.apply(node,arguments) };
            done = done || function() { };
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "power",
                    name: this.name,
                    value: this.state.value,
                    unit: this.state.unit,
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

        this.pullState = function(){
            this.conf.getDeviceStatus(this.device,"main/capabilities/powerMeter").then( (status) => {
                console.debug("PowerMeterDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.setState({
                    value: parseFloat(status["power"]["value"]),
                    unit: status["power"]["unit"]
                });

            }).catch( err => {
                console.error("Ops... error getting device state (PowerMeterDevice)");
                console.error(err);
            });
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("PowerMeterDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["attribute"] == "power"){
                    this.setState({
                        value: parseFloat(evt["value"])
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

    RED.nodes.registerType("smartthings-node-power-meter", SmartthingsPowerMeterNode);
};
