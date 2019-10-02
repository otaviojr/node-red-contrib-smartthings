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
                console.log("OnOffDevice("+this.name+") Callback called");
                console.log(evt);
            });

            this.conf.getDeviceStatus(this.device,"main/capabilities/switch").then( (status) => {
                console.log("OnOffDevice("+this.name+") Status Refreshed");
                console.log(status);
            }).catch( err => {

            });
        }
    }

    RED.nodes.registerType("smartthings-node-onoff", SmartthingsOnOffNode);

};
