import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Brain } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling error messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // To redirect the user

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(import.meta.env.VITE_API_URL);
    try {
      // Send login request to the backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // If login fails
      if (!response.ok) {
        throw new Error(data.error || "Failed to log in");
      }

      // Save the JWT token to localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", data.payload.user.id);
      // Redirect to the dashboard or home page after successful login
      navigate("/dashboard");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f3e8ff] via-[#e0f7fa] to-[#f3e8ff]">
      <div className="w-full max-w-md bg-glass shadow-xl p-8 rounded-2xl">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-3xl font-extrabold text-primary">EquiLife</span>
          </a>
        </div>
        <Card className="card">
          <CardHeader>
            <CardTitle className="text-2xl text-primary font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue your journey
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert className="border-red-600 border-2 text-red-900" variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <a href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="button-primary w-full" disabled={loading}>
                {loading ? "Logging in..." : "Sign In"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary hover:underline">
                  Sign up
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
