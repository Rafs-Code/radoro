import { create } from 'zustand'

export type TimerMode = 'work' | 'short_break' | 'long_break'
export type TimerStatus = 'idle' | 'running' | 'paused'

type TimerState = {
  // State
  mode: TimerMode
  status: TimerStatus
  secondsLeft: number
  plannedDuration: number // in seconds
  workSessionsCompleted: number // counter for long break logic

  // Settings (loaded from Supabase later)
  workDuration: number // in minutes
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number

  // Actions
  start: () => void
  pause: () => void
  reset: () => void
  skip: () => void
  tick: () => void
  setSettings: (settings: {
    workDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    longBreakInterval: number
  }) => void
}

// Helper: get duration for current mode in seconds
function getDurationForMode(
  mode: TimerMode,
  workMin: number,
  shortMin: number,
  longMin: number
): number {
  switch (mode) {
    case 'work':
      return workMin * 60
    case 'short_break':
      return shortMin * 60
    case 'long_break':
      return longMin * 60
  }
}

// Helper: determine next mode after current finishes
function getNextMode(
  current: TimerMode,
  workSessionsCompleted: number,
  longBreakInterval: number
): TimerMode {
  if (current === 'work') {
    // After work, decide which break
    const isLongBreakTime = (workSessionsCompleted + 1) % longBreakInterval === 0
    return isLongBreakTime ? 'long_break' : 'short_break'
  }
  // After any break, go back to work
  return 'work'
}

export const useTimerStore = create<TimerState>((set, get) => ({
  // Initial state
  mode: 'work',
  status: 'idle',
  secondsLeft: 25 * 60, // default 25 minutes
  plannedDuration: 25 * 60,
  workSessionsCompleted: 0,

  // Default settings (will be overridden by useSettings later)
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,

  // Actions
  start: () => set({ status: 'running' }),

  pause: () => set({ status: 'paused' }),

  reset: () => {
    const { mode, workDuration, shortBreakDuration, longBreakDuration } = get()
    const duration = getDurationForMode(mode, workDuration, shortBreakDuration, longBreakDuration)
    set({
      status: 'idle',
      secondsLeft: duration,
      plannedDuration: duration,
    })
  },

  skip: () => {
    const {
      mode,
      workSessionsCompleted,
      workDuration,
      shortBreakDuration,
      longBreakDuration,
      longBreakInterval,
    } = get()

    const nextMode = getNextMode(mode, workSessionsCompleted, longBreakInterval)
    const nextDuration = getDurationForMode(
      nextMode,
      workDuration,
      shortBreakDuration,
      longBreakDuration
    )

    set({
      mode: nextMode,
      status: 'idle',
      secondsLeft: nextDuration,
      plannedDuration: nextDuration,
      workSessionsCompleted: mode === 'work' ? workSessionsCompleted + 1 : workSessionsCompleted,
    })
  },

  tick: () => {
    const { secondsLeft, status } = get()
    if (status !== 'running') return

    if (secondsLeft <= 1) {
      // Timer finished — switch to next mode
      get().skip()
    } else {
      set({ secondsLeft: secondsLeft - 1 })
    }
  },

  setSettings: (settings) => {
    set({
      workDuration: settings.workDuration,
      shortBreakDuration: settings.shortBreakDuration,
      longBreakDuration: settings.longBreakDuration,
      longBreakInterval: settings.longBreakInterval,
    })

    // Re-initialize timer with new settings if idle
    const { status, mode } = get()
    if (status === 'idle') {
      const duration = getDurationForMode(
        mode,
        settings.workDuration,
        settings.shortBreakDuration,
        settings.longBreakDuration
      )
      set({ secondsLeft: duration, plannedDuration: duration })
    }
  },
}))
