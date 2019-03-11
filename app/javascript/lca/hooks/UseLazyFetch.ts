import * as React from 'react'

const useLazyFetch = (id: number, fetch: (id: number) => void) => {
  React.useEffect(() => fetch(id), [id])
}

export default useLazyFetch
