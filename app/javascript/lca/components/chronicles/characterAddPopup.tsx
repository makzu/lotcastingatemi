import { Component, Node } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import { addThingToChronicle } from 'ducks/actions'
import {
  getSpecificChronicle,
  getMyCharactersWithoutChronicles,
} from 'selectors'
import type { Character, Enhancer } from 'utils/flow-types'
interface ExposedProps {
  chronicleId: number
}
type Props = ExposedProps & {
  characters: Character[]
  chronicleName: string
  handleSubmit: $TSFixMeFunction
}
interface State {
  open: boolean
  characterId: number
}

class CharacterAddPopup extends Component<Props, State> {
  state = {
    open: false,
    characterId: 0,
  }

  handleChange = (e) => {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleOpen = () => {
    this.setState({
      open: true,
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
    })
  }
  handleSubmit = () => {
    if (this.state.characterId == 0) return
    this.setState({
      open: false,
    })
    this.props.handleSubmit(this.props.chronicleId, this.state.characterId)
  }

  render() {
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    const { chronicleName, characters } = this.props

    const options: React.ReactNode = [
      <MenuItem key={0} value={0} disabled>
        Select a Character
      </MenuItem>,
      <Divider key="div" />,
      ...characters.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      )),
    ]
    const currentCharacter = characters.find(
      (c) => c.id == this.state.characterId,
    )
    const hidden = currentCharacter && currentCharacter.hidden
    return (
      <>
        <Button onClick={handleOpen}>Add Character</Button>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Add a Character to {chronicleName}</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              select
              value={this.state.characterId}
              name="characterId"
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              {options}
            </TextField>
            {hidden && (
              <DialogContentText>
                This Character is hidden. It will only be visible to you and the
                storyteller.
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const chronicle = getSpecificChronicle(state, ownProps.chronicleId)
  const characters = getMyCharactersWithoutChronicles(state)
  let chronicleName = ''

  if (chronicle.name != undefined) {
    chronicleName = chronicle.name
  }

  return {
    characters,
    chronicleName,
  }
}

const mapDispatchToProps: Object = (dispatch) => ({
  handleSubmit: (id, charId) =>
    dispatch(addThingToChronicle(id, charId, 'character')),
})

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default enhance(CharacterAddPopup)
