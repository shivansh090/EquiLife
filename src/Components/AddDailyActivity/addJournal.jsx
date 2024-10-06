'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

// Fake mood analysis function (replace with actual ML model in production)
const analyzeMood = (text) => {
  const moods = ['Happy', 'Sad', 'Excited', 'Anxious', 'Calm']
  return moods[Math.floor(Math.random() * moods.length)]
}

export default function MoodJournal() {
  const [journalEntry, setJournalEntry] = useState('')
  const [moodAnalysis, setMoodAnalysis] = useState(null)
  const [activityLog, setActivityLog] = useState([])

  const handleSubmit = () => {
    if (journalEntry.trim()) {
      const mood = analyzeMood(journalEntry)
      setMoodAnalysis(mood)
      setActivityLog([{ entry: journalEntry, mood: mood, date: new Date() }, ...activityLog])
      setJournalEntry('')
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Mood Journal</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Write about your day, thoughts, or feelings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Start writing here..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>

      {moodAnalysis && (
        <Alert className="mb-6">
          <AlertTitle>Mood Analysis</AlertTitle>
          <AlertDescription>
            Based on your entry, your mood seems to be: <strong>{moodAnalysis}</strong>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Your recent journal entries and moods</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {activityLog.map((activity, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <p className="text-sm text-gray-500 mb-2">
                  {activity.date.toLocaleString()}
                </p>
                <p className="mb-2">{activity.entry}</p>
                <p className="text-sm font-semibold">Mood: {activity.mood}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}