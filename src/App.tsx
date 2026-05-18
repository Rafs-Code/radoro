import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>(
    'checking'
  )
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    async function testConnection() {
      try {
        const { error } = await supabase.from('_test_dummy_table').select('*').limit(1)

        if (error && error.code === 'PGRST205') {
          setConnectionStatus('connected')
        } else if (error) {
          setConnectionStatus('error')
          setErrorMessage(error.message)
        } else {
          setConnectionStatus('connected')
        }
      } catch (err) {
        setConnectionStatus('error')
        setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-purple-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-4">🍅 Radoro</h1>
      <p className="text-purple-300 text-lg mb-8">Your focus companion is coming soon</p>

      <div className="mt-4 px-6 py-3 rounded-lg">
        {connectionStatus === 'checking' && (
          <p className="text-yellow-300">⏳ Checking Supabase connection...</p>
        )}
        {connectionStatus === 'connected' && (
          <p className="text-green-400">✅ Supabase connected successfully!</p>
        )}
        {connectionStatus === 'error' && (
          <div className="text-red-400 text-center">
            <p>❌ Connection failed</p>
            <p className="text-sm mt-2">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
