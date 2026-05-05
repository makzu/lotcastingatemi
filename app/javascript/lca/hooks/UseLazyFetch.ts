import { useEffect } from 'react'

export const useLazyFetch = (id: number, fetch: (id: number) => void) => {
  useEffect(() => fetch(id), [id, fetch])
}

export default useLazyFetch
