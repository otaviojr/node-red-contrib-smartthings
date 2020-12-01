var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsButtonNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsButtonNode")

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = "";
        this.button = 0;

        this.reportStatus = function(send, done, original) {
            send = send || function() { this.send.apply(this,arguments) };
            done = done || function() { this.done.apply(this,arguments) };
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "button",
                    name: this.name,
                    value: this.currentStatus,
                    button: this.button
                }
            };

            if(original !== undefined){
              original.payload = msg.payload;
              Object.assign(msg,original);
            }

            send(msg);
            done();
        };

        this.updateStatus = function(currentStatus, button){
            this.currentStatus = currentStatus;
            this.button = button;
            this.reportStatus();
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("Button("+this.name+") Callback called");
                console.debug(evt);
                this.error("Button("+this.name+") Callback called");
                this.error(evt);
                if(evt["name"] == "button"){
                    this.updateStatus(evt["value"], evt["button"]);
                }
            };

            this.conf.registerCallback(this, this.device, callback);

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-button", SmartthingsButtonNode);
};
