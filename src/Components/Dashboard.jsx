"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Smile, Frown, Sun, Moon, CloudRain, Trophy, TrendingUp } from "lucide-react"

import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function Dashboard() {
  // Hardcoded data for demonstration
  const currentMood = "Feeling good"
  const moodScore = 72
  const activities = [
    { name: "Take a walk", icon: <Sun className="h-4 w-4" /> },
    { name: "Try meditation", icon: <Moon className="h-4 w-4" /> },
    { name: "Listen to music", icon: <CloudRain className="h-4 w-4" /> },
  ]
  const quote = "Believe you can and you're halfway there. - Theodore Roosevelt"

  // Mood Analysis Data
  const moodData = [
    { day: "Mon", mood: 60 },
    { day: "Tue", mood: 75 },
    { day: "Wed", mood: 65 },
    { day: "Thu", mood: 80 },
    { day: "Fri", mood: 70 },
    { day: "Sat", mood: 85 },
    { day: "Sun", mood: 90 },
  ]

  // Productivity Patterns Data
  const productivityData = [
    { name: "Productive", value: 65 },
    { name: "Procrastination", value: 35 },
  ]
  const COLORS = ["#0088FE", "#FF8042"]

  // Goal Achievement Data
  const goals = [
    { name: "Exercise 3x/week", progress: 66 },
    { name: "Read 20 pages/day", progress: 80 },
    { name: "Meditate 10 min/day", progress: 50 },
  ]

  // Milestones and Accomplishments
  const milestones = [
    "7-day mood improvement streak",
    "Completed 30 days of journaling",
    "Achieved 8-hour sleep goal for a week",
  ]

  return (
    <div className="container sm:p-10 max-w-[1300px] mx-auto p-4">
      <main className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Mood</CardTitle>
            <CardDescription>{currentMood}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Frown className="text-red-500" />
              <Progress value={moodScore} className="w-2/3" />
              <Smile className="text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Suggestions</CardTitle>
            <CardDescription>Try these self-care activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  {activity.icon}
                  <span className="ml-2">{activity.name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mood Analysis</CardTitle>
            <CardDescription>Your mood patterns over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                mood: {
                  label: "Mood",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="mood" stroke="var(--color-mood)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productivity Patterns</CardTitle>
            <CardDescription>Your productivity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                productivity: {
                  label: "Productivity",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productivityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 flex justify-around">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#0088FE] rounded-full mr-2" />
                <span>Productive</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#FF8042] rounded-full mr-2" />
                <span>Procrastination</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Achievement</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {goals.map((goal, index) => (
                <li key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{goal.name}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestones & Accomplishments</CardTitle>
            <CardDescription>Your recent achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {milestones.map((milestone, index) => (
                <li key={index} className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Daily Inspiration</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="italic text-center">{quote}</blockquote>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}