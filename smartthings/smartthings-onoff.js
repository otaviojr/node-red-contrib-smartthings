var Promise = require('promise');
var SmartThings = require("smartthings-node");

module.exports = function(RED) {

    function getDevices(token){
      console.log("getDevices:token:"+token);
      let st = new SmartThings.SmartThings(token);
      st.devices.listDevicesByCapability('switch').then(deviceList => {
        console.log(deviceList);
      })
    }

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
