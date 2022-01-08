import { FiExternalLink, FiShare2 } from 'react-icons/fi'

type Props = {
  name: string
  image: string
  url: string
  preview?: boolean
}

export const RecipeCard: React.FC<Props> = ({ name, image, url, preview }) => {
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

  return (
    <div className="flex flex-col w-full rounded-md shadow-lg max-w-sm overflow-hidden border border-gray-800 dark:border-gray-200">
      <div className={`h-0 pt-60% bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url('${image}')` }} />
      <div className="flex flex-col items-start h-full flex-1 p-4 gap-5">
        <p className="font-semibold text-left flex-1">{name}</p>
        <div className="flex w-full gap-3">
          {preview ? (
            <button
              className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700  disabled:opacity-50"
              disabled={preview}
            >
              <FiExternalLink />
            </button>
          ) : (
            <a
              className="inline-flex items-center p-3 rounded-md text-gray-800 bg-gray-300 dark:text-gray-200 dark:bg-slate-700"
              href={url}
            >
              <FiExternalLink />
            </a>
          )}

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
