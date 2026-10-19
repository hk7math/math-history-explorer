import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Locale = 'en' | 'zh-TW'

const KEY = 'math-repo-locale'

function initialLocale(): Locale {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'zh-TW') return saved
  } catch {
    // Private mode can refuse storage. The switch still works for this visit.
  }
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('zh-tw') || lang.startsWith('zh-hk') || lang.startsWith('zh-mo') || lang.includes('hant')) {
    return 'zh-TW'
  }
  return 'en'
}

type LocaleValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const setLocale = useCallback((next: Locale) => {
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // The choice still applies until reload.
    }
    setLocaleState(next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === 'zh-TW' ? 'zh-TW' : 'en'
    document.title = locale === 'zh-TW' ? '數學.git' : 'mathematics.git'
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside LocaleProvider')
  return value
}
