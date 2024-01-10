import * as React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
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

export default connect(null, {
  endScene,
})(StControls)
