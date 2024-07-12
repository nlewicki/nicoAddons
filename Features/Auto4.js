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

function findItemInHotbar(itemName) {
    const inventory = Player.getInventory().getItems()

    inventory.forEach((item, index) => {
        if (index > 8 || !item) return;
        if (item.getName().removeFormatting().toLowerCase().includes(itemName)) {
            ChatLib.chat("&eFound item in slot " + index);
            return index;
        }
    });
    ChatLib.chat("&eItem not found in hotbar");
    return -1;
}

let rodIndex = findItemInHotbar(346);

const isNearPlate = () => Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37;

function swapToSlot(rodIndex) {
    const player = Player.getPlayer();
    if (!player || !rodIndex) return;

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
        ChatLib.chat("rodIndex: " + rodIndex);
        rodIndex = findItemInHotbar(346);
        if (doneCoords.size === 5 && rodIndex === -1) {
            const inventory = Player.getInventory().getItems()

            inventory.forEach((item, index) => {
            if (index > 8 || !item) return;
            if (item.getName().removeFormatting().toLowerCase().includes('rod')) {
                ChatLib.chat("&eFound item in slot " + index);
                rodIndex = index;
            }
            });
            if (rodIndex === -1) {
                ChatLib.chat("&eNo rod found in hotbar");
                return;
            }
            ChatLib.chat("&eStarting RodSwap: Switching to slot " + rodIndex);
            new Thread(() => {
                swapToSlot(rodIndex);
                Thread.sleep(100); // Delay for item switch
                rightClick();
                Thread.sleep(100); // Delay after right-click for swapping back
                swapBackToOriginal();
            }).start()
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
