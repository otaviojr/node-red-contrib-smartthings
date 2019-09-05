module.exports = function(RED) {
    function SmartthingsPlayerNode(config) {
        RED.nodes.createNode(this, config);
        this.token = config.token;
    }

    RED.nodes.registerType("smartthings-config", SmartthingsPlayerNode);
};
