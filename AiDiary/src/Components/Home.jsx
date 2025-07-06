import { Link } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart';
import { Brain, TrendingUp, Heart, Sparkles } from 'lucide-react';
import { activityImpact, moodHistory, moodValues } from './MoodAnalytics/analytics';
import bg from '../assets/images/bg.png'; // Adjust path if needed
import { Navbar } from './Navbar'; // Add this import at the top

const demoMoodData = [
  { month: "Jan", positive: 65, negative: 35 },
  { month: "Feb", positive: 70, negative: 30 },
  { month: "Mar", positive: 60, negative: 40 },
  { month: "Apr", positive: 75, negative: 25 },
  { month: "May", positive: 85, negative: 15 },
  { month: "Jun", positive: 80, negative: 20 },
];

const demoProgressData = [
  { month: "Jan", progress: 45 },
  { month: "Feb", progress: 52 },
  { month: "Mar", progress: 49 },
  { month: "Apr", progress:63 },
  { month: "May", progress: 58 },
  { month: "Jun", progress: 72 },
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen mx-auto relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat", 
      }}
    >
      <Navbar /> {/* Use the common Navbar here */}

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Track Your Mental Wellness Journey
              <span className="text-blue-500"> Every Day</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your personal companion for mental health tracking, mood analysis, and self-improvement.
              <span className="text-blue-600 font-semibold"> Get insights</span>, set goals, and <span className="text-blue-500 font-semibold">celebrate your progress</span>.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-600 transition-colors font-semibold"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            <span className="border-b-4 border-blue-200 pb-1">Comprehensive Mental Health Tracking</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 border border-blue-200 shadow-blue-100 shadow-sm hover:shadow-blue-200 transition-shadow">
              <CardHeader>
                <Heart className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-blue-500">Mood Tracking</CardTitle>
                <CardDescription>
                  Track your daily moods and emotions with our intuitive journal system
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-blue-200 shadow-blue-100 shadow-sm hover:shadow-blue-200 transition-shadow">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-blue-600">Progress Analytics</CardTitle>
                <CardDescription>
                  Visualize your journey with detailed charts and insights
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-blue-200 shadow-blue-100 shadow-sm hover:shadow-blue-200 transition-shadow">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-blue-500">AI-Poweblue Insights</CardTitle>
                <CardDescription>
                  Get personalized recommendations and activity suggestions
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Charts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            <span className="border-b-4 border-blue-200 pb-1">Powerful Analytics at Your Fingertips</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border border-blue-100 shadow-blue-100 shadow-sm hover:shadow-blue-200 transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-500">Activity Impact on Mood</CardTitle>
                <CardDescription>How different activities affect your mood</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={activityImpact}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Bar dataKey="impact" fill="#3b83f6b9" /> {/* blue-500 */}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="border border-blue-100 shadow-blue-100 shadow-sm hover:shadow-blue-200 transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-600">Sleep Patterns & Mood Impact</CardTitle>
                <CardDescription>How sleep affects your mood</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={moodHistory}>
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 5]} tickFormatter={(value) => Object.keys(moodValues).find(key => moodValues[key] === value) || ''} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="sleep" stroke="#2563eb" strokeWidth={2} name="Sleep Hours" /> {/* blue-600 */}
                    <Line yAxisId="right" type="monotone" dataKey="mood" stroke="#16a34a" strokeWidth={2} name="Mood" /> {/* blue-600 */}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            <span className="border-b-4 border-blue-200 pb-1">Start Your Journey Today</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their mental well-being
            with our comprehensive tracking and analysis tools.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-blue-200 shadow-md transition-colors">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">
                Equi<span className="text-blue-500">Life</span>
                <span className="ml-1 text-blue-500">●</span>
              </span>
            </div>
            <div className="flex gap-8">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-blue-500 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} EquiLife. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
