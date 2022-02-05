import { FiEdit, FiExternalLink, FiShare2 } from 'react-icons/fi'
import { useNavigate } from 'remix'
import { Recipe } from '~/types'

type Props = {
  recipe: Recipe
  preview?: boolean
}

export const RecipeCard: React.FC<Props> = ({ recipe: { name, image, url, id }, preview }) => {
  const navigation = useNavigate()

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

  const edit = () => {
    if (id !== -1) {
      navigation(`./${id}`)
    } else {
      console.warn('Recipe card navigating with id -1')
      console.warn('Only submit-preview component should pass -1')
    }
  }

  return (
    <div className="grid grid-rows-recipe-card w-full rounded-md shadow-lg max-w-sm overflow-hidden border border-gray-800 dark:border-gray-200">
      <img className="h-full w-full object-cover" src={image} alt={name} />
      <div className="flex flex-col items-start h-full flex-1 p-4 gap-5">
        <p className="font-semibold text-left flex-1 overflow-hidden text-ellipsis line-clamp-3">{name}</p>
        <div className="flex w-full gap-3">
          <a
            className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700"
            href={!preview ? url : 'javascript:void(0)'}
            style={preview ? { pointerEvents: 'none', opacity: '.5' } : {}}
            aria-label={preview ? 'Open recipe (disabled)' : 'Open Recipe'}
          >
            <FiExternalLink />
          </a>

          <button
            className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700  disabled:opacity-50"
            aria-label={`Edit ${name}`}
            onClick={edit}
            disabled={preview}
          >
            <FiEdit />
          </button>

          <button
            className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700  disabled:opacity-50"
            aria-label={`Share ${name}`}
            onClick={share}
            disabled={preview}
          >
            <FiShare2 />
          </button>
        </div>
      </div>
    </div>
  )
}
