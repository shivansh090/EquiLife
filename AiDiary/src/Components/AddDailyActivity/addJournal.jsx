'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart"
import bg from '@/assets/images/bg.png';

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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "130%",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">
          Mood <span className="text-blue-600">Journal</span>
        </h1>
        
        <Card className="mb-6 bg-white/50 backdrop-blur border-blue-200">
          <CardHeader>
            <CardTitle>
              How are you <span className="text-blue-600">feeling</span> today?
            </CardTitle>
            <CardDescription className="text-gray-700">
              Write about your day, thoughts, or feelings.
            </CardDescription>
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold" onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>

        {moodAnalysis && (
          <Alert className="mb-6 bg-white/50 border-blue-200">
            <AlertTitle>
              Mood <span className="text-blue-600">Analysis</span>
            </AlertTitle>
            <AlertDescription className="text-gray-700">
              Based on your entry, your mood seems to be: <strong className="text-blue-600">{moodAnalysis}</strong>
            </AlertDescription>
          </Alert>
        )}

        {sentimentAnalysis && (
          <Card className="mb-6 bg-white/50 border-blue-200">
            <CardHeader>
              <CardTitle>
                Emotion and <span className="text-blue-600">Sentiment</span> Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sentiment: <strong className="text-blue-600">{sentimentAnalysis.sentiment}</strong></p>
              <p>Score: <strong className="text-blue-600">{sentimentAnalysis.score.toFixed(2)}</strong> (-1 to 1)</p>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">
                  Your <span className="text-blue-600">Mood Trend</span>
                </h4>
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
          <Alert className="mb-6 bg-white/50 border-blue-200">
            <AlertTitle>
              Mood <span className="text-blue-600">Trigger</span>
            </AlertTitle>
            <AlertDescription className="text-gray-700">
              It seems that <strong className="text-blue-600">{moodTrigger}</strong> might be influencing your mood today.
            </AlertDescription>
          </Alert>
        )}

        {happyMoment && (
          <Alert className="mb-6 bg-white/50 border-blue-200">
            <AlertTitle>
              Happy <span className="text-blue-600">Moment</span>
            </AlertTitle>
            <AlertDescription className="text-gray-700">
              It looks like <strong className="text-blue-600">{happyMoment}</strong> brought you joy today. Try to incorporate more of these moments into your routine!
            </AlertDescription>
          </Alert>
        )}

        {gratitude && (
          <Alert className="mb-6 bg-white/50 border-blue-200">
            <AlertTitle>
              Reflection and <span className="text-blue-600">Gratitude</span>
            </AlertTitle>
            <AlertDescription className="text-gray-700">
              You mentioned being grateful for your <strong className="text-blue-600">{gratitude}</strong>. Reflecting on these positive aspects can improve your overall well-being.
            </AlertDescription>
          </Alert>
        )}

        <Card className="bg-white/50 border-blue-200">
          <CardHeader>
            <CardTitle>
              Activity <span className="text-blue-600">Log</span>
            </CardTitle>
            <CardDescription className="text-gray-700">
              Your recent journal entries and moods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {activityLog.map((activity, index) => (
                <div key={index} className="mb-4 p-4 border rounded bg-white/60">
                  <p className="text-sm text-blue-600 mb-2">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                  <p className="mb-2 text-gray-800">{activity.content}</p>
                  <p className="text-sm font-semibold text-gray-600">Mood: {activity.mood > 50  ? 'Positive' : 'Negative'}</p>
                  <p className="text-sm font-semibold text-gray-600">Sentiment: {activity.sentiment > 0 ? 'Positive' : 'Negative'}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}