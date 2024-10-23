"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Hardcoded data (replace with actual data in a real application)
const moodHistory = [
  { day: "Monday", mood: "Happy", sleep: 7, exercise: 30, work: 8, leisure: 3 },
  { day: "Tuesday", mood: "Sad", sleep: 6, exercise: 0, work: 9, leisure: 2 },
  { day: "Wednesday", mood: "Neutral", sleep: 8, exercise: 45, work: 7, leisure: 4 },
  { day: "Thursday", mood: "Happy", sleep: 7, exercise: 60, work: 8, leisure: 3 },
  { day: "Friday", mood: "Stressed", sleep: 5, exercise: 0, work: 10, leisure: 1 },
  { day: "Saturday", mood: "Happy", sleep: 9, exercise: 90, work: 2, leisure: 8 },
  { day: "Sunday", mood: "Relaxed", sleep: 8, exercise: 60, work: 0, leisure: 10 },
]

const moodValues = {
  "Happy": 5,
  "Relaxed": 4,
  "Neutral": 3,
  "Stressed": 2,
  "Sad": 1,
}

const activityImpact = [
  { name: 'Exercise', impact: 0.8 },
  { name: 'Work', impact: -0.3 },
  { name: 'Leisure', impact: 0.6 },
  { name: 'Sleep', impact: 0.5 },
]

const stressReasons = [
  { name: 'Work', value: 40 },
  { name: 'Relationships', value: 30 },
  { name: 'Finance', value: 20 },
  { name: 'Health', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week')

  const moodChartData = moodHistory.map(entry => ({
    day: entry.day,
    mood: moodValues[entry.mood],
  }))

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Mood Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mood Trends</CardTitle>
            <CardDescription>Visualize your mood patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodChartData}>
                <XAxis dataKey="day" />
                <YAxis domain={[0, 5]} tickFormatter={(value) => Object.keys(moodValues).find(key => moodValues[key] === value) || ''} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="#2a9d90" strokeWidth={2} name="Mood" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mood Prediction</CardTitle>
            <CardDescription>Based on your past patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTitle>Upcoming Week Prediction</AlertTitle>
              <AlertDescription>
                Based on past patterns, work stress might increase next week. Consider scheduling some relaxation activities.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reasons for Stress</CardTitle>
            <CardDescription>Common factors affecting your mood</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stressReasons}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stressReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Impact on Mood</CardTitle>
            <CardDescription>How different activities affect your mood</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityImpact}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey="impact" fill="#2a9d90" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Analysis</CardTitle>
            <CardDescription>Time spent on various activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="work">
              <TabsList>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="leisure">Leisure</TabsTrigger>
                <TabsTrigger value="exercise">Exercise</TabsTrigger>
                <TabsTrigger value="sleep">Sleep</TabsTrigger>
              </TabsList>
              <TabsContent value="work">
                <div className="space-y-2">
                  <div>Average daily work hours: 6.3</div>
                  <Progress value={63} />
                </div>
              </TabsContent>
              <TabsContent value="leisure">
                <div className="space-y-2">
                  <div>Average daily leisure hours: 4.4</div>
                  <Progress value={44} />
                </div>
              </TabsContent>
              <TabsContent value="exercise">
                <div className="space-y-2">
                  <div>Average daily exercise minutes: 40.7</div>
                  <Progress value={41} />
                </div>
              </TabsContent>
              <TabsContent value="sleep">
                <div className="space-y-2">
                  <div>Average daily sleep hours: 7.1</div>
                  <Progress value={71} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sleep Patterns & Mood Impact</CardTitle>
            <CardDescription>How sleep affects your mood</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodHistory}>
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 5]} tickFormatter={(value) => Object.keys(moodValues).find(key => moodValues[key] === value) || ''} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="sleep" stroke="#8884d8" strokeWidth={2} name="Sleep Hours" />
                <Line yAxisId="right" type="monotone" dataKey="mood" stroke="#2a9d90" strokeWidth={2} name="Mood" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}