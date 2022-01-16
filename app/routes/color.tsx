import { useState } from 'react'
import { FiHome } from 'react-icons/fi'
import { Link, LoaderFunction, useLoaderData } from 'remix'
import { Field } from '~/components/field'
import { Header } from '~/components/header'
import { Icon } from '~/components/icon'
import { HEXtoRGB, isValidHEXValue, RGBToHEX, rgbToRGBArray, standardizeHEX } from '~/utils/colors'

type LoaderData = {
  rgb: string | null
  hex: string | null
}

/**
 * These shouldn't be needed but used to make TypeScript happy.
 */
const fallbackHEXColor = '#F08000'
const fallbackRGBColor = '240,128,0'

/**
 * Sets the value of input of the given ID
 */
const setFieldValue = (id: string, hex: string): void => {
  ;(document.querySelector(id) as HTMLInputElement).value = hex
}

/**
 * Returns the default color that should be used.
 *
 * Priority:
 * 1. HEX query param
 * 2. RGB query param
 * 3. random color
 * 4. fallback colors
 */
const getDefaultColor = (hex: string | null, rgb: string | null): string => {
  const rgbArr = rgbToRGBArray(rgb ?? '')
  const hexValue = hex?.replace('#', '') ?? null

  if (hexValue && isValidHEXValue(hexValue)) {
    return standardizeHEX(hexValue)
  } else if (rgbArr?.length === 3) {
    const [r, g, b] = rgbArr
    return RGBToHEX(r, g, b) ?? fallbackHEXColor
  }

  return (
    RGBToHEX(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)) ??
    fallbackHEXColor
  )
}

/**
 * Returns HEX and RGB query params
 */
export const loader: LoaderFunction = ({ request }): LoaderData => {
  const url = new URL(request.url)
  const rgb = url.searchParams.get('rgb')
  const hex = url.searchParams.get('hex')

  return { hex, rgb }
}

export default function Color() {
  const { hex, rgb } = useLoaderData<LoaderData>()
  const defaultColor = getDefaultColor(hex, rgb)

  const [color, setColor] = useState<string>(defaultColor)

  const hexChange = (hex: string): void => {
    const hexString = hex.replace('#', '')

    if (isValidHEXValue(hexString)) {
      const newHex = standardizeHEX(hex)
      setColor(newHex)
      setFieldValue('#hex-input', newHex)
    } else {
      setFieldValue('#hex-input', color)
    }
  }

  const rgbChange = (rgb: string): void => {
    const rgbArr = rgbToRGBArray(rgb)
    if (rgbArr) {
      const [red, green, blue] = rgbArr
      const hex = RGBToHEX(red, green, blue)
      setColor(hex ?? fallbackRGBColor)
      setFieldValue('#hex-input', hex ?? fallbackRGBColor)
    } else {
      setFieldValue('#rgb-input', HEXtoRGB(color) ?? fallbackRGBColor)
    }
  }

  return (
    <div className="flex flex-col">
      <Header title="Convert Colors">
        <Link to="/" aria-label="link to home">
          <Icon Icon={FiHome} />
        </Link>
      </Header>
      <div className="flex flex-col text-center max-w-md mx-auto gap-8 w-full">
        <h2 className="text-xl">RGB to HEX to RGB</h2>
        <div
          className="w-full h-48 border-solid border-2 border-white rounded-md"
          style={{ backgroundColor: color }}
        ></div>
        <div className="grid grid-cols-2 justify-items-center">
          <Field
            labelProps={{ htmlFor: 'hex-input' }}
            inputProps={{
              type: 'text',
              id: 'hex-input',
              defaultValue: color,
              onBlur: (e) => hexChange(e.target.value),
            }}
          >
            HEX
          </Field>
          <Field
            labelProps={{ htmlFor: 'rgb-input' }}
            inputProps={{
              type: 'text',
              id: 'rgb-input',
              defaultValue: HEXtoRGB(color) ?? fallbackRGBColor,
              onBlur: (e) => rgbChange(e.target.value),
            }}
          >
            RGB
          </Field>
        </div>
      </div>
    </div>
  )
}
