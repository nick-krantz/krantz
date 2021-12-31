import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { definitions } from 'types/supabase'

type Props = {
  recipes: definitions['recipes'][]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
  return (
    <SimpleGrid minChildWidth="140px" spacing="20px" m="0 40px 0 40px" justifyItems="center">
      {recipes.map((recipe) => (
        <Box key={recipe.id} w="100%" boxShadow="md" maxW="sm" borderRadius="lg" overflow="hidden">
          <Box
            height="0"
            paddingTop="60%"
            bgImage={`url(${recipe.image})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
          />
          <Box p="4" textAlign="left">
            <Text fontWeight="semibold">{recipe.name}</Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  )
}
