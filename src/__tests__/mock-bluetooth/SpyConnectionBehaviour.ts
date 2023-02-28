import type ConnectionBehaviour from "../../script/connection-behaviours/ConnectionBehaviour";
import MicrobitBluetooth from "../../script/microbit-interfacing/MicrobitBluetooth";
import MBSpecs from "../../script/microbit-interfacing/MBSpecs";

/**
 * Use this for checking the micro:bit behaviour.
 */
class SpyConnectionBehaviour implements ConnectionBehaviour {
	private hasConnected = false;
	private hasDisconnected = false;
	private wasManualDisconnect = false;
	private wasBothDisconnect = false;
	private hasFailedConnection = false;
	private connectedName: string | undefined = undefined;
	private connectedMicrobit: MicrobitBluetooth | undefined = undefined;

	accelerometerChange(x: number, y: number, z: number): void {
	}

	bluetoothConnect(microbitBluetooth: MicrobitBluetooth, name: string): void {
		this.hasConnected = true;
		this.connectedName = name;
		this.connectedMicrobit = microbitBluetooth;
	}

	bluetoothConnectionError(error?: Error): void {
		this.hasFailedConnection = true;
	}

	bluetoothDisconnect(manual?: boolean, bothDisconnected?: boolean): void {
		this.hasDisconnected = true;
		if (manual) {
			this.wasManualDisconnect = manual;
		}
		if (bothDisconnected) {
			this.wasBothDisconnect = bothDisconnected;
		}
	}

	buttonChange(buttonState: MBSpecs.ButtonState, button: MBSpecs.Button): void {
	}

	isConnected(): boolean {
		return false;
	}

	wasBothDisconnected(): boolean {
		return this.wasBothDisconnect;
	}

	wasManuallyDisconnected(): boolean {
		return this.wasManualDisconnect;
	}

	hasConnectFired() {
		return this.hasConnected;
	}

	wasDisconnected() {
		return this.hasDisconnected;
	}

	didFailConnection() {
		return this.hasFailedConnection;
	}

	getConnectedName() {
		return this.connectedName;
	}
}

export default SpyConnectionBehaviour;