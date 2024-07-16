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
		name: "Auto Potion",
		description: "takes out a potion at the start of the dungeon",
		category: "WIP"
	})
	AutoPotion = false;

	@SwitchProperty({
		name: "Reaper Armor Swap",
		description: "Automaticaly swaps to reaper armor, sneaks and swaps back for you",
		category: "WIP"
	})
	ReaperSwap = false;

	@SwitchProperty({
		name: "Short SkyBlock Commands",
		description: "Enables a list of useful short version of skyblock's commands (type /ssbc for help)",
		category: "General"
	})
	ShortSkyBlockCommands = false;

	@SwitchProperty({
		name: "Blood Dialogue Skip",
		description: "Makes a timer for 24 seconds after you open the blood room",
		category: "General"
	})
	BloodDialougeSkip = false;

	@SwitchProperty({
		name: "Clean F7 Titles",
		description: "Makes Terminal and Crystal titles clean",
		category: "General"
	})
	CleanTitles = false;

	@SwitchProperty({
		name: "Auto refill Ender Pearls",
		description: "Auto refills enderpearls at start of the dungeon",
		category: "General"
	})
	AutoRefillEnderPearls = false;

    @SwitchProperty({
        name: "Auto4",
        description: "Toggle Auto4 feature on or off",
        category: "F7 Devices (pretty slow) DONT USE"
    })
    auto4 = false;

	@SwitchProperty({
		name: "AutoSS Toggle",
		description: "Toggle AutoSS (breaks sometimes) DONT USE",
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
	}
}

export default new Settings();
