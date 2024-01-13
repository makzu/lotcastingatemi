import { Typography } from '@mui/material'
import BlockPaper from 'components/shared/BlockPaper'
import CardBase from 'components/shared/CardBase'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'
import { useGetQcQuery } from 'features/qc'
import useFetchQc from 'features/qc/useGetQc'
import SpendableBlock from '../generic/SpendableBlock'

const Test = () => {
  const { qc, ...others } = useFetchQc(77)

  if (qc == null) {
    return <></>
  }

  return (
    <>
      <CardBase>
        <Typography variant="h6">{qc.name}</Typography>
        <MarkdownDisplay source={qc.description} />
        <p>
          Appearance: {qc.appearance} {others.isHideous ? '(Hideous)' : null}
        </p>
        {/* <SpendableBlock character={qc} qc /> */}

        <p>Evasion: {qc.evasion}</p>
        <p>Health Levels: {others.totalHealth}</p>
      </CardBase>
    </>
  )
}

export default Test
