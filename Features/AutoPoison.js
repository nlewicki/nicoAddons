/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings"
import { ModMessage, PreGuiRenderEvent, registerWhen, getClass } from "../utils"

const CancelGUIRendering = register(PreGuiRenderEvent, event => {
    cancel(event)

    Renderer.drawStringWithShadow(
        `&5&l[&5&lTaking Poison From ${Settings.PoisonSlot}...&5&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&5&l[&5&lTaking Poison From ${Settings.PoisonSlot}...&5&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/2 - 10
    )

}).unregister()

function checkPotionBag(Container) {
    if (!Container) return
    
    const slotCount = Container.getSize() - 36

    for (let i = 0; i < slotCount; i++) {
        let item = Container.getStackInSlot(i)

        if (item && item.getID() === 351 && item.getMetadata() == 5) {
            Container.click(i, true, "LEFT")

            new Thread(() => {
                Thread.sleep(200)
                Player.getPlayer().func_71053_j()
                CancelGUIRendering.unregister()
            }).start()
            return
        }
    }

    ModMessage("&cNo poison found in the Potion Bag")
}

registerWhen(register("chat", () => {
    // if (!Settings.AutoPoison) return
    
    const inventory = Player.getInventory()
    const poisonInInv = inventory.indexOf(351)
    let PlyerClass = getClass(Player.getName()).toLocaleLowerCase().removeFormatting()

    if (poisonInInv !== -1 || !PlayerClass.includes('tank') || !PlayerClass.includes('healer')) {
        if (poisonInInv !== -1) {
            ModMessage("&aPoison in inventory")
            return
        }
        return
    }

    CancelGUIRendering.register()
    ChatLib.command(Settings.PoisonSlot);

    new Thread(() => {
        Thread.sleep(1000)
        checkPotionBag(Player.getContainer())
    }).start()

}).setChatCriteria("[BOSS] Wither King: You.. again?") ,() => Settings.AutoPoison)