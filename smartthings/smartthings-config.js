const Promise = require('promise');
const fs = require('fs');
const SmartThings = require("smartthings-node");
const HttpSignature = require('http-signature');
const Axios = require('axios');

const SmartApp = require('@smartthings/smartapp');

class NodeRedContextStore {
  constructor(RED) {
    this.userDir = RED["userDir"];
    this.storeDir = this.userDir + "/smartthings/context/";
    console.log("Creating directory: " + this.storeDir);
    if (!fs.existsSync(this.storeDir)){
      fs.mkdirSync(this.storeDir, { recursive: true });
    }
  }

  readFile(installedAppId) {
    console.log("readFile");
    return new Promise((resolve, reject) => {
      fs.readFile(this.storeDir + installedAppId + ".context", 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }

  writeFile(installedAppId, data) {
    console.log("writeFile");
    return new Promise((resolve, reject) => {
      fs.writeFile(this.storeDir + installedAppId + ".context", data, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  deleteFile(installedAppId){
    console.log("deleteFile");
    fs.unlink(this.storeDir + installedAppId + ".context", err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    })
  }

  get(installedAppId) {
    console.log("NodeRedContextStore.get");
    return new Promise((resolve, reject) => {
      readFile(installedAppId).then( (data) => {
        resolve(data);
      }).catch( (err) => {
        reject({});
      })
    });
  }

  put(params) {
    console.log("NodeRedContextStore.put");
    return new Promise((resolve, reject) => {
      writeData(params.installedAppId, params).then( () => {
        resolve(params);
      }).catch( () => {
        reject({});
      });
    });
  }

  delete(installedAppId) {
    console.log("NodeRedContextStore.delete");
    return new Promise((resolve, reject) => {
      deleteFile(installedAppId).then( () => {
        resolve({});
      }).catch( err => {
        reject(err);
      });
    });
  }

  listAll(){
    console.log("NodeRedContextStore.listAll");
    return new Promise((resolve, reject) => {
      fs.readdir(this.storeDir, function (err, files) {
          if (err) {
              reject(err);
          }
          ret = [];

          files.forEach(function (file) {
              ret << file.replaceAll(".context","");
          });

          resolve(ret);
      });
    });
  }
}

module.exports = function(RED) {

    console.log("SmartthingsConfigNode");

    var nodes = {};
    var callbacks = [];

    const smartapp = new SmartApp()
        .enableEventLogging(2) // logs all lifecycle event requests and responses as pretty-printed JSON. Omit in production
        .page('mainPage', (context, page, configData) => {
            page.section('accelerationSensor', section => {
                section
                    .deviceSetting('accelerationSensor')
                    .capabilities(['accelerationSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('airQualitySensor', section => {
                section
                    .deviceSetting('airQualitySensor')
                    .capabilities(['airQualitySensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('alarm', section => {
                section
                    .deviceSetting('alarm')
                    .capabilities(['alarm'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('audioMute', section => {
                section
                    .deviceSetting('audioMute')
                    .capabilities(['audioMute'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('audioNotification', section => {
                section
                    .deviceSetting('audioNotification')
                    .capabilities(['audioNotification'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('audioStream', section => {
                section
                    .deviceSetting('audioStream')
                    .capabilities(['audioStream'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('audioVolume', section => {
                section
                    .deviceSetting('audioVolume')
                    .capabilities(['audioVolume'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('battery', section => {
                section
                    .deviceSetting('battery')
                    .capabilities(['battery'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('button', section => {
                section
                    .deviceSetting('button')
                    .capabilities(['button'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('bypassable', section => {
                section
                    .deviceSetting('bypassable')
                    .capabilities(['bypassable'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('carbonDioxideMeasurement', section => {
                section
                    .deviceSetting('carbonDioxideMeasurement')
                    .capabilities(['carbonDioxideMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('carbonMonoxideDetector', section => {
                section
                    .deviceSetting('carbonMonoxideDetector')
                    .capabilities(['carbonMonoxideDetector'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('colorControl', section => {
                section
                    .deviceSetting('colorControl')
                    .capabilities(['colorControl'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('colorTemperature', section => {
                section
                    .deviceSetting('colorTemperature')
                    .capabilities(['colorTemperature'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('contactSensor', section => {
                section
                    .deviceSetting('contactSensor')
                    .capabilities(['contactSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('dewPoint', section => {
                section
                    .deviceSetting('dewPoint')
                    .capabilities(['dewPoint'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('doorControl', section => {
                section
                    .deviceSetting('doorControl')
                    .capabilities(['doorControl'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('dustSensor', section => {
                section
                    .deviceSetting('dustSensor')
                    .capabilities(['dustSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('energyMeter', section => {
                section
                    .deviceSetting('energyMeter')
                    .capabilities(['energyMeter'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('equivalentCarbonDioxideMeasurement', section => {
                section
                    .deviceSetting('equivalentCarbonDioxideMeasurement')
                    .capabilities(['equivalentCarbonDioxideMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('fanOscillationMode', section => {
                section
                    .deviceSetting('fanOscillationMode')
                    .capabilities(['fanOscillationMode'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('fanSpeed', section => {
                section
                    .deviceSetting('fanSpeed')
                    .capabilities(['fanSpeed'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('filterState', section => {
                section
                    .deviceSetting('filterState')
                    .capabilities(['filterState'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('fineDustSensor', section => {
                section
                    .deviceSetting('fineDustSensor')
                    .capabilities(['fineDustSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('formaldehydeMeasurement', section => {
                section
                    .deviceSetting('formaldehydeMeasurement')
                    .capabilities(['formaldehydeMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('healthCheck', section => {
                section
                    .deviceSetting('healthCheck')
                    .capabilities(['healthCheck'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('illuminanceMeasurement', section => {
                section
                    .deviceSetting('illuminanceMeasurement')
                    .capabilities(['illuminanceMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('imageCapture', section => {
                section
                    .deviceSetting('imageCapture')
                    .capabilities(['imageCapture'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('infraredLevel', section => {
                section
                    .deviceSetting('infraredLevel')
                    .capabilities(['infraredLevel'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('locationMode', section => {
                section
                    .deviceSetting('locationMode')
                    .capabilities(['locationMode'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('lock', section => {
                section
                    .deviceSetting('lock')
                    .capabilities(['lock'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('motionSensor', section => {
                section
                    .deviceSetting('motionSensor')
                    .capabilities(['motionSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('networkMeter', section => {
                section
                    .deviceSetting('networkMeter')
                    .capabilities(['networkMeter'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('notification', section => {
                section
                    .deviceSetting('notification')
                    .capabilities(['notification'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('objectDetection', section => {
                section
                    .deviceSetting('objectDetection')
                    .capabilities(['objectDetection'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('panicAlarm', section => {
                section
                    .deviceSetting('panicAlarm')
                    .capabilities(['panicAlarm'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('pHMeasurement', section => {
                section
                    .deviceSetting('pHMeasurement')
                    .capabilities(['pHMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('powerMeter', section => {
                section
                    .deviceSetting('powerMeter')
                    .capabilities(['powerMeter'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('powerSource', section => {
                section
                    .deviceSetting('powerSource')
                    .capabilities(['powerSource'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('presenceSensor', section => {
                section
                    .deviceSetting('presenceSensor')
                    .capabilities(['presenceSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('refrigeration', section => {
                section
                    .deviceSetting('refrigeration')
                    .capabilities(['refrigeration'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('relativeHumidityMeasurement', section => {
                section
                    .deviceSetting('relativeHumidityMeasurement')
                    .capabilities(['relativeHumidityMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('remoteControlStatus', section => {
                section
                    .deviceSetting('remoteControlStatus')
                    .capabilities(['remoteControlStatus'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('samsungTV', section => {
                section
                    .deviceSetting('samsungTV')
                    .capabilities(['samsungTV'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('securitySystem', section => {
                section
                    .deviceSetting('securitySystem')
                    .capabilities(['securitySystem'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('signalStrength', section => {
                section
                    .deviceSetting('signalStrength')
                    .capabilities(['signalStrength'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('sleepSensor', section => {
                section
                    .deviceSetting('sleepSensor')
                    .capabilities(['sleepSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('smokeDetector', section => {
                section
                    .deviceSetting('smokeDetector')
                    .capabilities(['smokeDetector'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('soundPressureLevel', section => {
                section
                    .deviceSetting('soundPressureLevel')
                    .capabilities(['soundPressureLevel'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('soundSensor', section => {
                section
                    .deviceSetting('soundSensor')
                    .capabilities(['soundSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('switchLevel', section => {
                section
                    .deviceSetting('switchLevel')
                    .capabilities(['switchLevel'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('switch', section => {
                section
                    .deviceSetting('switch')
                    .capabilities(['switch'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('tamperAlert', section => {
                section
                    .deviceSetting('tamperAlert')
                    .capabilities(['tamperAlert'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('temperatureAlarm', section => {
                section
                    .deviceSetting('temperatureAlarm')
                    .capabilities(['temperatureAlarm'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('temperatureMeasurement', section => {
                section
                    .deviceSetting('temperatureMeasurement')
                    .capabilities(['temperatureMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('thermostatCoolingSetpoint', section => {
                section
                    .deviceSetting('thermostatCoolingSetpoint')
                    .capabilities(['thermostatCoolingSetpoint'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('thermostatFanMode', section => {
                section
                    .deviceSetting('thermostatFanMode')
                    .capabilities(['thermostatFanMode'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('thermostatHeatingSetpoint', section => {
                section
                    .deviceSetting('thermostatHeatingSetpoint')
                    .capabilities(['thermostatHeatingSetpoint'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('thermostatMode', section => {
                section
                    .deviceSetting('thermostatMode')
                    .capabilities(['thermostatMode'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('thermostatOperatingState', section => {
                section
                    .deviceSetting('thermostatOperatingState')
                    .capabilities(['thermostatOperatingState'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('threeAxis', section => {
                section
                    .deviceSetting('threeAxis')
                    .capabilities(['threeAxis'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('tone', section => {
                section
                    .deviceSetting('tone')
                    .capabilities(['tone'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('tV', section => {
                section
                    .deviceSetting('tV')
                    .capabilities(['tV'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('tvocMeasurement', section => {
                section
                    .deviceSetting('tvocMeasurement')
                    .capabilities(['tvocMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('ultravioletIndex', section => {
                section
                    .deviceSetting('ultravioletIndex')
                    .capabilities(['ultravioletIndex'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('valve', section => {
                section
                    .deviceSetting('valve')
                    .capabilities(['valve'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('veryFineDustSensor', section => {
                section
                    .deviceSetting('veryFineDustSensor')
                    .capabilities(['veryFineDustSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('videoCamera', section => {
                section
                    .deviceSetting('videoCamera')
                    .capabilities(['videoCamera'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('videoCapture', section => {
                section
                    .deviceSetting('videoCapture')
                    .capabilities(['videoCapture'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('videoStream', section => {
                section
                    .deviceSetting('videoStream')
                    .capabilities(['videoStream'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('voltageMeasurement', section => {
                section
                    .deviceSetting('voltageMeasurement')
                    .capabilities(['voltageMeasurement'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('waterSensor', section => {
                section
                    .deviceSetting('waterSensor')
                    .capabilities(['waterSensor'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('windowShadePreset', section => {
                section
                    .deviceSetting('windowShadePreset')
                    .capabilities(['windowShadePreset'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            page.section('windowShade', section => {
                section
                    .deviceSetting('windowShade')
                    .capabilities(['windowShade'])
                    .name("Devices").permissions('rwx').multiple(true);
            });
            /*page.section('accelerationSensor', section => {
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
                    .multiple(true)
                    .required(true);
            });*/
        })
        // Called for both INSTALLED and UPDATED lifecycle events if there is no separate installed() handler
        .updated(async (context, updateData) => {
            console.log("Smartthings WebApp Installed/Updated:");
            console.log(updateData);
            await context.api.subscriptions.delete() // clear any existing configuration
            var i = 0;
            await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.airQualitySensor, 'airQualitySensor', 'airQuality', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.alarm, 'alarm', 'alarm', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.audioMute, 'audioMute', 'mute', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.audioStream, 'audioStream', 'uri', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.audioVolume, 'audioVolume', 'volume', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.bypassable, 'bypassable', 'bypassStatus', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.carbonDioxideMeasurement, 'carbonDioxideMeasurement', 'carbonDioxide', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.carbonMonoxideDetector, 'carbonMonoxideDetector', 'carbonMonoxide', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.colorControl, 'colorControl', 'color', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.colorControl, 'colorControl', 'hue', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.colorControl, 'colorControl', 'saturation', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.colorTemperature, 'colorTemperature', 'colorTemperature', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.dewPoint, 'dewPoint', 'dewpoint', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.doorControl, 'doorControl', 'door', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.dustSensor, 'dustSensor', 'dustLevel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.dustSensor, 'dustSensor', 'fineDustLevel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.energyMeter, 'energyMeter', 'energy', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.equivalentCarbonDioxideMeasurement, 'equivalentCarbonDioxideMeasurement', 'equivalentCarbonDioxideMeasurement', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.fanOscillationMode, 'fanOscillationMode', 'fanOscillationMode', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.fanSpeed, 'fanSpeed', 'fanSpeed', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.filterState, 'filterState', 'filterLifeRemaining', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.fineDustSensor, 'fineDustSensor', 'fineDustLevel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.formaldehydeMeasurement, 'formaldehydeMeasurement', 'formaldehydeLevel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.healthCheck, 'healthCheck', 'healthStatus', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.illuminanceMeasurement, 'illuminanceMeasurement', 'illuminance', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.imageCapture, 'imageCapture', 'image', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.infraredLevel, 'infraredLevel', 'infraredLevel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.locationMode, 'locationMode', 'mode', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.moldHealthConcern, 'moldHealthConcern', 'moldHealthConcern', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.networkMeter, 'networkMeter', 'downlinkSpeed', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.networkMeter, 'networkMeter', 'uplinkSpeed', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.objectDetection, 'objectDetection', 'detected', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.panicAlarm, 'panicAlarm', 'panicAlarm', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.pHMeasurement, 'pHMeasurement', 'pH', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.powerMeter, 'powerMeter', 'power', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.powerSource, 'powerSource', 'powerSource', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.refrigeration, 'refrigeration', 'defrost', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.refrigeration, 'refrigeration', 'rapidCooling', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.refrigeration, 'refrigeration', 'rapidFreezing', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.relativeHumidityMeasurement, 'relativeHumidityMeasurement', 'humidity', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.remoteControlStatus, 'remoteControlStatus', 'remoteControlEnabled', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'messageButton', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'mute', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'pictureMode', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'soundMode', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'switch', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'volume', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.securitySystem, 'securitySystem', 'alarm', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.securitySystem, 'securitySystem', 'securitySystemStatus', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.signalStrength, 'signalStrength', 'lqi', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.signalStrength, 'signalStrength', 'rssi', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.sleepSensor, 'sleepSensor', 'sleeping', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.smokeDetector, 'smokeDetector', 'smoke', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.soundPressureLevel, 'soundPressureLevel', 'soundPressureLevel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.soundSensor, 'soundSensor', 'sound', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.switchLevel, 'switchLevel', 'level', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.switch, 'switch', 'switch', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tamperAlert, 'tamperAlert', 'tamper', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.temperatureAlarm, 'temperatureAlarm', 'temperatureAlarm', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.temperatureMeasurement, 'temperatureMeasurement', 'temperature', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatCoolingSetpoint, 'thermostatCoolingSetpoint', 'coolingSetpoint', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatFanMode, 'thermostatFanMode', 'thermostatFanMode', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatHeatingSetpoint, 'thermostatHeatingSetpoint', 'heatingSetpoint', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatMode, 'thermostatMode', 'thermostatMode', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatOperatingState, 'thermostatOperatingState', 'thermostatOperatingState', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.threeAxis, 'threeAxis', 'threeAxis', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tone, 'tone', 'beep', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'channel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'movieMode', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'picture', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'power', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'sound', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'volume', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.tvocMeasurement, 'tvocMeasurement', 'tvocLevel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.ultravioletIndex, 'ultravioletIndex', 'ultravioletIndex', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.valve, 'valve', 'valve', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.veryFineDustSensor, 'veryFineDustSensor', 'veryFineDustLevel', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.videoCamera, 'videoCamera', 'camera', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.videoCamera, 'videoCamera', 'mute', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.videoCapture, 'videoCapture', 'clip', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.videoCapture, 'videoCapture', 'stream', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.videoStream, 'videoStream', 'stream', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.voltageMeasurement, 'voltageMeasurement', 'voltage', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.waterSensor, 'waterSensor', 'water', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.windowShadePreset, 'windowShadePreset', 'presetPosition', 'handler' + String(i++));
            await context.api.subscriptions.subscribeToDevices(context.config.windowShade, 'windowShade', 'windowShade', 'handler' + String(i++));
        })
        .contextStore(new NodeRedContextStore(RED));

    function SmartthingsConfigNode(config) {

        RED.nodes.createNode(this, config);

        console.log("SmartthingsConfigNode");
        console.log(config);

        var node = this;

        for(var i = 0; i < 93; i++){
            smartapp.subscribedEventHandler('handler' + String(i), async (context, event) => {
                console.log("Smartthings WebApp Event Received:");
                console.log(event);

                const callback = callbacks[event["deviceId"]];

                if(callback){
                    callback.forEach( (c) => {
                        c.callback.call(c.parent, event);
                    });
                }
            });
        }

        node.token = config.token;

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

    RED.httpAdmin.get('/smartthings/smartapp/locations', function(req,res){
      console.log("HTTP REQUEST: locations");
      smartapp.contextStore.listAll().then(async (apps) => {
        let ret = [];
        for(const installedAppId of apps){
          var params = await node.contextStore.get(installedAppId);
          console.log("Dados para a installedAppId("+installedAppId+"):");
          console.log(params);

          let st = new SmartThings.SmartThings(params.authToken);
          Axios.defaults.headers.common['Authorization'] = 'Bearer ' + params.authToken;

          var location = await st.locations.getLocationDetails(params.locationId);

          console.log("Dados do local:");
          console.log(location);

          ret.push({
              installedAppId: installedAppId,
              location: ""
          });
        };
        res.status(200).send(ret);
      }).catch(() => {
        res.status(500);
      });
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
