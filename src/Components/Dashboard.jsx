import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Smile, Frown, Sun, Moon, CloudRain } from "lucide-react"
import { Link } from 'react-router-dom';
// import bg from '../assets/images/bg.png' 

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

  return (
    <div /*style={{backgroundImage: `url(${bg})` }}*/ className="container sm:p-10 max-w-[1300px] mx-auto p-4">
      
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