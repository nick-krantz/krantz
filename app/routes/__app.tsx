import { LoaderFunction, Outlet, useLoaderData } from 'remix'
import { Header } from '~/components/header'
import { Navigation } from '~/components/navigation'
import { authenticated } from '~/utils/supabase/authenticated'

export const loader: LoaderFunction = ({ request }) => {
  return authenticated(request, ({ authorized }) => {
    return Promise.resolve({ authorized })
  })
}

export default function Index() {
  const { authorized } = useLoaderData<{ authorized: boolean }>()

  return (
    <div className="flex flex-col h-full">
      <Header authorized={authorized} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Navigation authorized={authorized} />
    </div>
  )
}
