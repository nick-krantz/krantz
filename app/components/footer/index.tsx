import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi'
import { Icon } from '../icons'

export const Footer: React.FC = () => (
  <div className="flex p-5 my-0 mx-auto max-w-sm w-full justify-around">
    <a
      href="mailto:krantznicholas@gmail.com"
      className="transition-transform duration-300 hover:scale-125"
      aria-label="Shoot me an email"
    >
      <Icon Icon={FiMail} />
    </a>
    <a
      href="https://github.com/nick-krantz"
      className="transition-transform duration-300 hover:scale-125"
      aria-label="Check out my GitHub"
    >
      <Icon Icon={FiGithub} />
    </a>
    <a
      href="https://www.linkedin.com/in/nicholaskrantz/"
      className="transition-transform duration-300 hover:scale-125"
      aria-label="Connect on LinkedIn"
    >
      <Icon Icon={FiLinkedin} />
    </a>
    <a
      href="https://twitter.com/nick__krantz"
      className="transition-transform duration-300 hover:scale-125"
      aria-label="Follow me on Twitter"
    >
      <Icon Icon={FiTwitter} />
    </a>
  </div>
)
