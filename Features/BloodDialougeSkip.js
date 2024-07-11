/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


import Settings from "../Settings"

const Chat = register("chat", () => {
    if (!Settings.BloodDialougeSkip) return
    const StartTime = new Date().getTime()
    const BloodTimer = 24_000
    const BloodTitle = new Text(`&a${BloodTimer}`,
        Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth(`${BloodTimer}`)*5) / 2,  // X
        Renderer.screen.getHeight() / 2 - Renderer.screen.getHeight() / 4)                  // Y
        .setShadow(true).setFormatted(true).setScale(5)                                     // Shadow + Scale

    const RenderTrigger = register("renderOverlay", () => {
        const TimeLeft = ((BloodTimer - (new Date().getTime() - StartTime))/1000).toFixed(2)
        BloodTitle.setString(TimeLeft > 18 ? `&a${TimeLeft}` : TimeLeft > 10 ? `&e${TimeLeft}` : TimeLeft > 5 ? `&c${TimeLeft}` : `&4${TimeLeft}`)
        BloodTitle.setX(Renderer.screen.getWidth() / 2 - (Renderer.getStringWidth(`${TimeLeft}`)*5) / 2)
        BloodTitle.draw()
        if (TimeLeft <= 0) { Chat.register(); RenderTrigger.unregister() }
    }).unregister()

    RenderTrigger.register()
    Chat.unregister()

}).setCriteria("The BLOOD DOOR has been opened!")

