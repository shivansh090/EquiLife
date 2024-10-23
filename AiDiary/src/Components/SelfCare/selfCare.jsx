"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, PhoneCall, Globe, Timer, Book, Edit3, Apple } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Link } from 'react-router-dom'

const resources = [
  { activity: "Deep Breathing", description: "Practice deep breathing exercises for 5 minutes.", category: "Relaxation", action: "breathe" },
  { activity: "Reading", description: "Read a book or listen to an audiobook.", category: "Mental", action: "read" },
  { activity: "Journaling", description: "Write down your thoughts and feelings.", category: "Emotional", action: "journal" },
  { activity: "Mindful Eating", description: "Eat a meal slowly and mindfully.", category: "Mental", action: "eat" },
  { activity: "Meditation", description: "Take 5 minutes to meditate.", category: "Relaxation" },
  { activity: "Exercise", description: "Go for a 30-minute walk.", category: "Physical" },
  { activity: "Yoga", description: "Do a 15-minute yoga session.", category: "Physical" },
  { activity: "Gratitude List", description: "Write down three things you're grateful for.", category: "Emotional" },
  { activity: "Nature Walk", description: "Take a walk in nature and observe your surroundings.", category: "Physical" },
  { activity: "Creative Expression", description: "Engage in a creative activity like drawing or writing.", category: "Mental" },
]

const emergencyResources = [
  { name: "National Suicide Prevention Lifeline", phone: "1-800-273-8255", website: "https://suicidepreventionlifeline.org/" },
  { name: "Crisis Text Line", phone: "Text HOME to 741741", website: "https://www.crisistextline.org/" },
  { name: "SAMHSA National Helpline", phone: "1-800-662-4357", website: "https://www.samhsa.gov/find-help/national-helpline" },
]

const healthyFoodOptions = [
  "Greek Yogurt with Berries",
  "Avocado Toast on Whole Grain Bread",
  "Quinoa Salad with Vegetables",
  "Grilled Chicken with Roasted Vegetables",
  "Salmon with Sweet Potato",
  "Lentil Soup",
  "Spinach and Feta Omelette",
  "Whole Grain Pasta with Tomato Sauce and Vegetables",
  "Vegetable Stir-Fry with Tofu",
  "Hummus with Carrot Sticks"
]

function SelfCareResources() {
  const [filter, setFilter] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentActivity, setCurrentActivity] = useState(null)

  const categories = ['All', ...new Set(resources.map(resource => resource.category))]

  const filteredResources = resources.filter(resource => 
    (selectedCategory === 'All' || resource.category === selectedCategory) &&
    (resource.activity.toLowerCase().includes(filter.toLowerCase()) || 
     resource.description.toLowerCase().includes(filter.toLowerCase()))
  )

  useEffect(() => {
    let interval
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerRunning(false)
      setCurrentActivity(null)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  const startTimer = (duration, activity) => {
    setTimer(duration)
    setIsTimerRunning(true)
    setCurrentActivity(activity)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const renderActivityContent = (action) => {
    switch (action) {
      case 'breathe':
        return (
          <div className="text-center">
            <h3 className="text-2xl mb-4">Deep Breathing Exercise</h3>
            <p className="mb-4">Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds.</p>
            <div className="text-4xl mb-4">{formatTime(timer)}</div>
            <Button onClick={() => startTimer(300, 'Deep Breathing')} disabled={isTimerRunning}>
              {isTimerRunning ? 'In Progress...' : 'Start 5-minute session'}
            </Button>
          </div>
        )
      case 'read':
        return (
          <div className="text-center">
            <h3 className="text-2xl mb-4">Reading Session</h3>
            <p className="mb-4">Find a quiet place and enjoy your book.</p>
            <div className="text-4xl mb-4">{formatTime(timer)}</div>
            <Button onClick={() => startTimer(1800, 'Reading')} disabled={isTimerRunning}>
              {isTimerRunning ? 'In Progress...' : 'Start 30-minute session'}
            </Button>
          </div>
        )
      case 'journal':
        return (
          <div className="text-center">
            <h3 className="text-2xl mb-4">Journaling</h3>
            <p className="mb-4">Write down your thoughts and feelings.</p>
            <Link href="/add-journal">
              <Button>Go to Journal Page</Button>
            </Link>
          </div>
        )
      case 'eat':
        return (
          <div className="text-center">
            <h3 className="text-2xl mb-4">Mindful Eating</h3>
            <p className="mb-4">Here are some healthy food options to consider:</p>
            <ul className="list-disc list-inside text-left">
              {healthyFoodOptions.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Self-Care Resources</h1>
      {isTimerRunning && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center relative">
              <Timer className="mr-2" />
              Current Activity: {currentActivity}
              <Button onClick={()=>{
                setTimer(0);
                setIsTimerRunning(false);
              }} className="mt-2 absolute right-0" variant="outline">Stop</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-center mb-4">{formatTime(timer)}</div>
            <Progress value={(timer / 300) * 100} />
          </CardContent>
        </Card>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Self-Care Activities</CardTitle>
          <CardDescription>Explore various activities to improve your well-being</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "destructive" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Search activities..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-[400px] pr-4">
            {filteredResources.map((resource, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>{resource.activity}</CardTitle>
                  <Badge>{resource.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p>{resource.description}</p>
                  <Dialog >
                    <DialogTrigger asChild>
                      <Button className="mt-2" variant="outline">Try Now</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>{resource.activity}</DialogTitle>
                        <DialogDescription>{resource.description}</DialogDescription>
                      </DialogHeader>
                      {renderActivityContent(resource.action)}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <AlertCircle className="mr-2 text-red-500" />
            Emergency Resources
          </CardTitle>
          <CardDescription>If you need immediate help, please contact these resources</CardDescription>
        </CardHeader>
        <CardContent>
          {emergencyResources.map((resource, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="font-semibold text-lg">{resource.name}</h3>
              <p className="flex items-center mt-1">
                <PhoneCall className="mr-2" size={16} />
                {resource.phone}
              </p>
              <p className="flex items-center mt-1">
                <Globe className="mr-2" size={16} />
                <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Visit Website
                </a>
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default SelfCareResources