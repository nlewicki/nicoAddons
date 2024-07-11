/// <reference types="../../CTAutocomplete" />

import Settings from "../Settings";
import { PlayerUtils } from "../utils";

// add dauerschiesen und erst weiter rotieren wenn geschossen wurde

const DevBlocks = [
    { x: 64, y: 126, z: 50 },
    { x: 66, y: 126, z: 50 },
    { x: 68, y: 126, z: 50 },
    { x: 64, y: 128, z: 50 },
    { x: 66, y: 128, z: 50 },
    { x: 68, y: 128, z: 50 },
    { x: 64, y: 130, z: 50 },
    { x: 66, y: 130, z: 50 },
    { x: 68, y: 130, z: 50 }
];

let lastShot;
let originalSlotIndex = -1;
let doneCoords = new Set();

function findItemInHotbar(itemId) {
    const inventory = Player.getInventory().getItems().slice(0, 9);
    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        if (item && item.getID() === itemId) {
            return i;
        }
    }
    return -1;
}

let rodIndex = findItemInHotbar(346);

const isNearPlate = () => Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37;

function swapToSlot(rodIndex) {
    const player = Player.getPlayer();
    if (!player) return;

    const inventory = player.field_71071_by;
    if (!inventory) return;

    if (originalSlotIndex === -1) {
        originalSlotIndex = inventory.field_70461_c;
    }
    inventory.field_70461_c = rodIndex;
}

function swapBackToOriginal() {
    if (originalSlotIndex === -1) return;

    const player = Player.getPlayer();
    if (!player) return;

    const inventory = player.field_71071_by;
    if (!inventory) return;

    inventory.field_70461_c = originalSlotIndex;
    originalSlotIndex = -1;
}

export function rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null);
    rightClickMethod.setAccessible(true);
    rightClickMethod.invoke(Client.getMinecraft(), null);
}

const getBowShootSpeed = () => {
    const bow = Player.getInventory().getItems().slice(0, 9).find(a => a?.getID() === 261);
    if (!bow) return null;

    const lore = bow.getLore();

    let shotSpeed = 300;

    for (let line of lore) {
        const match = line.removeFormatting().match(/^Shot Cooldown: (\d+(?:\.\d+)?)s$/);
        if (match) {
            shotSpeed = parseFloat(match[1]) * 1000;
            break;
        }
    }

    return shotSpeed;
};

register("tick", () => {
    if (!Settings.auto4) return;
    if (Player.getHeldItem()?.getID() !== 261) return;
    if (Date.now() - lastShot < getBowShootSpeed()) return;
    if (!isNearPlate()) {
        doneCoords.clear();
        return;
    }

    const possible = DevBlocks.filter(coord => !doneCoords.has(coord));
    if (!possible.length) return;

    const emeraldLocation = possible.find(({ x, y, z }) => World.getBlockAt(x, y, z).type.getID() === 133);
    let xdiff = 0.5;

    if (!emeraldLocation) return;

    doneCoords.add(emeraldLocation);

    if (emeraldLocation.x === 68 || emeraldLocation.x === 66) {
        xdiff = -0.6;
    } else if (emeraldLocation.x === 64) {
        xdiff = 1.3;
    }

    let [yaw, pitch] = PlayerUtils.calcYawPitch({ x: emeraldLocation.x + xdiff, y: emeraldLocation.y + 1.1, z: emeraldLocation.z });

    PlayerUtils.rotateSmoothly(yaw, pitch, 250, () => {
        rightClick();
        lastShot = Date.now();

        if (doneCoords.size === 5 && rodIndex !== -1) {
            ChatLib.chat("&eStarting RodSwap: Switching to slot " + rodIndex + 1);
            rodIndex = findItemInHotbar(346);
            setTimeout(() => {
                swapToSlot(rodIndex);
                setTimeout(() => {
                    rightClick();
                    setTimeout(() => {
                        swapBackToOriginal();
                    }, 100); // Delay after right-click for swapping back
                }, 100); // Delay for item switch
            }, 50); // Delay before switching to rod
        }
    });
});

register("command", () => {
    ChatLib.chat("&ereseting Auto4");
    doneCoords.clear();
} ).setName("re");

register("worldUnload", () => {
    doneCoords.clear();
});
