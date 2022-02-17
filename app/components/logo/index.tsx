import { motion, SVGMotionProps } from 'framer-motion'
import React, { useState } from 'react'

const outlineVariants: SVGMotionProps<SVGPathElement>['variants'] = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
}

const fillVariants: SVGMotionProps<SVGPathElement>['variants'] = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 2,
      ease: 'easeInOut',
    },
  },
}

const pathProps = (strokeWidth: number): SVGMotionProps<SVGPathElement> => {
  return {
    strokeWidth,
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'miter',
    initial: 'hidden',
    animate: 'visible',
  }
}

const caretProps = {
  fill: 'none',
  className: 'caret',
}

export const Logo: React.FC = () => {
  // Change fill color once animations are complete of main N & K
  const [animationComplete, setAnimationCompletion] = useState<boolean>(false)

  return (
    <svg className="w-full max-w-2xl" viewBox="-1 -19.604 454 168.988" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        variants={outlineVariants}
        {...pathProps(1.5)}
        {...caretProps}
        d="M 0.021 64.893 C -0.07 64.259 0.138 63.593 0.643 63.105 L 13.994 50.2 C 14.844 49.377 16.233 49.373 17.086 50.199 C 17.946 51.029 17.939 52.363 17.086 53.189 L 4.983 64.889 L 17.083 76.588 C 17.934 77.41 17.939 78.752 17.084 79.578 C 16.224 80.409 14.845 80.403 13.991 79.577 L 0.641 66.671 C 0.141 66.188 -0.066 65.525 0.021 64.893 Z"
      />
      <motion.path
        variants={fillVariants}
        {...pathProps(5)}
        {...caretProps}
        d="M 15.481 51.742 L 1.986 64.875 L 15.43 78.104"
      />
      <motion.path
        variants={outlineVariants}
        {...pathProps(1.5)}
        {...caretProps}
        d="M 60.209 66.668 L 46.854 79.575 C 45.996 80.396 44.622 80.41 43.763 79.575 C 42.904 78.753 42.918 77.406 43.763 76.584 L 55.857 64.89 L 43.763 53.182 C 42.904 52.361 42.904 51.027 43.763 50.205 C 44.608 49.37 45.996 49.383 46.854 50.205 L 60.209 63.112 C 60.709 63.597 60.91 64.257 60.825 64.89 C 60.91 65.523 60.709 66.183 60.209 66.668 Z"
      />
      <motion.path
        variants={fillVariants}
        {...pathProps(5)}
        {...caretProps}
        d="M 45.271 51.646 L 58.664 64.875 L 45.22 78.2"
      />
      <motion.path
        variants={outlineVariants}
        {...pathProps(2)}
        style={{ transition: 'fill .3s ease' }}
        fill={animationComplete ? 'currentColor' : 'rgba(0,0,0,0)'}
        onAnimationComplete={() => {
          setAnimationCompletion(true)
        }}
        d="M 78.83 148.802 C 76.826 148.802 75.109 147.185 75.109 145.299 L 75.109 -16.101 C 75.109 -17.987 76.826 -19.604 78.83 -19.604 L 116.044 -19.604 C 117.627 -19.525 119.038 -17.775 119.916 -16.054 L 174.757 77 L 172.466 -16.987 C 172.456 -18.426 173.485 -19.604 175.197 -19.569 L 217.829 -19.322 C 220.096 -19.272 221.39 -18.301 221.494 -16.612 C 221.578 -15.306 223.605 144.787 223.605 144.787 C 223.648 147.59 222.323 149.412 218.999 149.384 L 179.594 148.802 C 178.449 148.802 177.304 148.263 176.732 147.185 L 116.673 55.3 L 119.766 145.299 C 119.766 147.185 118.048 148.802 116.044 148.802 L 78.83 148.802 Z"
      />
      <motion.path
        variants={outlineVariants}
        {...pathProps(2)}
        style={{ transition: 'fill .3s ease' }}
        fill={animationComplete ? 'currentColor' : 'rgba(0,0,0,0)'}
        onAnimationComplete={() => {
          setAnimationCompletion(true)
        }}
        d="M 245.41 149.093 C 243.406 149.093 241.688 147.476 241.688 145.59 L 241.688 -15.81 C 241.688 -17.696 243.406 -19.313 245.41 -19.313 L 282.624 -19.313 C 284.628 -19.313 286.345 -17.696 286.345 -15.81 L 286.345 31.882 L 338.159 -18.235 C 339.018 -18.774 339.876 -19.313 341.022 -19.313 L 384.247 -19.313 C 385.679 -19.313 387.109 -18.504 387.682 -17.426 C 388.254 -16.079 387.968 -14.732 387.109 -13.654 L 329.285 44.546 L 393.693 143.435 C 394.266 143.974 394.552 144.781 394.552 145.59 C 394.552 147.476 392.835 149.093 390.831 149.093 L 346.174 149.093 C 345.029 149.093 343.884 148.554 343.312 147.476 L 296.078 72.3 L 286.345 80.383 L 286.345 145.59 C 286.345 147.476 284.628 149.093 282.624 149.093 L 245.41 149.093 Z"
      />
      <motion.path
        variants={outlineVariants}
        {...pathProps(1.5)}
        {...caretProps}
        d="M 382.18 64.893 C 382.09 64.259 382.298 63.594 382.803 63.106 L 396.153 50.2 C 397.003 49.377 398.391 49.373 399.245 50.198 C 400.105 51.03 400.099 52.363 399.244 53.189 L 387.142 64.89 L 399.243 76.587 C 400.093 77.411 400.097 78.753 399.243 79.578 C 398.384 80.409 397.005 80.403 396.15 79.577 L 382.801 66.67 C 382.3 66.187 382.093 65.524 382.18 64.893 Z"
      />
      <motion.path
        variants={fillVariants}
        {...pathProps(5)}
        {...caretProps}
        d="M 397.689 51.679 L 384.23 64.888 L 397.737 78.278"
      />
      <motion.path
        variants={outlineVariants}
        {...pathProps(1.5)}
        {...caretProps}
        d="M 423.015 45.966 C 423.344 45.089 424.344 44.636 425.262 44.959 C 426.173 45.279 426.644 46.248 426.313 47.126 L 412.501 83.814 C 412.171 84.691 411.171 85.144 410.254 84.821 C 409.343 84.5 408.872 83.532 409.202 82.654 L 423.015 45.966 Z"
      />
      <motion.path variants={fillVariants} {...pathProps(5)} {...caretProps} d="M 424.703 46.539 L 410.813 83.328" />
      <motion.path
        variants={outlineVariants}
        {...pathProps(1.5)}
        {...caretProps}
        d="M 451.288 64.893 C 451.379 64.259 451.171 63.594 450.665 63.106 L 437.315 50.2 C 436.465 49.377 435.076 49.373 434.223 50.198 C 433.363 51.03 433.37 52.363 434.223 53.189 L 446.326 64.889 L 434.226 76.587 C 433.375 77.41 433.371 78.753 434.224 79.578 C 435.085 80.409 436.463 80.403 437.318 79.577 L 450.668 66.67 C 451.168 66.187 451.375 65.524 451.288 64.893 Z"
      />
      <motion.path
        variants={fillVariants}
        {...pathProps(5)}
        {...caretProps}
        d="M 435.527 51.453 L 448.987 64.843 L 435.624 78.323"
      />
    </svg>
  )
}
