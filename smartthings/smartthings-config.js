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
        this.appid = config.appid;
        this.pubkey = config.pubkey;

        var node = this;

        if(node.token !== undefined){

          node.st = new SmartThings.SmartThings(node.token);

          node.getDevices = function(type){
            console.log("getDevices:token:"+ node.token);

            node.st.devices.listDevicesByCapability(type).then(deviceList => {
              console.log(deviceList);
            });
          }

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
        console.log("Smartthings Webhook");
        console.log(req.body);

        if(req.body && req.body.lifecycle === "PING"){
          console.log("Handling Ping");
          const obj = {
            pingData: {
              challenge: req.body.pingData.challenge
            }
          };

          res.status(200).send(obj);
          return;
        } else if(req.body && req.body.lifecycle === "CONFIGURATION"){
          console.log("Handling Configuration");

          const confData = req.body.configurationData;

          if(confData.phase === "INITIALIZE"){
            console.log("Handling Configuration Initialize");
            const obj = {
              configurationData: {
                initialize: {
                  name: "NodeRed",
                  description: "Smartthings NodeRed Integration",
                  id: "node-red-app",
                  permissions: [],
                  firstPageId: "1"
                }
              }
            };
            res.status(200).send(obj);
            return;
          } else if(confData.phase === "PAGE") {
            console.log("Handling Configuration Page");
            const obj = {
              configurationData: {
                page: {
                  pageId: "1",
                  name: "NodeRed Integration",
                  nextPageId: null,
                  previousPageId: null,
                  complete: true,
                  sections: [{
                    name: "Device Selection",
                    settings: [{
                      id: "lightSwitch",
                      name: "Which Switchs?",
                      description: "Tap to set",
                      type: "DEVICE",
                      required: false,
                      multiple: true,
                      capabilities: [
                        "switch"
                      ],
                      permissions: [
                        "r"
                      ]
                    }]
                  }]
                }
              }
            };
            res.status(200).send(obj);
            return;
          }
        } else if(req.body && req.body.lifecycle === "INSTALL"){
          const obj = {
            installData: {
            }
          };
          res.status(200).send(obj);
          return;
        } else if(req.body && req.body.lifecycle === "UPDATE"){
          const obj = {
            updateData: {
            }
          };
          res.status(200).send(obj);
          return;
        } else if(req.body && req.body.lifecycle === "UNINSTALL"){
          const obj = {
            uninstallData: {
            }
          };
          res.status(200).send(obj);
          return;
        }
        res.status(200).send();
    });

};
