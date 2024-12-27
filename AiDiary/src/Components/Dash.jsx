"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Smile, Frown, Sun, Moon, CloudRain, Trophy } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function Dashboard() {
  const [moodData, setMoodData] = useState([]);
  const [productivityData, setProductivityData] = useState([]);
  const [goals, setGoals] = useState([]);
  const [currentMood, setCurrentMood] = useState("Feeling good");
  const [moodScore, setMoodScore] = useState(72);
  const [quote, setQuote] = useState("Believe you can and you're halfway there. - Theodore Roosevelt");
  const [milestones, setMilestones] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ["#0088FE", "#FF8042"];
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/dashboard`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Send the JWT token in the Authorization header
            },
      });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Update the state with the fetched data
        setMoodData(data.moods.slice(-7)); // Get the last 7 mood entries
        setProductivityData(data.productivity);
        setGoals(data.goals.slice(0, 3)); // Get the top 3 goals
        setMilestones(data.milestones.slice(0, 5)); // Get the top 5 milestones
        setActivities(data.activities.slice(0, 3)); // Get the top 3 activity suggestions
        
        // Set the current mood and mood score based on the latest mood entry
        if (data.moods.length > 0) {
          const latestMood = data.moods[0];
          setCurrentMood(`Feeling ${getMoodDescription(latestMood.mood)}`);
          setMoodScore(latestMood.mood);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMoodDescription = (score) => {
    if (score >= 80) return "Great";
    if (score >= 60) return "Good";
    if (score >= 40) return "Okay";
    if (score >= 20) return "Not so good";
    return "Bad";
  };

  const getActivityIcon = (activity) => {
    switch (activity.type) {
      case "outdoor":
        return <Sun className="h-4 w-4" />;
      case "relaxation":
        return <Moon className="h-4 w-4" />;
      case "entertainment":
        return <CloudRain className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-6xl">
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
                  {getActivityIcon(activity)}
                  <span className="ml-2 w-full">{activity.name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Mood Analysis</CardTitle>
            <CardDescription>Your mood patterns over the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData.reverse()} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis dataKey="mood" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#2a9d90" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Productivity Patterns</CardTitle>
            <CardDescription>Your productivity overview</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productivityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Achievement</CardTitle>
            <CardDescription>Track your progress (Top 3 goals)</CardDescription>
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
            <CardDescription>Your recent achievements (Top 5)</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {milestones.map((milestone, index) => (
                <li key={index} className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>{milestone.description}</span>
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
  );
}