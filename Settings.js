import {  @ButtonProperty, @PercentSliderProperty, @CheckboxProperty, @ColorProperty, @SelectorProperty, @SwitchProperty, @Vigilant, @SliderProperty, @TextProperty, Color } from "../Vigilance"

@Vigilant("nicoAddons", "Nico Addons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    @SwitchProperty({
        name: "Auto4",
        description: "Toggle Auto4 feature on or off",
        category: "General"
    })
    auto4 = false;

    constructor() {
		this.initialize(this);
	}
}

export default new Settings();
