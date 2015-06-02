# pi-fan
Fan-control script that allows to switch "on" and "off" a fan according to CPUs temperature, through the GPIO pins.
The script is using the _"/sys/class/thermal/thermal_zone0/temp"_ file of the Raspberry pi to retrieve current temperature of the device.

##Script requirements
* You need to have Node.js + npm installed in your environment

* You need to install [pi-blaster](https://github.com/sarfata/pi-blaster) on your Raspberry pi and also install the [pi-blaster.js](https://www.npmjs.com/package/pi-blaster.js) [npm](npmjs.org) module by running npm install in the root folder of this repo.

* Additionaly you will need to use an NPN transistor that according to the signal that the GPIO pin is sending it will switch on/off the fan.

![Wiring](https://github.com/jahnestacado/pi-fan/blob/master/images/pi-fan-wiring.png?raw=true)


##Use
To start the script run
```bash
./ pi-fan.js <gpio-pin> <temp-threshold> <interval-check> 
```
The first two arguments are mandatory and the third one is optional.
