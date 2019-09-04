module.exports = function(RED) {
    function SonosPlayerNode(config) {
        RED.nodes.createNode(this, config);
        this.ipaddress = config.ipaddress;
        this.port      = config.port;
    }

    RED.nodes.registerType("sonos-config", SonosPlayerNode);
};