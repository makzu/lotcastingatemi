import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions'
import { getPoolsAndRatingsGeneric, canIEdit } from 'selectors'
import type { Character, fullQc, Battlegroup, Enhancer } from 'utils/flow-types'

const styles = (theme) => ({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(),
  },
  col: {
    flex: 1,
  },
})

interface ExposedProps {
  character: Character | fullQc | Battlegroup
}
type Props = ExposedProps & {
  canEdit: boolean
  update: $TSFixMeFunction
  pools: Record<string, $TSFixMe>
  classes: Record<string, $TSFixMe>
}
interface State {
  open: boolean
  initiative: number
}

class JoinBattlePopup extends Component<Props, State> {
  state = { open: false, initiative: 0 }

  handleChange = (e) => {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }
  handleOpen = () =>
    this.setState({
      open: true,
    })
  handleClose = () =>
    this.setState({
      open: false,
      initiative: 0,
    })
  handleSubmit = () => {
    this.setState({
      open: false,
    })
    this.props.update(this.props.character.id, this.state.initiative)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { character, pools, classes } = this.props
    return (
      <>
        <Button onClick={handleOpen}>Roll Join Battle</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Join Battle</DialogTitle>
          <DialogContent>
            <div className={classes.wrap}>
              <div className={classes.col}>
                <PoolDisplay
                  qc={
                    character.type === 'qc' || character.type === 'battlegroup'
                  }
                  pool={pools.joinBattle}
                  label="Join Battle Pool"
                />
              </div>
              <div className={classes.col}>
                <RatingField
                  trait="initiative"
                  label="Result"
                  value={this.state.initiative}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogContentText>
              {character.name} will join combat with {this.state.initiative + 3}{' '}
              initiative.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Join Battle
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state, props: ExposedProps) {
  let type
  if (props.character.type === 'qc') type = 'qc'
  else if (props.character.type === 'battlegroup') type = 'battlegroup'
  else type = 'character'
  return {
    canEdit: canIEdit(state, props.character.id, type),
    pools: getPoolsAndRatingsGeneric(state, props.character.id, type),
  }
}

function mapDispatchToProps(dispatch: $TSFixMeFunction, props: ExposedProps) {
  let action

  switch (props.character.type) {
    case 'qc':
      action = updateQc
      break

    case 'battlegroup':
      action = updateBattlegroup
      break

    case 'character':
    default:
      action = updateCharacter
  }

  return {
    update: (id, value) =>
      dispatch(
        action(id, {
          in_combat: true,
          initiative: 3 + value,
        }),
      ),
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)
export default enhance(JoinBattlePopup)
