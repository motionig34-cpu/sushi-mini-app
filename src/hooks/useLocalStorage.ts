import { useState } from 'react'

type Setter<T> = T | ((prev: T) => T)

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: Setter<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: Setter<T>) => {
    try {
      const valueToStore =
        typeof value === 'function'
          ? (value as (prev: T) => T)(storedValue)
          : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      console.error(`localStorage write error: ${key}`)
    }
  }

  return [storedValue, setValue]
}
