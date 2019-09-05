module.exports = function(RED) {

    var token = "";
    var callback_url = "";

    console.log("SmartthingsConfigNode");

    function SmartthingsConfigNode(config) {
        RED.nodes.createNode(this, config);
        this.token = config.token;
        this.callbackurl = config.url;

        token = this.token;
        this.callback_url = callbackurl;

        console.log("SmartthingsConfigNode called");
    }

    RED.nodes.registerType("smartthings-config", SmartthingsConfigNode);

    RED.httpAdmin.get('/smartthings/devices/:type', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        getDevices(token);
        res.status(404).send();
      //}
    });

    RED.httpAdmin.get('/smartthings/onoff/webhook', function(req,res){
      //if (devices[req.params.id]) {
      //  res.send(devices[req.params.id]);
      //} else {
        res.status(404).send();
      //}
    });

};
