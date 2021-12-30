import { definitions } from 'types/supabase'

type Props = {
  recipes: definitions['recipes'][]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>{recipe.name}</li>
      ))}
    </ul>
  )
}
