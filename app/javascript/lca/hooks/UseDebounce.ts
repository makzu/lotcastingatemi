import debounce from 'lodash.debounce'
import { useRef } from 'react'

/**
 * Custom hook that returns a debounced version of the provided function.
 * @param func The function to debounce.
 * @param delay The delay in milliseconds.
 */
function useDebounce<T extends (...args: never) => void>(func: T, delay = 500) {
  const debouncedFunc = useRef(debounce(func, delay)).current

  return debouncedFunc
}

export default useDebounce
