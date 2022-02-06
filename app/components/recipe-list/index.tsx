import { Recipe } from '~/types'
import { RecipeCard } from '../recipe-card'

type Props = {
  recipes: Recipe[]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
  return (
    <div className="grid gap-4 sm:gap-8 justify-items-center m-10 grid-cols-recipe-grid-sm sm:grid-cols-recipe-grid max-w-screen-xl mx-auto">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
