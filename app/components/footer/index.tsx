import { HTMLMotionProps, motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi'
import { Icon } from '../icon'

const anchorMotion: HTMLMotionProps<'a'> = {
  whileHover: { scale: 1.2 },
  whileTap: { scale: 0.95 },
  initial: { y: '40px' },
  animate: { y: 0 },
  transition: { type: 'spring', bounce: 0.5 },
}

export const Footer: React.FC = () => (
  <div className="flex p-5 my-0 mx-auto max-w-sm w-full justify-around">
    <motion.a href="mailto:nick@krantz.app" aria-label="Shoot me an email" {...anchorMotion}>
      <Icon Icon={FiMail} />
    </motion.a>
    <motion.a href="https://github.com/nick-krantz" aria-label="Check out my GitHub" {...anchorMotion}>
      <Icon Icon={FiGithub} />
    </motion.a>
    <motion.a href="https://www.linkedin.com/in/nicholaskrantz/" aria-label="Connect on LinkedIn" {...anchorMotion}>
      <Icon Icon={FiLinkedin} />
    </motion.a>
    <motion.a href="https://twitter.com/nick__krantz" aria-label="Follow me on Twitter" {...anchorMotion}>
      <Icon Icon={FiTwitter} />
    </motion.a>
  </div>
)
