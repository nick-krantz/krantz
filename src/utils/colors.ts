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
  const hexRegex = new RegExp(/^([0-9A-F]{3}){1,2}$/i);
  const hex = h.replace("#", "");
  return hexRegex.test(hex);
};

/**
 * Takes a hex value and returns the 6 character representation with a leading #.
 */
export const standardizeHEX = (hex: string): string => {
  const h = hex.replace("#", "");
  return h.length === 3
    ? `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`
    : `#${h}`;
};

/**
 * Converts an RGB(A) string into array if valid otherwise null
 *
 * @returns [red, green, blue] or [red, green, blue, alpha]
 */
export const rgbToRGBArray = (
  rgb: string,
): [number, number, number] | [number, number, number, number] | null => {
  const rgbArr = rgb.split(",");

  if (rgbArr.length === 3 || rgbArr.length === 4) {
    const [redStr, greenStr, blueStr, alphaStr] = rgbArr;
    const red = parseInt(redStr, 10);
    const green = parseInt(greenStr, 10);
    const blue = parseInt(blueStr, 10);

    if (alphaStr) {
      const alpha = parseFloat(alphaStr);
      if ([red, green, blue, alpha].filter(isNaN).length) return null;
      return [red, green, blue, alpha];
    }

    if ([red, green, blue].filter(isNaN).length) return null;

    return [red, green, blue];
  }

  return null;
};

/**
 * Converts RGB/RGBA value to the HEX representation.
 *
 * Returns null if invalid inputs are given for any RGB input.
 */
export const RGBToHEX = (
  r: number,
  g: number,
  b: number,
  a?: number,
): string | null => {
  const allValidRGBInputs = [r, g, b].reduce((accum, color) => {
    return accum && color >= 0 && color <= 255;
  }, true);

  // Check for valid RGB inputs
  if (!allValidRGBInputs) return null;

  // Check for valid alpha value if defined
  if (a && (a < 0 || a > 1)) return null;

  let red = Math.round(r).toString(16);
  let green = Math.round(g).toString(16);
  let blue = Math.round(b).toString(16);
  let alpha = a !== undefined ? Math.round(a * 255).toString(16) : "";

  if (red.length === 1) red = "0" + red;
  if (green.length === 1) green = "0" + green;
  if (blue.length === 1) blue = "0" + blue;
  if (alpha.length === 1) alpha = "0" + alpha;

  return "#" + red + green + blue + alpha;
};

/**
 * Converts a HEX string into an RGB string
 */
export const HEXtoRGB = (h: string): string | null => {
  const hex = h.replace("#", "");
  let red = "";
  let green = "";
  let blue = "";

  if (hex.length === 3) {
    // 3 digits
    red = "0x" + hex[0] + hex[0];
    green = "0x" + hex[1] + hex[1];
    blue = "0x" + hex[2] + hex[2];
  } else if (hex.length === 6) {
    // 6 digit inputs
    red = "0x" + hex[0] + hex[1];
    green = "0x" + hex[2] + hex[3];
    blue = "0x" + hex[4] + hex[5];
  } else {
    // Can't handle other length inputs
    return null;
  }

  if ([+red, +green, +blue].filter(isNaN).length) {
    return null;
  }

  return `${+red},${+green},${+blue}`;
};

/**
 * Adjusts the color to another tint or shade
 *
 * @param color base HEX color to start with
 * @param increment increment between 0 & 10 to alter the color
 * @param tintOrShade darken (tint) or brighten (shade) the color
 * @returns
 */
export function adjustColor(
  color: string,
  increment: number,
  tintOrShade: "shade" | "tint",
): string | null {
  const rgbString = HEXtoRGB(color);
  if (!rgbString) return null;

  const rgbArray = rgbToRGBArray(rgbString);
  if (!rgbArray) return null;

  if (tintOrShade === "shade") return shadeRGB(rgbArray, increment);

  return tintRGB(rgbArray, increment);
}

/**
 * Darken RGB color based on the given increment
 *
 * (Increments assumed to be 0 - 10)
 */
function shadeRGB(
  rgbArray: [number, number, number] | [number, number, number, number],
  increment: number,
): string | null {
  const r = rgbArray[0] * (1 - 0.1 * increment);
  const g = rgbArray[1] * (1 - 0.1 * increment);
  const b = rgbArray[2] * (1 - 0.1 * increment);

  return RGBToHEX(r, g, b);
}

/**
 * Lighten RGB color based on the given increment
 *
 * (Increments assumed to be 0 - 10)
 */
function tintRGB(
  rgbArray: [number, number, number] | [number, number, number, number],
  increment: number,
): string | null {
  const r = rgbArray[0] + (255 - rgbArray[0]) * increment * 0.1;
  const g = rgbArray[1] + (255 - rgbArray[1]) * increment * 0.1;
  const b = rgbArray[2] + (255 - rgbArray[2]) * increment * 0.1;

  return RGBToHEX(r, g, b);
}
