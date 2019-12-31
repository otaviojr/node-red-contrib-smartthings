var Promise = require('promise');

module.exports = function(RED) {

    /**
        hsl/rgb functions reference:
        https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
     */

    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 100] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */
    function hslToRgb(h, s, l) {
        h/=100;s/=100;l/=100;
        let r, g, b;

        if(s == 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
    }

    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 100].
     *
     * @param   {number}  r       The red color value
     * @param   {number}  g       The green color value
     * @param   {number}  b       The blue color value
     * @return  {Array}           The HSL representation
     */
    function rgbToHsl(r, g, b){
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [Math.round(h*100), Math.round(s*100), Math.round(l*100)];
    }

    function SmartthingsColorNode(config) {
        RED.nodes.createNode(this, config);

        console.debug("SmartthingsColorNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;
        this.device = config.device;

        this.state = {
            value: 0,
            level: 0,
            levelUnit: "",
            color: [0, 0, 0],
            hue: 0,
            saturation: 0,
            temperature: 0,
            temperatureUnit: "",
            unsingColor: true
        };

        this.reportState = function(original) {
            let msg = [{
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "switch",
                    name: this.name,
                    value: this.state.value
                }
            },{
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "level",
                    name: this.name,
                    value: this.state.level,
                    unit: this.state.levelUnit
                }
            },{
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "color",
                    name: this.name,
                    value: this.state.color
                }
            },{
                topic: "device",
                payload: {
                    deviceId: this.device,
                    deviceType: "temperature",
                    name: this.name,
                    value: this.state.temperature,
                    unit: this.state.temperatureUnit
                }
            }];

            if(original !== undefined){
              msg.forEach( (m) => {
                Object.assign(m,original);
              });
            }

            this.send(msg);
        };

        this.setState = function(value){
            Object.assign(this.state, value);

            this.state.color = hslToRgb(this.state.hue, this.state.saturation, this.state.level);

            this.reportState();
        };

        if(this.conf && this.device){
            const callback  = (evt) => {
                console.debug("ColorDevice("+this.name+") Callback called");
                console.debug(evt);

                let state = {};

                switch(evt["name"].toLowerCase()){
                    case "switch":
                        state.value = (evt["value"].toLowerCase() === "on" ? 1 : 0);
                        break;

                    case "level":
                        state.level = evt["value"];
                        break;

                    case "saturation":
                        state.saturation = evt["value"];
                        state.unsingColor = true;
                        break;

                    case "hue":
                        state.hue = evt["value"];
                        state.unsingColor = true;
                        break;

                    case "temperature":
                        state.temperature = evt["value"];
                        state.unsingColor = false;
                        break;
                }

                this.setState(state);
            }

            this.conf.registerCallback(this, this.device, callback);

            this.conf.getDeviceStatus(this.device,"main").then( (status) => {
                console.debug("ColorDevice("+this.name+") Status Refreshed");

                let state = {};

                if(status["switch"] !== undefined && status["switch"]["switch"] !== undefined){
                    state.value = (status["switch"]["switch"]["value"].toLowerCase() === "on" ? 1 : 0);
                }

                if(status["switchLevel"] !== undefined && status["switchLevel"]["level"] !== undefined){
                    state.level = status["switchLevel"]["level"]["value"];
                    state.levelUnit = status["switchLevel"]["level"]["unit"];
                }

                if(status["colorControl"] !== undefined){
                    state.hue = status["colorControl"]["hue"]["value"];
                    state.saturation = status["colorControl"]["saturation"]["value"];
                }

                if(status["colorTemperature"] !== undefined){
                    state.temperature = status["colorTemperature"]["colorTemperature"]["value"];
                    state.temperatureUnit = status["colorTemperature"]["colorTemperature"]["unit"];
                }

                this.setState(state);
            }).catch( err => {
                console.error("Ops... error getting device state (ColorDevice)");
                console.error(err);
            });

            this.on('input', msg => {
                console.debug("Input Message Received");
                console.log(msg);

                if(msg && msg.topic !== undefined){
                  switch(msg.topic){
                    case "update":
                        this.reportState(msg);
                        break;

                    case "switch":
                      this.conf.executeDeviceCommand(this.device,[{
                          component: "main",
                          capability: "switch",
                          command: (msg.payload.value == 1 ? "on" : "off")
                      }]).then( (ret) => {
                          const state = {
                            value: msg.payload.value
                          }
                          this.setState(state);
                      }).catch( (ret) => {
                          console.error("Error updating device");
                      });
                      break;

                    case "level":
                      this.conf.executeDeviceCommand(this.device,[{
                          component: "main",
                          capability: "switchLevel",
                          command: "setLevel",
                          arguments: [
                            msg.payload.value
                          ]
                      }]).then( (ret) => {
                          const state = {
                            level: msg.payload.value
                          }
                          this.setState(state);
                      }).catch( (ret) => {
                          console.error("Error updating device");
                      });
                      break;

                      case "color":
                        if(Array.isArray(msg.payload.value)){

                            const hsl = rgbToHsl(msg.payload.value[0], msg.payload.value[1], msg.payload.value[2]);

                            this.conf.executeDeviceCommand(this.device,[{
                                component: "main",
                                capability: "colorControl",
                                command: "setHue",
                                arguments: [
                                  hsl[0]
                                ]
                            },{
                                component: "main",
                                capability: "colorControl",
                                command: "setSaturation",
                                arguments: [
                                  hsl[1]
                                ]
                            },{
                                component: "main",
                                capability: "switchLevel",
                                command: "setLevel",
                                arguments: [
                                  hsl[2]
                                ]
                            }]).then( (ret) => {
                                const state = {
                                  hue: hsl[0],
                                  saturation: hsl[1],
                                  level: hsl[2]
                                }
                                this.setState(state);
                            }).catch( (ret) => {
                                console.error("Error updating device");
                            });
                        }
                        break;

                    case "temperature":
                        this.conf.executeDeviceCommand(this.device,[{
                            component: "main",
                            capability: "colorTemperature",
                            command: "setColorTemperature",
                            arguments: [
                              msg.payload.value
                            ]
                        }]).then( (ret) => {
                            const state = {
                              temperature: msg.payload.value
                            }
                            this.setState(state);
                        }).catch( (ret) => {
                            console.error("Error updating device");
                        });
                        break;
                  }
                }
            });

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallback(this, this.device, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-color", SmartthingsColorNode);

};
