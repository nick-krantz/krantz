import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FiCode, FiHome, FiInbox, FiLogIn, FiPenTool } from 'react-icons/fi'
import { BackDrop } from '../backdrop'
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
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
}

export const Menu: React.FC<{ authorized: boolean }> = ({ authorized }) => {
  const [isOpen, setMenu] = useState<boolean>(false)

  const toggle = () => {
    setMenu(!isOpen)
  }

  useEffect(() => {
    // Add class to disable background caret color when menu is open
    if (isOpen) {
      document.querySelector('body')?.classList.add('menu-open')
      document.querySelector('button')?.focus()
    } else {
      document.querySelector('body')?.classList.remove('menu-open')
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
              initial={{ width: 0 }}
              animate={{
                width: 300,
              }}
              exit={{
                width: 0,
                transition: { delay: 0.7, duration: 0.3 },
              }}
              onKeyDown={(e) => {
                trapFocus(e, toggle)
              }}
            >
              <div className="inline-block m-5 w-8 h-8 self-end">
                <MenuIcon isOpen={true} toggle={toggle} />
              </div>
              <nav>
                <motion.ul className="container" initial="closed" animate="open" exit="closed" variants={navVariants}>
                  <NavItem to="/" icon={FiHome}>
                    Home
                  </NavItem>
                  <NavItem to="../about" icon={FiCode}>
                    About
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
