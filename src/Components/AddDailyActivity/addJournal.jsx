'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Fake mood analysis function (replace with actual ML model in production)
const analyzeMood = (text) => {
  const moods = ['Happy', 'Sad', 'Excited', 'Anxious', 'Calm']
  return moods[Math.floor(Math.random() * moods.length)]
}

// Fake sentiment analysis function (replace with actual NLP model in production)
const analyzeSentiment = (text) => {
  const sentiments = ['Positive', 'Negative', 'Neutral']
  return {
    score: Math.random() * 2 - 1, // Random score between -1 and 1
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)]
  }
}

// Fake mood triggers analysis (replace with actual analysis in production)
const analyzeMoodTriggers = (text) => {
  const triggers = ['work', 'family', 'exercise', 'sleep', 'food']
  return triggers[Math.floor(Math.random() * triggers.length)]
}

// Fake happy moments analysis (replace with actual analysis in production)
const analyzeHappyMoments = (text) => {
  const happyMoments = ['spending time outdoors', 'meeting friends', 'accomplishing a task', 'learning something new']
  return happyMoments[Math.floor(Math.random() * happyMoments.length)]
}

// Fake gratitude analysis (replace with actual analysis in production)
const analyzeGratitude = (text) => {
  const gratitudeTopics = ['health', 'family', 'friends', 'career', 'personal growth']
  return gratitudeTopics[Math.floor(Math.random() * gratitudeTopics.length)]
}

export default function MoodJournal() {
  const [journalEntry, setJournalEntry] = useState('')
  const [moodAnalysis, setMoodAnalysis] = useState(null)
  const [sentimentAnalysis, setSentimentAnalysis] = useState(null)
  const [moodTrigger, setMoodTrigger] = useState(null)
  const [happyMoment, setHappyMoment] = useState(null)
  const [gratitude, setGratitude] = useState(null)
  const [activityLog, setActivityLog] = useState([])
  const [moodTrend, setMoodTrend] = useState([])

  useEffect(() => {
    // Initialize mood trend with some fake data
    setMoodTrend([
      { day: 'Mon', score: 0.2 },
      { day: 'Tue', score: 0.5 },
      { day: 'Wed', score: -0.3 },
      { day: 'Thu', score: 0.8 },
      { day: 'Fri', score: 0.1 },
      { day: 'Sat', score: 0.9 },
      { day: 'Sun', score: 0.6 },
    ])
  }, [])

  const handleSubmit = () => {
    if (journalEntry.trim()) {
      const mood = analyzeMood(journalEntry)
      const sentiment = analyzeSentiment(journalEntry)
      const trigger = analyzeMoodTriggers(journalEntry)
      const happy = analyzeHappyMoments(journalEntry)
      const grateful = analyzeGratitude(journalEntry)

      setMoodAnalysis(mood)
      setSentimentAnalysis(sentiment)
      setMoodTrigger(trigger)
      setHappyMoment(happy)
      setGratitude(grateful)

      setActivityLog([{ entry: journalEntry, mood: mood, date: new Date(), sentiment: sentiment.sentiment }, ...activityLog])
      
      // Update mood trend
      setMoodTrend(prevTrend => {
        const newTrend = [...prevTrend.slice(1), { day: 'Today', score: sentiment.score }]
        return newTrend
      })

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

      {sentimentAnalysis && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Emotion and Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sentiment: <strong>{sentimentAnalysis.sentiment}</strong></p>
            <p>Score: <strong>{sentimentAnalysis.score.toFixed(2)}</strong> (-1 to 1)</p>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Your Mood Trend</h4>
              <ChartContainer
                config={{
                  mood: {
                    label: "Mood",
                    color: "#2a9d90",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodTrend}>
                    <XAxis dataKey="day" />
                    <YAxis domain={[-1, 1]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="score" stroke="var(--color-mood)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {moodTrigger && (
        <Alert className="mb-6">
          <AlertTitle>Mood Trigger</AlertTitle>
          <AlertDescription>
            It seems that <strong>{moodTrigger}</strong> might be influencing your mood today.
          </AlertDescription>
        </Alert>
      )}

      {happyMoment && (
        <Alert className="mb-6">
          <AlertTitle>Happy Moment</AlertTitle>
          <AlertDescription>
            It looks like <strong>{happyMoment}</strong> brought you joy today. Try to incorporate more of these moments into your routine!
          </AlertDescription>
        </Alert>
      )}

      {gratitude && (
        <Alert className="mb-6">
          <AlertTitle>Reflection and Gratitude</AlertTitle>
          <AlertDescription>
            You mentioned being grateful for your <strong>{gratitude}</strong>. Reflecting on these positive aspects can improve your overall well-being.
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
                <p className="text-sm font-semibold">Sentiment: {activity.sentiment}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}