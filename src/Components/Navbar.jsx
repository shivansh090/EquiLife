import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <header className="flex px-10 py-2 justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mental Health Tracker</h1>
        <nav>
          <Button variant="ghost" asChild className="mr-2">
            <Link href="/journal">Mood Journal</Link>
          </Button>
          <Button variant="ghost" asChild className="mr-2">
            <Link href="/history">History</Link>
          </Button>
          <Button variant="ghost" asChild className="mr-2">
            <Link href="/resources">Resources</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/profile">Profile</Link>
          </Button>
        </nav>
      </header>
  )
}
