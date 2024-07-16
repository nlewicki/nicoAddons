/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { registerWhen, ModMessage, PreGuiRenderEvent} from "../utils";

// let InP5 = false;

// register("chat", (e) => {
// 	if (!Settings.ReaperSwap) return
// 	InP5 = true;
// }).setChatCriteria("[BOSS] Necron: All this, for nothing...");

// register("actionBar", (msg) => {
// 	const text = ChatLib.getChatMessage(msg);
// 	if (!InP5) return
// 	if (text.removeFormatting().includes('CASTING')) {
// 	  swap()
// 	}
// });


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

