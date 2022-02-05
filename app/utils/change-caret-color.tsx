type ConfigIndicator = 0 | 1 | -1 | 100
type Partitions = { red: ConfigIndicator; green: ConfigIndicator; blue: ConfigIndicator }

/**
 * Based on the mouse/touch position change the color of the carets
 */
export function changeCaretColor(e: MouseEvent | TouchEvent) {
  const body = document.querySelector('body')
  // Skip color change if menu is open
  if (body?.classList.contains('menu-open')) return

  // 1/6 of the screen width
  const widthSixth = Math.ceil(window.innerWidth / 6)
  //  Max RGB value
  const rgbMax = 255

  /**
   * Config for each of the 6 partitions
   * 100 - color should be 255
   * 1 - color is increasing (0 to 255)
   * -1 - color is decreasing (255 to 0)
   * 0 - color should be zero
   */
  const config: { [key: number]: Partitions } = {
    0: { red: 100, green: 1, blue: 0 },
    1: { red: -1, green: 100, blue: 0 },
    2: { red: 0, green: 100, blue: 1 },
    3: { red: 0, green: -1, blue: 100 },
    4: { red: 1, green: 0, blue: 100 },
    5: { red: 100, green: 0, blue: -1 },
  }

  /**
   * Returns the RGB value based on the percentage & config property
   */
  function getRGBValue(configProperty: ConfigIndicator, percentage: number): number {
    if (configProperty === 0) return 0
    if (configProperty === 100) return rgbMax

    // Value is increasing
    if (configProperty === 1) {
      return Math.floor(rgbMax * percentage)
    }

    // Value is decreasing
    return rgbMax - Math.floor(rgbMax * percentage)
  }

  let x

  // distinguish between event types
  if ('offsetX' in e) {
    x = e.offsetX
  } else {
    x = e.touches?.length && e.touches[0].clientX >= 0 ? e.touches[0].clientX : 0
  }

  // Get partition of x value
  const partition = Math.floor(x / widthSixth)
  // Select partition config
  const partitionConfig = config[partition]

  // Determine percentage of partition
  const percentage = +((x - partition * widthSixth) / widthSixth).toFixed(2)

  // Get RGB values based on the percentage for the current partition
  const red = getRGBValue(partitionConfig.red, percentage)
  const green = getRGBValue(partitionConfig.green, percentage)
  const blue = getRGBValue(partitionConfig.blue, percentage)

  // Set fill of svg image
  const rgb = `rgb(${red}, ${green}, ${blue})`
  document.querySelectorAll('.caret').forEach((caret) => {
    ;(caret as HTMLElement).setAttribute('style', `stroke:${rgb};`)
  })
}
