var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsLockNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsLockNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.currentStatus = 0;

        this.reportStatus = function(original) {
            let msg = {
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "lock",
                    name: this.name,
                    value: this.currentStatus
                }
            };

            if(original !== undefined){
                Object.assign(msg,original);
            }

            this.send(msg);
        }

        this.updateStatus = function(currentStatus){
            this.currentStatus = currentStatus;
            this.reportStatus();
        }

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("LockDevice("+this.name+") Callback called");
                console.debug(evt);
                if(evt["name"] == "lock"){
                    this.updateStatus((evt["value"].toLowerCase() === "locked" ? 1 : 0));
                }
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main/capabilities/lock").then( (status) => {
                console.debug("LockDevice("+this.name+") Status Refreshed");

                current = status["lock"]["value"];
                if(current){
                    this.updateStatus((current.toLowerCase() == "locked" ? 1 : 0));
                }
            }).catch( err => {
                console.error("Ops... error getting device state (LockDevice)");
                console.error(err);
            });

            this.on('input', msg => {
                console.debug("Input Message Received");
                if(msg && msg.payload && !isNaN(msg.payload.value) && msg.topic === "lock"){
                    this.conf.executeDeviceCommand(this.device,[{
                        component: "main",
                        capability: "lock",
                        command: (msg.payload.value == 1 ? "lock" : "unlock")
                    }]).then( (ret) => {
                        this.updateStatus(msg.payload.value);
                    }).catch( (ret) => {
                        console.error("Error updating device");
                    });
                } else if(msg.topic === "update"){
                    this.reportStatus(msg);
                }
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-lock", SmartthingsLockNode);

};
