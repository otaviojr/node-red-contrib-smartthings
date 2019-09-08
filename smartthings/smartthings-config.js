var Promise = require('promise');
var SmartThings = require("smartthings-node");
var HttpSignature = require('http-signature');

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

          let app_name = "red-node-"+node.token;
          let webhook_url = node.callback_url + "/smartthings/webhook";

          node.st = new SmartThings.SmartThings(node.token);

          node.getSmartthingsApp = function() {
            console.log("Searching for Smartthings App");
            node.st.apps.getAppDetails(app_name).then(app => {
              console.log("App Found");
              console.log(app);
              //TODO: update App
            }).catch(err => {
              console.log("App Not Found. Creating app.");
              node.st.apps.createWebHookApp(app_name,
                          "RedNode",
                          "RedNode Smartthings Integration",
                          webhook_url,
                          ["AUTOMATION"],
                          true).then(app => {
                console.log("App Created");
                console.log(app);
              });
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

    RED.httpAdmin.get('/smartthings/:conf/devices/:type', function(req,res){

      console.log("HTTP REQUEST: devices: " + req.params.conf + " : " + req.params.type);

      let conf = RED.nodes.getNode(req.params.conf);

      if(nodes[conf.token]){
        let node = nodes[conf.token];

        console.log("List Devices By Type: " + req.params.type);

        node.getDevices(req.params.type);
      } else {
        //TODO: 404 goes here
        console.log("NODE NOT FOUND");
      }

      res.status(404).send();
    });

    RED.httpAdmin.post('/smartthings/webhook', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        console.log("Smartthings Webhook");
        console.log(req.body);

        if(req.body && req.body.lifecycle === "PING"){

          const obj = {
            pingData: {
              challenge: req.body.pingData.challenge
            }
          };

          res.status(200).send(JSON.stringify(obj));
          return;
        } else if(req.body && req.body.lifecycle === "CONFIGURATiON"){
          const confData = req.body.configurationData;

          if(confData.phase === "INITIALIZE"){
            const obj = {
              configurationData: {
                initialize: {
                  name: "NodeRed",
                  description: "Smartthings NodeRed Integration",
                  id: "node-red-app",
                  permissions: [],
                  firstPageId: 1
                }
              }
            };
            res.status(200).send(JSON.stringify(obj));
            return;
          } else if(confData.phase === "PAGE") {
            const obj = {
              configurationData: {
                page: {
                  pageId: 1,
                  name: "Device Selection",
                  nextPageId: null,
                  previousPageId": null,
                  complete: true,
                  sections: [
                    description: "Tap to set",
                    type: "DEVICE",
                    required: false,
                    multiple: true,
                    capabilities: [
                      "switch",
                      "ContactSensor",
                      "MotionSensor",
                      "Light"
                    ],
                    permissions: [
                      "r",
                      "x"
                    ]
                  ]
                }
              }
            };
            res.status(200).send(JSON.stringify(obj));
            return;
          }
        }

        res.status(200).send("OK");
      //}
    });

};
