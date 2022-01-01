import { CSSObject, Flex, Link } from '@chakra-ui/react'
import { EmailIcon } from '../icons/email'
import { GitHubIcon } from '../icons/github'
import { LinkedInIcon } from '../icons/linkedin'
import { TwitterIcon } from '../icons/twitter'

const linkHover: CSSObject = {
  _hover: {
    transform: `scale(1.2)`,
  },
}

export const Footer: React.FC = () => (
  <Flex p="20px" m="0 auto" maxW="400px" width="100%" justifyContent="space-around">
    <Link href="mailto:krantznicholas@gmail.com" _hover={linkHover} isExternal>
      <EmailIcon />
    </Link>
    <Link href="https://github.com/nick-krantz" _hover={linkHover} isExternal>
      <GitHubIcon />
    </Link>
    <Link href="https://www.linkedin.com/in/nicholaskrantz/" _hover={linkHover} isExternal>
      <LinkedInIcon />
    </Link>
    <Link href="https://twitter.com/nick__krantz" _hover={linkHover} isExternal>
      <TwitterIcon />
    </Link>
  </Flex>
)
