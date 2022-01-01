import { SimpleGrid } from '@chakra-ui/react'
import { definitions } from 'types/supabase'
import { RecipeCard } from '../recipe-card'

type Props = {
  recipes: definitions['recipes'][]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
  return (
    <SimpleGrid minChildWidth="240px" spacing="35px" m="40px" justifyItems="center">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} image={recipe.image || ''} {...recipe} />
      ))}
    </SimpleGrid>
  )
}
