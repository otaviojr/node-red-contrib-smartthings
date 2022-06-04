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
            page.section('accelerationSensor', section => {
                section
                    .deviceSetting('accelerationSensor')
                    .capabilities(['accelerationSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('airQualitySensor', section => {
                section
                    .deviceSetting('airQualitySensor')
                    .capabilities(['airQualitySensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('alarm', section => {
                section
                    .deviceSetting('alarm')
                    .capabilities(['alarm'])
                    .permissions('rwx').multiple(true);
            });
            page.section('audioMute', section => {
                section
                    .deviceSetting('audioMute')
                    .capabilities(['audioMute'])
                    .permissions('rwx').multiple(true);
            });
            page.section('audioNotification', section => {
                section
                    .deviceSetting('audioNotification')
                    .capabilities(['audioNotification'])
                    .permissions('rwx').multiple(true);
            });
            page.section('audioStream', section => {
                section
                    .deviceSetting('audioStream')
                    .capabilities(['audioStream'])
                    .permissions('rwx').multiple(true);
            });
            page.section('audioVolume', section => {
                section
                    .deviceSetting('audioVolume')
                    .capabilities(['audioVolume'])
                    .permissions('rwx').multiple(true);
            });
            page.section('battery', section => {
                section
                    .deviceSetting('battery')
                    .capabilities(['battery'])
                    .permissions('rwx').multiple(true);
            });
            page.section('button', section => {
                section
                    .deviceSetting('button')
                    .capabilities(['button'])
                    .permissions('rwx').multiple(true);
            });
            page.section('bypassable', section => {
                section
                    .deviceSetting('bypassable')
                    .capabilities(['bypassable'])
                    .permissions('rwx').multiple(true);
            });
            page.section('carbonDioxideMeasurement', section => {
                section
                    .deviceSetting('carbonDioxideMeasurement')
                    .capabilities(['carbonDioxideMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('carbonMonoxideDetector', section => {
                section
                    .deviceSetting('carbonMonoxideDetector')
                    .capabilities(['carbonMonoxideDetector'])
                    .permissions('rwx').multiple(true);
            });
            page.section('colorControl', section => {
                section
                    .deviceSetting('colorControl')
                    .capabilities(['colorControl'])
                    .permissions('rwx').multiple(true);
            });
            page.section('colorTemperature', section => {
                section
                    .deviceSetting('colorTemperature')
                    .capabilities(['colorTemperature'])
                    .permissions('rwx').multiple(true);
            });
            page.section('contactSensor', section => {
                section
                    .deviceSetting('contactSensor')
                    .capabilities(['contactSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('dewPoint', section => {
                section
                    .deviceSetting('dewPoint')
                    .capabilities(['dewPoint'])
                    .permissions('rwx').multiple(true);
            });
            page.section('doorControl', section => {
                section
                    .deviceSetting('doorControl')
                    .capabilities(['doorControl'])
                    .permissions('rwx').multiple(true);
            });
            page.section('dustSensor', section => {
                section
                    .deviceSetting('dustSensor')
                    .capabilities(['dustSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('energyMeter', section => {
                section
                    .deviceSetting('energyMeter')
                    .capabilities(['energyMeter'])
                    .permissions('rwx').multiple(true);
            });
            page.section('equivalentCarbonDioxideMeasurement', section => {
                section
                    .deviceSetting('equivalentCarbonDioxideMeasurement')
                    .capabilities(['equivalentCarbonDioxideMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('fanOscillationMode', section => {
                section
                    .deviceSetting('fanOscillationMode')
                    .capabilities(['fanOscillationMode'])
                    .permissions('rwx').multiple(true);
            });
            page.section('fanSpeed', section => {
                section
                    .deviceSetting('fanSpeed')
                    .capabilities(['fanSpeed'])
                    .permissions('rwx').multiple(true);
            });
            page.section('filterState', section => {
                section
                    .deviceSetting('filterState')
                    .capabilities(['filterState'])
                    .permissions('rwx').multiple(true);
            });
            page.section('fineDustSensor', section => {
                section
                    .deviceSetting('fineDustSensor')
                    .capabilities(['fineDustSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('formaldehydeMeasurement', section => {
                section
                    .deviceSetting('formaldehydeMeasurement')
                    .capabilities(['formaldehydeMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('healthCheck', section => {
                section
                    .deviceSetting('healthCheck')
                    .capabilities(['healthCheck'])
                    .permissions('rwx').multiple(true);
            });
            page.section('illuminanceMeasurement', section => {
                section
                    .deviceSetting('illuminanceMeasurement')
                    .capabilities(['illuminanceMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('imageCapture', section => {
                section
                    .deviceSetting('imageCapture')
                    .capabilities(['imageCapture'])
                    .permissions('rwx').multiple(true);
            });
            page.section('infraredLevel', section => {
                section
                    .deviceSetting('infraredLevel')
                    .capabilities(['infraredLevel'])
                    .permissions('rwx').multiple(true);
            });
            page.section('locationMode', section => {
                section
                    .deviceSetting('locationMode')
                    .capabilities(['locationMode'])
                    .permissions('rwx').multiple(true);
            });
            page.section('lock', section => {
                section
                    .deviceSetting('lock')
                    .capabilities(['lock'])
                    .permissions('rwx').multiple(true);
            });
            page.section('motionSensor', section => {
                section
                    .deviceSetting('motionSensor')
                    .capabilities(['motionSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('networkMeter', section => {
                section
                    .deviceSetting('networkMeter')
                    .capabilities(['networkMeter'])
                    .permissions('rwx').multiple(true);
            });
            page.section('notification', section => {
                section
                    .deviceSetting('notification')
                    .capabilities(['notification'])
                    .permissions('rwx').multiple(true);
            });
            page.section('objectDetection', section => {
                section
                    .deviceSetting('objectDetection')
                    .capabilities(['objectDetection'])
                    .permissions('rwx').multiple(true);
            });
            page.section('panicAlarm', section => {
                section
                    .deviceSetting('panicAlarm')
                    .capabilities(['panicAlarm'])
                    .permissions('rwx').multiple(true);
            });
            page.section('pHMeasurement', section => {
                section
                    .deviceSetting('pHMeasurement')
                    .capabilities(['pHMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('powerMeter', section => {
                section
                    .deviceSetting('powerMeter')
                    .capabilities(['powerMeter'])
                    .permissions('rwx').multiple(true);
            });
            page.section('powerSource', section => {
                section
                    .deviceSetting('powerSource')
                    .capabilities(['powerSource'])
                    .permissions('rwx').multiple(true);
            });
            page.section('presenceSensor', section => {
                section
                    .deviceSetting('presenceSensor')
                    .capabilities(['presenceSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('refrigeration', section => {
                section
                    .deviceSetting('refrigeration')
                    .capabilities(['refrigeration'])
                    .permissions('rwx').multiple(true);
            });
            page.section('relativeHumidityMeasurement', section => {
                section
                    .deviceSetting('relativeHumidityMeasurement')
                    .capabilities(['relativeHumidityMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('remoteControlStatus', section => {
                section
                    .deviceSetting('remoteControlStatus')
                    .capabilities(['remoteControlStatus'])
                    .permissions('rwx').multiple(true);
            });
            page.section('samsungTV', section => {
                section
                    .deviceSetting('samsungTV')
                    .capabilities(['samsungTV'])
                    .permissions('rwx').multiple(true);
            });
            page.section('securitySystem', section => {
                section
                    .deviceSetting('securitySystem')
                    .capabilities(['securitySystem'])
                    .permissions('rwx').multiple(true);
            });
            page.section('signalStrength', section => {
                section
                    .deviceSetting('signalStrength')
                    .capabilities(['signalStrength'])
                    .permissions('rwx').multiple(true);
            });
            page.section('sleepSensor', section => {
                section
                    .deviceSetting('sleepSensor')
                    .capabilities(['sleepSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('smokeDetector', section => {
                section
                    .deviceSetting('smokeDetector')
                    .capabilities(['smokeDetector'])
                    .permissions('rwx').multiple(true);
            });
            page.section('soundPressureLevel', section => {
                section
                    .deviceSetting('soundPressureLevel')
                    .capabilities(['soundPressureLevel'])
                    .permissions('rwx').multiple(true);
            });
            page.section('soundSensor', section => {
                section
                    .deviceSetting('soundSensor')
                    .capabilities(['soundSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('switchLevel', section => {
                section
                    .deviceSetting('switchLevel')
                    .capabilities(['switchLevel'])
                    .permissions('rwx').multiple(true);
            });
            page.section('switch', section => {
                section
                    .deviceSetting('switch')
                    .capabilities(['switch'])
                    .permissions('rwx').multiple(true);
            });
            page.section('tamperAlert', section => {
                section
                    .deviceSetting('tamperAlert')
                    .capabilities(['tamperAlert'])
                    .permissions('rwx').multiple(true);
            });
            page.section('temperatureAlarm', section => {
                section
                    .deviceSetting('temperatureAlarm')
                    .capabilities(['temperatureAlarm'])
                    .permissions('rwx').multiple(true);
            });
            page.section('temperatureMeasurement', section => {
                section
                    .deviceSetting('temperatureMeasurement')
                    .capabilities(['temperatureMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('thermostatCoolingSetpoint', section => {
                section
                    .deviceSetting('thermostatCoolingSetpoint')
                    .capabilities(['thermostatCoolingSetpoint'])
                    .permissions('rwx').multiple(true);
            });
            page.section('thermostatFanMode', section => {
                section
                    .deviceSetting('thermostatFanMode')
                    .capabilities(['thermostatFanMode'])
                    .permissions('rwx').multiple(true);
            });
            page.section('thermostatHeatingSetpoint', section => {
                section
                    .deviceSetting('thermostatHeatingSetpoint')
                    .capabilities(['thermostatHeatingSetpoint'])
                    .permissions('rwx').multiple(true);
            });
            page.section('thermostatMode', section => {
                section
                    .deviceSetting('thermostatMode')
                    .capabilities(['thermostatMode'])
                    .permissions('rwx').multiple(true);
            });
            page.section('thermostatOperatingState', section => {
                section
                    .deviceSetting('thermostatOperatingState')
                    .capabilities(['thermostatOperatingState'])
                    .permissions('rwx').multiple(true);
            });
            page.section('threeAxis', section => {
                section
                    .deviceSetting('threeAxis')
                    .capabilities(['threeAxis'])
                    .permissions('rwx').multiple(true);
            });
            page.section('tone', section => {
                section
                    .deviceSetting('tone')
                    .capabilities(['tone'])
                    .permissions('rwx').multiple(true);
            });
            page.section('tV', section => {
                section
                    .deviceSetting('tV')
                    .capabilities(['tV'])
                    .permissions('rwx').multiple(true);
            });
            page.section('tvocMeasurement', section => {
                section
                    .deviceSetting('tvocMeasurement')
                    .capabilities(['tvocMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('ultravioletIndex', section => {
                section
                    .deviceSetting('ultravioletIndex')
                    .capabilities(['ultravioletIndex'])
                    .permissions('rwx').multiple(true);
            });
            page.section('valve', section => {
                section
                    .deviceSetting('valve')
                    .capabilities(['valve'])
                    .permissions('rwx').multiple(true);
            });
            page.section('veryFineDustSensor', section => {
                section
                    .deviceSetting('veryFineDustSensor')
                    .capabilities(['veryFineDustSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('videoCamera', section => {
                section
                    .deviceSetting('videoCamera')
                    .capabilities(['videoCamera'])
                    .permissions('rwx').multiple(true);
            });
            page.section('videoCapture', section => {
                section
                    .deviceSetting('videoCapture')
                    .capabilities(['videoCapture'])
                    .permissions('rwx').multiple(true);
            });
            page.section('videoStream', section => {
                section
                    .deviceSetting('videoStream')
                    .capabilities(['videoStream'])
                    .permissions('rwx').multiple(true);
            });
            page.section('voltageMeasurement', section => {
                section
                    .deviceSetting('voltageMeasurement')
                    .capabilities(['voltageMeasurement'])
                    .permissions('rwx').multiple(true);
            });
            page.section('waterSensor', section => {
                section
                    .deviceSetting('waterSensor')
                    .capabilities(['waterSensor'])
                    .permissions('rwx').multiple(true);
            });
            page.section('windowShadePreset', section => {
                section
                    .deviceSetting('windowShadePreset')
                    .capabilities(['windowShadePreset'])
                    .permissions('rwx').multiple(true);
            });
            page.section('windowShade', section => {
                section
                    .deviceSetting('windowShade')
                    .capabilities(['windowShade'])
                    .permissions('rwx').multiple(true);
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
            console.log(event);
            await context.api.subscriptions.delete() // clear any existing configuration
            await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.airQualitySensor, 'airQualitySensor', 'airQuality', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.alarm, 'alarm', 'alarm', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.audioMute, 'audioMute', 'mute', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.audioStream, 'audioStream', 'uri', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.audioVolume, 'audioVolume', 'volume', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.button, 'button', 'button', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.bypassable, 'bypassable', 'bypassStatus', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.carbonDioxideMeasurement, 'carbonDioxideMeasurement', 'carbonDioxide', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.carbonMonoxideDetector, 'carbonMonoxideDetector', 'carbonMonoxide', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.colorControl, 'colorControl', 'color', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.colorControl, 'colorControl', 'hue', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.colorControl, 'colorControl', 'saturation', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.colorTemperature, 'colorTemperature', 'colorTemperature', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.dewPoint, 'dewPoint', 'dewpoint', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.doorControl, 'doorControl', 'door', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.dustSensor, 'dustSensor', 'dustLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.dustSensor, 'dustSensor', 'fineDustLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.energyMeter, 'energyMeter', 'energy', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.equivalentCarbonDioxideMeasurement, 'equivalentCarbonDioxideMeasurement', 'equivalentCarbonDioxideMeasurement', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.fanOscillationMode, 'fanOscillationMode', 'fanOscillationMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.fanSpeed, 'fanSpeed', 'fanSpeed', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.filterState, 'filterState', 'filterLifeRemaining', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.fineDustSensor, 'fineDustSensor', 'fineDustLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.formaldehydeMeasurement, 'formaldehydeMeasurement', 'formaldehydeLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.healthCheck, 'healthCheck', 'healthStatus', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.illuminanceMeasurement, 'illuminanceMeasurement', 'illuminance', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.imageCapture, 'imageCapture', 'image', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.infraredLevel, 'infraredLevel', 'infraredLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.locationMode, 'locationMode', 'mode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.lock, 'lock', 'lock', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.moldHealthConcern, 'moldHealthConcern', 'moldHealthConcern', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.networkMeter, 'networkMeter', 'downlinkSpeed', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.networkMeter, 'networkMeter', 'uplinkSpeed', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.objectDetection, 'objectDetection', 'detected', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.panicAlarm, 'panicAlarm', 'panicAlarm', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.pHMeasurement, 'pHMeasurement', 'pH', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.powerMeter, 'powerMeter', 'power', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.powerSource, 'powerSource', 'powerSource', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.refrigeration, 'refrigeration', 'defrost', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.refrigeration, 'refrigeration', 'rapidCooling', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.refrigeration, 'refrigeration', 'rapidFreezing', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.relativeHumidityMeasurement, 'relativeHumidityMeasurement', 'humidity', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.remoteControlStatus, 'remoteControlStatus', 'remoteControlEnabled', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'messageButton', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'mute', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'pictureMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'soundMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'switch', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.samsungTV, 'samsungTV', 'volume', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.securitySystem, 'securitySystem', 'alarm', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.securitySystem, 'securitySystem', 'securitySystemStatus', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.signalStrength, 'signalStrength', 'lqi', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.signalStrength, 'signalStrength', 'rssi', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.sleepSensor, 'sleepSensor', 'sleeping', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.smokeDetector, 'smokeDetector', 'smoke', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.soundPressureLevel, 'soundPressureLevel', 'soundPressureLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.soundSensor, 'soundSensor', 'sound', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.switchLevel, 'switchLevel', 'level', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.switch, 'switch', 'switch', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tamperAlert, 'tamperAlert', 'tamper', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.temperatureAlarm, 'temperatureAlarm', 'temperatureAlarm', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.temperatureMeasurement, 'temperatureMeasurement', 'temperature', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatCoolingSetpoint, 'thermostatCoolingSetpoint', 'coolingSetpoint', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatFanMode, 'thermostatFanMode', 'thermostatFanMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatHeatingSetpoint, 'thermostatHeatingSetpoint', 'heatingSetpoint', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatMode, 'thermostatMode', 'thermostatMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.thermostatOperatingState, 'thermostatOperatingState', 'thermostatOperatingState', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.threeAxis, 'threeAxis', 'threeAxis', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tone, 'tone', 'beep', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'channel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'movieMode', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'picture', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'power', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'sound', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tV, 'tV', 'volume', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.tvocMeasurement, 'tvocMeasurement', 'tvocLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.ultravioletIndex, 'ultravioletIndex', 'ultravioletIndex', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.valve, 'valve', 'valve', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.veryFineDustSensor, 'veryFineDustSensor', 'veryFineDustLevel', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.videoCamera, 'videoCamera', 'camera', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.videoCamera, 'videoCamera', 'mute', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.videoCapture, 'videoCapture', 'clip', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.videoCapture, 'videoCapture', 'stream', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.videoStream, 'videoStream', 'stream', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.voltageMeasurement, 'voltageMeasurement', 'voltage', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.waterSensor, 'waterSensor', 'water', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.windowShadePreset, 'windowShadePreset', 'presetPosition', 'myDeviceEventHandler');
            await context.api.subscriptions.subscribeToDevices(context.config.windowShade, 'windowShade', 'windowShade', 'myDeviceEventHandler');
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
