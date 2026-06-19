import { useEffect } from 'react'

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export const useBetterDocumentTitle = (title: string) => {
  let newTitle: string
  if (title === undefined) {
    newTitle = 'Lot-Casting Atemi'
  } else {
    newTitle = `${title} | Lot-Casting Atemi`
  }

  useDocumentTitle(newTitle)
}

export default useDocumentTitle
