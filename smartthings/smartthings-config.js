const Promise = require('promise');
const SmartThings = require("smartthings-node");
const HttpSignature = require('http-signature');
const Axios = require('axios');

const SmartApp = require('@smartthings/smartapp');

module.exports = function(RED) {

    console.log("SmartthingsConfigNode");

    var nodes = {};
    var callbacks = [];

    const smartapp = new SmartApp()
        .enableEventLogging(2) // logs all lifecycle event requests and responses as pretty-printed JSON. Omit in production
        .page('mainPage', (context, page, configData) => {
            page.section('sensors', section => {
                section
                    .deviceSetting('contactSensor')
                    .capabilities(['contactSensor'])
            });
            page.section('lights', section => {
                section
                    .deviceSetting('lights')
                    .capabilities(['switch'])
                    .permissions('rx')
                    .multiple(true);
            });
        })
        // Called for both INSTALLED and UPDATED lifecycle events if there is no separate installed() handler
        .updated(async (context, updateData) => {
            await context.api.subscriptions.delete() // clear any existing configuration
            await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'myDeviceEventHandler');
        })
        .subscribedEventHandler('myDeviceEventHandler', async (context, event) => {
            const value = event.value === 'open' ? 'on' : 'off';
            await context.api.devices.sendCommands(context.config.lights, 'switch', value);
        });

    function SmartthingsConfigNode(config) {

        RED.nodes.createNode(this, config);

        console.log("SmartthingsConfigNode");
        console.log(config);

        this.token = config.token;

        var node = this;

        if(node.token !== undefined){

            node.st = new SmartThings.SmartThings(node.token);
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + node.token;

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

            node.unregisterCallback = function(parent, deviceId, callback) {
                if(callbacks[deviceId]){
                    callbacks[deviceId].filter( (c) => c !== callback);
                }
            };

            node.registerCallback = function(parent, deviceId, callback) {
                if(callbacks[deviceId] === undefined){
                    callbacks[deviceId] = [];
                }

                callbacks[deviceId].push({
                    parent: parent,
                    callback: callback
                });
            };

            node.getDeviceStatus = function(deviceId, type){
                console.log("getDeviceStatus:token:"+ node.token);
                return new Promise( (resolve, reject) => {
                    if (typeof type === 'undefined') {
                        node.st.devices.getDeviceStatus(deviceId).then(deviceStatus => {
                            console.log("Device Status ("+deviceId+"):");
                            console.log(deviceStatus);
                            resolve(deviceStatus);
                        }).catch( err => {
                            reject(err);
                        });
                    } else {
                        node.st.devices.getDeviceComponentStatus(deviceId, type).then(deviceStatus => {
                            console.log("Device Status ("+deviceId+"):");
                            console.log(deviceStatus);
                            resolve(deviceStatus);
                        }).catch( err => {
                            reject(err);
                        });
                    }
                });
            };

            node.executeDeviceCommand = function(deviceId, commands){
                console.log("executeDeviceCommand:token:"+ node.token);
                return new Promise( (resolve, reject) => {
                    node.st.devices.executeDeviceCommand(deviceId, commands).then(ret => {
                        console.log("Execute Command ("+deviceId+"):");
                        console.log(ret);
                        resolve(ret);
                    }).catch( err => {
                        reject(err);
                    });
                });
            };

            node.getScenes = function() {
                console.log("getScenes:token:"+ node.token);
                return new Promise( (resolve, reject) => {
                    Axios.get('https://api.smartthings.com/v1/scenes', {}).then( (response) => {
                        resolve(response.data);
                    }).catch( err => {
                        reject(err);
                    });
                });
            };

            node.executeScene = function(sceneId){
                console.log("executeScene:token:"+ node.token);
                return new Promise( (resolve, reject) => {
                    Axios.post('https://api.smartthings.com/v1/scenes/' + sceneId + '/execute', {}).then( (response) => {
                        resolve(response.data);
                    }).catch( (error) => {
                        reject(error);
                    });
                });
            };

            nodes[node.token] = node;
        }

        console.log("SmartthingsConfigNode called");
    }

    RED.nodes.registerType("smartthings-config", SmartthingsConfigNode);

    RED.httpAdmin.get('/smartthings/:token/devices/:type', function(req,res){

      console.log("HTTP REQUEST: devices: " + req.params.token + " : " + req.params.type);

      if(req.params.token){
        let node = nodes[req.params.token];

        console.log("List Devices By Type: " + req.params.type);

        st = new SmartThings.SmartThings(req.params.token);
        st.devices.listDevicesByCapability(req.params.type).then(deviceList => {
            console.log("Device List:");
            console.log(deviceList);
            let ret = [];
            deviceList["items"].forEach( (device, idx) => {
                ret.push({
                    deviceId: device["deviceId"],
                    label: device["label"],
                });
            });
            res.status(200).send(ret.sort( (a,b) => { return (a.label < b.label ? -1 : 1) } ));
        }).catch( err => {
          console.log("NODE ERROR");
          console.log(err);
          res.status(500).send("ERROR");
        });
      } else {
        res.status(404).send();
      }
    });

    RED.httpAdmin.get('/smartthings/:token/scenes', function(req,res){

      console.log("HTTP REQUEST: scenes: " + req.params.token);

      if(req.params.token){
        let node = nodes[req.params.token];

        console.log("List Scenes: ");

        if(node){
            node.getScenes().then( scenes => {
                let ret = [];
                scenes["items"].forEach( (scene, idx) => {
                    ret.push({
                        sceneId: scene["sceneId"],
                        sceneName: scene["sceneName"],
                    });
                });
                res.status(200).send(ret.sort( (a,b) => { return (a.sceneName < b.sceneName ? -1 : 1) } ));
            }).catch(err => {
                console.log("NODE ERROR");
                console.log(err);
                res.status(500).send("ERROR");
            });
        } else {
            res.status(404).send();
        }
      } else {
        res.status(404).send();
      }
    });

    RED.httpAdmin.post('/smartthings/smartapp', function(req,res){
        console.log("Smartthings WebApp");
        smartapp.handleHttpCallback(req, res);
    });

    RED.httpAdmin.get('/smartthings/webhook', function(req,res){
      res.status(200).send("SmartThings NodeRed is installed.");
    });

    RED.httpAdmin.post('/smartthings/webhook', function(req,res){
        console.log("Smartthings Webhook");
        console.log(req.body);

        const callback = callbacks[req.body["id"]];

        if(callback){
            callback.forEach( (c) => {
                c.callback.call(c.parent, req.body);
            });
        }

        res.status(200).send("OK");
    });

};
