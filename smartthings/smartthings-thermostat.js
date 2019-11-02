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
        };

        this.reportState = function(original) {
            let msg = [];

            if(original !== undefined){
                Object.assign(msg,original);
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
