import { useState } from "react";
import { Activity, UserCheck, HeartPulse, Sparkles, Info, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/images/bg.png";

export default function authPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const toggleDescription = () => setIsExpanded((v) => !v);

  // Handle form submit for both login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (activeTab === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const url =
        activeTab === "signup"
          ? `${import.meta.env.VITE_API_URL}/api/signup`
          : `${import.meta.env.VITE_API_URL}/api/login`;

      const body =
        activeTab === "signup"
          ? {
              username: formData.name,
              email: formData.email,
              password: formData.password,
            }
          : {
              email: formData.email,
              password: formData.password,
            };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Authentication failed");

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", data.payload.user.id);

      if (activeTab === "signup") {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setActiveTab("login");
          setSuccess(false);
        }, 1500);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex flex-col"
    >
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-2 mb-4">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          <span className="font-semibold">For testing, use <i className="text-orange-500">test@gmail.com / test</i> as email and password.</span>
          <div className="ml-auto">
            <button
              onClick={toggleDescription}
              className="text-orange-500 text-xs font-semibold underline underline-offset-2"
              style={{ letterSpacing: "0.5px" }}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
        {isExpanded && (
          <p className="text-sm mt-2 text-gray-900 leading-relaxed">
            I'd love to see your impact! Add some activities or journal entries and leave your mark - let me know someone was here!
          </p>
        )}
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-8 ">
        <a href="/" className="inline-flex items-center gap-2">
          <Brain className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold text-gray-900">
            <span className="text-blue-500">Equi</span>
            <span className="text-orange-500">Life</span>
          </span>
        </a>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium"
        >
          Home
        </button>
      </header>

      {/* Main Auth Card */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 shadow-xl rounded-2xl p-8">
            {/* Tab Switch */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setActiveTab("signup")}
                className={`px-6 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                  activeTab === "signup"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setActiveTab("login")}
                className={`px-6 py-2 rounded-r-md border border-gray-300 text-sm font-medium -ml-px ${
                  activeTab === "login"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                Login
              </button>
            </div>
            {/* Auth Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {activeTab === "signup" && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                    />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={activeTab === "signup" ? "new-password" : "current-password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                  />
                </div>
              </div>
              {activeTab === "signup" && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                    />
                  </div>
                </div>
              )}
              {/* Error/Success */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-2 py-1">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-green-700 text-sm bg-green-50 border border-green-200 rounded px-2 py-1">
                  Account created! Please log in.
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading
                    ? activeTab === "signup"
                      ? "Creating account..."
                      : "Logging in..."
                    : activeTab === "signup"
                    ? "Sign Up"
                    : "Sign In"}
                </button>
              </div>
              <div className="text-center text-sm text-gray-500">
                {activeTab === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => setActiveTab("login")}
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => setActiveTab("signup")}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer with EquiLife-related icons */}
      <footer className="py-6 flex justify-around">
        <div className="flex justify-center gap-4 mb-2">
          {[Activity, UserCheck, HeartPulse, Sparkles].map((Icon, i) => (
            <div key={i} className="bg-gray-800 text-white p-2 rounded-md">
              <Icon className="h-5 w-5" />
            </div>
          ))}
        </div>
        <p className="text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} EquiLife. All rights reserved.
        </p>
      </footer>
    </div>
  );
}