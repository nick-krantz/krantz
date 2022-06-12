import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FiBookmark, FiCode, FiHome, FiInbox, FiLogIn, FiPenTool } from 'react-icons/fi'
import { BackDrop } from '../backdrop'
import { BurgerIcon } from '../icon/burger'
import { MenuIcon } from './menu-icon'
import { NavItem } from './nav-item'

function trapFocus(event: React.KeyboardEvent<HTMLDivElement>, escapeCallback: () => void) {
  const focusableElements = event.currentTarget?.querySelectorAll('a, button') || []

  if (focusableElements?.length) {
    const firstFocusable = focusableElements[0] as HTMLButtonElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLAnchorElement

    if (event.key === 'Tab') {
      // Shift + Tab
      if (event.shiftKey) {
        // Move focus to last focusable element
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus()
          event.preventDefault()
        }
      } else if (document.activeElement === lastFocusable) {
        // Move focus to first focusable element
        firstFocusable.focus()
        event.preventDefault()
      }
    } else if (event.key === 'Escape') {
      // Close menu
      escapeCallback()
    }
  }
}

const navVariants: HTMLMotionProps<'ul'>['variants'] = {
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
}

export const Menu: React.FC<{ authorized: boolean }> = ({ authorized }) => {
  const [isOpen, setMenu] = useState<boolean>(false)

  const toggle = () => {
    setMenu(!isOpen)
  }

  const closeMenu = () => {
    setMenu(false)
  }

  useEffect(() => {
    // Add class to disable background caret color when menu is open
    if (isOpen) {
      document.querySelector('body')?.classList.add('overflow-hidden')
      document.querySelector('button')?.focus()
    } else {
      document.querySelector('body')?.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <BackDrop />
            <motion.div
              className="fixed flex flex-col h-screen z-20 top-0 right-0 p-5 bg-gray-200 dark:bg-gray-800"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: 300,
                opacity: 1,
              }}
              exit={{
                width: 0,
                opacity: 0,
                transition: { duration: 0.6 },
              }}
              onKeyDown={(e) => {
                trapFocus(e, toggle)
              }}
            >
              <div className="inline-block m-5 w-8 h-8 self-end">
                <MenuIcon isOpen={true} toggle={toggle} />
              </div>
              <nav className="h-full">
                <motion.ul
                  className="container h-full flex flex-col"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={navVariants}
                >
                  <NavItem to="/" icon={FiHome} onClick={closeMenu}>
                    Home
                  </NavItem>
                  <NavItem to="../about" icon={FiCode} onClick={closeMenu}>
                    About
                  </NavItem>
                  <NavItem to="../burgers" icon={BurgerIcon} onClick={closeMenu}>
                    Burgers
                  </NavItem>
                  <NavItem to="../color" icon={FiPenTool} onClick={closeMenu}>
                    Colors
                  </NavItem>
                  {authorized && (
                    <NavItem to="../recipes" icon={FiInbox} onClick={closeMenu}>
                      Recipes
                    </NavItem>
                  )}
                  {authorized && (
                    <NavItem to="../bookmarks" icon={FiBookmark} onClick={closeMenu}>
                      Bookmarks
                    </NavItem>
                  )}

                  {!authorized && (
                    <NavItem to="../sign-in" icon={FiLogIn} className="mt-auto" onClick={closeMenu}>
                      Sign In
                    </NavItem>
                  )}
                </motion.ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <MenuIcon isOpen={false} toggle={toggle} />
    </>
  )
}
