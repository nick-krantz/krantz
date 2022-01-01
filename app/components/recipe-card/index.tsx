import { Box, Flex, IconButton, Text, VStack, Link } from '@chakra-ui/react'
import { ExternalIcon } from '../icons/external'
import { ShareIcon } from '../icons/share'

type Props = {
  name: string
  image: string
  url: string
  preview?: boolean
}

export const RecipeCard: React.FC<Props> = ({ name, image, url, preview }) => {
  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: name,
          text: `Check out ${name}`,
          url: url,
        })
        .catch((error) => console.log('Error sharing', error))
    } else {
      console.warn('sharing not available')
    }
  }

  return (
    <Flex
      flexDirection="column"
      w="100%"
      boxShadow="md"
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      border="1px solid #CBD5E0"
    >
      <Box
        height="0"
        paddingTop="60%"
        bgImage={`url("${image}")`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      />
      <VStack p="4" spacing="20px" alignItems="flex-start" height="100%" flex="1">
        <Text fontWeight="semibold" textAlign="left" flex="1">
          {name}
        </Text>
        <Flex width="100%" gap="10px">
          <Link href={url} isExternal borderRadius="6px">
            <IconButton aria-label={`Open ${name} link`} tabIndex={-1} disabled={preview}>
              <ExternalIcon></ExternalIcon>
            </IconButton>
          </Link>
          <IconButton aria-label={`Share ${name}`} onClick={share} disabled={preview}>
            <ShareIcon />
          </IconButton>
        </Flex>
      </VStack>
    </Flex>
  )
}
