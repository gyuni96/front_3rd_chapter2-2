import { useCallback, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getLocalStorage = useCallback(() => {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : initialValue
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState<T>(getLocalStorage)

  const setLocalStorage = useCallback(
    (value: T | ((val: T) => T)) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    },
    [key, storedValue]
  )

  const removeLocalStorage = useCallback(
    (key: string) => {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    },
    [key, initialValue]
  )

  return [storedValue, setLocalStorage, removeLocalStorage] as const
}
