var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsSceneNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsSceneNode")

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.scene = config.scene;

        if(this.conf && this.scene){

            this.on('input', (msg, send, done) => {
                send = send || function() { node.send.apply(node,arguments) };
                done = done || function() { };
                console.debug("Input Message Received");
                if(msg && msg.topic === "scene"){
                    this.conf.executeScene(this.scene).then( (ret) => {
                        done();
                    }).catch( (ret) => {
                        this.error("Error executing scene");
                        done("Error executing scene");
                    });
                }
            });

            this.on('close', () => {
                console.debug("Closed");
            });
        }
    }

    RED.nodes.registerType("smartthings-node-scene", SmartthingsSceneNode);
};
