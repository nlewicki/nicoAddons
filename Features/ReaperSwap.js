/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { registerWhen, ModMessage, PreGuiRenderEvent} from "../utils";
/*
const sneakKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)

const CancelGUIRendering = register(PreGuiRenderEvent, event => {
    cancel(event)

    Renderer.drawStringWithShadow(
        `&c&l[&c&lSwapping To Reaper...&c&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&c&l[&c&lSwapping To Reaper...&c&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/2 - 10
    )

}).unregister()

function checkWardrope(Container, slotIndex, message) {
    if (!Container) return

    new Thread(() => {
        Container.click(slotIndex + 35, false, "LEFT")
        Thread.sleep(200)
        Player.getPlayer().func_71053_j()
        Thread.sleep(200)
        sneakKey.setState(true)
        Thread.sleep(100)
        sneakKey.setState(false)
        ChatLib.command("wd")
        Thread.sleep(500)
		Container = Player.getContainer()
        Container.click(Settings.NecronArmorSlot + 35, false, "LEFT")
        Thread.sleep(200)
        Player.getPlayer().func_71053_j()
        CancelGUIRendering.unregister()
    }).start()
	return 
}

registerWhen(register(`chat`, (e) => {
	CancelGUIRendering.register()
	ChatLib.command("wd")

	new Thread(() => {
        Thread.sleep(500)
        checkWardrope(Player.getContainer(), Settings.ReaperArmorSlot, "&cSomething went wrong wd")
    }).start()

}).setChatCriteria("test"), () => Settings.AutoPotion)
*/

let success = false;
let PreviousArmorSlot = -1

const sneakKey = new KeyBind(Client.getMinecraft().field_71474_y.field_74311_E)

const CancelGUIRendering = register(PreGuiRenderEvent, event => {
    cancel(event)

    Renderer.drawStringWithShadow(
        `&c&l[&c&lAuto Reaper Swap...&c&l]`, 
        (Renderer.screen.getWidth()/2) - Renderer.getStringWidth(`&c&l[&c&lAuto Reaper Swap...&c&l]`)/2, 
        Renderer.screen.getHeight() - Renderer.screen.getHeight()/2 - 10
    )

}).unregister()

function checkWardrope(Container, slotIndex) {
    if (!Container) {
        CancelGUIRendering.unregister()
        return
    }
        

    for (let i = 36; i < Container.getSize() - 36; i++) {
        let item = Container.getStackInSlot(i)

        if (item && item.getID() == 351 && item.getMetadata() == 10) {
           PreviousArmorSlot = i
        } 
    }
    if (PreviousArmorSlot == -1) {
        CancelGUIRendering.unregister()
        ModMessage("&cSomething went wrong with /wd")
        return
    }
    if (PreviousArmorSlot == slotIndex + 35) {
        Player.getPlayer().func_71053_j()
        CancelGUIRendering.unregister()
        ModMessage("&cYou are already wearing reaper armor")
        return
    }
    new Thread(() => {
        ModMessage("&c&l[&c&lSwapping to Reaper...&c&l] in slot " + slotIndex)
        Container.click(slotIndex + 35, false, "LEFT")
        Thread.sleep(200)
        Player.getPlayer().func_71053_j()
        CancelGUIRendering.unregister()
    }).start()
    success = true
	return 
}

function SwapBack(SlotIndex) {
    if (!success) {
        //ModMessage("&cCASTING")
        return
    }
        

    new Thread(() => {
        CancelGUIRendering.register()
        sneakKey.setState(true)
        Thread.sleep(100)
        sneakKey.setState(false)
        ChatLib.command("wd")
        Thread.sleep(500)
		Container = Player.getContainer()
        if (!Container) {
            CancelGUIRendering.unregister()
            return
        }
        Container.click(SlotIndex, false, "LEFT")
        Thread.sleep(200)
        Player.getPlayer().func_71053_j()
        CancelGUIRendering.unregister()
    }).start()
    success = false
    return 
}

registerWhen(register(`chat`, (e) => {
	CancelGUIRendering.register()
	ChatLib.command("wd")

	new Thread(() => {
        Thread.sleep(500)
        checkWardrope(Player.getContainer(), Settings.ReaperArmorSlot, "&cSomething went wrong wd")
    }).start()

}).setChatCriteria("[BOSS] Wither King: I no longer wish to fight, but I know that will not stop you."), () => Settings.AutoPotion)

let idk = 0

register("actionBar", (msg) => {
    const text = ChatLib.getChatMessage(msg);
    if (text.removeFormatting().match('CASTING') && !text.removeFormatting().includes('CASTING IN')) {
        idk++
        if (idk == 3) {
            if (success)
            {
                ModMessage("&c&l[&c&lSwapping back...&c&l] into slot " + (PreviousArmorSlot - 35));
            }
            idk = 0
            SwapBack(PreviousArmorSlot)
            return
        }
    }
  });
