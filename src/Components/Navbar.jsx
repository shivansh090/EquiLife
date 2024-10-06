import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <header className="flex px-10 py-2 justify-between items-center mb-6">
        <Link to='/'><h1 className="text-2xl font-bold">Mental Health Tracker</h1></Link>
        <nav>
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/diary">Add Journal</Link>
          </Button>
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/analytics">Analytics</Link>
          </Button>
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/self-care">Resources</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/profile">Profile</Link>
          </Button>
        </nav>
      </header>
  )
}
