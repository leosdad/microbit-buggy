# Microbit Buggy

This project drives a micro:bit v1 buggy over Bluetooth UART using the micro:bit Bluetooth Gamepad web app.

## Wiring

- Left servo signal: P0
- Right servo signal: P1
- External LED: P8
- Avoid P3, P4, P6, P7, P9, and P10 because they are shared with the LED matrix.

## Gamepad Commands

The web app sends these UART messages:

- `L` = rotate left while held
- `R` = rotate right while held
- `A` = toggle forward / stop
- `S` = emergency stop
- `B` = toggle lights on/off

The buggy has a short timeout so rotation stops shortly after you release the left or right button.

## Build And Flash

From VS Code in this folder:

```powershell
npm run build
npm run flash
```

## Pairing And Control

1. Flash the code to the micro:bit over USB.
2. Open the micro:bit Bluetooth Gamepad web app on your phone.
3. Tap **Connect** and choose your micro:bit.
4. You do not upload anything to the phone.
5. Use the gamepad buttons; the app sends the UART commands above automatically.

## What To Do On The Phone

1. Turn Bluetooth on.
2. Open the micro:bit Bluetooth Gamepad web app.
3. Press **Connect**.
4. Select your micro:bit.
5. Drive with the on-screen buttons.

You still only flash code to the micro:bit. The phone just acts as the controller.

## Notes

- This project uses Bluetooth, not `radio`.
- If the Bluetooth connection drops, the code turns the LED off and stops both servos.
- `stop()` cuts the PWM signal entirely to avoid servo buzzing.
