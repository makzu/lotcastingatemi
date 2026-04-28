import { useDispatch } from 'react-redux'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@material-ui/core/'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { endScene } from '@lca/ducks/events'
import Downtime from './controls/Downtime.jsx'
import RecoverMotes from './controls/RecoverMotes.jsx'
import RecoverWillpower from './controls/RecoverWillpower.jsx'

type Props = { chronicleId: number }
const StControls = ({ chronicleId }: Props) => {
  const dispatch = useDispatch()

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
