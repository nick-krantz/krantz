import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Header } from '~/components/header'
import { authenticated } from '~/utils/supabase/authenticated'

export const meta: MetaFunction = () => {
  return {
    title: 'About - Krantz.app',
    description: 'The who, what, why, when, where, and how of Krantz.app',
  }
}

export const loader: LoaderFunction = ({ request }) => {
  return authenticated(request, false, ({ authorized }) => {
    return Promise.resolve({ authorized })
  })
}

const technologies: { key: string; title: string; items: { name: string; link: string; image: string }[] }[] = [
  {
    key: 'pfl',
    title: 'Platforms / Frameworks / Libraries',
    items: [
      { name: 'React', link: 'https://reactjs.org/', image: 'react.png' },
      { name: 'Remix', link: 'https://remix.run/', image: 'remix.png' },
      { name: 'Angular', link: 'https://angular.io/', image: 'angular.png' },
      { name: 'Capacitor', link: 'https://capacitorjs.com/', image: 'capacitor.png' },
    ],
  },
  {
    key: 'sui',
    title: 'Styling / UI',
    items: [
      { name: 'SCSS', link: 'https://sass-lang.com/', image: 'sass.png' },
      { name: 'Tailwind CSS', link: 'https://tailwindcss.com/', image: 'tailwindcss.png' },
      { name: 'Framer Motion', link: 'https://www.framer.com/motion/', image: 'framer-motion.png' },
    ],
  },
  {
    key: 'oth',
    title: 'Other',
    items: [
      { name: 'Supabase', link: 'https://supabase.com/', image: 'supabase.png' },
      { name: 'Vercel', link: 'https://vercel.com/', image: 'vercel.png' },
      { name: 'Firebase', link: 'https://firebase.google.com/', image: 'firebase.png' },
    ],
  },
]

const anchorClass = 'underline decoration-2 flex items-center gap-4'
const imageClass = 'max-h-8 max-w-[2rem]'

/**
 * About Page
 */
export default function About() {
  const { authorized } = useLoaderData()

  return (
    <>
      <Header authorized={authorized} title="About" />
      <section className="mt-16 px-4 mx-auto max-w-2xl">
        <h2>About me</h2>
        <p>Hi, I'm Nick and I love to build things.</p>
        <p>
          Taking an idea, designing, building, failing, starting over, iterating is all part of the process of getting
          to the end product and the feeling of completion and satisfaction.
        </p>
        <p>
          In high school that took its form through Wood Shop and Ceramics. Take an idea and either use wood or clay to
          create something function that can be used by someone else. In college, I took my interest of technology and
          started coding. The same overall process applies to software: idea, design, fail, go back, repeat, until the
          code works. That end process is a little different as software isn't as tangible as a wooden box or ceramic
          water fountain, but that feeling of completion and satisfaction is still the same.
        </p>
        <p>
          You can find me on{' '}
          <a href="https://twitter.com/nick__krantz" className="underline decoration-2">
            Twitter
          </a>
          ,{' '}
          <a href="https://www.linkedin.com/in/nicholaskrantz/" className="underline decoration-2">
            LinkedIn
          </a>
          ,{' '}
          <a href="https://github.com/nick-krantz" className="underline decoration-2">
            GitHub
          </a>
          , or shoot me an{' '}
          <a href="mailto:nick@krantz.app" className="underline decoration-2">
            email
          </a>
          !
        </p>
      </section>
      <section className="mt-16 px-4 mx-auto max-w-2xl">
        <h2 className="mb-1">Technology</h2>
        <p>
          Here is a subset of the of some of the technologies I'm using or have used. There are more, but the list can
          get long so I only listed some larger ones.
        </p>
        <ul>
          {technologies.map((tech) => (
            <li key={tech.key} className="pb-6">
              <h3>{tech.title}</h3>
              <ul>
                {tech.items.map((item) => (
                  <li key={item.name} className="pl-4 py-1 w-fit">
                    <a href={item.link} className={anchorClass}>
                      <img src={`images/technologies/${item.image}`} alt={`${item.name} logo`} className={imageClass} />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
