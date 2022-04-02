import { useState } from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Field } from '~/components/field'
import { Header } from '~/components/header'
import { HEXtoRGB, isValidHEXValue, RGBToHEX, rgbToRGBArray, standardizeHEX } from '~/utils/colors'
import { authenticated } from '~/utils/supabase/authenticated'

type LoaderData = {
  rgb: string | null
  hex: string | null
  authorized: boolean
}

export const meta: MetaFunction = () => {
  return {
    title: 'Color Converter',
    description: 'Convert colors between their Hexadecimal & RGB representation',
  }
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
  } else if (rgbArr?.length === 3 || rgbArr?.length === 4) {
    const [r, g, b, a] = rgbArr
    return RGBToHEX(r, g, b, a) ?? fallbackHEXColor
  }

  return (
    RGBToHEX(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)) ??
    fallbackHEXColor
  )
}

/**
 * Returns HEX and RGB query params
 */
export const loader: LoaderFunction = ({ request }) => {
  return authenticated(request, false, ({ authorized }) => {
    const url = new URL(request.url)
    const rgb = url.searchParams.get('rgb')
    const hex = url.searchParams.get('hex')

    return Promise.resolve({ hex, rgb, authorized })
  })
}

export default function Color() {
  const { hex, rgb, authorized } = useLoaderData<LoaderData>()
  const defaultColor = getDefaultColor(hex, rgb)

  const [color, setColor] = useState<string>(defaultColor)

  const hexChange = (hex: string): void => {
    const hexString = hex.replace('#', '')

    if (isValidHEXValue(hexString)) {
      const newHex = standardizeHEX(hex)
      setColor(newHex)
      setFieldValue('#hex-input', newHex)
    } else {
      setFieldValue('#rgb-input', color)
    }
  }

  const rgbChange = (rgb: string): void => {
    const rgbArr = rgbToRGBArray(rgb)
    if (rgbArr) {
      const [red, green, blue, alpha] = rgbArr
      const hex = RGBToHEX(red, green, blue, alpha)
      setColor(hex ?? fallbackRGBColor)
      setFieldValue('#hex-input', hex ?? fallbackRGBColor)
    } else {
      setFieldValue('#rgb-input', HEXtoRGB(color) ?? fallbackRGBColor)
    }
  }

  return (
    <div className="flex flex-col">
      <Header authorized={authorized} title="Convert Colors" />
      <div className="flex flex-col text-center max-w-2xl mx-auto gap-8 w-full">
        <section className="text-left">
          <h2 className="text-2xl">Usage:</h2>
          <p>Enter a HEX, RGB, or RGBA value to convert the color to the other format.</p>
          <br />
          <p>
            This can be via the URL using query params: <br />
            <code>/color?hex=323299</code> <br />
            <code>/color?rgb=233,123,9</code> <br />
            <code>/color?rgb=22,123,229,.45</code> <br />
          </p>
        </section>
        <div
          className="w-full max-w-full h-48 border-solid border-2 border-gray-800 dark:border-gray-200 rounded-md"
          style={{ backgroundColor: color }}
        ></div>
        <div className="flex flex-wrap gap-4 w-full">
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
            RGB / RGBA
          </Field>
        </div>
      </div>
    </div>
  )
}
