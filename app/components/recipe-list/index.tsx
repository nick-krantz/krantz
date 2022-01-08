import { Recipe } from '~/types'
import { RecipeCard } from '../recipe-card'

type Props = {
  recipes: Recipe[]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
  return (
    <div className="grid gap-8 justify-items-center p-5 m-10 grid-cols-recipe-grid max-w-screen-xl mx-auto">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} image={recipe.image || ''} {...recipe} />
      ))}
    </div>
  )
}
