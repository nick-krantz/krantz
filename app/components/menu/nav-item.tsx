import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'
import { IconType } from 'react-icons/lib'
import { NavLink } from 'remix'
import { Icon } from '../icon'

const itemVariants: HTMLMotionProps<'li'>['variants'] = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

export const NavItem: React.FC<{ to: string; icon: IconType | React.FC; className?: string }> = ({
  children,
  to,
  icon,
  className,
}) => {
  return (
    <motion.li
      className={`p-4 text-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={itemVariants}
    >
      <NavLink
        to={to}
        className="flex items-center gap-6 p-2 rounded-md"
        style={({ isActive }) =>
          isActive
            ? {
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'currentcolor',
              }
            : {}
        }
      >
        <Icon Icon={icon} />
        {children}
      </NavLink>
    </motion.li>
  )
}
