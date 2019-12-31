var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsThermostatNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsThermostatNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.function = config.function;
        this.device = config.device;

        this.state = {
            temperature: null,
            coolingSetpoint: null,
            heatingSetpoint: null,
            thermostatSetpoint: null,
            thermostatFanMode: null,
            thermostatMode: null,
            thermostatOperatingState: null
        };

        this.reportState = function(original) {
            let msg = [null,null,null,null,null,null,null];

            if(this.state.temperature != null){
                msg[0] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "temperature",
                        name: this.name,
                        value: this.state.temperature.value,
                        unit: this.state.temperature.unit
                    }
                };
            }
            if(this.state.coolingSetpoint != null){
                msg[1] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "coolingSetpoint",
                        name: this.name,
                        value: this.state.coolingSetpoint.value,
                        unit: this.state.coolingSetpoint.unit
                    }
                };
            }
            if(this.state.heatingSetpoint != null){
                msg[2] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "heatingSetpoint",
                        name: this.name,
                        value: this.state.heatingSetpoint.value,
                        unit: this.state.heatingSetpoint.unit
                    }
                };
            }
            if(this.state.thermostatSetpoint != null){
                msg[3] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "thermostatSetpoint",
                        name: this.name,
                        value: this.state.thermostatSetpoint.value
                    }
                };
            }
            if(this.state.thermostatFanMode != null){
                msg[4] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "thermostatFanMode",
                        name: this.name,
                        value: this.state.thermostatFanMode
                    }
                };
            }
            if(this.state.thermostatMode != null){
                msg[5] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "thermostatMode",
                        name: this.name,
                        value: this.state.thermostatMode
                    }
                };
            }
            if(this.state.thermostatOperatingState != null){
                msg[6] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "thermostatOperatingState",
                        name: this.name,
                        value: this.state.thermostatOperatingState
                    }
                };
            }

            if(original !== undefined){
              msg.forEach( (m) => {
                if(m){
                  original.payload = m.payload;
                  Object.assign(m,original);
                }
              });
            }
            this.send(msg);
        };

        this.setState = function(value){
            Object.assign(this.state, value);

            this.reportState();
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("ThermostatDevice("+this.name+") Callback called");
                console.debug(evt);

                let state = {};

                switch(evt["name"].toLowerCase()){
                    case "temperature":
                        this.setState({
                            temperature: {
                                value: evt["value"]
                            }
                        });
                        break;

                    case "coolingSetpoint":
                        this.setState({
                            coolingSetpoint: {
                                value: evt["value"]
                            }
                        });
                        break;

                    case "thermostatFanMode":
                        this.setState({
                            thermostatFanMode: evt["value"]
                        });
                        break;

                    case "heatingSetpoint":
                        this.setState({
                            heatingSetpoint: {
                                value: evt["value"]
                            }
                        });
                        break;

                    case "thermostatSetpoint":
                        this.setState({
                            thermostatSetpoint: {
                                value: evt["value"]
                            }
                        });
                        break;

                    case "thermostatMode":
                        this.setState({
                            thermostatMode: evt["value"]
                        });
                        break;

                    case "thermostatOperatingState":
                        this.setState({
                            thermostatOperatingState: evt["value"]
                        });
                        break;
                }

                this.setState(state);
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main").then( (status) => {
                console.debug("ThermostatDevice("+this.name+") Status Refreshed");

                let state = {};

                if(status["thermostat"] !== undefined && status["thermostat"]["temperature"] !== undefined){
                    state.temperature = {
                        value: status["thermostat"]["temperature"]["value"],
                        unit: status["thermostat"]["temperature"]["unit"]
                    };
                }

                if(status["thermostat"] !== undefined && status["thermostat"]["thermostatFanMode"] !== undefined){
                    state.thermostatFanMode =  status["thermostat"]["thermostatFanMode"]["value"];
                }

                if(status["thermostat"] !== undefined && status["thermostat"]["thermostatMode"] !== undefined){
                    state.thermostatMode = status["thermostat"]["thermostatMode"]["value"];
                }

                if(status["thermostat"] !== undefined && status["thermostat"]["coolingSetpoint"] !== undefined){
                    state.coolingSetpoint = {
                        value: status["thermostat"]["coolingSetpoint"]["value"],
                        unit: status["thermostat"]["coolingSetpoint"]["unit"]
                    };
                }

                if(status["thermostat"] !== undefined && status["thermostat"]["heatingSetpoint"] !== undefined){
                    state.heatingSetpoint = {
                        value: status["thermostat"]["heatingSetpoint"]["value"],
                        unit: status["thermostat"]["heatingSetpoint"]["unit"]
                    }
                }

                if(status["thermostat"] !== undefined && status["thermostat"]["thermostatSetpoint"] !== undefined){
                    state.thermostatSetpoint = {
                        value: status["thermostat"]["thermostatSetpoint"]["value"]
                    }
                }

                if(status["thermostat"] !== undefined && status["thermostat"]["thermostatOperatingState"] !== undefined){
                    state.thermostatOperatingState = status["thermostat"]["thermostatOperatingState"]["value"];
                }

                this.setState(state);
            }).catch( err => {
                this.error("Ops... error getting device state (ThermostatDevice)");
                this.error(err);
            });

            this.on('input', msg => {
                console.debug("Input Message Received");
                console.log(msg);

                if(msg && msg.topic !== undefined){
                  switch(msg.topic){
                    case "update":
                        this.reportState(msg);
                        break;

                    case "coolingSetpoint":
                        this.conf.executeDeviceCommand(this.device,[{
                            component: "main",
                            capability: "thermostat",
                            command: "setCoolingSetpoint",
                            arguments: [
                                msg.payload.value
                            ]
                        }]).then( (ret) => {
                            const state = {
                                coolingSetpoint: {
                                    value: msg.payload.value
                                }
                            };
                            this.setState(state);
                        }).catch( (ret) => {
                            this.error("Error updating device");
                            this.error(ret);
                        });
                        break;

                    case "thermostatFanMode":
                        this.conf.executeDeviceCommand(this.device,[{
                            component: "main",
                            capability: "thermostat",
                            command: "setThermostatFanMode",
                            arguments: [
                                msg.payload.value
                            ]
                        }]).then( (ret) => {
                            const state = {
                                thermostatFanMode: msg.payload.value
                            };
                            this.setState(state);
                        }).catch( (ret) => {
                            this.error("Error updating device");
                            this.error(ret);
                        });
                        break;

                    case "heatingSetpoint":
                        this.conf.executeDeviceCommand(this.device,[{
                            component: "main",
                            capability: "thermostat",
                            command: "setHeatingSetpoint",
                            arguments: [
                                msg.payload.value
                            ]
                        }]).then( (ret) => {
                            const state = {
                                heatingSetpoint: {
                                    value: msg.payload.value
                                }
                            };
                            this.setState(state);
                        }).catch( (ret) => {
                            this.error("Error updating device");
                            this.error(ret);
                        });
                        break;

                    case "thermostatMode":
                        this.conf.executeDeviceCommand(this.device,[{
                            component: "main",
                            capability: "thermostat",
                            command: "setThermostatMode",
                            arguments: [
                                msg.payload.value
                            ]
                        }]).then( (ret) => {
                            const state = {
                                thermostatMode: msg.payload.value
                            };
                            this.setState(state);
                        }).catch( (ret) => {
                            this.error("Error updating device");
                            this.error(ret);
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

    RED.nodes.registerType("smartthings-node-thermostat", SmartthingsThermostatNode);

};
