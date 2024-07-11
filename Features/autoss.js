/// <reference types="../../CTAutocomplete" />

import Settings from "../Settings";
import { PlayerUtils } from "../utils";
import { getPlayerEyeCoords } from "../../BloomCore/utils/Utils";
import Vector3 from "../../BloomCore/utils/Vector3";
import * as packetChat from "../events/packetChat";
import * as packetBlockChange from "../events/packetBlockChange";
import * as packetMultiBlockChange from "../events/packetMultiBlockChange";
import * as packetPlayerBlockPlacement from "../events/packetPlayerBlockPlacement";
import * as packetPlayerDigging from "../events/packetPlayerDigging";

const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
const MCBlock = Java.type("net.minecraft.block.Block");
const MCBlockPos = Java.type("net.minecraft.util.BlockPos");

const obsidians = [[111,123,92],[111,123,93],[111,123,94],[111,123,95],[111,122,92],[111,122,93],[111,122,94],[111,122,95],[111,121,92],[111,121,93],[111,121,94],[111,121,95],[111,120,92],[111,120,93],[111,120,94],[111,120,95]];
const buttons = [[110,123,92],[110,123,93],[110,123,94],[110,123,95],[110,122,92],[110,122,93],[110,122,94],[110,122,95],[110,121,92],[110,121,93],[110,121,94],[110,121,95],[110,120,92],[110,120,93],[110,120,94],[110,120,95]];
const buttonsExact = [[111,123.5,92.5],[111,123.5,93.5],[111,123.5,94.5],[111,123.5,95.5],[111,122.5,92.5],[111,122.5,93.5],[111,122.5,94.5],[111,122.5,95.5],[111,121.5,92.5],[111,121.5,93.5],[111,121.5,94.5],[111,121.5,95.5],[111,120.5,92.5],[111,120.5,93.5],[111,120.5,94.5],[111,120.5,95.5]];
const startButton = [110,121,91];
const startButtonExact = [111, 121.5, 91.5];
const buttonState = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let phase = 0;
const solution = [];
let lastReset = 0;

packetChat.addListener(message => {
	if (message === "[BOSS] Goldor: Who dares trespass into my domain?") {
		resetSS();
		if (Settings.enabled && Settings.autoStart) {
			const autoStart = Settings.autoStart.split(",").map(delay => parseInt(delay));
			if (autoStart.some(delay => Number.isNaN(delay))) {
				ChatLib.chat("simonshutup: §cMisconfigured Auto Start!");
				return;
			}
			autoStart.forEach(delay => {
				setTimeout(() => {
					let startButtonYawPitch = PlayerUtils.getYawPitch(...startButtonExact);
					if (isAtSS() && (Settings.noRotate || (Math.abs(getPlayerYaw() - startButtonYawPitch[0]) < 5 && Math.abs(getPlayerPitch() - startButtonYawPitch[1]) < 5))) {
						clickBtn(...startButton);
					}
				}, delay);
			});
		}
	}
});
packetPlayerBlockPlacement.addListener(position => {
	const time = new Date().getTime();
	if (position.every((coord, index) => coord === startButton[index]) && lastReset + 500 < time) {
		resetSS();
		lastReset = time;
		ChatLib.chat("simonshutup: §aReset SS configuration!");
	}
});
packetPlayerDigging.addListener(position => {
	const time = new Date().getTime();
	if (position.every((coord, index) => coord === startButton[index]) && lastReset + 500 < time) {
		resetSS();
		lastReset = time;
		ChatLib.chat("simonshutup: §aReset SS configuration!");
	}
});

packetBlockChange.addListener(onBlock);
packetMultiBlockChange.addListener(blocks => {
	for (let block of blocks) onBlock(...block);
});

register("command", () => {
	resetSS();
	if (Settings.enabled && Settings.autoStart) {
		const autoStart = Settings.autoStart.split(",").map(delay => parseInt(delay));
		if (autoStart.some(delay => Number.isNaN(delay))) {
			ChatLib.chat("simonshutup: §cMisconfigured Auto Start!");
			return;
		}
		autoStart.forEach(delay => {
			setTimeout(() => {
				let startButtonYawPitch = PlayerUtils.getYawPitch(...startButtonExact);
				if (isAtSS() && (Settings.noRotate || (Math.abs(getPlayerYaw() - startButtonYawPitch[0]) < 5 && Math.abs(getPlayerPitch() - startButtonYawPitch[1]) < 5))) {
					clickBtn(...startButton);
				}
			}, delay);
		});
	}
}).setName("autostart");

