There is this common issue about the node not updating its status after the deploy. Usually this happens
because of a misconfiguration of the SmartApp.

If you are facing something like this, you can execute the steps below to make sure that SmartApp and 
Smartthings Webhook is working all right:

![smartthings_1](https://user-images.githubusercontent.com/2933837/67167032-9518ee00-f36b-11e9-95b2-a7992ff01378.png)

1) Click on **My Locations** and choose the location you want
2) Click on **My Smart apps**

![smartthings_2](https://user-images.githubusercontent.com/2933837/67167044-bc6fbb00-f36b-11e9-862c-b8ca0c10aff2.png)

3) Click at the webhook you created with our smartapp application

![smartthings_3](https://user-images.githubusercontent.com/2933837/67167053-cbef0400-f36b-11e9-83a6-ec246e029bce.png)

4) Start the simulator

![smartthings_4](https://user-images.githubusercontent.com/2933837/67167058-d8735c80-f36b-11e9-91d9-6ff917371a33.png)

5) Set the location to debug
6) Configure the webhook address. It should be your NodeRed public address plus "/smartthings/webhook"

![smartthings_5](https://user-images.githubusercontent.com/2933837/67167070-fa6cdf00-f36b-11e9-89c9-d1c5bbce3c7f.png)

**Choose a device, could be a virtual one, which is easier to test.**

7) Click **install**

![Screenshot from 2019-10-20 18-56-19](https://user-images.githubusercontent.com/2933837/67167086-21c3ac00-f36c-11e9-9e52-2423792daa4f.png)

Change the device state and look for the logs... if there is any error it will output here. 

Actually, if everything works all right nothing will be logged in.
