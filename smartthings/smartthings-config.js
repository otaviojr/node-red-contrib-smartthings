var Promise = require('promise');
var SmartThings = require("smartthings-node");

module.exports = function(RED) {

    var token = "";
    var callback_url = "";

    console.log("SmartthingsConfigNode");

    function SmartthingsConfigNode(config) {
        RED.nodes.createNode(this, config);
        this.token = config.token;
        this.callbackurl = config.url;

        token = this.token;
        this.callback_url = this.callbackurl;

        console.log("SmartthingsConfigNode called");
    }

    RED.nodes.registerType("smartthings-config", SmartthingsConfigNode);

    function getDevices(token, type){
      console.log("getDevices:token:"+token);
      let st = new SmartThings.SmartThings(token);
      st.devices.listDevicesByCapability(type).then(deviceList => {
        console.log(deviceList);
      })
    }

    RED.httpAdmin.get('/smartthings/devices/:type', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        console.log("List Devices By Type: " + req.params.type)
        getDevices(token, req.params.type);
        res.status(404).send();
      //}
    });

    RED.httpAdmin.get('/smartthings/onoff/webhook', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        res.status(404).send();
      //}
    });

};
