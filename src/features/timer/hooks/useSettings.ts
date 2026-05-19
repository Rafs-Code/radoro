import { useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../contexts/useAuth'
import { useTimerStore } from '../store/timerStore'

export function useSettings() {
  const { user } = useAuth()
  const setSettings = useTimerStore((s) => s.setSettings)

  useEffect(() => {
    if (!user) return

    async function loadSettings() {
      const { data, error } = await supabase
        .from('settings')
        .select('work_duration, short_break_duration, long_break_duration, long_break_interval')
        .eq('id', user!.id)
        .single()

      if (error) {
        console.error('Failed to load settings:', error)
        return
      }

      if (data) {
        setSettings({
          workDuration: data.work_duration,
          shortBreakDuration: data.short_break_duration,
          longBreakDuration: data.long_break_duration,
          longBreakInterval: data.long_break_interval,
        })
      }
    }

    loadSettings()
  }, [user, setSettings])
}