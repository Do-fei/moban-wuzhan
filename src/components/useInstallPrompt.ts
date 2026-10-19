import { useCallback, useEffect, useState } from 'react'
import type { BeforeInstallPromptEvent } from '../pwa'
import { isStandalone } from '../pwa'

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(() => isStandalone())
  const [justInstalled, setJustInstalled] = useState(false)

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault()
      setPromptEvent(event as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setPromptEvent(null)
      setInstalled(true)
      setJustInstalled(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    if (!promptEvent) return 'unavailable'
    await promptEvent.prompt()
    const result = await promptEvent.userChoice
    setPromptEvent(null)
    if (result.outcome === 'accepted') {
      setInstalled(true)
    }
    return result.outcome
  }, [promptEvent])

  return {
    canInstall: Boolean(promptEvent) && !installed,
    installed,
    justInstalled,
    install,
  }
}
