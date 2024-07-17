import {  @ButtonProperty, @PercentSliderProperty, @CheckboxProperty, @ColorProperty, @SelectorProperty, @SwitchProperty, @Vigilant, @SliderProperty, @TextProperty, @NumberProperty, Color } from "../Vigilance"

@Vigilant("nicoAddons", "Nico Addons", {
    getCategoryComparator: () => (a, b) => {
        const categories = [
			"General",
			"WIP",
			"F7 Devices",
            "Auto4",
            "AutoSS"
        ];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
	@SwitchProperty({
		name: "&5Auto Twilight",
		description: "takes out arrow poison at the start of p5\n &c!doesnt work with NEU Backpack thingy!",
		category: "General"
	})
	AutoPoison = true;

	@TextProperty({
		name: "Auto Twilight Command",
		description: "The command to run to get the twilights. without the '/'\nExample: \nbp 4 -> opens the 4th backpack\nec 1 -> opens the 1st enderchest",
		category: "General"
	})
	PoisonSlot = "ec 1";

	@SwitchProperty({
		name: "&dAuto Potion",
		description: "takes out a potion at the start of the dungeon",
		category: "General"
	})
	AutoPotion = false;

	@SwitchProperty({
		name: "&cReaper &0Armor Swap",
		description: "Automaticaly swaps to reaper armor, sneaks and swaps back for you",
		category: "General"
	})
	ReaperSwap = false;

	@SliderProperty({
		name: "Reaper Armor Slot",
		description: "The slot of the reaper armor",
		category: "General",
		min: 1,
		max: 9,
		increment: 1
	})
	ReaperArmorSlot = 1;

	@SwitchProperty({
		name: "&bShort SkyBlock Commands",
		description: "Enables a list of useful short version of skyblock's commands (type /ssbc for help)",
		category: "General"
	})
	ShortSkyBlockCommands = false;

	@SwitchProperty({
		name: "&cBlood Dialogue Skip",
		description: "Makes a timer for 24 seconds after you open the blood room",
		category: "General"
	})
	BloodDialougeSkip = false;

	@SwitchProperty({
		name: "&a[&cClean &fF7 &aTitles]",
		description: "Makes Terminal and Crystal titles clean",
		category: "General"
	})
	CleanTitles = false;

	@SwitchProperty({
		name: "&2Auto refill Ender Pearls",
		description: "Auto refills enderpearls at start of the dungeon",
		category: "General"
	})
	AutoRefillEnderPearls = false;

    @SwitchProperty({
        name: "Auto4 Toggle",
        description: "Toggle Auto4 feature on or off  (pretty slow) DONT USE",
        category: "F7 Devices"
    })
    auto4 = false;

	@SwitchProperty({
		name: "AutoSS Toggle",
		description: "removed. use simonshutup",
		category: "F7 Devices",
	})
	enabled = false;

	@NumberProperty({
		name: "Delay",
		category: "F7 Devices",
		min: 0,
		max: 2147483647,
		increment: 10
	})
	delay = 250;

	@TextProperty({
		name: "Auto Start",
		category: "F7 Devices"
	})
	autoStart = "";

	@SwitchProperty({
		name: "No Rotate",
		category: "F7 Devices",
	})
	noRotate = false;

    constructor() {
		this.initialize(this);
		this.addDependency("Delay", "AutoSS Toggle");
		this.addDependency("Auto Start", "AutoSS Toggle")
		this.addDependency("No Rotate", "AutoSS Toggle")
		this.addDependency("Auto Twilight Command", "&5Auto Twilight")
		this.addDependency("Reaper Armor Slot", "&cReaper &0Armor Swap")
	}
}

export default new Settings();
