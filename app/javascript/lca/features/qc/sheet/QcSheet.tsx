import { Typography } from '@mui/material'

import BlockPaper from '@/components/shared/BlockPaper'
import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import {
  BattlegroupPoolDisplay,
  BgBox,
} from '@/features/battlegroup/components'
import { useDocumentTitle, useIdFromParams } from '@/hooks'
import QcSpendableBlock from '../components/QcSpendableBlock'
import { useGetQcQuery } from '../store/qc'

const QcSheet = () => {
  const id = useIdFromParams()
  const { data: qc } = useGetQcQuery(id)

  useDocumentTitle(`${qc && `${qc.name} | `}Lot-Casting Atemi`)

  if (!qc)
    return (
      <BlockPaper>
        <Typography>This QC has not yet loaded.</Typography>
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

      <div className="flexContainerWrap" />
    </BlockPaper>
  )
}

export default QcSheet
