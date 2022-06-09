module.exports = function() {
  function createEvent(evt){
    return new Promise( (resolve, reject) => {
      node.stClient.devices.get(evt.deviceId).then( device => {
        console.log("Device Info:");
        console.log(device);
        if(evt.attribute === "switch"){
          resolve({
              topic: "event",
              payload: {
                  deviceId: evt.deviceId,
                  deviceType: "switch",
                  name: device.name,
                  value: (evt["value"].toLowerCase() === "on" ? 1 : 0),
                  changed: evt["stateChange"]
              }
          });
        }
      }).catch( err => {
          reject(err);
      });
    });
  }
}
