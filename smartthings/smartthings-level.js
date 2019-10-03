var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsLevelNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsLevelNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;
        this.currentLevel = 0;

        this.state = {
            value: 0,
            level: 0,
            levelUnit: ""
        }

        this.setState = function(value){
            Object.assign(this.state, value);

            let msg = [{
                topic: "switch",
                payload: {
                    deviceId: this.device,
                    name: this.name,
                    value: this.state.value
                }
            },{
                topic: "level",
                payload: {
                    deviceId: this.device,
                    name: this.name,
                    value: this.state.level
                }
            }];

            this.send(msg);
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("LevelDevice("+this.name+") Callback called");
                console.debug(evt);

                let state = {};

                switch(evt["name"].toLowerCase()){
                    case "switch":
                        state.value = evt["value"];
                        break;

                    case "level":
                        state.level = evt["value"];
                        break;
                }

                this.setState(state);
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main").then( (status) => {
                console.debug("LevelDevice("+this.name+") Status Refreshed");

                let state = {};

                if(status["switch"] !== undefined && status["switch"]["switch"] !== undefined){
                    state.value = (status["switch"]["switch"]["value"].toLowerCase() === "on" ? 1 : 0);
                }

                if(status["switchLevel"] !== undefined && status["switchLevel"]["level"] !== undefined){
                    state.level = status["switchLevel"]["level"]["value"];
                    state.levelUnit = status["switchLevel"]["level"]["unit"];
                }

                this.setState(state);
            }).catch( err => {
                console.error("Ops... error getting device state (LevelDevice)");
                console.error(err);
            });

            this.on('input', msg => {
                console.debug("Input Message Received");
                console.log(msg);
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-level", SmartthingsLevelNode);

};
