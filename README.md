# node-red-contrib-smartthings

[![Donate](/docs/donation.png?raw=true)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=65XBWNBZ69ZP4&currency_code=USD&source=url)

This is a smartthings plugin to NodeRed. It allows you to control your devices and get their status using NodeRed.

# Installing

```
npm install node-red-contrib-smartthings
```

or add to your package.json

```
"node-red-contrib-smartthings": "*"
```

this is how it will looks like:

![Menu](/docs/nodered_menu.png?raw=true "Menu")

***Icon made by [Freepik](https://www.freepik.com/home) from [www.flaticon.com](www.flaticon.com)***

# Configuring

Every device node will have an **Account** property which must be configured.

You only have to create this configuration once and use it in all device nodes.

Configuration Node Edit Window:

![Configuration Node](/docs/config.png?raw=true "Configuration Node")
![Configuration Node](/docs/config_token.png?raw=true "Configuration Node")

As you can see, the only relevant information here is a **token**

# Token

In order to allow the plugin access your devices using Smartthings API you have
to provide a **token**

You can get a Smartthings Token here:
[https://account.smartthings.com/tokens](https://account.smartthings.com/tokens)

# SmartApp

In order to receive events from SmartThings we need to Install a custom SmartApp.

You can find the SmartApp code here:
[SmartApp](https://raw.githubusercontent.com/otaviojr/node-red-contrib-smartthings/master/smartapp/webhook.groovy)

To install the SmartApp you can follow these steps:

NOTE: You need to use the SmartThings Classic mobile app for installation AFTER
which you can access the installed SmartApps using the new SmartThings mobile app

1. Copy the SmartApp code to clipboard ( Ctrl + C )
2. Login to the IDE at [https://graph.api.smartthings.com](https://graph.api.smartthings.com "SmartThings Classic Developer Portal") (create a Samsung Account one if you don't have one)
3. Click on "My Locations" and then click on the name of the location where you want to install the SmartApp
4. Click on "My SmartApps"
5. Click on "+New SmartApp" on the top right
6. Click "From Code"
7. Paste the code (Ctrl+V) copied from Step 1 into the editor and click "Create"
8. Click "Publish" and then "For me" on the top right
9. To install the SmartApp, open your SmartThings Classic App on your phone, click
on the Automation icon at the bottom bar right corner of the main screen. Now click
on the "SmartApps" tab on the top right of the screen. Scroll down to the bottom and
click on "+Add a SmartApp". Then scroll down to the bottom and click on "My Apps".
(NOTE: if you don't see "My Apps" you need to use the SmartThings Classic app, if
you don't see the SmartApp in "My Apps", then you may have installed the code in
the wrong location, check step 3 again)
10. Scroll down the "My Apps" section until you see the new SmartApp you just created
and click on it on install it. You're done! To open/configure the app in future follow step 11.
11. After installing the SmartApp, configure/open it by clicking on the "Automations"
icon and then click on "SmartApps" on your phone. NOTE: Clicking on the SmartApp in the
"My Apps" section will install a NEW instance of the SmartApp instead of opening
the existing installation.

# Configuring the SmartApp

1. The first field is the webhook address. This must be your NodeRed public
address followed by /smartthings/webhook. So, if your NodeRed public address is
**nodered.example.com** it will be something like this https://nodered.example.com/smartthings/webhook.
**You must use HTTPS. Otherwise Smartthings hub will not call your webhook**

2. Has been added an option **Local Network**. You can turn this on if NodeRed is running
inside your local network. Like: http://192.168.0.xx/smartthings/webhook. This option will
only work with a local ip address.

3. Select all your devices. Only the selected devices will send events back to
NodeRed. Those not selected will not have theirs status updated.

# Debugging the SmartApp

If you are having any issue with the nodes not updating after the deploy, usually,
it is a misconfiguration of the SmartApp.

To debug the communication between the SmartApp and the NodeRed WebHook you can follow
these steps:

https://github.com/otaviojr/node-red-contrib-smartthings/blob/master/DEBUG_SMARTAPP.md

# Device Nodes

Once in NodeRed at SmartThings group you will see many devices nodes. Switch, Level,
Color, Humidity, Motion, Contact, etc..

Every node will keep its state. Every time a device state changes a message will
be send to the output node with the ```msg.topic``` of **device** with all relevant
informations at the ```msg.payload``` property.

Device changes are received through the webhook you set up at SmartThings Developers
Portal.

All device nodes can receive at its input a message with the ```msg.topic``` of
**update** to force the output of the current device state. This is useful when
handling a request, for example.

Some devices can have their state changed. You can turn on a light, change
level and color, or, open your door.

For example, to turn on a switch you can send a message to its device node:

```
{
    topic: "switch",
    payload: {
        value: 1
    }
}
```

This will turn on the device using Smartthings API and send the current status to the output.

This will be documented inside the NodeRed help window for each node.

# Donation

And... if this helps you to save time and money. Pay me a coffee. :-)

[![Donate](/docs/donation.png?raw=true)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=65XBWNBZ69ZP4&currency_code=USD&source=url)
