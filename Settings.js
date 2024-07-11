import {  @ButtonProperty, @PercentSliderProperty, @CheckboxProperty, @ColorProperty, @SelectorProperty, @SwitchProperty, @Vigilant, @SliderProperty, @TextProperty, @NumberProperty, Color } from "../Vigilance"

@Vigilant("nicoAddons", "Nico Addons", {
    getCategoryComparator: () => (a, b) => {
        const categories = [
			"General",
            "Auto4",
            "AutoSS"
        ];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
	@SwitchProperty({
		name: "Auto refill Ender Pearls",
		description: "Auto refills enderpearls at start oft he dungeon",
		category: "General"
	})
	AutoRefillEnderPearls = false;

    @SwitchProperty({
        name: "Auto4",
        description: "Toggle Auto4 feature on or off",
        category: "Auto4"
    })
    auto4 = false;

	@SwitchProperty({
		name: "Toggle",
		description: "Toggle AutoSS",
		category: "AutoSS"
	})
	enabled = false;

	@NumberProperty({
		name: "Delay",
		category: "AutoSS",
		min: 0,
		max: 2147483647,
		increment: 10
	})
	delay = 250;

	@TextProperty({
		name: "Auto Start",
		category: "AutoSS"
	})
	autoStart = "";

	@SwitchProperty({
		name: "No Rotate",
		category: "AutoSS",
	})
	noRotate = false;

    constructor() {
		this.initialize(this);
	}
}

export default new Settings();
