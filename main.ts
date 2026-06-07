
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
basic.pause(1000)
goBackward()
basic.pause(1000)
stop()
