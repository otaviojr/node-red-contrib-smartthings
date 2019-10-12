var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsColorTemperatureNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsColorTemperatureNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            value: 0,
            level: 0,
            levelUnit: "",
            temperature: 0,
            temperatureUnit: "",
        };

        this.reportState = function(original) {
            let msg = [{
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "switch",
                    name: this.name,
                    value: this.state.value
                }
            },{
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "level",
                    name: this.name,
                    value: this.state.level,
                    unit: this.state.levelUnit
                }
            },{
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "temperature",
                    name: this.name,
                    value: this.state.temperature,
                    unit: this.state.temperatureUnit
                }
            }];

            if(original !== undefined){
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
                console.debug("ColorTemperatureDevice("+this.name+") Callback called");
                console.debug(evt);

                let state = {};

                switch(evt["name"].toLowerCase()){
                    case "switch":
                        state.value = (evt["value"].toLowerCase() === "on" ? 1 : 0);
                        break;

                    case "level":
                        state.level = evt["value"];
                        break;

                    case "temperature":
                        state.temperature = evt["value"];
                        state.unsingColor = false;
                        break;
                }

                this.setState(state);
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main").then( (status) => {
                console.debug("ColorTemperatureDevice("+this.name+") Status Refreshed");

                let state = {};

                if(status["switch"] !== undefined && status["switch"]["switch"] !== undefined){
                    state.value = (status["switch"]["switch"]["value"].toLowerCase() === "on" ? 1 : 0);
                }

                if(status["switchLevel"] !== undefined && status["switchLevel"]["level"] !== undefined){
                    state.level = status["switchLevel"]["level"]["value"];
                    state.levelUnit = status["switchLevel"]["level"]["unit"];
                }

                if(status["colorTemperature"] !== undefined){
                    state.temperature = status["colorTemperature"]["colorTemperature"]["value"];
                    state.temperatureUnit = status["colorTemperature"]["colorTemperature"]["unit"];
                }

                this.setState(state);
            }).catch( err => {
                console.error("Ops... error getting device state (ColorTemperatureDevice)");
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

                        case "switch":
                            this.conf.executeDeviceCommand(this.device,[{
                                component: "main",
                                capability: "switch",
                                command: (msg.payload.value == 1 ? "on" : "off")
                            }]).then( (ret) => {
                                const state = {
                                    value: msg.payload.value
                                }
                                this.setState(state);
                            }).catch( (ret) => {
                                console.error("Error updating device");
                            });
                            break;

                            case "level":
                            this.conf.executeDeviceCommand(this.device,[{
                                component: "main",
                                capability: "switchLevel",
                                command: "setLevel",
                                arguments: [
                                    msg.payload.value
                                ]
                            }]).then( (ret) => {
                                const state = {
                                    level: msg.payload.value
                                }
                                this.setState(state);
                            }).catch( (ret) => {
                                console.error("Error updating device");
                            });
                            break;

                            case "temperature":
                                this.conf.executeDeviceCommand(this.device,[{
                                    component: "main",
                                    capability: "colorTemperature",
                                    command: "setColorTemperature",
                                    arguments: [
                                        msg.payload.value
                                    ]
                                }]).then( (ret) => {
                                    const state = {
                                        temperature: msg.payload.value
                                    }
                                    this.setState(state);
                                }).catch( (ret) => {
                                    console.error("Error updating device");
                                });
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

    RED.nodes.registerType("smartthings-node-color-temperature", SmartthingsColorTemperatureNode);

};
