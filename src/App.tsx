import { useState } from 'react'
import { useAuth } from './contexts/useAuth'

function App() {
  const { user, loading, signUp, signIn, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [message, setMessage] = useState('')

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-950 text-white flex items-center justify-center">
        <p>⏳ Loading...</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (mode === 'signup') {
      const { error } = await signUp(email, password)
      if (error) {
        setMessage(`❌ ${error.message}`)
      } else {
        setMessage('✅ Sign up successful! Check your email to confirm.')
      }
    } else {
      const { error } = await signIn(email, password)
      if (error) {
        setMessage(`❌ ${error.message}`)
      }
    }
  }

  // Logged in view
  if (user) {
    return (
      <div className="min-h-screen bg-purple-950 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold mb-4">🍅 Radoro</h1>
        <p className="text-purple-300 text-lg mb-8">Welcome back!</p>

        <div className="bg-purple-900 rounded-lg p-6 mb-4 max-w-md w-full">
          <p className="text-sm text-purple-300">Logged in as:</p>
          <p className="text-lg font-semibold mb-2">{user.email}</p>
          <p className="text-xs text-purple-400">User ID: {user.id}</p>
        </div>

        <button
          onClick={signOut}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg transition"
        >
          Sign Out
        </button>
      </div>
    )
  }

  // Not logged in view
  return (
    <div className="min-h-screen bg-purple-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-4">🍅 Radoro</h1>
      <p className="text-purple-300 text-lg mb-8">Your focus companion</p>

      <form onSubmit={handleSubmit} className="bg-purple-900 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === 'signup' ? 'Sign Up' : 'Sign In'}
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-purple-800 rounded text-white"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 bg-purple-800 rounded text-white"
            placeholder="Min 6 characters"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition font-semibold"
        >
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm">{message}</p>
        )}

        <button
          type="button"
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          className="w-full mt-4 text-purple-300 hover:text-white text-sm"
        >
          {mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  )
}

export default App