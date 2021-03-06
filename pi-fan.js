#!/usr/bin/env node

var fs = require("fs");
var piBlaster = require("pi-blaster.js");
var TEMP_SOURCE_LOCATION = "/sys/class/thermal/thermal_zone0/temp";
var DEFAULT_INTERVAL = 10000;

//Input arguments
var gpioFanPin;
var tempThreshold;
var interval;

(function main() {
    gpioFanPin = process.argv[2];
    tempThreshold = process.argv[3];
    interval = process.argv[4] || DEFAULT_INTERVAL;

    if (!gpioFanPin || !tempThreshold) {
        console.log("Usage: ./pi-fan.js <gpio-pin> <temp-threshold> <interval-check>");
    } else {
        readTemp(interval, handleFanState);
    }
})();

function readTemp(interval, onDone) {
    setInterval(function() {
        fs.readFile(TEMP_SOURCE_LOCATION, function(tempAsString){
            var unformattedTemp = Number(tempAsString.trim());
            var tempInCelcius = unformattedTemp / 1000;
            onDone(tempInCelcius);
        });
    }, interval);
}

function handleFanState(temperature) {
    if (temperature > tempThreshold) {
        piBlaster.setPwm(gpioFanPin, 1);
    } else {
        piBlaster.setPwm(gpioFanPin, 0);
    }
}
