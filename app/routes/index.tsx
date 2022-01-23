import { useEffect } from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Header } from '~/components/header'
import { changeCaretColor } from '~/utils/change-caret-color'
import { authenticated } from '~/utils/supabase/authenticated'

export const meta: MetaFunction = () => {
  return {
    title: 'Nick Krantz',
    description: 'Krantz.app - A website built with React & Remix to utilize some functionality for my everyday life.',
  }
}

export const loader: LoaderFunction = ({ request }) => {
  return authenticated(request, false, ({ authorized }) => {
    return Promise.resolve({ authorized })
  })
}

export default function Index() {
  const { authorized } = useLoaderData<{ authorized: boolean }>()

  useEffect(() => {
    window.addEventListener('mousemove', changeCaretColor)
    window.addEventListener('touchmove', changeCaretColor)

    return () => {
      window.removeEventListener('mousemove', changeCaretColor)
      window.removeEventListener('touchmove', changeCaretColor)
    }
  }, [])

  return (
    <div className="flex flex-col h-full">
      <Header authorized={authorized} />
      <div className="flex h-full">
        <div className="flex justify-center align-center w-full">
          <Logo />
        </div>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <svg className="w-full max-w-2xl" viewBox="0 0 436.986 257.953" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1.148174, 0, 0, 1.179296, 319.907816, 70.323626)">
        <g xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="closingCaret" fill="#000">
            <path d="M 78.237 49.739 C 78.341 48.992 78.103 48.208 77.528 47.633 L 62.315 32.421 C 61.346 31.451 59.764 31.446 58.791 32.419 C 57.811 33.399 57.819 34.97 58.792 35.944 L 72.583 49.735 L 58.795 63.523 C 57.825 64.493 57.821 66.075 58.793 67.048 C 59.773 68.027 61.344 68.02 62.318 67.046 L 77.53 51.834 C 78.1 51.265 78.336 50.483 78.237 49.739 L 78.237 49.739 Z M 8.353 49.739 C 8.25 48.992 8.487 48.208 9.063 47.633 L 24.275 32.421 C 25.244 31.451 26.826 31.446 27.799 32.419 C 28.779 33.399 28.772 34.97 27.798 35.944 L 14.007 49.735 L 27.796 63.523 C 28.765 64.493 28.77 66.075 27.797 67.048 C 26.817 68.027 25.246 68.02 24.272 67.046 L 9.06 51.834 C 8.49 51.265 8.254 50.483 8.353 49.739 L 8.353 49.739 Z M 49.285 27.43 C 49.661 26.397 50.8 25.863 51.846 26.243 C 52.884 26.621 53.421 27.763 53.044 28.798 L 37.305 72.041 C 36.929 73.074 35.79 73.608 34.745 73.228 C 33.707 72.85 33.169 71.708 33.546 70.673 L 49.285 27.43 Z" />
          </g>
        </g>
      </g>
      <g className="fill-current" transform="matrix(18.726593, 0, 0, 18.726593, 102.893733, -139.16959)" fill="#ffffff">
        <path d="M 1.093 20.569 C 0.953 20.569 0.833 20.449 0.833 20.309 L 0.833 8.329 C 0.833 8.189 0.953 8.069 1.093 8.069 L 3.693 8.069 C 3.833 8.069 3.953 8.189 3.953 8.329 L 3.953 11.869 L 7.573 8.149 C 7.633 8.109 7.693 8.069 7.773 8.069 L 10.793 8.069 C 10.893 8.069 10.993 8.129 11.033 8.209 C 11.073 8.309 11.053 8.409 10.993 8.489 L 6.953 12.809 L 11.453 20.149 C 11.493 20.189 11.513 20.249 11.513 20.309 C 11.513 20.449 11.393 20.569 11.253 20.569 L 8.133 20.569 C 8.053 20.569 7.973 20.529 7.933 20.449 L 4.633 14.869 L 3.953 15.469 L 3.953 20.309 C 3.953 20.449 3.833 20.569 3.693 20.569 L 1.093 20.569 Z" />
      </g>
      <g transform="matrix(1.148174, 0, 0, 1.179296, 3.592722, 70.011622)">
        <g xmlns="http://www.w3.org/2000/svg" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="openingCaret" fill="#000">
            <path d="M 83.942 50.003 C 84.046 49.256 83.808 48.472 83.233 47.897 L 68.02 32.685 C 67.051 31.715 65.469 31.711 64.496 32.684 C 63.516 33.663 63.524 35.235 64.497 36.208 L 78.288 49.999 L 64.5 63.788 C 63.53 64.757 63.525 66.339 64.498 67.312 C 65.478 68.292 67.049 68.285 68.023 67.311 L 83.235 52.099 C 83.805 51.529 84.041 50.748 83.942 50.003 Z M 14.058 50.003 C 13.954 49.256 14.192 48.472 14.767 47.897 L 29.98 32.685 C 30.949 31.715 32.531 31.711 33.504 32.684 C 34.484 33.663 34.476 35.235 33.503 36.208 L 19.712 49.999 L 33.5 63.788 C 34.47 64.757 34.475 66.339 33.502 67.312 C 32.522 68.292 30.951 68.285 29.977 67.311 L 14.765 52.099 C 14.195 51.529 13.959 50.748 14.058 50.003 Z" />
          </g>
        </g>
      </g>
    </svg>
  )
}
