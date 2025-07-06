import React, { useState } from 'react'
import { Button } from './ui/button'
import { Link, useLocation } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu, Brain } from 'lucide-react'

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/diary", label: "Add Journal" },
    // { to: "/analytics", label: "Analytics" },
    { to: "/self-care", label: "Resources" },
    { to: "/profile", label: "Profile" },
  ]

  const NavLinks = ({ className = "", onClick = () => {} }) => (
    <>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.to
        return (
          <Button
            key={index}
            variant={isActive ? "secondary" : "ghost"}
            asChild
            className={`
              ${className}
              transition-all duration-300 ease-in-out
              hover:bg-blue-50
              ${isActive ? "text-blue-600 font-bold border-b-2 border-blue-600 bg-white/80" : "text-gray-700"}
              rounded-none px-4 py-2
            `}
            onClick={onClick}
            style={isActive ? { background: "rgba(255,255,255,0.7)" } : {}}
          >
            <Link to={item.to}>
              {item.label.split(' ').map((word, i) =>
                i === 0 && isActive ? (
                  <span key={i} className="text-orange-500">{word} </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </Link>
          </Button>
        )
      })}
    </>
  )

  return (
    <header className="flex px-4 sm:px-10 py-2 justify-between items-center mb-6 bg-white/70 shadow-md rounded-b-xl backdrop-blur border-b border-blue-100">
      <Link to='/'>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">
            Equi<span className="text-orange-500">Life</span>
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-2">
        <NavLinks />
      </nav>

      {/* Mobile Navigation */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="transition-all duration-300 ease-in-out hover:bg-blue-50"
          >
            <Menu className="h-6 w-6 text-blue-600" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[240px] sm:w-[300px] sheet-content-wrapper bg-white/90 border-l border-blue-100"
        >
          <nav className="flex flex-col gap-4 mt-8">
            <NavLinks
              className="w-full justify-start transition-all duration-300 ease-in-out hover:translate-x-2"
              onClick={() => setIsSidebarOpen(false)}
            />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}