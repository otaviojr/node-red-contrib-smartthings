/**
 * NodeRed - SmartThings webhooks
 *
 *  Author: Otávio Ribeiro <otavio.ribeiro@gmail.com>
 *  URL: https://github.com/otaviojr/node-red-contrib-smartthings
 */

definition(
    name: "NodeRed WebHook",
    author: "Otávio Ribeiro <otavio.ribeiro@gmail.com>",
    description: "Send Smartthings events to a NodeRed webhook",
    category: "My Apps",
    iconUrl: "https://s3.amazonaws.com/kinlane-productions/bw-icons/webhooks.png",
    iconX2Url: "https://s3.amazonaws.com/kinlane-productions/bw-icons/webhooks.png"
)

preferences {
    section("Webhook URL"){
		input "url", "text", title: "Webhook URL", description: "Your webhook URL", required: true
		input "local", "bool", title: "Local Network", description: "Local Network Call", required: true
	}

	section("Choose what events you want to trigger"){
		input "accelerationSensor", "capability.accelerationSensor", title: "Acceleration Sensor", required: false, multiple: true
		input "alarm", "capability.alarm", title: "Alarm", required: false, multiple: true
		input "battery", "capability.battery", title: "Battery", required: false, multiple: true
		input "beacon", "capability.beacon", title: "Beacon", required: false, multiple: true
		input "button", "capability.button", title: "Button", required: false, multiple: true
		input "carbonMonoxideDetector", "capability.carbonMonoxideDetector", title: "Carbon Monoxide Detector", required: false, multiple: true
		input "colorControl", "capability.colorControl", title: "Color Control", required: false, multiple: true
		input "contactSensor", "capability.contactSensor", title: "Contact Sensor", required: false, multiple: true
		input "doorControl", "capability.doorControl", title: "Door Control", required: false, multiple: true
		input "energyMeter", "capability.energyMeter", title: "Energy Meter", required: false, multiple: true
		input "illuminanceMeasurement", "capability.illuminanceMeasurement", title: "Illuminance Measurement", required: false, multiple: true
		input "imageCapture", "capability.imageCapture", title: "Image Capture", required: false, multiple: true
		input "indicator", "capability.indicator", title: "Indicator", required: false, multiple: true
		input "lock", "capability.lock", title: "Lock", required: false, multiple: true
		input "mediaController", "capability.mediaController", title: "Media Controller", required: false, multiple: true
		input "motionSensor", "capability.motionSensor", title: "Motion Sensor", required: false, multiple: true
		input "musicPlayer", "capability.musicPlayer", title: "Music Player", required: false, multiple: true
		input "powerMeter", "capability.powerMeter", title: "Power Meter", required: false, multiple: true
		input "presenceSensor", "capability.presenceSensor", title: "Presence Sensor", required: false, multiple: true
		input "relativeHumidityMeasurement", "capability.relativeHumidityMeasurement", title: "Relative Humidity Measurement", required: false, multiple: true
		input "relaySwitch", "capability.relaySwitch", title: "Relay Switch", required: false, multiple: true
		input "sensor", "capability.sensor", title: "Sensor", required: false, multiple: true
		input "signalStrength", "capability.signalStrength", title: "Signal Strength", required: false, multiple: true
		input "sleepSensor", "capability.sleepSensor", title: "Sleep Sensor", required: false, multiple: true
		input "smokeDetector", "capability.smokeDetector", title: "Smoke Detector", required: false, multiple: true
		input "speechRecognition", "capability.speechRecognition", title: "Speech Recognition", required: false, multiple: true
		input "stepSensor", "capability.stepSensor", title: "Step Sensor", required: false, multiple: true
		input "switchv", "capability.switch", title: "Switch", required: false, multiple: true
		input "switchLevel", "capability.switchLevel", title: "Switch Level", required: false, multiple: true
		input "temperatureMeasurement", "capability.temperatureMeasurement", title: "Temperature Measurement", required: false, multiple: true

		input "thermostat", "capability.thermostat", title: "Thermostat", required: false, multiple: true
		input "thermostatCoolingSetpoint", "capability.thermostatCoolingSetpoint", title: "Thermostat Cooling Setpoint", required: false, multiple: true
        input "thermostatFanMode", "capability.thermostatFanMode", title: "Thermostat Fan Mode", required: false, multiple: true
        input "thermostatHeatingSetpoint", "capability.thermostatHeatingSetpoint", title: "Thermostat Heating Setpoint", required: false, multiple: true
        input "thermostatMode", "capability.thermostatMode", title: "Thermostat Mode", required: false, multiple: true
        input "thermostatOperatingState", "capability.thermostatOperatingState", title: "Thermostat Operating State", required: false, multiple: true

		input "threeAxis", "capability.threeAxis", title: "Three Axis", required: false, multiple: true
		input "touchSensor", "capability.touchSensor", title: "TouchSensor", required: false, multiple: true
		input "valve", "capability.valve", title: "Valve", required: false, multiple: true
		input "waterSensor", "capability.waterSensor", title: "Water Sensor", required: false, multiple: true
	}
}

def installed() {
	subscribeToEvents()
    initialize()
}

def updated() {
	unsubscribe()
	subscribeToEvents()
    initialize()
}

def initialize() {
	subscribe(app, eventHandler)
}

