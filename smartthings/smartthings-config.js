module.exports = function(RED) {
    function SmartthingsConfigNode(config) {
        RED.nodes.createNode(this, config);
        this.token = config.token;
        this.callbackurl = config.url;
    }

    RED.nodes.registerType("smartthings-config", SmartthingsConfigNode);
};
