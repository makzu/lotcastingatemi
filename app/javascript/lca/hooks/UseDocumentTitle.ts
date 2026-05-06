import { useEffect } from 'react'

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default useDocumentTitle
