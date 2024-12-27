import { Link } from 'react-router-dom'; // Use react-router-dom Link
import { Button } from '@/components/ui/button'; // Adjust the imports if necessary
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Adjust the imports if necessary
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'; // You can use recharts as is
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'; // Adjust imports if necessary
import { Brain, TrendingUp, Heart, Sparkles, BarChart3, Activity } from 'lucide-react'; // You can use lucide-react icons
import { activityImpact, moodHistory, moodValues } from './MoodAnalytics/analytics';

// Example data for charts
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
  { month: "Apr", progress: 63 },
  { month: "May", progress: 58 },
  { month: "Jun", progress: 72 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen mx-auto bg-gradient-to-b from-background to-background/80">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EquiLife</span>
          </div>
          <div className="flex items-center gap-4">
            
            <Link to="/" className="text-md hidden sm:block hover:text-primary">About Us</Link>
            <Link to="/dashboard" className="text-md hover:text-primary">Dashboard</Link>
            <Link to="/login">
              <Button className="text-md font-bold">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Track Your Mental Wellness Journey
              <span className="text-primary"> Every Day</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your personal companion for mental health tracking, mood analysis, and self-improvement.
              Get insights, set goals, and celebrate your progress.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Mental Health Tracking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mood Tracking</CardTitle>
                <CardDescription>
                  Track your daily moods and emotions with our intuitive journal system
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Progress Analytics</CardTitle>
                <CardDescription>
                  Visualize your journey with detailed charts and insights
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI-Powered Insights</CardTitle>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Analytics at Your Fingertips
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
                <CardDescription>Track positive and negative emotions over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    positive: {
                      label: "Positive",
                      color: "hsl(var(--primary))",
                    },
                    negative: {
                      label: "Negative",
                      color: "hsl(var(--destructive))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demoMoodData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="positive" fill="#008c21" />
                      <Bar dataKey="negative" fill="#cf4500" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card> */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Progress Trends</CardTitle>
                <CardDescription>Monitor your improvement journey</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    progress: {
                      label: "Progress",
                      color: "hsl(var(--primary))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={demoProgressData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card> */}
            <Card>
          <CardHeader>
            <CardTitle>Activity Impact on Mood</CardTitle>
            <CardDescription>How different activities affect your mood</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
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
            <CardTitle>Sleep Patterns & Mood Impact</CardTitle>
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
                <Line yAxisId="left" type="monotone" dataKey="sleep" stroke="#8884d8" strokeWidth={2} name="Sleep Hours" />
                <Line yAxisId="right" type="monotone" dataKey="mood" stroke="#2a9d90" strokeWidth={2} name="Mood" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their mental well-being
            with our comprehensive tracking and analysis tools.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EquiLife</span>
            </div>
            <div className="flex gap-8">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} EquiLife. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
