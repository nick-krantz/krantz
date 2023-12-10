import { ActionFunction, redirect } from '@remix-run/server-runtime'
import { badRequest } from '~/utils/network'
import { getToken } from '~/utils/supabase/get-token'
import { getUser } from '~/utils/supabase/get-user'
import { supabase } from '~/utils/supabase/index.server'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const type = formData.get('type')
  const recipeId = formData.get('recipeId')
  const title = formData.get('title')
  const url = formData.get('url')
  const imageUrl = formData.get('image-url')
  const instructions = formData.getAll('instructions')
  const sectionKeys: string[] = []
  const ingredientKeys: string[] = []

  for (const key of formData.keys()) {
    if (/ingredient-section\[[0-9]\]/.test(key)) {
      sectionKeys.push(key)
    }
    if (/ingredients\[[0-9]\]/.test(key)) {
      ingredientKeys.push(key)
    }
  }

  if (!type || (type !== 'add' && type !== 'edit')) {
    return badRequest({
      error: { message: `Invalid type: ${type}` },
    })
  }

  if (type === 'edit' && !recipeId) {
    return badRequest({
      error: { message: `Missing recipeId: ${recipeId}` },
    })
  }

  if (sectionKeys.length !== ingredientKeys.length) {
    return badRequest({
      error: { message: 'Ingredients found and number of sections are not the same' },
    })
  }

  const ingredientSections = sectionKeys.map((sectionKey, i) => {
    const sectionTitle = formData.get(sectionKey)
    const ingredients = formData.getAll(ingredientKeys[i])

    return {
      title: sectionTitle || '',
      ingredients,
    }
  })

  const token = await getToken(request)

  supabase.auth.setAuth(token)

  if (type === 'add') {
    const created_by = (await getUser(request))?.id

    const { error, data } = await supabase
      .from('full_recipes')
      .insert([{ title, url, image_url: imageUrl, instructions, ingredients: ingredientSections, created_by }])

    if (error) {
      return badRequest({
        error,
        data: { title, url, 'image-url': imageUrl, instructions, ingredients: ingredientSections },
      })
    }

    return redirect(`/recipes/${data?.[0]?.id}`)
  } else {
    const { error } = await supabase
      .from('full_recipes')
      .update(
        { title, url, image_url: imageUrl, instructions, ingredients: ingredientSections },
        { returning: 'minimal' },
      )
      .eq('id', recipeId)

    if (error) {
      return badRequest({
        error: error,
        data: { title, url, image_url: imageUrl, instructions, ingredients: ingredientSections },
      })
    }

    return redirect(`/recipes/${recipeId}`)
  }
}
