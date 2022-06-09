module.exports = {
  createEvent: (conf, evt) => {
    return new Promise( (resolve, reject) => {
      conf.getDevice(evt.deviceId).then( device => {
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
        } else {
          reject("Unknown Event");
        }
      }).catch( err => {
          reject(err);
      });
    });
  }
}
