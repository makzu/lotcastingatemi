import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import { addThingToChronicle } from '../../ducks/actions.js'
import { getSpecificChronicle, getMyCharactersWithoutChronicles } from '../../selectors/'

class CharacterAddPopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      characterId: 0,
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
    if (this.state.characterId == 0)
      return

    this.setState({ open: false })
    this.props.handleSubmit(this.props.chronicleId, this.state.characterId)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicleName, characters } = this.props

    const options = characters.map((c) =>
      <MenuItem key={ c.id } value={ c.id }>
        { c.name }
      </MenuItem>
    )

    const currentCharacter = characters.find((c) => c.id == this.state.characterId)

    return <Fragment>
      <Button onClick={ handleOpen }>
        Add Character
      </Button>

      <Dialog
        open={ this.state.open }
        onClose={ handleClose }
      >
        <DialogTitle>Add a Character to { chronicleName }</DialogTitle>
        <DialogContent>
          <TextField select value={ this.state.characterId }
            name="characterId"
            onChange={ handleChange }
            fullWidth margin="dense"
          >
            <MenuItem value={ 0 }>Select a Character</MenuItem>
            <Divider />
            { options }
          </TextField>
          { currentCharacter && currentCharacter.hidden &&
            <DialogContentText>
              This Character is hidden.  It will only be visible to you and the
              storyteller.
            </DialogContentText>
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
CharacterAddPopup.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object),
  chronicleId: PropTypes.number.isRequired,
  chronicleName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const id = state.session.id
  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  const characters = getMyCharactersWithoutChronicles(state)
  let chronicleName = ''
  let inviteCode = ''

  if (chronicle.name != undefined) {
    chronicleName = chronicle.name
    inviteCode = chronicle.invite_code
  }

  return {
    id,
    characters,
    chronicleName,
    inviteCode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (id, charId) => dispatch(addThingToChronicle(id, charId, 'character'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterAddPopup)
