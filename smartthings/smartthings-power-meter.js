var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsPowerMeterNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsPowerMeterNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            value: 0,
            unit: "",
        };

        this.reportState = function(original) {
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "power",
                    name: this.name,
                    value: this.state.value,
                    unit: this.state.unit
                }
            };

            if(original !== undefined){
              original.payload = msg.payload;
              Object.assign(msg,original);
            }

            this.send(msg);
        }

        this.setState = function(value){
            Object.assign(this.state, value);
            this.reportState();
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("PowerMeterDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "power"){
                    this.setState({
                        value: evt["value"]
                    });
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/powerMeter").then( (status) => {
                console.debug("PowerMeterDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.setState({
                    value: status["power"]["value"],
                    unit: status["power"]["unit"]
                });

            }).catch( err => {
                console.error("Ops... error getting device state (PowerMeterDevice)");
                console.error(err);
            });

            this.on('input', msg => {
                console.debug("Input Message Received");
                console.log(msg);

                if(msg && msg.topic !== undefined){
                    switch(msg.topic){
                        case "update":
                            this.reportState(msg);
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

    RED.nodes.registerType("smartthings-node-power-meter", SmartthingsPowerMeterNode);
};
