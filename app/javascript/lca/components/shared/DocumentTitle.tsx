import { useDocumentTitle } from '@lca/hooks'

const DocumentTitle = ({ title }: { title: string }) => {
  useDocumentTitle(title)
  // biome-ignore lint/complexity/noUselessFragments: It needs to return -something-
  return <></>
}

export default DocumentTitle
