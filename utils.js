/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import { getPlayerEyeCoords } from "../BloomCore/utils/Utils";
import Vector3 from "../BloomCore/utils/Vector3";

export const PreGuiRenderEvent = net.minecraftforge.client.event.GuiScreenEvent.DrawScreenEvent.Pre
export const prefix = "§6§l[§b§lNA§6§l]§r"

export class PlayerUtils {

	static getEyePos() {
		return {
			x: Player.getX(),
			y: Player.getY() + Player.getPlayer().func_70047_e(),
			z: Player.getZ()
		};
	}

	static rotate(yaw, pitch) {
		const player = Player.getPlayer();
		player.field_70177_z = yaw;
		player.field_70125_A = pitch;
	}

	static rotateSmoothly(yaw, pitch, time, callback) {
		while (yaw >= 180) yaw -= 360;
		while (pitch >= 180) pitch -= 360;
		const initialYaw = Player.getYaw();
		const initialPitch = Player.getPitch();
		const initialTime = new Date().getTime();
		const trigger = register("step", () => {
			const progress = time <= 0 ? 1 : Math.max(Math.min((new Date().getTime() - initialTime) / time, 1), 0);
			const amount = this.bezier(progress, 0, 1, 1, 1);
			this.rotate(initialYaw + (yaw - initialYaw) * amount, initialPitch + (pitch - initialPitch) * amount);
			if (progress >= 1) {
				trigger.unregister();
				if (callback) callback();
			}
		});
	}

	static bezier(t, initial, p1, p2, final) {
		return (1 - t) * (1 - t) * (1 - t) * initial + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * final;
	}

	static calcYawPitch(blcPos, plrPos) { //detailed calculation
		if (!plrPos) plrPos = this.getEyePos();
		let d = {
			x: blcPos.x - plrPos.x,
			y: blcPos.y - plrPos.y,
			z: blcPos.z - plrPos.z
		};
		let yaw = 0;
		let pitch = 0;
		if (d.x != 0) {
			if (d.x < 0) { yaw = 1.5 * Math.PI; } else { yaw = 0.5 * Math.PI; }
			yaw = yaw - Math.atan(d.z / d.x);
		} else if (d.z < 0) { yaw = Math.PI; }
		d.xz = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.z, 2));
		pitch = -Math.atan(d.y / d.xz);
		yaw = -yaw * 180 / Math.PI;
		pitch = pitch * 180 / Math.PI;
		if (pitch < -90 || pitch > 90 || isNaN(yaw) || isNaN(pitch) || yaw == null || pitch == null || yaw == undefined || pitch == null) return;

		return [yaw, pitch];
	}

	static getYawPitch(x, y, z) { //simpler calculation => same result
		const difference = new Vector3(x, y, z).subtract(new Vector3(...getPlayerEyeCoords()));
		return [difference.getYaw(), difference.getPitch()];
	}
}

/**
 * Registers and unregisters the trigger depending on the result of the checkFunc. Use with render triggers to reduce lag when they are not being used.
 * @param {() => void} trigger
 * @param {Function} checkFunc
 * @returns
 */
const checkingTriggers = []
export function registerWhen(trigger, checkFunc) {
  checkingTriggers.push([trigger.unregister(), checkFunc])
}

register("renderOverlay", () => {
  for (let i = 0; i < checkingTriggers.length; i++) {
    let [trigger, func] = checkingTriggers[i]
    if (func()) trigger.register()
    else trigger.unregister()
  }
})

/**
 * Sends a mod message to the chat with a prefix.
 * @param {string} string - The message to be sent to the chat.
 */
export function ModMessage(string) {
	ChatLib.chat(`${prefix} ${string}`)
  }
