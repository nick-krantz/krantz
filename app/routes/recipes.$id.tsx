import { Link, MetaFunction, useLoaderData } from '@remix-run/react'
import { json, LoaderFunction } from '@remix-run/server-runtime'
import React, { useMemo } from 'react'
import { buttonClasses } from '~/components/button'
import { PageDetails } from '~/components/header'
import { Recipe } from '~/types'
import { getToken } from '~/utils/supabase/get-token'
import { supabase } from '~/utils/supabase/index.server'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `Nick Krantz - ${data?.recipe?.title}`,
    },
  ]
}

interface LoaderData {
  recipe: Recipe
  pageDetails: PageDetails
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const paths = url.pathname.split('/')
  const recipeId = paths[paths.length - 1]

  const token = await getToken(request)

  supabase.auth.setAuth(token)

  const { data: recipes } = await supabase.from<Recipe>('full_recipes').select().eq('id', recipeId)

  if (recipes === null || recipes.length === 0) {
    throw new Response('Recipe Not Found', {
      status: 404,
    })
  }

  const recipe = recipes[0]

  return json<LoaderData>({ recipe, pageDetails: { header: recipe.title, backLink: '/recipes' } })
}

/**
 * Recipe Detail page
 */
export default function RecipeDetail() {
  const { recipe } = useLoaderData<LoaderData>()

  const domain = useMemo(() => {
    if (recipe.url) {
      return new URL(recipe.url).hostname.replace('www.', '')
    }
    return ''
  }, [recipe.url])

  const linkButtonClasses = useMemo(() => `${buttonClasses()} min-w-[180px] overflow-hidden`, [])

  return (
    <div className=" max-w-2xl mx-auto">
      {recipe?.image_url && (
        <img className="rounded-2xl max-h-[300px] w-full object-cover" src={recipe.image_url} alt="" />
      )}
      <div className="flex flex-wrap py-4 justify-around gap-4">
        {domain ? (
          <a className={linkButtonClasses} href={recipe.url}>
            {domain}
          </a>
        ) : null}
        <Link className={linkButtonClasses} to={'./edit'}>
          Edit
        </Link>
      </div>

      <section>
        <h2>Ingredients</h2>
        {recipe.ingredients.map((section) => (
          // the key here is a little wonky, but we shouldn't have multiple sections without a title
          // kicking the can down the road...
          <React.Fragment key={section.title ?? `section-${section.ingredients.length}`}>
            {section.title ? <h3>{section.title}</h3> : null}
            <ul className="list mb-2 list-[square] list-outside ml-6">
              {section.ingredients.map((ingredient) => (
                <li className="list-item mb-2" key={ingredient}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </section>
      <section>
        <h2>Instructions</h2>
        <ol className="list mb-2 list-[decimal] list-outside ml-6 marker:text-xl">
          {recipe.instructions.map((instruction) => (
            <li className="list-item mb-2" key={instruction}>
              {instruction}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
