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
            onOff: null,
            temperature: null,
            coolingSetpoint: null,
            heatingSetpoint: null,
            thermostatFanMode: null,
            thermostatMode: null,
            thermostatOperatingState: null
        };

        this.reportState = function(original) {
            let msg = [null,null,null,null,null,null,null];

            if(original !== undefined){
                Object.assign(msg,original);
            }

            if(this.state.onOff != null){
                msg[0] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "switch",
                        name: this.name,
                        value: this.state.onOff
                    }
                };
            }
            if(this.state.temperature != null){
                msg[1] = {
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
                msg[2] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "coolingSetpoint",
                        name: this.name,
                        value: this.state.coolingSetpoint
                    }
                };
            }
            if(this.state.heatingSetpoint != null){
                msg[3] = {
                    topic: "device",
                    payload: {
                        deviceId: this.device,
                        deviceType: "heatingSetpoint",
                        name: this.name,
                        value: this.state.heatingSetpoint
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
                this.error("ThermostatDevice("+this.name+") Callback called");
                this.error(evt);

                let state = {};

                switch(evt["name"].toLowerCase()){
                    case "coolingSetpoint":
                        break;

                    case "thermostatFanMode":
                        break;

                    case "heatingSetpoint":
                        break;

                    case "thermostatMode":
                        break;

                    case "thermostatOperatingState":
                        break;
                }

                this.setState(state);
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main").then( (status) => {
                console.debug("ThermostatDevice("+this.name+") Status Refreshed");

                this.error("ThermostatDevice("+this.name+") Status Refreshed");
                this.error(status);

                let state = {};

                if(status["coolingSetpoint"] !== undefined && status["coolingSetpoint"]["temperature"] !== undefined){
                }

                if(status["thermostatFanMode"] !== undefined && status["thermostatFanMode"]["value"] !== undefined){
                }

                if(status["heatingSetpoint"] !== undefined && status["heatingSetpoint"]["temperature"] !== undefined){
                }

                if(status["thermostatMode"] !== undefined && status["thermostatMode"]["value"] !== undefined){
                }

                if(status["thermostatOperatingState"] !== undefined && status["thermostatOperatingState"]["value"] !== undefined){
                }

                this.setState(state);
            }).catch( err => {
                console.error("Ops... error getting device state (ThermostatDevice)");
                console.error(err);
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
                        break;

                    case "thermostatFanMode":
                        break;

                    case "heatingSetpoint":
                        break;

                    case "thermostatMode":
                        break;

                    case "thermostatOperatingState":
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
