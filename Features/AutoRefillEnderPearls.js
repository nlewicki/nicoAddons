/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

//inspired by Noamm9

import Settings from "../Settings";


register("chat", (player, event) => {
    if (!Settings.AutoRefillEnderPearls) return
		const inventory = Player.getInventory()
		const PearlSlot = inventory.indexOf(368)

		if (PearlSlot !== -1 && inventory.getStackInSlot(PearlSlot).getName().removeFormatting() == "Ender Pearl") {
		  	var PearlAmont = inventory.getStackInSlot(PearlSlot).getStackSize()
		  	if (16 - PearlAmont == 0) return
		  	else ChatLib.command(`gfs ender_pearl ${(16 - PearlAmont)}`)
		} else if (PearlSlot == -1) ChatLib.command("gfs ender_pearl 16");

} ).setCriteria("Starting in 1 second.")

