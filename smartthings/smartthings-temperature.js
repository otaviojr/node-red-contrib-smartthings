var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsTemperatureNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsTemperatureNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            temperature: 0,
            temperatureUnit: "",
        };

        this.setState = function(value){
            Object.assign(this.state, value);

            let msg = {
                topic: "temperature",
                payload: {
                    deviceId: this.device,
                    name: this.name,
                    value: this.state.temperature,
                    unit: this.state.temperatureUnit
                }
            };

            this.send(msg);
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("TemperatureDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "temperature"){
                    this.setState({
                        temperature: evt["value"]
                    });
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/temperatureMeasurement").then( (status) => {
                console.debug("TemperatureDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.setState({
                    temperature: status["temperature"]["value"],
                    temperatureUnit: status["temperature"]["unit"]
                });

            }).catch( err => {
                console.error("Ops... error getting device state (TemperatureDevice)");
                console.error(err);
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-temperature", SmartthingsTemperatureNode);
};
