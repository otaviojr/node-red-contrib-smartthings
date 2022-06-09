module.exports = function() {
  function createEvent(evt, name){
    if(evt.attribute === "switch")
      return {
          topic: "device",
          payload: {
              deviceId: evt.deviceId,
              deviceType: "switch",
              name: name,
              value: (evt["value"].toLowerCase() === "on" ? 1 : 0),
              changed: evt["stateChange"]
          }
      };
    }
  }
}
