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
            }];

            if(original !== undefined){
              msg.forEach( (m) => {
                original.payload = m.payload;
                Object.assign(m,original);
              });
            }

            this.send(msg);
        }

        this.setState = function(value) {
            Object.assign(this.state, value);

            this.reportState();
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("LevelDevice("+this.name+") Callback called");
                console.debug(evt);

                let state = {};

                switch(evt["name"].toLowerCase()){
                    case "switch":
                        state.value = (evt["value"].toLowerCase() === "on" ? 1 : 0);
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
                    }
                }
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-level", SmartthingsLevelNode);

};
