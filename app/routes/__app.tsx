import { LoaderFunction, Outlet, useLoaderData } from 'remix'
import { Header } from '~/components/header'
import { Navigation } from '~/components/navigation'
import { authenticated } from '~/utils/supabase/authenticated'

export const loader: LoaderFunction = ({ request }) => {
  return authenticated(request, false, ({ authorized }) => {
    return Promise.resolve({ authorized })
  })
}

export default function Index() {
  const { authorized } = useLoaderData<{ authorized: boolean }>()

  return (
    <div className="grid grid-rows-[80px_auto_72px] h-full">
      <Header authorized={authorized} />
      <Outlet />
      <Navigation authorized={authorized} />
    </div>
  )
}
