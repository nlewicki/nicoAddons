/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

// scan for item name rather then id

import Settings from "../Settings"
import { ModMessage, PreGuiRenderEvent, registerWhen } from "../utils"

const CancelGUIRendering = register(PreGuiRenderEvent, event => {
    cancel(event)

    Renderer.drawStringWithShadow(
        `&5&l[&d&lTaking Potion From PotionBag...&5&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&5&l[&d&lTaking Potion From PotionBag...&5&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/2 - 10
    )

}).unregister()

function checkPotionBag(Container) {
    if (!Container) return
    
    const slotCount = Container.getSize() - 36

    for (let i = 0; i < slotCount; i++) {
        let item = Container.getStackInSlot(i)

        if (item && item.getID() === 373) {
            Container.click(i, true, "LEFT")

            new Thread(() => {
                Thread.sleep(200)
                Player.getPlayer().func_71053_j()
                CancelGUIRendering.unregister()
            }).start()
            return
        }
    }

    ModMessage("&cNo potion found in the Potion Bag")
}


registerWhen(register("chat", (event) => {
    
    try {
        let massage = ChatLib.getChatMessage(event).replace(/-/g, "")
        massage = massage.replace(new RegExp(`${massage.charAt(0)}`, "g"), "")
    
        if (!(/(\[(MVP|MVP\+|MVP\+\+|VIP|VIP\+|ADMIN|PIG|GM|YOUTUBE)\]\s)?(\w{3,16})\sentered\s((MM|The)\s)?Catacombs,\s(Floor\s[IVX]+)!/.test(massage))) return
        // https://regex101.com/r/qcUGpw/1
    
        const inventory = Player.getInventory()
        const potionInInv = inventory.indexOf(373)
    
        if (potionInInv !== -1) {
            ModMessage("&aPotion in inventory")
            return
        }
    
        CancelGUIRendering.register()
        ChatLib.command("pb");
    
        new Thread(() => {
            Thread.sleep(1000)
            checkPotionBag(Player.getContainer())
        }).start()
    } catch (e) {}

}),() => Settings.AutoPotion)