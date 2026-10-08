"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // A full navigation makes the new session cookie available to the
        // server-rendered admin page immediately.
        window.location.assign("/admin");
      } else {
        setError(data.error || "Onjuist wachtwoord");
      }
    } catch {
      setError("Er ging iets mis. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#241923] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/brand/puurgeeske-sunset.png"
            alt="PuurGeeske"
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-light text-white">PuurGeeske beheer</h1>
          <p className="text-[#e2c7d1] text-sm mt-2">Log in om je lessen en workshops te beheren</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2rem] p-8 shadow-lg border border-stone-100"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-stone-700">Gebruikersnaam</label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#b43b79]/50"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-stone-700">
                Wachtwoord
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-stone-200 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 focus:border-[#D4A373] transition-all"
                  placeholder="Voer je wachtwoord in"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Bezig met inloggen..." : "Inloggen"}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <p className="text-center text-stone-400 text-xs mt-6">
          Wachtwoord vergeten? Neem contact op met de beheerder.
        </p>
      </div>
    </div>
  );
}
