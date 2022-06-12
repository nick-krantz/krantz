import { Recipe } from '~/types'
import { RecipeCard } from '../recipe-card'

type Props = {
  recipes: Recipe[]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-8 justify-center m-10 max-w-screen-2xl mx-auto">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
