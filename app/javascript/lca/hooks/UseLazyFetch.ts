import { useEffect } from 'react'

const useLazyFetch = (id: number, fetch: (id: number) => void) => {
  useEffect(() => fetch(id), [id])
}

export default useLazyFetch
