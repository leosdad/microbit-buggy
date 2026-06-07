
/*

Avoid these for the external LED if you want to stay away from board conflicts:

P3, P4, P6, P7, P9, P10: shared with the LED matrix
P12: reserved
P19, P20: used by the onboard I2C sensors

*/

// Servo functions

function goForward() {
	pins.servoWritePin(AnalogPin.P0, 180)
	pins.servoWritePin(AnalogPin.P1, 0)
}

function goBackward() {
	pins.servoWritePin(AnalogPin.P0, 0)
	pins.servoWritePin(AnalogPin.P1, 180)
}

function stop() {
	pins.digitalWritePin(DigitalPin.P0, 0)
	pins.digitalWritePin(DigitalPin.P1, 0)
}

// Main program

goForward()
pins.digitalWritePin(DigitalPin.P8, 1) // Turn on LED
basic.pause(1000)
goBackward()
pins.digitalWritePin(DigitalPin.P8, 0) // Turn off LED
basic.pause(1000)
stop()
