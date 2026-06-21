import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@material-ui/core/'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { endScene } from '@lca/ducks/events/index.ts'
import { useAppDispatch } from '@lca/hooks/UseAppDispatch.ts'
import Downtime from './controls/Downtime.tsx'
import RecoverMotes from './controls/RecoverMotes.tsx'
import RecoverWillpower from './controls/RecoverWillpower.tsx'

type Props = { chronicleId: number }
const StControls = ({ chronicleId }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">ST Controls</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button onClick={() => dispatch(endScene(chronicleId))}>
          End Scene
        </Button>

        <RecoverMotes id={chronicleId} />
        <RecoverWillpower id={chronicleId} />
        <Downtime id={chronicleId} />
      </AccordionDetails>
    </Accordion>
  )
}

export default StControls
