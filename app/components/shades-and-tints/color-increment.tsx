import { HTMLMotionProps, motion } from 'framer-motion'
import { FiCopy } from 'react-icons/fi'
import { Icon } from '../icon'

const buttonProps: HTMLMotionProps<'button'> = {
  whileTap: { scale: 0.9 },
  transition: { type: 'spring', bounce: 0.5 },
}

export const ColorIncrement: React.FC<{ color: string }> = ({ color }) => (
  <div className="grid items-center grid-cols-[100px_minmax(100px,_1fr)]">
    <p className="mb-0">{color}</p>
    <div className="w-full h-14 flex justify-center items-center group" style={{ backgroundColor: color }}>
      <motion.button
        className="opacity-0 w-min p-1 rounded-md bg-gray-500 group-hover:opacity-100 focus:opacity-100 active:bg-gray-400 "
        onClick={() => {
          navigator.clipboard.writeText(color)
        }}
        aria-label={`Copy color: ${color} to clipboard`}
        {...buttonProps}
      >
        <Icon Icon={FiCopy} />
      </motion.button>
    </div>
  </div>
)
