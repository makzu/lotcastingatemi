//@flow
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Downtime from './controls/Downtime'
import RecoverMotes from './controls/RecoverMotes'
import RecoverWillpower from './controls/RecoverWillpower'
import { endScene } from 'ducks/events'
interface Props {
  chronicleId: number
  endScene: $TSFixMeFunction
}

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
