import { useState } from 'react'

const useToggleBoolean = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue)
  const toggleValue = () => setValue(!value)
  return [value, toggleValue]
}

export default useToggleBoolean
