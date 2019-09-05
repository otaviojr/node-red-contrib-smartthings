var Promise = require('promise');
var SmartThings = require("smartthings-node");

module.exports = function(RED) {

    console.log("SmartthingsConfigNode");

    var nodes = {};

    function SmartthingsConfigNode(config) {

        RED.nodes.createNode(this, config);

        console.log("SmartthingsConfigNode");
        console.log(config);

        this.token = config.token;
        this.callback_url = config.callbackurl;

        var node = this;

        if(node.token !== undefined && node.callback_url !== undefined){
          node.st = new SmartThings.SmartThings(node.token);

          node.getSmartthingsApp = function() {
            node.st.apps.getAppDetails("red-node").then(app => {
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

          node.getSmartthingsApp();

          nodes[node.token] = node;
        }

        console.log("SmartthingsConfigNode called");
    }

    RED.nodes.registerType("smartthings-config", SmartthingsConfigNode);

    RED.httpAdmin.get('/smartthings/:token/devices/:type', function(req,res){

      console.log("HTTP REQUEST: devices: " + req.params.token + " : " + req.params.type);

      if(nodes[req.params.token]){
        let node = nodes[req.params.token];

        console.log("List Devices By Type: " + req.params.type);

        node.getDevices(req.params.type);
      } else {
        //TODO: 404 goes here
        console.log("NODE NOT FOUND");
      }

      res.status(404).send();
    });

    RED.httpAdmin.get('/smartthings/webhook', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        res.status(404).send();
      //}
    });

};
