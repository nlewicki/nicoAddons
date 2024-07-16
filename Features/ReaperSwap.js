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
    
    //const slotCount = Container.getSize() - 36

	Container.click(slotIndex + 35, false, "LEFT")

	new Thread(() => {
		Thread.sleep(200)
		Player.getPlayer().func_71053_j()
		CancelGUIRendering.unregister()
	}).start()
	return 
    // ModMessage(message)
}

registerWhen(register(`chat`, (e) => {
	CancelGUIRendering.register()
	ChatLib.command("wd")

	new Thread(() => {
        Thread.sleep(300)
        checkWardrope(Player.getContainer(), Settings.ReaperArmorSlot, "&cSomething went wrong wd")
    }).start()

	// after thread is done
	// Thread.sleep(2000)
	//sneak

	// new Thread(() => {
	// 	Thread.sleep(1000)
    //     checkWardrope(Player.getContainer(), Settings.NecronArmorSlot, "&cSomething went wrong wd2")
	// }).start()


}).setChatCriteria("test"), () => Settings.AutoPotion)

register("worldUnload", () => {
	InP5 = false;
});
