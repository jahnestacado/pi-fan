#!/usr/bin/env node

var fs = require("fs");
var piBlaster = require("pi-blaster.js");
var TEMP_SOURCE_LOCATION = "/sys/class/thermal/thermal_zone0/temp";
var DEFAULT_INTERVAL = 10000;

//Input arguments
var gpioPin;
var tempThreshold;
var interval;

function readTemp(interval, onDone) {
    setInterval(function() {
        var unformattedTemp = Number(fs.readFileSync(TEMP_SOURCE_LOCATION, "utf8").trim());
        var tempInCelcius = unformattedTemp / 1000;

        onDone(tempInCelcius);
    }, interval);
}

function fanController(temperature) {
    console.log(temperature);
    if (temperature > tempThreshold) {
        piBlaster.setPwm(gpioFanPin, 1);
    } else {
        piBlaster.setPwm(gpioFanPin, 0);
    }
}

(function main() {
    var gpioFanPin = process.argv[2];
    var tempThreshold = process.argv[3];
    var interval = process.argv[4] || DEFAULT_INTERVAL;

    if (!gpioFanPin || !tempThreshold) {
        console.log("Usage: ./ pi-fan.js <gpio-pin> <temp-threshold> <interval-check>");
    } else {
        readTemp(interval, fanController);
    };
    
})();
