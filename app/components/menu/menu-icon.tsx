export const MenuIcon: React.FC<{ isOpen: boolean; toggle: () => void }> = ({ isOpen, toggle }) => (
  <div className="relative h-7">
    <button
      className="w-8 h-full"
      onClick={toggle}
      aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
      aria-haspopup="menu"
    >
      <div className="h-full">
        <span className={`menu-bar ${isOpen ? 'menu-bar-open-top' : ''}`}></span>
        <span className={`menu-bar top-3 ${isOpen ? 'menu-bar-open-middle' : ''}`}></span>
        <span className={`menu-bar top-6 ${isOpen ? 'menu-bar-open-bottom' : ''}`}></span>
      </div>
    </button>
  </div>
)
