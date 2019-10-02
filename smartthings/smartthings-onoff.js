var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsOnOffNode(config) {
        RED.nodes.createNode(this, config);

        console.log("SmartthingsOnOffNode")
        console.log(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        if(this.conf && this.device){
            this.conf.registerCallback(this, this.device, (evt) => {
                console.log("OnOffDevice Callback called");
                console.log(evt);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-onoff", SmartthingsOnOffNode);

};
