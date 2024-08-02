import { Typography } from '@mui/material'

import BlockPaper from '@/components/shared/BlockPaper'
import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import { useDocumentTitle, useIdFromParams } from '@/hooks'
import { useGetQcQuery } from '../store/qc'

const QcSheet = () => {
  const id = useIdFromParams()
  const { data: qc } = useGetQcQuery(id)

  useDocumentTitle(`${qc && qc.name + ' | '}Lot-Casting Atemi`)

  if (!qc)
    return (
      <BlockPaper>
        <Typography paragraph>This QC has not yet loaded.</Typography>
      </BlockPaper>
    )

  return (
    <BlockPaper>
      <MarkdownDisplay source={qc.description} />

      <div className="flexContainerWrap"></div>
    </BlockPaper>
  )
}

export default QcSheet
