/**
 * 상태 업데이트 함수
 * @param prev
 * @param key
 * @param value
 * @returns
 */
export function updateValue<T, K extends keyof T>(prev: T, key: K, value: T[K]) {
  return { ...prev, [key]: value }
}