function onBlock(position, block) {
	const id = MCBlock.func_149682_b(block);
	const buttonIndex = buttons.findIndex(xyz => position.every((coord, index) => coord === xyz[index]));
	if (buttonIndex !== -1) {
		buttonState[buttonIndex] = id;
	}
	if (position.every((coord, index) => coord === buttons.find((_, index) => !solution.includes(index))[index])) {
		if (id === 77) {
			++phase;
			if (phase === 1 && solution.length === 3) {
				solution.shift();
				phase = 2;
				// ChatLib.chat("hey")
			} else if (phase !== solution.length) {
				//debug
			}
			// ChatLib.chat("p" + phase + " s" + solution.length);
			phase = solution.length;
			// console.log(solution);
			if (Settings.enabled && isAtSS()) {
				ChatLib.chat("auto!");
				auto();
			}
		} else if (id === 0) {
			while (solution.length) solution.pop();
		}
	}
	const index = obsidians.findIndex(xyz => position.every((coord, index) => coord === xyz[index]));
	if (index === -1) return;
	if (id === 169) {
		solution.push(index);
	}
}

function auto() {
	new Thread(() => {
		for (let i = 0; i < solution.length; ++i) {
			let buttonIndex = solution[i];
			let stupid = buttonsExact[buttonIndex];
			let stupid2 = PlayerUtils.getYawPitch(...stupid);
			let pos = buttons[buttonIndex];
			if (i !== 0 || (!Settings.noRotate && (Math.abs(getPlayerYaw() - stupid2[0]) > 0.01 || Math.abs(getPlayerPitch() - stupid2[1]) > 0.01))) {
				if (!Settings.noRotate) rotateSmoothly(...stupid2, Settings.delay);
				Thread.sleep(Settings.delay);
			}
			for (let j = 0; j < 100; ++j) {
				if (buttonState[buttonIndex] === 77) break;
				Thread.sleep(10);
			}
			if (!isAtSS()) return;
			clickBtn(...pos);
		}
		if (solution.length < 5) {
			const buttonIndex = solution[0];
			const stupid = buttonsExact[buttonIndex];
			const stupid2 = PlayerUtils.getYawPitch(...stupid);
			if (!Settings.noRotate) rotateSmoothly(...stupid2, Settings.delay);
		}
	}).start();
}

function resetSS() {
	phase = 0;
	while (solution.length) solution.pop();
}

function isAtSS() {
	return new Vector3(108.5, 120, 94).subtract(new Vector3(Player.getX(), Player.getY(), Player.getZ())).getLength() < 1;
}

function getPlayerYaw() {
	return Player.getYaw();
}

function getPlayerPitch() {
	return Player.getPitch();
}

function rotateSmoothly(yaw, pitch, time) {
	while (yaw >= 180) yaw -= 360;
	while (pitch >= 180) pitch -= 360;
	const initialYaw = getPlayerYaw();
	const initialPitch = getPlayerPitch();
	const initialTime = new Date().getTime();
	const trigger = register("step", () => {
		const progress = time <= 0 ? 1 : Math.max(Math.min((new Date().getTime() - initialTime) / time, 1), 0);
		const amount = PlayerUtils.bezier(progress, 0, 1, 1, 1);
		PlayerUtils.rotate(initialYaw + (yaw - initialYaw) * amount, initialPitch + (pitch - initialPitch) * amount);
		if (progress >= 1) trigger.unregister();
	});
}

function clickBtn(x, y, z) {
	Client.sendPacket(new C08PacketPlayerBlockPlacement(new MCBlockPos(x, y, z), 4, Player.getHeldItem()?.getItemStack(), 0.875, 0.5, 0.5));
	if (!Player.isSneaking()) Client.sendPacket(new C0APacketAnimation());
}
