//@flow
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Downtime from './controls/Downtime.jsx'
import RecoverMotes from './controls/RecoverMotes.jsx'
import RecoverWillpower from './controls/RecoverWillpower.jsx'
import { endScene } from 'ducks/events'

type Props = { chronicleId: number, endScene: Function }
const StControls = ({ chronicleId, endScene }: Props) => {
  const _endScene = () => endScene(chronicleId)
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">ST Controls</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Button onClick={_endScene}>End Scene</Button>

        <RecoverMotes id={chronicleId} />
        <RecoverWillpower id={chronicleId} />
        <Downtime id={chronicleId} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default connect(null, { endScene })(StControls)
