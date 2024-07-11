/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

//inspired by Noamm9

import Settings from "../Settings"


const InfoText = new Text(` `).setShadow(true).setFormatted(true).setScale(2)
const TypeText = new Text(` `).setShadow(true).setFormatted(true).setScale(2)
const MsTime = 4_000

const TermCrystalRegex = /activated a terminal! \((\d+\/\d+)\)|completed a device! \((\d+\/\d+)\)|activated a lever! \((\d+\/\d+)\)|(\d+\/\d+) Energy Crystals are now active!/
const progressRegex = /\d+\/\d+/

let Type
let Progress
let StartTime


const replacements = [
	{ key: "1/7", value: "&c1&r/&a7" },
	{ key: "1/8", value: "&c1&r/&a8" },
	{ key: "1/2", value: "&c1&r/&b2" },
	{ key: "2/8", value: "&c2&r/&a8" },
	{ key: "2/7", value: "&c2&r/&a7" },
	{ key: "2/2", value: "&b2&r/&b2" },
	{ key: "3/", value: "&c3&r/&a" },
	{ key: "4/", value: "&c4&r/&a" },
	{ key: "5/", value: "&c5&r/&a" },
	{ key: "6/", value: "&c6&r/&a" },
	{ key: "7/8", value: "&c7&r/&a8" },
	{ key: "7/7", value: "&6&l7&r&l/&6&l7" },
	{ key: "8/8", value: "&6&l8&r&l/&6&l8" },
]

function ColorTerminalInfo(Progress) {
	let result = Progress;

	replacements.forEach(replacement => result = result.replace(replacement.key, replacement.value))

	return result;
}


const StartRegister = register(`chat`, (event) => {
	let msg = ChatLib.getChatMessage(event, false)

	let IdkWhatToNameThis = msg.match(TermCrystalRegex)
	if (!IdkWhatToNameThis) return

	IdkWhatToNameThis = IdkWhatToNameThis.join(``)

	Progress = IdkWhatToNameThis.match(progressRegex).join()
	if (!Progress) return


	if (IdkWhatToNameThis.includes(`device`)) Type = `Dev`

	if (IdkWhatToNameThis.includes(`lever`)) Type = `Lever`

	if (IdkWhatToNameThis.includes(`terminal`)) Type = `Term`

	if (IdkWhatToNameThis.includes(`Crystal`)) Type = ` `



	StartTime = new Date().getTime()
	RenderTrigger.register()

}).unregister()



let RenderTrigger = TriggerRegister.registerRenderOverlay(() => {
	let TimeLeft = MsTime - (new Date().getTime() - StartTime);


  	let TitleString = `&r(${ColorTerminalInfo(Progress)}&r)`;


	InfoText.setX(Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(TitleString.removeFormatting()))
	InfoText.setY(Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 13)
	InfoText.setString(TitleString)
	InfoText.draw()

	TypeText.setX(Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(Type))
	TypeText.setY(Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 25)
	TypeText.setString(`&d${Type}&r`)
	TypeText.draw()


    if (TimeLeft <= 0) {
		RenderTrigger.unregister()
	}

}).unregister();


const HideTitles = register(`renderTitle`, (t, subt, event) => cancel(event)).unregister()



register(`chat`, (e) => {
	if (!Settings.CleanTitles) return

	const ChatMessage = ChatLib.getChatMessage(e, false)

	if (ChatMessage.includes(`[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!`) || ChatMessage.includes(`[BOSS] Storm: I should have known that I stood no chance.`)) {
		HideTitles.register()
		StartRegister.register()
	}

	if (ChatMessage.includes(`[BOSS] Maxor: I'M TOO YOUNG TO DIE AGAIN!`) || ChatMessage.includes(`[BOSS] Goldor: You have done it`)) {
		HideTitles.unregister()
		StartRegister.unregister()
	}

})

register(`worldLoad`, () => {
	HideTitles.unregister()
	StartRegister.unregister()
})
