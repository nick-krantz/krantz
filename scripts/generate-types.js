/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const dotenv = require('dotenv')

;(async () => {
  dotenv.config()

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env

  if (!SUPABASE_ANON_KEY || !SUPABASE_URL) {
    throw new Error('Missing either: SUPABASE_ANON_KEY or SUPABASE_URL')
  }

  const openAPI = await import('openapi-typescript').then((openapi) => openapi.default)

  const output = await openAPI(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`, {
    prettierConfig: '.prettierrc.json',
  })

  fs.writeFileSync('./app/types/supabase.ts', output)
})()
