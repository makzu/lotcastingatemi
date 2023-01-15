//@flow
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Downtime from './controls/Downtime.jsx'
import RecoverMotes from './controls/RecoverMotes.jsx'
import RecoverWillpower from './controls/RecoverWillpower.jsx'
import { endScene } from 'ducks/events'

type Props = { chronicleId: number, endScene: Function }
const StControls = ({ chronicleId, endScene }: Props) => {
  const _endScene = () => endScene(chronicleId)
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

export default connect(null, { endScene })(StControls)
