import { motion, SVGMotionProps } from 'framer-motion'
import React from 'react'

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

export const Logo: React.FC = () => {
  return (
    <svg className="w-full max-w-2xl" viewBox="0 0 436.986 257.953" xmlns="http://www.w3.org/2000/svg">
      <g>
        <motion.path
          variants={outlineVariants}
          initial="hidden"
          animate="visible"
          strokeWidth={1.5}
          stroke="#171717"
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 20.42 128.98 C 20.301 128.099 20.574 127.174 21.234 126.496 L 38.702 108.557 C 39.814 107.413 41.631 107.408 42.748 108.556 C 43.873 109.71 43.864 111.564 42.747 112.712 L 26.912 128.975 L 42.743 145.237 C 43.857 146.379 43.863 148.245 42.745 149.392 C 41.62 150.548 39.816 150.54 38.698 149.391 L 21.232 131.452 C 20.578 130.78 20.307 129.859 20.42 128.98 Z"
        />
        <motion.path
          variants={fillVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 40.64752960205078 110.70040130615234 L 22.991714477539062 128.955810546875 L 40.580902099609375 147.34445190429688"
        />
      </g>
      <g>
        <motion.path
          variants={outlineVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 99.167 131.448 L 81.695 149.389 C 80.572 150.53 78.774 150.549 77.65 149.389 C 76.527 148.246 76.545 146.373 77.65 145.231 L 93.474 128.976 L 77.65 112.703 C 76.527 111.561 76.527 109.707 77.65 108.564 C 78.756 107.404 80.572 107.422 81.695 108.564 L 99.167 126.505 C 99.822 127.179 100.085 128.097 99.973 128.976 C 100.085 129.856 99.822 130.774 99.167 131.448 Z"
        />
        <motion.path
          variants={fillVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 79.62347412109375 110.56714630126953 L 97.14603424072266 128.955810546875 L 79.55684661865234 147.4777069091797"
        />
      </g>
      <motion.path
        style={{
          fill: 'currentcolor',
        }}
        d="M 123.362 246.018 C 120.74 246.018 118.493 243.771 118.493 241.149 L 118.493 16.804 C 118.493 14.182 120.74 11.935 123.362 11.935 L 172.051 11.935 C 174.673 11.935 176.92 14.182 176.92 16.804 L 176.92 83.096 L 244.71 13.433 C 245.834 12.684 246.957 11.935 248.456 11.935 L 305.01 11.935 C 306.883 11.935 308.755 13.059 309.504 14.557 C 310.253 16.43 309.879 18.302 308.755 19.8 L 233.1 100.699 L 317.369 238.153 C 318.118 238.902 318.493 240.025 318.493 241.149 C 318.493 243.771 316.246 246.018 313.624 246.018 L 255.197 246.018 C 253.699 246.018 252.201 245.269 251.452 243.771 L 189.654 139.276 L 176.92 150.512 L 176.92 241.149 C 176.92 243.771 174.673 246.018 172.051 246.018 L 123.362 246.018 Z"
      />
      <g>
        <motion.path
          variants={outlineVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 323.07 128.981 C 322.952 128.1 323.224 127.175 323.885 126.497 L 341.351 108.558 C 342.464 107.414 344.28 107.408 345.397 108.555 C 346.522 109.711 346.514 111.564 345.396 112.712 L 329.562 128.976 L 345.394 145.236 C 346.506 146.38 346.512 148.246 345.395 149.393 C 344.27 150.548 342.466 150.539 341.348 149.391 L 323.882 131.451 C 323.227 130.78 322.956 129.858 323.07 128.981 Z"
        />
        <motion.path
          variants={fillVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 343.3609924316406 110.61290740966797 L 325.75177001953125 128.97410583496094 L 343.4236755371094 147.58596801757812"
        />
      </g>
      <g>
        <motion.path
          variants={outlineVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 376.496 102.672 C 376.927 101.454 378.235 100.824 379.436 101.272 C 380.628 101.718 381.244 103.064 380.812 104.285 L 362.74 155.281 C 362.309 156.5 361.001 157.129 359.801 156.681 C 358.609 156.235 357.992 154.889 358.424 153.668 L 376.496 102.672 Z"
        />
        <motion.path
          variants={fillVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 378.705 103.469 L 360.532 154.605"
        />
      </g>
      <g>
        <motion.path
          variants={outlineVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 413.487 128.981 C 413.607 128.1 413.334 127.175 412.673 126.497 L 395.206 108.558 C 394.094 107.414 392.277 107.408 391.16 108.555 C 390.035 109.711 390.044 111.564 391.161 112.712 L 406.996 128.976 L 391.165 145.236 C 390.051 146.38 390.046 148.246 391.162 149.393 C 392.288 150.548 394.091 150.539 395.21 149.391 L 412.676 131.451 C 413.33 130.78 413.601 129.858 413.487 128.981 Z"
        />
        <motion.path
          variants={fillVariants}
          initial="hidden"
          animate="visible"
          stroke="#171717"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
          className="caret"
          d="M 392.867 110.3 L 410.477 128.911 L 392.993 147.649"
        />
      </g>
    </svg>
  )
}
