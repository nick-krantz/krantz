import { HTMLMotionProps, motion } from 'framer-motion'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Burger } from '~/types'
import { supabase } from '~/utils/supabase/index.server'

type LoaderData = {
  burgers: Burger[] | null
}

export const meta: MetaFunction = () => {
  return {
    title: 'Nick Krantz - Favorite Burgers',
    description: "A list of the best burgers I've ever ate.",
  }
}

export const loader: LoaderFunction = async () => {
  const { data: burgers } = await supabase.from<Burger>('burgers').select()
  burgers?.sort((a, b) => a.rank - b.rank)
  return { burgers }
}

const staggerChildrenVariants: HTMLMotionProps<'ul'>['variants'] = {
  open: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: 1,
    },
  },
}

const itemVariants = (direction: 1 | -1): HTMLMotionProps<'li'>['variants'] => {
  return {
    closed: { opacity: 0, translateX: -200 * direction, transition: { duration: 0.5 } },
    open: { opacity: 1, translateX: 0, transition: { duration: 0.5 } },
  }
}

/**
 * Burger page
 */
export default function Burgers() {
  const { burgers } = useLoaderData<LoaderData>()

  return (
    <>
      <div className="flex flex-col max-w-2xl mx-auto gap-8 w-full">
        <p className="text-center">
          I've thought more than once that I've had the best burger, so I started to track all of them. Why put it
          online? Because version control is cool and this is far more easier to maintain than a piece of paper.
        </p>
        {!!burgers && (
          <motion.ol
            className="list-decimal marker:text-3xl"
            initial="closed"
            animate="open"
            variants={staggerChildrenVariants}
          >
            {burgers.map((burger, i) => (
              <motion.li key={burger.id} className="pb-2 ml-7" variants={itemVariants(i % 2 === 0 ? 1 : -1)}>
                <h4 className="text-3xl	">{burger.name}</h4>
                <a href={burger.url} className="underline">
                  {burger.restaurant} - {burger.location}
                </a>
                <p>{burger.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </>
  )
}
