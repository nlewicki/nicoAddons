register(`renderSlot`, (slot, gui, event) => {
    cancel(event)
    Renderer.drawStringWithShadow(slot.getIndex(), slot.getDisplayX() -(Renderer.getStringWidth(slot.getIndex().toString()) /2 ) + 8 , slot.getDisplayY()+4)
})