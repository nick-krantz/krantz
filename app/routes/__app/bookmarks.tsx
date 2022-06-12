import { Link, LoaderFunction, MetaFunction, Outlet, useLoaderData } from 'remix'
import { Button } from '~/components/button'
import { Header } from '~/components/header'
import { Bookmark } from '~/types'
import { authenticated } from '~/utils/supabase/authenticated'
import { supabase } from '~/utils/supabase/index.server'

type LoaderData = {
  bookmarks: Bookmark[] | null
  authorized: boolean
}

export const meta: MetaFunction = () => {
  return {
    title: 'Nick Krantz - Bookmarks',
    description: 'Personal bookmark storage',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  return authenticated(request, true, async ({ authorized }) => {
    const { data: bookmarks } = await supabase.from<Bookmark>('bookmarks').select()
    return { bookmarks, authorized }
  })
}

/**
 * Bookmark page
 */
export default function Bookmarks() {
  const { bookmarks, authorized } = useLoaderData<LoaderData>()

  const categories = bookmarks
    ?.reduce((accum: string[], bookmark) => {
      if (!accum.includes(bookmark.category)) {
        accum.push(bookmark.category)
      }
      return accum
    }, [])
    .sort()

  return (
    <>
      <Header authorized={authorized} title="Bookmarks" />
      <div className="max-w-screen-md mx-auto mb-6">
        <Link to="./add">
          <Button>Add Bookmark</Button>
        </Link>
      </div>
      {categories?.map((category) => (
        <div className="max-w-screen-md mx-auto mb-6" key={category}>
          <h3 className="capitalize">{category}</h3>
          <ul className="marker:text-sky-400 list-disc pl-5 space-y-3">
            {bookmarks
              ?.filter((b) => b.category === category)
              .map((bookmark) => (
                <li key={bookmark.url}>
                  <a href={bookmark.url} target="_blank" className="hover:underline">
                    {bookmark.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
      <Outlet />
    </>
  )
}
