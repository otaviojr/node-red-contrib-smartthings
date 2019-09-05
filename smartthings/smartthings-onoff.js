var Promise = require('promise');

module.exports = function(RED) {

    function SmartthingsOnOffNode(config) {
        RED.nodes.createNode(this, config);

        console.log("SmartthingsOnOffNode")
        console.log(config);

        this.conf = config.conf;
        this.name = config.name;
        this.device = config.device;
    }

    RED.nodes.registerType("smartthings-node-onoff", SmartthingsOnOffNode);

};
