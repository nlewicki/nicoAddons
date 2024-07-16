/// <reference types="../../CTAutocomplete" />

import Settings from "../Settings";

register("chat", (e) => {
    if (!Settings.AutoPotion) return;

    const inventory = Player.getInventory();
    const potionInInv = inventory.indexOf(373);

    if (potionInInv !== -1) {
        ChatLib.chat("&ePotion in inventory");
        return;
    }
    ChatLib.command("pb");
    ChatLib.chat("&eNo potion found in inventory, refilling...");
    const checkPotionBag = () => {
        const PotionBag = Player.getContainer();
        if (!PotionBag) {
            ChatLib.chat("&cPotion Bag not found!");
            return;
        }
        //ChatLib.chat("&ePotion Bag found: " + PotionBag.getName());

        const slotCount = PotionBag.getSize();
        //ChatLib.chat("&ePotion Bag slot count: " + slotCount);

        for (let i = 0; i < slotCount; i++) {
            const item = PotionBag.getStackInSlot(i);
            if (item && item.getID() === 373) {
                //ChatLib.chat("&ePotion found in slot " + i);
                PotionBag.click(i, true, "LEFT");
                // wait for click before closing gui
                setTimeout(() => {
                    //ChatLib.chat("&eClosing Potion Bag...");
                    Player.getPlayer().func_71053_j()
                }, 200);
                return;
            }
        }
        ChatLib.chat("&eNo potion found in the Potion Bag");
    };
    // delay to allow the gui to open
    setTimeout(checkPotionBag, 500);

}).setCriteria("entered MM Catacombs, Floor VII!").setContains();