def subscribeToEvents() {
	subscribe(accelerationSensor, "acceleration ", eventHandler)
	subscribe(alarm, "alarm", eventHandler)
	subscribe(battery, "battery", eventHandler)
	subscribe(beacon, "presence", eventHandler)
	subscribe(button, "button", eventHandler)
	subscribe(carbonMonoxideDetector, "carbonMonoxide", eventHandler)
	subscribe(colorControl, "hue", eventHandler)
    subscribe(colorControl, "saturation", eventHandler)
	subscribe(contactSensor, "contact", eventHandler)
	subscribe(doorControl, "door", eventHandler)
	subscribe(energyMeter, "energy", eventHandler)
	subscribe(illuminanceMeasurement, "illuminance", eventHandler)
	subscribe(imageCapture, "image", eventHandler)
	subscribe(indicator, "indicatorStatus", eventHandler)
	subscribe(lock, "lock", eventHandler)
	subscribe(mediaController, "activities", eventHandler)
   	subscribe(mediaController, "currentActivity", eventHandler)
	subscribe(motionSensor, "motion", eventHandler)
	subscribe(musicPlayer, "status", eventHandler)
	subscribe(musicPlayer, "level", eventHandler)
	subscribe(musicPlayer, "trackDescription", eventHandler)
	subscribe(musicPlayer, "trackData", eventHandler)
	subscribe(musicPlayer, "mute", eventHandler)
	subscribe(powerMeter, "power", eventHandler)
	subscribe(presenceSensor, "presence", eventHandler)
	subscribe(relativeHumidityMeasurement, "humidity", eventHandler)
	subscribe(relaySwitch, "switch", eventHandler)
	subscribe(sensor, "sensor", eventHandler)
	subscribe(signalStrength, "lqi", eventHandler)
	subscribe(signalStrength, "rssi", eventHandler)
	subscribe(sleepSensor, "sleeping", eventHandler)
	subscribe(smokeDetector, "smoke", eventHandler)
	subscribe(speechRecognition, "phraseSpoken", eventHandler)
	subscribe(stepSensor, "goals", eventHandler)
	subscribe(stepSensor, "steps", eventHandler)
	subscribe(switchv, "switch", eventHandler)
	subscribe(switchLevel, "level", eventHandler)
	subscribe(temperatureMeasurement, "temperature", eventHandler)
	subscribe(thermostat, "temperature", eventHandler)
	subscribe(thermostat, "heatingSetpoint", eventHandler)
	subscribe(thermostat, "coolingSetpoint", eventHandler)
	subscribe(thermostat, "thermostatSetpoint", eventHandler)
	subscribe(thermostat, "thermostatMode", eventHandler)
	subscribe(thermostat, "thermostatFanMode", eventHandler)
	subscribe(thermostat, "thermostatOperatingState", eventHandler)

    subscribe(thermostatHeatingSetpoint, "heatingSetpoint", eventHandler)
	subscribe(thermostatCoolingSetpoint, "coolingSetpoint", eventHandler)
	subscribe(thermostatMode, "thermostatMode", eventHandler)
	subscribe(thermostatFanMode, "thermostatFanMode", eventHandler)
	subscribe(thermostatOperatingState, "thermostatOperatingState", eventHandler)

	subscribe(threeAxis, "threeAxis", eventHandler)
	subscribe(touchSensor, "touch", eventHandler)
	subscribe(valve, "contact", eventHandler)
	subscribe(waterSensor, "water", eventHandler)
}

def doRemotePost(body) {
	log.debug("Remote Post");
	def json_params = [
  		uri: settings.url,
  		success: successClosure,
	  	body: body
	]

	httpPostJson(json_params);
}

def doLocalPost(body) {
	log.debug("Local POST fallback");
	URI dbUri = new URI(settings.url);

	def host = convertIPtoHex(dbUri?.getHost());
	def port = convertPortToHex( (dbUri?.getPort() < 0 ? 80 : dbUri?.getPort()));
	def path = dbUri?.getPath();

    log.debug(host);
    log.debug(port);
    log.debug(path)

	def result = new physicalgraph.device.HubAction(
    	method: "POST",
    	path: path,
    	headers: [
        	HOST: "$host:$port"
    	],
    	body: body
	);
    sendHubCommand(result);
}

def eventHandler(evt) {
    def state_changed = evt.isStateChange();
	def json_body = [
            id: evt.deviceId,
			date: evt.isoDate,
        	value: evt.value,
            name: evt.name,
            display_name: evt.displayName,
            description: evt.descriptionText,
            source: evt.source,
            state_changed: evt.isStateChange(),
            physical: evt.isPhysical(),
            location_id: evt.locationId,
            hub_id: evt.hubId,
            smartapp_id: evt.installedSmartAppId
        ];

    if(evt.name == "button"){
        json_body["button"] = evt.jsonData.buttonNumber;
    }

    try {
    	if(settings.local == false){
			doRemotePost(json_body);
        } else {
        	doLocalPost(json_body);
        }
	} catch (e) {
    	log.error "http post failed: $e"
      	log.debug("Trying local:");
	}
}

def successClosure = { response ->
  log.debug "Request was successful, $response"
}

private String convertIPtoHex(ipAddress) {
	try {
		ipAddress.tokenize( '.' ).collect {  String.format( '%02X', it.toInteger() ) }.join()
    } catch(e){
    	return ipAddress;
    }
}

private String convertPortToHex(port) {
	port.toString().format( '%04X', port.toInteger() )
}
