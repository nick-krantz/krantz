import { MetaFunction } from '@remix-run/react'
import { useEffect } from 'react'
import { Logo } from '~/components/logo'
import { changeCaretColor } from '~/utils/change-caret-color'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Nick Krantz',
      description:
        'Krantz.app - A website built with React & Remix to utilize some functionality for my everyday life.',
    },
  ]
}

export default function Index() {
  useEffect(() => {
    window.addEventListener('mousemove', changeCaretColor)
    window.addEventListener('touchmove', changeCaretColor)

    return () => {
      window.removeEventListener('mousemove', changeCaretColor)
      window.removeEventListener('touchmove', changeCaretColor)
    }
  }, [])

  return (
    <div className="flex h-full justify-center align-center w-full">
      <Logo />
    </div>
  )
}
