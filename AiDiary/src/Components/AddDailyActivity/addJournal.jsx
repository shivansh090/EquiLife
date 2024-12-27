'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart"

export default function MoodJournal() {
  const [journalEntry, setJournalEntry] = useState('')
  const [moodAnalysis, setMoodAnalysis] = useState(null)
  const [sentimentAnalysis, setSentimentAnalysis] = useState(null)
  const [moodTrigger, setMoodTrigger] = useState(null)
  const [happyMoment, setHappyMoment] = useState(null)
  const [gratitude, setGratitude] = useState(null)
  const [activityLog, setActivityLog] = useState([])
  const [moodTrend, setMoodTrend] = useState([])
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    fetchJournalEntries();
    fetchMoodTrend();
  }, [])

  const fetchJournalEntries = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/journal`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Send the JWT token in the Authorization header
          },
    });
      if (!response.ok) {
        throw new Error('Failed to fetch journal entries');
      }
      const data = await response.json();
      setActivityLog(data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const fetchMoodTrend = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/mood-trend`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Send the JWT token in the Authorization header
          },
    });
      if (!response.ok) {
        throw new Error('Failed to fetch mood trend');
      }
      const data = await response.json();
      setMoodTrend(data.map(item => ({ day: new Date(item.day).toLocaleDateString('en-US', { weekday: 'short' }), score: item.mood / 50 - 1 })));
    } catch (error) {
      console.error('Error fetching mood trend:', error);
    }
  };

  const handleSubmit = async () => {
    if (journalEntry.trim()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/journal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`, 
          },
          body: JSON.stringify({
            userId,
            content: journalEntry
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit journal entry');
        }
  
        const data = await response.json();
        const { journalEntry: newEntry, analysis } = data;
  
        setMoodAnalysis(analysis.overallMood);
        setSentimentAnalysis({
          sentiment: analysis.moodPercentage > 50 ? 'Positive' : 'Negative',
          score: (analysis.moodPercentage / 50) - 1
        });
        setMoodTrigger(analysis.stressReason || null);
  
        // Display goal updates and milestones
        const updateMessages = [];
  
        if (analysis.goalUpdates && analysis.goalUpdates.length > 0) {
          analysis.goalUpdates.forEach(update => {
            if (update.isNewGoal) {
              updateMessages.push(`New goal created: ${update.name}`);
            } else if (update.achieved) {
              updateMessages.push(`Goal achieved: ${update.name}`);
            } else if (update.progressUpdate !== null) {
              updateMessages.push(`Goal progress updated: ${update.name} (${update.progressUpdate}%)`);
            }
          });
        }
  
        if (analysis.milestones && analysis.milestones.length > 0) {
          analysis.milestones.forEach(milestone => {
            updateMessages.push(`New milestone: ${milestone}`);
          });
        }
        
        // You might want to create a new state variable for updates and set it here
        setUpdates(updateMessages);
  
        setActivityLog(prevLog => [newEntry, ...prevLog]);
        
        // Update mood trend
        setMoodTrend(prevTrend => {
          const newTrend = [...prevTrend.slice(1), { day: 'Today', score: (analysis.moodPercentage / 50) - 1 }];
          return newTrend;
        });
  
        setJournalEntry('');
  
        // Refresh journal entries and mood trend
        fetchJournalEntries();
        fetchMoodTrend();
      } catch (error) {
        console.error('Error submitting journal entry:', error);
      }
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
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
                <p className="mb-2">{activity.content}</p>
                <p className="text-sm font-semibold">Mood: {activity.mood > 50  ? 'Positive' : 'Negative'}</p>
                <p className="text-sm font-semibold">Sentiment: {activity.sentiment > 0 ? 'Positive' : 'Negative'}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}