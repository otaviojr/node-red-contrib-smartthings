var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsHumidityNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsHumidityNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            value: 0,
            unit: "",
        };

        this.setState = function(value){
            Object.assign(this.state, value);

            let msg = {
                topic: "humidity",
                payload: {
                    deviceId: this.device,
                    name: this.name,
                    value: this.state.value,
                    unit: this.state.unit
                }
            };

            this.send(msg);
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("HumidityDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "humidity"){
                    this.setState({
                        value: evt["value"]
                    });
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/relativeHumidityMeasurement").then( (status) => {
                console.debug("HumidityDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.setState({
                    value: status["battery"]["value"],
                    unit: status["battery"]["unit"]
                });

            }).catch( err => {
                console.error("Ops... error getting device state (HumidityDevice)");
                console.error(err);
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-humidity", SmartthingsHumidityNode);
};
