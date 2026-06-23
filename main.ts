
let lastCommandAt = 0
let forwardEnabled = false
let rotationMode = "none"
let lightsEnabled = false

const COMMAND_TIMEOUT_MS = 180

// #region Functions

function goForward() {
	pins.servoWritePin(AnalogPin.P0, 180)
	pins.servoWritePin(AnalogPin.P1, 0)
}

function goBackward() {
	pins.servoWritePin(AnalogPin.P0, 0)
	pins.servoWritePin(AnalogPin.P1, 180)
}

function turnLeft() {
	pins.servoWritePin(AnalogPin.P0, 90)
	pins.servoWritePin(AnalogPin.P1, 0)
}

function turnRight() {
	pins.servoWritePin(AnalogPin.P0, 90)
	pins.servoWritePin(AnalogPin.P1, 180)
}

function stop() {
	pins.digitalWritePin(DigitalPin.P0, 0)
	pins.digitalWritePin(DigitalPin.P1, 0)
}

function turnOnLights() {
	pins.digitalWritePin(DigitalPin.P8, 1)
}

function turnOffLights() {
	pins.digitalWritePin(DigitalPin.P8, 0)
}

function setLightsEnabled(enabled: boolean) {
	lightsEnabled = enabled
	if (lightsEnabled) {
		turnOnLights()
	} else {
		turnOffLights()
	}
}

function stopAll() {
	stop()
	setLightsEnabled(false)
	forwardEnabled = false
	rotationMode = "none"
}

function applyCurrentMotion() {
	if (rotationMode == "left") {
		turnLeft()
	} else if (rotationMode == "right") {
		turnRight()
	} else if (forwardEnabled) {
		goForward()
	} else {
		stop()
	}
}

function markCommandReceived() {
	lastCommandAt = input.runningTime()
}

function handleCommand(command: string) {
	let normalized = command.trim()
	if (normalized.length == 0) {
		return
	}

	markCommandReceived()

	if (normalized == "L") {
		rotationMode = "left"
		applyCurrentMotion()
	} else if (normalized == "R") {
		rotationMode = "right"
		applyCurrentMotion()
	} else if (normalized == "S") {
		stopAll()
	} else if (normalized == "A") {
		forwardEnabled = !forwardEnabled
		applyCurrentMotion()
	} else if (normalized == "B") {
		setLightsEnabled(!lightsEnabled)
	} else if (normalized == "C") {
		rotationMode = "none"
		applyCurrentMotion()
	}
}

// #endregion

bluetooth.startUartService()

bluetooth.onBluetoothConnected(function () {
	markCommandReceived()
	stopAll()
})

bluetooth.onBluetoothDisconnected(function () {
	stopAll()
})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
	handleCommand(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
})

basic.forever(function () {
	if (rotationMode != "none" && input.runningTime() - lastCommandAt > COMMAND_TIMEOUT_MS) {
		rotationMode = "none"
		applyCurrentMotion()
	}
	basic.pause(100)
})

stopAll()
markCommandReceived()
