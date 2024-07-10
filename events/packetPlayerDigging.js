/// <reference types="../../CTAutocomplete" />

const C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");

const listeners = [];

const trigger = register("packetSent", (packet, event) => {
	const position = packet.func_179715_a();
	const positionXYZ = [position.func_177958_n(), position.func_177956_o(), position.func_177952_p()]; // only need pos for this application
	for (let listener of listeners) {
		listener(positionXYZ, packet, event);
	}
}).setFilteredClass(C07PacketPlayerDigging).unregister();

export function addListener(listener) {
	if (listeners.length === 0) trigger.register();
	listeners.push(listener);
}

export function removeListener(listener) {
	const index = listeners.indexOf(listener);
	if (index === -1) return false;
	listeners.splice(index, 1);
	if (listeners.length === 0) trigger.unregister();
	return true;
}