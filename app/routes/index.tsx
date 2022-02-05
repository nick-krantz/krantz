import { useEffect } from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Header } from '~/components/header'
import { Logo } from '~/components/logo'
import { changeCaretColor } from '~/utils/change-caret-color'
import { authenticated } from '~/utils/supabase/authenticated'

export const meta: MetaFunction = () => {
  return {
    title: 'Krantz',
    description: 'Krantz',
  }
}

export const loader: LoaderFunction = ({ request }) => {
  return authenticated(request, false, ({ authorized }) => {
    return Promise.resolve({ authorized })
  })
}

export default function Index() {
  const { authorized } = useLoaderData<{ authorized: boolean }>()

  useEffect(() => {
    window.addEventListener('mousemove', changeCaretColor)
    window.addEventListener('touchmove', changeCaretColor)

    return () => {
      window.removeEventListener('mousemove', changeCaretColor)
      window.removeEventListener('touchmove', changeCaretColor)
    }
  }, [])

  return (
    <div className="flex flex-col h-full">
      <Header authorized={authorized} />
      <div className="flex h-full">
        <div className="flex justify-center align-center w-full">
          <Logo />
        </div>
      </div>
    </div>
  )
}
