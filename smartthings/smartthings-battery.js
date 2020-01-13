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

        this.reportState = function(original) {
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "battery",
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
                console.debug("BatteryDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "battery"){
                    this.setState({
                        value: parseFloat(evt["value"])
                    });
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/battery").then( (status) => {
                console.debug("BatteryDevice("+this.name+") Status Refreshed");
                console.debug(status);

                this.setState({
                    value: parseFloat(status["battery"]["value"]),
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

    RED.nodes.registerType("smartthings-node-battery", SmartthingsBatteryNode);
};
