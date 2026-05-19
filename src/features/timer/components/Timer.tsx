import { useEffect } from 'react'
import { useTimerStore, type TimerMode } from '../store/timerStore'

const MODE_LABELS: Record<TimerMode, string> = {
  work: 'Focus',
  short_break: 'Short Break',
  long_break: 'Long Break',
}

const MODE_COLORS: Record<TimerMode, string> = {
  work: 'bg-purple-700',
  short_break: 'bg-emerald-700',
  long_break: 'bg-blue-700',
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function Timer() {
  const mode = useTimerStore((s) => s.mode)
  const status = useTimerStore((s) => s.status)
  const secondsLeft = useTimerStore((s) => s.secondsLeft)
  const plannedDuration = useTimerStore((s) => s.plannedDuration)
  const workSessionsCompleted = useTimerStore((s) => s.workSessionsCompleted)
  const start = useTimerStore((s) => s.start)
  const pause = useTimerStore((s) => s.pause)
  const reset = useTimerStore((s) => s.reset)
  const skip = useTimerStore((s) => s.skip)
  const tick = useTimerStore((s) => s.tick)

  // Tick interval — runs every second when timer is running
  useEffect(() => {
    if (status !== 'running') return

    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [status, tick])

  // Update document title with timer
  useEffect(() => {
    if (status === 'running' || status === 'paused') {
      document.title = `${formatTime(secondsLeft)} - ${MODE_LABELS[mode]} | Radoro`
    } else {
      document.title = 'Radoro'
    }

    return () => {
      document.title = 'Radoro'
    }
  }, [secondsLeft, mode, status])

  const progress = ((plannedDuration - secondsLeft) / plannedDuration) * 100

  return (
    <div className="flex flex-col items-center">
      {/* Mode badge */}
      <div className={`px-4 py-1 rounded-full text-sm font-semibold mb-6 ${MODE_COLORS[mode]}`}>
        {MODE_LABELS[mode]}
      </div>

      {/* Timer display */}
      <div className="relative mb-8">
        <svg className="w-80 h-80 -rotate-90" viewBox="0 0 320 320">
          {/* Background ring */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            className="text-purple-900"
          />
          {/* Progress ring */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 140}`}
            strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
            className="text-purple-400 transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-mono font-bold text-white">
            {formatTime(secondsLeft)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        {status === 'running' ? (
          <button
            onClick={pause}
            className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-semibold transition"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={start}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition"
          >
            {status === 'paused' ? 'Resume' : 'Start'}
          </button>
        )}

        <button
          onClick={reset}
          className="px-6 py-3 bg-purple-900 hover:bg-purple-800 rounded-lg transition"
        >
          Reset
        </button>

        <button
          onClick={skip}
          className="px-6 py-3 bg-purple-900 hover:bg-purple-800 rounded-lg transition"
        >
          Skip
        </button>
      </div>

      {/* Session counter */}
      <p className="text-purple-300 text-sm">
        Work sessions today: <span className="font-bold text-white">{workSessionsCompleted}</span>
      </p>
    </div>
  )
}