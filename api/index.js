/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const { createRequestHandler } = require('@remix-run/vercel')

module.exports = createRequestHandler({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  build: require('./_build'),
})
