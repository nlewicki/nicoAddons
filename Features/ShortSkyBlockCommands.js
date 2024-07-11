/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

//inspired by Noamm9

import Settings from "../Settings";

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp hub");
}).setName("h");

register("command",() => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp hub")
	setTimeout(() => {
		ChatLib.command("warp hub")
	}, 600)
}).setName("hh");

//register("command", () => {
//	if (!Settings.ShortSkyBlockCommands) return
//	ChatLib.command("warp dungeon_hub");
//}).setName("d");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp deep");
}).setName("deep");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp park");
}).setName("park");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp nether");
}).setName("nether");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp desert");
}).setName("desert");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp spider");
}).setName("spider");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp barn");
}).setName("barn");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("warp drag");
}).setName("end");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("recipes");
}).setName("res");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("skills");
}).setName("skills");

register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.command("play sb");
}).setName("sb");

//help command
register("command", () => {
	if (!Settings.ShortSkyBlockCommands) return
	ChatLib.chat("§e §l--------------------------");
	ChatLib.chat("§e §lAll Short SkyBlock Commands");
	ChatLib.chat("§b/h     (Warp you to  The Hub)");
	ChatLib.chat("§b/hh     (Warp you to  The Hub twise)");
	ChatLib.chat("§b/dung     (Warp you to The Dungeon Hub)");
	ChatLib.chat("§b/park     (Warp you to The Park)");
	ChatLib.chat("§b/nether     (Warp you to The Blazing Fortress)");
	ChatLib.chat("§b/desert     (Warp you to The Mushroom Desert)");
	ChatLib.chat("§b/spider     (Warp you to Spider's Den)");
	ChatLib.chat("§b/barn     (Warp you to The Barn)");
	ChatLib.chat("§b/end     (Warp you to The End)");
	ChatLib.chat("§b/res     (Opens the Recipe Book)");
	ChatLib.chat("§b/skills     (Opens the Skill menu)");
	ChatLib.chat("§b/sb     (Joins SkyBlock [can work from anyplace]");
	ChatLib.chat("§b/deep     (Warp you to Deep Caverns)");
	ChatLib.chat("§b/pk      (alias for '/party kick')");
	ChatLib.chat("§b/pt      (alias for '/party transfer'");
	ChatLib.chat("§b/pd      ( alias for '/party disband'");
	ChatLib.chat("§e §l--------------------------");
}).setName("ssbc");
