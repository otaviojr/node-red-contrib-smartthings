module.exports = {
  createEvent: (conf, evt) => {
    return new Promise( (resolve, reject) => {
      conf.getDevice(evt.deviceId).then( device => {
        console.log("Device Info:");
        console.log(device);

        let msg = {
          topic: "event",
          payload: {
              deviceId: evt.deviceId,
              deviceType: evt["attribute"].toLowerCase(),
              name: device.name,
              timestamp: new Date().toISOString()
          }
        };

        switch(evt["attribute"].toLowerCase()){
            case "switch":
              msg.payload.value = (evt["value"].toLowerCase() === "on" ? 1 : 0);
              break;

            case "contact":
              msg.payload.value = (evt["value"].toLowerCase() === "open" ? 1 : 0);
              break;

            case "motion":
            case "acceleration":
              msg.payload.value = (evt["value"].toLowerCase() === "active" ? 1 : 0);
              break;

            case "lock":
              msg.payload.value = (evt["value"].toLowerCase() === "locked" ? 1 : 0);
              break;

            case "presence":
              msg.payload.value = (evt["value"].toLowerCase() === "present" ? 1 : 0);
              break;

            case "smoke":
              msg.payload.value = (evt["value"].toLowerCase() === "detected" ? 1 : 0);
              break;

            case "water":
              msg.payload.value = (evt["value"].toLowerCase() === "wet" ? 1 : 0);
              break;

            default:
              msg.payload.value = evt["value"];
              break;
        }

        resolve(msg);
      }).catch( err => {
          reject(err);
      });
    });
  }
}
