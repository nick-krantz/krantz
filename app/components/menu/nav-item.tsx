import { IconType } from 'react-icons/lib'
import { NavLink } from 'remix'
import { Icon } from '../icon'

export const NavItem: React.FC<{ to: string; icon: IconType }> = ({ children, to, icon }) => {
  return (
    <li className="p-4 text-lg">
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
    </li>
  )
}
