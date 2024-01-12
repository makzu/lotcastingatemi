import { useDocumentTitle } from 'hooks'

const DocumentTitle = ({ title }: { title: string }) => {
  useDocumentTitle(title)
  return <></>
}

export default DocumentTitle
