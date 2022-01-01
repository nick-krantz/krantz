import { Box, Text } from '@chakra-ui/react'

type Props = {
  name: string
  image: string
}

export const RecipeCard: React.FC<Props> = ({ name, image }) => {
  return (
    <Box w="100%" boxShadow="md" maxW="sm" minW="" borderRadius="lg" overflow="hidden">
      <Box
        height="0"
        paddingTop="60%"
        bgImage={`url("${image}")`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      />
      <Box p="4" textAlign="left">
        <Text fontWeight="semibold">{name}</Text>
      </Box>
    </Box>
  )
}
