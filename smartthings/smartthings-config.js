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
                    .multiple(true);
            });
            page.section('airQualitySensor', section => {
                section
                    .deviceSetting('airQualitySensor')
                    .capabilities(['airQualitySensor'])
                    .multiple(true);
            });
            page.section('alarm', section => {
                section
                    .deviceSetting('alarm')
                    .capabilities(['alarm'])
                    .multiple(true);
            });
            page.section('audioMute', section => {
                section
                    .deviceSetting('audioMute')
                    .capabilities(['audioMute'])
                    .multiple(true);
            });
            page.section('audioNotification', section => {
                section
                    .deviceSetting('audioNotification')
                    .capabilities(['audioNotification'])
                    .multiple(true);
            });
            page.section('audioStream', section => {
                section
                    .deviceSetting('audioStream')
                    .capabilities(['audioStream'])
                    .multiple(true);
            });
            page.section('audioVolume', section => {
                section
                    .deviceSetting('audioVolume')
                    .capabilities(['audioVolume'])
                    .multiple(true);
            });
            page.section('battery', section => {
                section
                    .deviceSetting('battery')
                    .capabilities(['battery'])
                    .multiple(true);
            });
            page.section('button', section => {
                section
                    .deviceSetting('button')
                    .capabilities(['button'])
                    .multiple(true);
            });
            page.section('bypassable', section => {
                section
                    .deviceSetting('bypassable')
                    .capabilities(['bypassable'])
                    .multiple(true);
            });
            page.section('carbonDioxideMeasurement', section => {
                section
                    .deviceSetting('carbonDioxideMeasurement')
                    .capabilities(['carbonDioxideMeasurement'])
                    .multiple(true);
            });
            page.section('carbonMonoxideDetector', section => {
                section
                    .deviceSetting('carbonMonoxideDetector')
                    .capabilities(['carbonMonoxideDetector'])
                    .multiple(true);
            });
            page.section('colorControl', section => {
                section
                    .deviceSetting('colorControl')
                    .capabilities(['colorControl'])
                    .multiple(true);
            });
            page.section('colorTemperature', section => {
                section
                    .deviceSetting('colorTemperature')
                    .capabilities(['colorTemperature'])
                    .multiple(true);
            });
            page.section('contactSensor', section => {
                section
                    .deviceSetting('contactSensor')
                    .capabilities(['contactSensor'])
                    .multiple(true);
            });
            page.section('dewPoint', section => {
                section
                    .deviceSetting('dewPoint')
                    .capabilities(['dewPoint'])
                    .multiple(true);
            });
            page.section('doorControl', section => {
                section
                    .deviceSetting('doorControl')
                    .capabilities(['doorControl'])
                    .multiple(true);
            });
            page.section('dustSensor', section => {
                section
                    .deviceSetting('dustSensor')
                    .capabilities(['dustSensor'])
                    .multiple(true);
            });
            page.section('energyMeter', section => {
                section
                    .deviceSetting('energyMeter')
                    .capabilities(['energyMeter'])
                    .multiple(true);
            });
            page.section('equivalentCarbonDioxideMeasurement', section => {
                section
                    .deviceSetting('equivalentCarbonDioxideMeasurement')
                    .capabilities(['equivalentCarbonDioxideMeasurement'])
                    .multiple(true);
            });
            page.section('fanOscillationMode', section => {
                section
                    .deviceSetting('fanOscillationMode')
                    .capabilities(['fanOscillationMode'])
                    .multiple(true);
            });
            page.section('fanSpeed', section => {
                section
                    .deviceSetting('fanSpeed')
                    .capabilities(['fanSpeed'])
                    .multiple(true);
            });
            page.section('filterState', section => {
                section
                    .deviceSetting('filterState')
                    .capabilities(['filterState'])
                    .multiple(true);
            });
            page.section('fineDustSensor', section => {
                section
                    .deviceSetting('fineDustSensor')
                    .capabilities(['fineDustSensor'])
                    .multiple(true);
            });
            page.section('formaldehydeMeasurement', section => {
                section
                    .deviceSetting('formaldehydeMeasurement')
                    .capabilities(['formaldehydeMeasurement'])
                    .multiple(true);
            });
            page.section('healthCheck', section => {
                section
                    .deviceSetting('healthCheck')
                    .capabilities(['healthCheck'])
                    .multiple(true);
            });
            page.section('illuminanceMeasurement', section => {
                section
                    .deviceSetting('illuminanceMeasurement')
                    .capabilities(['illuminanceMeasurement'])
                    .multiple(true);
            });
            page.section('imageCapture', section => {
                section
                    .deviceSetting('imageCapture')
                    .capabilities(['imageCapture'])
                    .multiple(true);
            });
            page.section('infraredLevel', section => {
                section
                    .deviceSetting('infraredLevel')
                    .capabilities(['infraredLevel'])
                    .multiple(true);
            });
            page.section('locationMode', section => {
                section
                    .deviceSetting('locationMode')
                    .capabilities(['locationMode'])
                    .multiple(true);
            });
            page.section('lock', section => {
                section
                    .deviceSetting('lock')
                    .capabilities(['lock'])
                    .multiple(true);
            });
            page.section('motionSensor', section => {
                section
                    .deviceSetting('motionSensor')
                    .capabilities(['motionSensor'])
                    .multiple(true);
            });
            page.section('networkMeter', section => {
                section
                    .deviceSetting('networkMeter')
                    .capabilities(['networkMeter'])
                    .multiple(true);
            });
            page.section('notification', section => {
                section
                    .deviceSetting('notification')
                    .capabilities(['notification'])
                    .multiple(true);
            });
            page.section('objectDetection', section => {
                section
                    .deviceSetting('objectDetection')
                    .capabilities(['objectDetection'])
                    .multiple(true);
            });
            page.section('panicAlarm', section => {
                section
                    .deviceSetting('panicAlarm')
                    .capabilities(['panicAlarm'])
                    .multiple(true);
            });
            page.section('pHMeasurement', section => {
                section
                    .deviceSetting('pHMeasurement')
                    .capabilities(['pHMeasurement'])
                    .multiple(true);
            });
            page.section('powerMeter', section => {
                section
                    .deviceSetting('powerMeter')
                    .capabilities(['powerMeter'])
                    .multiple(true);
            });
            page.section('powerSource', section => {
                section
                    .deviceSetting('powerSource')
                    .capabilities(['powerSource'])
                    .multiple(true);
            });
            page.section('presenceSensor', section => {
                section
                    .deviceSetting('presenceSensor')
                    .capabilities(['presenceSensor'])
                    .multiple(true);
            });
            page.section('refrigeration', section => {
                section
                    .deviceSetting('refrigeration')
                    .capabilities(['refrigeration'])
                    .multiple(true);
            });
            page.section('relativeHumidityMeasurement', section => {
                section
                    .deviceSetting('relativeHumidityMeasurement')
                    .capabilities(['relativeHumidityMeasurement'])
                    .multiple(true);
            });
            page.section('remoteControlStatus', section => {
                section
                    .deviceSetting('remoteControlStatus')
                    .capabilities(['remoteControlStatus'])
                    .multiple(true);
            });
            page.section('samsungTV', section => {
                section
                    .deviceSetting('samsungTV')
                    .capabilities(['samsungTV'])
                    .multiple(true);
            });
            page.section('securitySystem', section => {
                section
                    .deviceSetting('securitySystem')
                    .capabilities(['securitySystem'])
                    .multiple(true);
            });
            page.section('signalStrength', section => {
                section
                    .deviceSetting('signalStrength')
                    .capabilities(['signalStrength'])
                    .multiple(true);
            });
            page.section('sleepSensor', section => {
                section
                    .deviceSetting('sleepSensor')
                    .capabilities(['sleepSensor'])
                    .multiple(true);
            });
            page.section('smokeDetector', section => {
                section
                    .deviceSetting('smokeDetector')
                    .capabilities(['smokeDetector'])
                    .multiple(true);
            });
            page.section('soundPressureLevel', section => {
                section
                    .deviceSetting('soundPressureLevel')
                    .capabilities(['soundPressureLevel'])
                    .multiple(true);
            });
            page.section('soundSensor', section => {
                section
                    .deviceSetting('soundSensor')
                    .capabilities(['soundSensor'])
                    .multiple(true);
            });
            page.section('switchLevel', section => {
                section
                    .deviceSetting('switchLevel')
                    .capabilities(['switchLevel'])
                    .multiple(true);
            });
            page.section('switch', section => {
                section
                    .deviceSetting('switch')
                    .capabilities(['switch'])
                    .multiple(true);
            });
            page.section('tamperAlert', section => {
                section
                    .deviceSetting('tamperAlert')
                    .capabilities(['tamperAlert'])
                    .multiple(true);
            });
            page.section('temperatureAlarm', section => {
                section
                    .deviceSetting('temperatureAlarm')
                    .capabilities(['temperatureAlarm'])
                    .multiple(true);
            });
            page.section('temperatureMeasurement', section => {
                section
                    .deviceSetting('temperatureMeasurement')
                    .capabilities(['temperatureMeasurement'])
                    .multiple(true);
            });
            page.section('thermostatCoolingSetpoint', section => {
                section
                    .deviceSetting('thermostatCoolingSetpoint')
                    .capabilities(['thermostatCoolingSetpoint'])
                    .multiple(true);
            });
            page.section('thermostatFanMode', section => {
                section
                    .deviceSetting('thermostatFanMode')
                    .capabilities(['thermostatFanMode'])
                    .multiple(true);
            });
            page.section('thermostatHeatingSetpoint', section => {
                section
                    .deviceSetting('thermostatHeatingSetpoint')
                    .capabilities(['thermostatHeatingSetpoint'])
                    .multiple(true);
            });
            page.section('thermostatMode', section => {
                section
                    .deviceSetting('thermostatMode')
                    .capabilities(['thermostatMode'])
                    .multiple(true);
            });
            page.section('thermostatOperatingState', section => {
                section
                    .deviceSetting('thermostatOperatingState')
                    .capabilities(['thermostatOperatingState'])
                    .multiple(true);
            });
            page.section('threeAxis', section => {
                section
                    .deviceSetting('threeAxis')
                    .capabilities(['threeAxis'])
                    .multiple(true);
            });
            page.section('tone', section => {
                section
                    .deviceSetting('tone')
                    .capabilities(['tone'])
                    .multiple(true);
            });
            page.section('tV', section => {
                section
                    .deviceSetting('tV')
                    .capabilities(['tV'])
                    .multiple(true);
            });
            page.section('tvocMeasurement', section => {
                section
                    .deviceSetting('tvocMeasurement')
                    .capabilities(['tvocMeasurement'])
                    .multiple(true);
            });
            page.section('ultravioletIndex', section => {
                section
                    .deviceSetting('ultravioletIndex')
                    .capabilities(['ultravioletIndex'])
                    .multiple(true);
            });
            page.section('valve', section => {
                section
                    .deviceSetting('valve')
                    .capabilities(['valve'])
                    .multiple(true);
            });
            page.section('veryFineDustSensor', section => {
                section
                    .deviceSetting('veryFineDustSensor')
                    .capabilities(['veryFineDustSensor'])
                    .multiple(true);
            });
            page.section('videoCamera', section => {
                section
                    .deviceSetting('videoCamera')
                    .capabilities(['videoCamera'])
                    .multiple(true);
            });
            page.section('videoCapture', section => {
                section
                    .deviceSetting('videoCapture')
                    .capabilities(['videoCapture'])
                    .multiple(true);
            });
            page.section('videoStream', section => {
                section
                    .deviceSetting('videoStream')
                    .capabilities(['videoStream'])
                    .multiple(true);
            });
            page.section('voltageMeasurement', section => {
                section
                    .deviceSetting('voltageMeasurement')
                    .capabilities(['voltageMeasurement'])
                    .multiple(true);
            });
            page.section('waterSensor', section => {
                section
                    .deviceSetting('waterSensor')
                    .capabilities(['waterSensor'])
                    .multiple(true);
            });
            page.section('windowShadePreset', section => {
                section
                    .deviceSetting('windowShadePreset')
                    .capabilities(['windowShadePreset'])
                    .multiple(true);
            });
            page.section('windowShade', section => {
                section
                    .deviceSetting('windowShade')
                    .capabilities(['windowShade'])
                    .multiple(true);
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
