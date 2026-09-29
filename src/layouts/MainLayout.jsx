import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'

const SIDEBAR_ID = 'main-sidebar'
// Must match the desktop breakpoint in components/layout/layout.css
const DESKTOP_QUERY = '(min-width: 1200px)'

// Shell for every signed-in page: sidebar + top bar + page content.
function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sidebarRef = useRef(null)
  const menuButtonRef = useRef(null)

  const closeMenu = () => setIsMenuOpen(false)

  // While the mobile drawer is open: focus its first link, close on Escape,
  // lock page scroll, and close if the window grows to desktop size.
  useEffect(() => {
    if (!isMenuOpen) return undefined

    const menuButton = menuButtonRef.current
    sidebarRef.current?.querySelector('a')?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const handleResize = () => {
      if (desktop.matches) setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleResize)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleResize)
      document.body.style.overflow = previousOverflow
      // Runs after the drawer closes and the page is no longer inert,
      // so focus can return to the menu button.
      if (!desktop.matches) menuButton?.focus()
    }
  }, [isMenuOpen])

  return (
    <div className="app-shell">
      <Sidebar
        id={SIDEBAR_ID}
        ref={sidebarRef}
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onNavigate={closeMenu}
      />

      {/* Clicking outside the drawer closes it (keyboard users have Escape and the close button) */}
      <div
        className={`app-shell__backdrop ${isMenuOpen ? 'is-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* inert keeps focus inside the open drawer on small screens */}
      <div className="app-shell__main" inert={isMenuOpen}>
        <Topbar
          menuButtonRef={menuButtonRef}
          menuId={SIDEBAR_ID}
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
