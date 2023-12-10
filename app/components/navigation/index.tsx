import { Link } from '@remix-run/react'
import { HTMLMotionProps, motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { FiBookmark, FiPenTool } from 'react-icons/fi'
import { Icon } from '../icon'
import { BurgerIcon } from '../icon/burger'
import { RecipeIcon } from '../icon/recipe'

const anchorMotion: HTMLMotionProps<'a'> = {
  whileHover: { scale: 1.2 },
  whileTap: { scale: 0.95 },
  initial: { y: '40px' },
  animate: { y: 0 },
  transition: { type: 'spring', bounce: 0.5 },
}
type NavigationProps = {
  authorized: boolean
}
export const Navigation: React.FC<NavigationProps> = ({ authorized }) => {
  return (
    <nav className="flex p-5 my-0 mx-auto max-w-sm w-full justify-around">
      <BurgerLink {...anchorMotion} />
      <ColorLink {...anchorMotion} />
      {authorized && <RecipeLink {...anchorMotion} />}
      {authorized && <BookMarksLink {...anchorMotion} />}
    </nav>
  )
}

const BurgerLink = motion(
  forwardRef<HTMLAnchorElement>((props, ref) => (
    <Link to="/burgers" ref={ref} {...props} aria-label="The best burgers I've ever had">
      <BurgerIcon />
    </Link>
  )),
)

const ColorLink = motion(
  forwardRef<HTMLAnchorElement>((props, ref) => (
    <Link to="/color" ref={ref} {...props} aria-label="Color coverter">
      <Icon Icon={FiPenTool} />
    </Link>
  )),
)

const RecipeLink = motion(
  forwardRef<HTMLAnchorElement>((props, ref) => (
    <Link to="/recipes" ref={ref} {...props} aria-label="recipes">
      <Icon Icon={RecipeIcon} />
    </Link>
  )),
)

const BookMarksLink = motion(
  forwardRef<HTMLAnchorElement>((props, ref) => (
    <Link to="/bookmarks" ref={ref} {...props} aria-label="bookmarks">
      <Icon Icon={FiBookmark} />
    </Link>
  )),
)
