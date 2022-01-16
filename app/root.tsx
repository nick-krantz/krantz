import { LinksFunction, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from 'remix'
import { Footer } from '~/components/footer'
import globalStylesUrl from '~/styles/global.css'
import { Header } from './components/header'
import styles from './tailwind.css'

// https://remix.run/api/app#links
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl },
    { rel: 'stylesheet', href: styles },
    { rel: 'apple-touch-icon', href: 'logo192.png' },
    { rel: 'manifest', href: 'manifest.json' },
    {
      rel: 'icon',
      href: 'favicon-dark.ico',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      href: 'favicon-light.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      href: 'favicon.ico',
      media: '(prefers-color-scheme: no-preference)',
    },
  ]
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <Layout>
        <Header authorized={false}></Header>
        <div className="flex items-center justify-center flex-col h-full">
          <h1 className="text-3xl font-semibold">There was an error</h1>
          <p>Use the menu or your browsers back button to return to your last page.</p>
          <br></br>
          <code>Error: {error.message}</code>
        </div>
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch()
  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <Header authorized={false}></Header>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-3xl font-semibold">
            {caught.status}: {caught.statusText}
          </h1>
        </div>
      </Layout>
    </Document>
  )
}

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#e5e7eb" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
