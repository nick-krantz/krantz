import { useEffect, useState } from 'react'
import { FiHome, FiInbox, FiLogIn, FiPenTool } from 'react-icons/fi'
import { MenuIcon } from './menu-icon'
import { NavItem } from './nav-item'

export const Menu: React.FC<{ authorized: boolean }> = ({ authorized }) => {
  const [isOpen, setMenu] = useState<boolean>(false)

  const toggle = () => {
    setMenu(!isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body')?.classList.add('menu-open')
    } else {
      document.querySelector('body')?.classList.remove('menu-open')
    }
  })

  return (
    <div className="overflow-hidden h-7">
      <MenuIcon isOpen={false} toggle={toggle} />
      <div
        className={`${isOpen ? 'fixed bg-gray-800 dark:bg-gray-200 opacity-50 h-full w-full top-0 left-0 ' : ''}`}
      ></div>
      <div
        className={`flex flex-col w-80 p-5 h-full fixed right-0 top-0 bg-gray-200 dark:bg-gray-800 transition-all duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-80'
        }`}
      >
        <div className="inline-block w-8 h-8 self-end">
          <MenuIcon isOpen={true} toggle={toggle} />
        </div>
        <nav>
          <ul>
            <NavItem to="/" icon={FiHome}>
              Home
            </NavItem>
            {authorized && (
              <NavItem to="../recipes" icon={FiInbox}>
                Recipes
              </NavItem>
            )}
            <NavItem to="../color" icon={FiPenTool}>
              Colors
            </NavItem>
            {!authorized && (
              <NavItem to="../sign-in" icon={FiLogIn}>
                Sign In
              </NavItem>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}
