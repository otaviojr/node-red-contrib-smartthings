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

        var node = this;

        if(node.token !== undefined){

            node.st = new SmartThings.SmartThings(node.token);

            node.getDevices = function(type) {
                console.log("getDevices:token:"+ node.token);
                return new Promise( (resolve, reject) => {
                    node.st.devices.listDevicesByCapability(type).then(deviceList => {
                        console.log("Device List:");
                        console.log(deviceList);
                        resolve(deviceList);
                    }).catch( err => {
                        reject(err);
                    });
                });
            };

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

        node.getDevices(req.params.type).then( deviceList => {
            let ret = [];
            deviceList["items"].forEach( (device, idx) => {
                ret.push({
                    deviceId: device["deviceId"],
                    label: device["label"],
                });
            });
            res.status(200).send(ret);
        }).catch(err => {
            console.log("NODE ERROR");
            console.log(err);
            res.status(500).send("ERROR");
        });
      } else {
        //TODO: 404 goes here
        console.log("NODE NOT FOUND");
        res.status(404).send();
      }
    });

    RED.httpAdmin.post('/smartthings/webhook', function(req,res){
        console.log("Smartthings Webhook");
        console.log(req.body);

        res.status(200).send("OK");
    });

};
