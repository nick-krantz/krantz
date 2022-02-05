import { LoaderFunction, MetaFunction, useLoaderData, Link } from 'remix'
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

/**
 * About Page
 */
export default function About() {
  const { authorized } = useLoaderData()

  const anchorClass = 'underline decoration-2'

  return (
    <>
      <Header authorized={authorized} title="About" />
      <section className="mt-20 px-4 mx-auto max-w-2xl">
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
      </section>
      <section className="mt-20 px-4 mx-auto max-w-2xl">
        <h2>Why does krantz.app exist?</h2>
        <p>
          You can learn a lot about new technologies by reading the docs and watching keynotes, I've always felt that I
          can learn more by actually using them. Each iteration of my personal website (this is #4) starts with wanting
          to learn something new. That something new was{' '}
          <a href="https://remix.run/" className={anchorClass}>
            Remix
          </a>
          , a new(ish) web framework that is paired with React. Along with Remix, I also threw in learning{' '}
          <a href="https://supabase.com/" className={anchorClass}>
            Supabase
          </a>
          ,{' '}
          <a href="https://tailwindcss.com/" className={anchorClass}>
            Tailwind
          </a>{' '}
          and{' '}
          <a href="https://vercel.com/" className={anchorClass}>
            Vercel
          </a>
          .
        </p>
        <p>
          I also come across small ideas for apps that I find useful in day to day life. Regardless of whether or not
          they already exist, it is a fun challenge to build them myself. Storing online recipes and{' '}
          <Link to="../color" className={anchorClass}>
            Converting Colors
          </Link>{' '}
          are the two that I've currently built. To sum that up, it is my own playground to mess around with new
          technologies and hopefully be useful in the process!
        </p>
        <h3>4 personal website iterations?</h3>
        <p>
          Absolutely, the first product of anything is never the best thing. New technologies come with new lessons to
          apply to the next project. The next project just happens to be the same product with some minor changes. I've
          built the previous three versions with Angular, React and vanilla HTML, CSS, and JS.
        </p>
      </section>
    </>
  )
}
