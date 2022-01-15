/**
 * Color Utils
 *
 * Some examples used from: https://css-tricks.com/converting-color-spaces-in-javascript/
 */

/**
 * @returns true when input is a valid HEX color string
 *
 * Note: HEX value can be passed with or without a leading #
 */
export const isValidHEXValue = (h: string): boolean => {
  const hexRegex = new RegExp(/^([0-9A-F]{3}){1,2}$/i)
  const hex = h.replace('#', '')
  return hexRegex.test(hex)
}

/**
 * Takes a hex value and returns the 6 character representation with a leading #.
 */
export const standardizeHEX = (hex: string): string => {
  const h = hex.replace('#', '')
  return h.length === 3 ? `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}` : `#${h}`
}

/**
 * Converts an RGB string into array if valid otherwise null
 *
 * @returns [red, green, blue]
 */
export const rgbToRGBArray = (rgb: string): [number, number, number] | null => {
  const rgbArr = rgb.split(',')

  if (rgbArr.length === 3) {
    const [redStr, greenStr, blueStr] = rgbArr
    const red = parseInt(redStr, 10)
    const green = parseInt(greenStr, 10)
    const blue = parseInt(blueStr, 10)

    if ([red, green, blue].filter(isNaN).length) return null

    return [red, green, blue]
  }

  return null
}

/**
 * Converts RGB value to the HEX representation.
 *
 * Returns null if invalid inputs are given for any RGB input.
 */
export const RGBToHEX = (r: number, g: number, b: number): string | null => {
  const allValidInputs = [r, g, b].reduce((accum, color) => {
    return accum && color >= 0 && color <= 255
  }, true)

  if (!allValidInputs) return null

  let red = r.toString(16)
  let green = g.toString(16)
  let blue = b.toString(16)

  if (red.length === 1) red = '0' + red
  if (green.length === 1) green = '0' + green
  if (blue.length === 1) blue = '0' + blue

  return '#' + red + green + blue
}

/**
 * Converts a HEX string into an RGB string
 */
export const HEXtoRGB = (h: string): string | null => {
  const hex = h.replace('#', '')
  let red = ''
  let green = ''
  let blue = ''

  if (hex.length === 3) {
    // 3 digits
    red = '0x' + hex[0] + hex[0]
    green = '0x' + hex[1] + hex[1]
    blue = '0x' + hex[2] + hex[2]
  } else if (hex.length === 6) {
    // 6 digit inputs
    red = '0x' + hex[0] + hex[1]
    green = '0x' + hex[2] + hex[3]
    blue = '0x' + hex[4] + hex[5]
  } else {
    // Can't handle other length inputs
    return null
  }

  if ([+red, +green, +blue].filter(isNaN).length) {
    return null
  }

  return `${+red},${+green},${+blue}`
}
