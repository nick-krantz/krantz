import { Recipe } from '~/types'
import { RecipeCard } from '../recipe-card'

type Props = {
  recipes: Recipe[]
}

export const RecipeList: React.FC<Props> = ({ recipes }) => {
  return (
    <div
      className={`
        grid grid-cols-1 auto-rows-[1fr]
        md:grid-cols-2
        lg:grid-cols-3
        gap-4 sm:gap-8 max-w-screen-2xl mx-auto
        py-4
      `}
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
