var Promise = require('promise');
var SmartThings = require("smartthings-node");

module.exports = function(RED) {

    console.log("SmartthingsConfigNode");

    var nodes = {};

    function SmartthingsConfigNode(config) {

        RED.nodes.createNode(this, config);

        this.token = config.token;
        this.callbackurl = config.url;

        var node = this;

        if(node.token && node.callbackurl){
          node.st = new SmartThings.SmartThings(token);

          node.getSmartthingsApp = function() {
            node.st.apps.getAppDetails("RedNode").then(app => {
              console.log("Searching for Smartthings App");
              console.log(app);
            });
          };

          node.createSmartthingsApp = function(){

          };

          node.getDevices = function(type){
            console.log("getDevices:token:"+ node.token);

            node.st.devices.listDevicesByCapability(type).then(deviceList => {
              console.log(deviceList);
            });
          }

          nodes[node.token] = node;

          node.getSmartthingsApp();
        }

        console.log("SmartthingsConfigNode called");
    }

    RED.nodes.registerType("smartthings-config", SmartthingsConfigNode);

    RED.httpAdmin.get('/smartthings/:token/devices/:type', function(req,res){
      if(nodes[req.params.token]){
        let node = nodes[req.params.token];

        console.log("List Devices By Type: " + req.params.type);

        node.getDevices(req.params.type);
      } else {
        //TODO: 404 goes here
      }

      res.status(404).send();

    });

    RED.httpAdmin.get('/smartthings/onoff/webhook', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        res.status(404).send();
      //}
    });

};
