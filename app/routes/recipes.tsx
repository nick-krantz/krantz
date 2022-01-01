import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Link, LoaderFunction, MetaFunction, Outlet, useLoaderData } from 'remix'
import { RecipeList } from '~/components/recipe-list'
import { Recipe } from '~/types'
import { authenticated } from '~/utils/supabase/authenticated'
import { supabase } from '~/utils/supabase/index.server'

export const meta: MetaFunction = () => {
  return {
    title: 'Krantz Recipes',
    description: 'Stored recipes',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  return authenticated(request, async () => {
    const { data: recipes } = await supabase.from<Recipe>('recipes').select()
    return recipes
  })
}

/**
 * Recipe page
 */
export default function Recipes() {
  const recipes = useLoaderData<Recipe[] | null>()
  return (
    <Box textAlign="center">
      <Flex justifyContent="space-between" p="32px">
        <div></div> {/* empty div for alignment */}
        <Heading>Recipes</Heading>
        <Link to="./fetch-recipe">
          <Button colorScheme="green"> Add Recipe</Button>
        </Link>
      </Flex>
      {!!recipes && <RecipeList recipes={recipes} />}
      <Outlet />
    </Box>
  )
}
