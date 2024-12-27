import React, { useState } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu, Brain } from 'lucide-react'

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
      {navItems.map((item, index) => (
        <Button 
          key={index} 
          variant="ghost" 
          asChild 
          className={`${className} transition-all duration-300 ease-in-out hover:bg-secondary`} 
          onClick={onClick}
        >
          <Link to={item.to}>{item.label}</Link>
        </Button>
      ))}
    </>
  )

  return (
    <header className="flex px-4 sm:px-10 py-2 justify-between items-center mb-6">
      <Link to='/'>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EquiLife</span>
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
            className="transition-all duration-300 ease-in-out hover:bg-secondary"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[240px] sm:w-[300px] sheet-content-wrapper"
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