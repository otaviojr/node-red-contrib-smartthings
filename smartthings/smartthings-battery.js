var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsBatteryNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsBatteryNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            value: 0,
            unit: "",
        };

        this.reportState = function() {
            let msg = {
                topic: "battery",
                payload: {
                    deviceId: this.device,
                    name: this.name,
                    value: this.state.value,
                    unit: this.state.unit
                }
            };

            this.send(msg);
        }

        this.setState = function(value){
            Object.assign(this.state, value);
            this.reportState();
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("BatteryDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "battery"){
                    this.setState({
                        value: evt["value"]
                    });
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/battery").then( (status) => {
                console.debug("BatteryDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.setState({
                    value: status["battery"]["value"],
                    unit: status["battery"]["unit"]
                });

            }).catch( err => {
                console.error("Ops... error getting device state (BatteryDevice)");
                console.error(err);
            });

            this.on('input', msg => {
                console.debug("Input Message Received");
                console.log(msg);

                if(msg && msg.topic !== undefined){
                    switch(msg.topic){
                        case "update":
                            this.reportState();
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

    RED.nodes.registerType("smartthings-node-battery", SmartthingsBatteryNode);
};
