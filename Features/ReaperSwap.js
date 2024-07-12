/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "../Settings";
import { registerWhen } from "../utils";

register(`chat`, (e) => {
	if (!Settings.ReaperSwap) return

	let ReaperIndex = -1;
	let Reaperequiped = false;
	let NecronIndex = -1;
	ChatLib.command("wd")

	const keyTrigger = register("guiKey", (char, key, gui, event) => {
		const Container = Player.getContainer()
		if (!Container) return
		if (!/^Wardrobe \(\d\/\d\)$/.test(Container.getName())) return
		if (key == 1 || key == 18) return Player.getPlayer().func_71053_j()

		cancel(event);

		const inventory = Player.getInventory().getItems()

		inventory.forEach((item, index) => {
			if (index < 27 || index > 35 || !item) return;
			if (item.getName().removeFormatting().toLowerCase().includes('maxor')) {
				ChatLib.chat("&eFound Reaper Armor in slot " + index);
				ReaperIndex = index;
			}
		});

		if (ReaperIndex === -1) return ;
		if (ReaperIndex !== -1) {
			// Right-click on ReaperIndex
			Container.click(ReaperIndex + 9)
			Thread.sleep(200);
			// Press ESC
			Client.currentGui.close();
			Thread.sleep(200);
			KeyBind.sneak.setState(true);
			setTimeout(() => KeyBind.sneak.setState(false), 300);
		}
		Reaperequiped = true;

	}).unregister()

	registerWhen(keyTrigger, () => Settings.WardrobeHelper)

	if (Reaperequiped == false) return ;

	ChatLib.command("wd")

	const keyTrigger2 = register("guiKey", (char, key, gui, event) => {
		const Container = Player.getContainer()
		if (!Container) return
		if (!/^Wardrobe \(\d\/\d\)$/.test(Container.getName())) return
		if (key == 1 || key == 18) return Player.getPlayer().func_71053_j()

		const inventory = Player.getInventory().getItems()

		inventory.forEach((item, index) => {
			if (index < 18 || index > 26 || !item) return;
			if (item.getName().removeFormatting().toLowerCase().includes('necron')) {
				ChatLib.chat("&eFound Necron Armor in slot " + index);
				NecronIndex = index;
			}

		if (NecronIndex !== -1) {
			// Right-click on NecronIndex
			Container.click(NecronIndex + 18);
			Thread.sleep(200);
			// Press ESC
			Player.getPlayer().func_71053_j()
		}
		});
	}).unregister()

	registerWhen(keyTrigger2, () => Settings.WardrobeHelper)

}).setChatCriteria("[BOSS] I no longer wish to fight, but I know that will not stop you.")
