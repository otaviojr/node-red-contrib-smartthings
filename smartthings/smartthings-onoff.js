var Promise = require('promise');
var SmartThings = require("smartthings-node");

module.exports = function(RED) {

    var token = "";
    var callback_url = "";

    function getDevices(token){
      console.log("getDevices:token:"+token);
      let st = new SmartThings.SmartThings(token);
      st.devices.listDevicesByCapability('switch').then(deviceList => {
        console.log(deviceList);
      })
    }

    function SmartthingsOnOffNode(config) {
        RED.nodes.createNode(this, config);

        this.conf = config.conf;
        this.name = config.name;
        this.device = config.device;

        token = this.conf.token;
        callback_url = this.conf.callbackurl;

        getDevices(token);
    }

    RED.nodes.registerType("smartthings-node-onoff", SmartthingsOnOffNode);

    RED.httpAdmin.get('/smartthings/onoff/webhook', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        res.status(404).send();
      //}
    });

    RED.httpAdmin.get('/smartthings/onoff/devices', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        res.status(404).send();
      //}
    });
};
