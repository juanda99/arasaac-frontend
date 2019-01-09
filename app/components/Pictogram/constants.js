/* eslint no-mixed-operators: 0 */
export const THIN = 10
export const MEDIUM = 20
export const THICK = 40
export const CANVAS_SIZE = 500
export const CAPTION_SIZE = 50
export const ICON_SIZE = 55
export const getPictoSize = (topCaption, buttonCaption) => {
  let pictoSize = CANVAS_SIZE
  // increase canvasSize if topCaption
  pictoSize = topCaption ? pictoSize + CAPTION_SIZE : pictoSize
  // increase pictoSize if buttonCaption
  pictoSize = buttonCaption ? pictoSize + CAPTION_SIZE : pictoSize
  return pictoSize
}
