import React, { useMemo } from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { RecipeWithId } from '~/types'
import { getToken } from '~/utils/supabase/get-token'
import { supabase } from '~/utils/supabase/index.server'

export const handle = {
  header: 'Recipe Details',
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `Nick Krantz - ${data?.recipe.title}`,
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const paths = url.pathname.split('/')
  const recipeId = paths[paths.length - 1]

  const token = await getToken(request)

  supabase.auth.setAuth(token)

  const { data: recipe } = await supabase.from<any>('detailed-recipes').select().eq('id', recipeId)

  if (recipe === null || recipe.length === 0) {
    throw new Response('Recipe Not Found', {
      status: 404,
    })
  }

  return { recipe: recipe[0], header: recipe[0].title }
}

/**
 * Recipe Detail page
 */
export default function RecipeDetail() {
  const { recipe } = useLoaderData<RecipeWithId>()

  const domain = useMemo(() => {
    if (recipe.url) {
      return new URL(recipe.url).hostname
    }
    return ''
  }, [recipe.url])

  return (
    <div className=" max-w-2xl mx-auto">
      <img className="rounded-2xl max-h-[300px] w-full object-cover" src={recipe?.image_url} />
      {domain ? <a href={recipe.url}>{domain}</a> : null}
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
