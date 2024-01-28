import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material'

import { endScene } from '@/ducks/events'
import { useAppDispatch } from '@/hooks'
import Downtime from './controls/Downtime'
import RecoverMotes from './controls/RecoverMotes'
import RecoverWillpower from './controls/RecoverWillpower'

interface Props {
  chronicleId: number
}

const StControls = ({ chronicleId }: Props) => {
  const dispatch = useAppDispatch()
  const _endScene = () => {
    dispatch(endScene(chronicleId))
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1">ST Controls</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Button onClick={_endScene}>End Scene</Button>

        <RecoverMotes id={chronicleId} />
        <RecoverWillpower id={chronicleId} />
        <Downtime id={chronicleId} />
      </AccordionDetails>
    </Accordion>
  )
}

export default StControls
