import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import { addThingToChronicle } from '../../ducks/actions.js'
import { getMyBattlegroupsWithoutChronicles } from '../../selectors/'

class BattlegroupAddPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      battlegroupId: 0,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleSubmit() {
    if (this.state.battlegroupId == 0)
      return

    this.setState({ open: false })
    this.props.handleSubmit(this.props.chronicleId, this.state.battlegroupId)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicleName, battlegroups } = this.props

    const options = battlegroups.map((c) =>
      <MenuItem key={ c.id } value={ c.id }>
        { c.name }
      </MenuItem>
    )

    const currentBattlegroup = battlegroups.find((c) => c.id == this.state.battlegroupId)

    return <Fragment>
      <Button onClick={ handleOpen }>
        Add Battlegroup
      </Button>

      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Add a Battlegroup to { chronicleName }</DialogTitle>
        <DialogContent>
          <TextField select value={ this.state.battlegroupId }
            name="battlegroupId"
            onChange={ handleChange }
            fullWidth margin="dense"
          >
            <MenuItem value={ 0 }>Select a Battlegroup</MenuItem>
            <Divider />
            { options }
          </TextField>
          { currentBattlegroup && currentBattlegroup.hidden &&
            <Typography>
              This Battlegroup is hidden.  It will only be visible to you and the
              storyteller.
            </Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>
          <Button onClick={ handleSubmit } variant="raised" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  }
}
BattlegroupAddPopup.propTypes = {
  battlegroups: PropTypes.arrayOf(PropTypes.object),
  chronicleId: PropTypes.number.isRequired,
  chronicleName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const id = state.session.id
  const chronicle = state.entities.chronicles[ownProps.chronicleId]
  const battlegroups = getMyBattlegroupsWithoutChronicles(state)
  let chronicleName = ''
  let inviteCode = ''

  if (chronicle.name != undefined) {
    chronicleName = chronicle.name
    inviteCode = chronicle.invite_code
  }

  return {
    id,
    battlegroups,
    chronicleName,
    inviteCode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (id, battlegroupId) => dispatch(addThingToChronicle(id, battlegroupId, 'battlegroup'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattlegroupAddPopup)
