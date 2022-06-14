import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<Props> = ({ children, variant, className, ...props }) => {
  const colors =
    variant === 'secondary'
      ? 'text-gray-200 bg-gray-500 hover:bg-gray-400'
      : 'text-gray-800 bg-emerald-500 hover:bg-emerald-400'
  return (
    <button
      className={`inline-flex align-center justify-center rounded-md font-semibold p-2 ${colors} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
