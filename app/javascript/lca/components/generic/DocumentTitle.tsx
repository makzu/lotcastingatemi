import React from 'react'

import useDocumentTitle from 'hooks/UseDocumentTitle'

const DocumentTitle = ({ title }: { title: string }) => {
  useDocumentTitle(title)
  return <></>
}

export default DocumentTitle
