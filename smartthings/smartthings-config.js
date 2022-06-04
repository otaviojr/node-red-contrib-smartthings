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
            page.section('devices', section => {
                section
                    .deviceSetting('devices')
                    .capabilities(['accelerationSensor','airQualitySensor',
                      'alarm','audioMute','audioNotification','audioStream',
                      'audioVolume','battery', 'button', 'bypassable',
                      'carbonDioxideMeasurement','carbonMonoxideDetector',
                      'colorControl', 'colorTemperature', 'configuration',
                      'contactSensor', 'dewPoint', 'doorControl', 'dustSensor',
                      'energyMeter', 'equivalentCarbonDioxideMeasurement',
                      'execute', 'fanOscillationMode', 'fanSpeed', 'filterState',
                      'fineDustSensor', 'firmwareUpdate', 'formaldehydeMeasurement',
                      'healthCheck', 'illuminanceMeasurement', 'imageCapture',
                      'infraredLevel', 'locationMode', 'lock', 'moldHealthConcern',
                      'momentary', 'motionSensor', 'networkMeter', 'notification',
                      'objectDetection', 'panicAlarm', 'pHMeasurement', 'powerMeter',
                      'powerSource', 'presenceSensor', 'refresh', 'refrigeration',
                      'relativeHumidityMeasurement', 'remoteControlStatus',
                      'samsungTV', 'securitySystem', 'signalStrength',
                      'sleepSensor', 'smokeDetector', 'soundPressureLevel',
                      'soundSensor', 'switchLevel', 'switch', 'tamperAlert',
                      'temperatureAlarm', 'temperatureMeasurement', 'testCapability',
                      'thermostatCoolingSetpoint', 'thermostatFanMode', 'thermostatHeatingSetpoint',
                      'thermostatMode', 'thermostatOperatingState', 'threeAxis',
                      'tone', 'tV', 'tvocMeasurement', 'ultravioletIndex',
                      'valve', 'veryFineDustSensor', 'videoCamera', 'videoCapture',
                      'videoStream', 'voltageMeasurement', 'waterSensor', 'webrtc',
                      'windowShadePreset', 'windowShade', 'zwMultichannel'])
                    .multiple(true);
            });

        })
        // Called for both INSTALLED and UPDATED lifecycle events if there is no separate installed() handler
        .updated(async (context, updateData) => {
            await context.api.subscriptions.delete() // clear any existing configuration
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'accelerationSensor', 'acceleration', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'airQualitySensor', 'airQuality', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'alarm', 'alarm', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'audioMute', 'mute', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'audioStream', 'uri', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'audioVolume', 'volume', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'battery', 'battery', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'button', 'button', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'bypassable', 'bypassStatus', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'carbonDioxideMeasurement', 'carbonDioxide', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'carbonMonoxideDetector', 'carbonMonoxide', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'colorControl', 'color', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'colorControl', 'hue', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'colorControl', 'saturation', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'colorTemperature', 'colorTemperature', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'contactSensor', 'contact', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'dewPoint', 'dewpoint', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'doorControl', 'door', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'dustSensor', 'dustLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'dustSensor', 'fineDustLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'energyMeter', 'energy', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'equivalentCarbonDioxideMeasurement', 'equivalentCarbonDioxideMeasurement', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'fanOscillationMode', 'fanOscillationMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'fanSpeed', 'fanSpeed', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'filterState', 'filterLifeRemaining', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'fineDustSensor', 'fineDustLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'formaldehydeMeasurement', 'formaldehydeLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'healthCheck', 'healthStatus', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'illuminanceMeasurement', 'illuminance', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'imageCapture', 'image', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'infraredLevel', 'infraredLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'locationMode', 'mode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'lock', 'lock', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'moldHealthConcern', 'moldHealthConcern', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'motionSensor', 'motion', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'networkMeter', 'downlinkSpeed', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'networkMeter', 'uplinkSpeed', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'objectDetection', 'detected', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'panicAlarm', 'panicAlarm', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'pHMeasurement', 'pH', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'powerMeter', 'power', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'powerSource', 'powerSource', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'presenceSensor', 'presence', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'refrigeration', 'defrost', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'refrigeration', 'rapidCooling', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'refrigeration', 'rapidFreezing', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'relativeHumidityMeasurement', 'humidity', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'remoteControlStatus', 'remoteControlEnabled', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'samsungTV', 'messageButton', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'samsungTV', 'mute', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'samsungTV', 'pictureMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'samsungTV', 'soundMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'samsungTV', 'switch', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'samsungTV', 'volume', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'securitySystem', 'alarm', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'securitySystem', 'securitySystemStatus', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'signalStrength', 'lqi', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'signalStrength', 'rssi', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'sleepSensor', 'sleeping', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'smokeDetector', 'smoke', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'soundPressureLevel', 'soundPressureLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'soundSensor', 'sound', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switchLevel', 'level', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'switch', 'switch', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tamperAlert', 'tamper', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'temperatureAlarm', 'temperatureAlarm', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'temperatureMeasurement', 'temperature', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'thermostatCoolingSetpoint', 'coolingSetpoint', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'thermostatFanMode', 'thermostatFanMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'thermostatHeatingSetpoint', 'heatingSetpoint', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'thermostatMode', 'thermostatMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'thermostatOperatingState', 'thermostatOperatingState', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'threeAxis', 'threeAxis', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tone', 'beep', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tV', 'channel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tV', 'movieMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tV', 'picture', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tV', 'power', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tV', 'sound', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tV', 'volume', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'tvocMeasurement', 'tvocLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'ultravioletIndex', 'ultravioletIndex', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'valve', 'valve', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'veryFineDustSensor', 'veryFineDustLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'videoCamera', 'camera', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'videoCamera', 'mute', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'videoCapture', 'clip', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'videoCapture', 'stream', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'videoStream', 'stream', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'voltageMeasurement', 'voltage', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'waterSensor', 'water', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'windowShadePreset', 'presetPosition', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.devices, 'windowShade', 'windowShade', 'myDeviceEventHandler');
        })
        .subscribedEventHandler('myDeviceEventHandler', async (context, event) => {
            //const value = event.value === 'open' ? 'on' : 'off';
            //await context.api.devices.sendCommands(context.config.lights, 'switch', value);
            console.log("Smartthings WebApp Event Received:");
            console.log(event);
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

    RED.httpAdmin.get('/smartthings/smartapp', function(req,res){
      res.status(200).send("SmartThings NodeRed SmartApp is accessible.");
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
