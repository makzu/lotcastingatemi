import { Typography } from '@mui/material'

import BlockPaper from '@/components/shared/BlockPaper'
import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import { useDocumentTitle, useIdFromParams } from '@/hooks'
import { useGetQcQuery } from '../store/qc'
import {
  BattlegroupPoolDisplay,
  BgBox,
} from '@/features/battlegroup/components'
import QcPoolDisplay from '../components/QcPoolDisplay'
import QcSpendableBlock from '../components/QcSpendableBlock'

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

      <div className="flexContainerWrap">
        <BgBox>
          <BattlegroupPoolDisplay label="Essence" value={qc.essence} />
        </BgBox>

        <QcSpendableBlock qc={qc} />
      </div>

      <div className="flexContainerWrap"></div>
    </BlockPaper>
  )
}

export default QcSheet
