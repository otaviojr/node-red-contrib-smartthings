module.exports = function(RED) {
    function SmartthingsOnOffNode(config) {
        RED.nodes.createNode(this, config);
    }

    RED.nodes.registerType("smartthings-node-onoff", SmartthingsOnOffNode);
};
