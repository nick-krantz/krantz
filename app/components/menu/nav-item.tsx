import { useState } from 'react'
import { IconType } from 'react-icons/lib'
import { NavLink } from 'remix'
import { Icon } from '../icon'

const activeClass = 'border-2 border-gray-800 dark:border-gray-200'

export const NavItem: React.FC<{ to: string; icon: IconType }> = ({ children, to, icon }) => {
  const [isActive, setActive] = useState<boolean>(false)

  return (
    <li className="p-4 text-lg">
      <NavLink
        to={to}
        className={`flex items-center gap-6 p-2 rounded-md ${isActive ? activeClass : ''}`}
        style={({ isActive }) => {
          setActive(isActive)
          return {}
        }}
      >
        <Icon Icon={icon} />
        {children}
      </NavLink>
    </li>
  )
}
