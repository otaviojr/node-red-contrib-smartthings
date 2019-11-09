var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsSceneNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsSceneNode")

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.scene = config.scene;

        if(this.conf && this.scene){

            this.on('input', msg => {
                console.debug("Input Message Received");
                if(msg && msg.payload && !isNaN(msg.payload.value) && msg.topic === "scene"){
                    this.conf.executeDeviceCommand(this.device,[{
                        component: "main",
                        capability: "switch",
                        command: (msg.payload.value == 1 ? "on" : "off")
                    }]).then( (ret) => {
                    }).catch( (ret) => {
                        this.error("Error updating device");
                    });
                } else if(msg.topic === "update"){
                    this.reportStatus(msg);
                }
            });

            this.on('close', () => {
                console.debug("Closed");
            });
        }
    }

    RED.nodes.registerType("smartthings-node-button", SmartthingsButtonNode);
};
