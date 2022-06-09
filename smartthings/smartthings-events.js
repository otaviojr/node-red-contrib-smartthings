var Promise = require('promise');
var Common = require('./smartthings-common.js');

module.exports = function(RED) {

    function SmartthingsEventsNode(config) {
        RED.nodes.createNode(this, config);

        let node = this;

        console.debug("SmartthingsEventsNode")
        console.debug(config);

        this.conf = RED.nodes.getNode(config.conf);
        this.name = config.name;

        this.reportEvent = function(evt, send, done, original){
            send = send || function() { node.send.apply(node,arguments) };
            done = done || function() { };

            Common.createEvent(evt).then( (msg) => {
              if(original !== undefined){
                  original.payload = msg.payload;
                  Object.assign(msg,original);
              }

              send(msg);
              done();
            }).catch( (err) => {
              let msg = {
                error: {
                    message: `Unable to receive event: ${err}`,
                }
              };
              send(msg);
              done();
            });
        }

        if(this.conf){
            const callback  = (evt) => {
                console.debug("EventNode("+this.name+") Callback called");
                console.debug(evt);

                this.reportEvent(evt);
            }

            this.conf.registerCallbackHook(this, callback);

            this.on('close', () => {
                console.debug("Closed");
                this.conf.unregisterCallbackHook(this, callback);
            });
        }
    }

    RED.nodes.registerType("smartthings-node-events", SmartthingsEventsNode);
};
