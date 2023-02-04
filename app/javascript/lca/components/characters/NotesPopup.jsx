// @flow
import { deepEqual } from 'fast-equals'
import { Component, SyntheticInputEvent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import DescriptionIcon from '@mui/icons-material/Description'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { withStyles } from '@mui/styles'

import TextField from 'components/generic/TextField.jsx'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'

import { updateCharacter } from 'ducks/actions'
import { canIEditCharacter } from 'selectors'
import commonStyles from 'styles'
import type { Character } from 'utils/flow-types'

const styles = (theme) => ({
  ...commonStyles(theme),
  wrapper: {
    margin: '-0.75em -1em 0 0',
  },
})

type Props = {
  character: Character,
  canIEdit: boolean,
  classes: Object,
  updateCharacter: Function,
}
type State = { open: boolean, editing: boolean }
class NotesPopup extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = { open: false, editing: false }
  }

  handleOpen = (e) => {
    this.setState({ open: true })
    e.preventDefault()
  }

  handleClose = () => {
    this.setState({ open: false, editing: false })
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing })
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { character } = this.props

    if (deepEqual(character[name], value)) return

    this.props.updateCharacter(character.id, { [name]: value })
  }

  render() {
    const { handleOpen, handleClose, toggleEdit, handleChange } = this
    const { character, canIEdit, classes } = this.props
    const { open, editing } = this.state

    return (
      <div className={classes.wrapper}>
        <IconButton onClick={handleOpen}>
          <DescriptionIcon />
        </IconButton>

        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Notes</DialogTitle>

          <DialogContent>
            {editing ? (
              <TextField
                name="notes"
                value={character.notes}
                label="Notes"
                helperText="(Supports Markdown)"
                margin="dense"
                multiline
                fullWidth
                rows={5}
                rowsMax={100}
                onChange={handleChange}
              />
            ) : (
              <MarkdownDisplay source={character.notes || 'No notes'} />
            )}
          </DialogContent>
          <DialogActions>
            {canIEdit && (
              <span style={{ flex: '1' }}>
                <Button onClick={toggleEdit}>
                  {editing ? 'Done' : 'Edit...'}
                </Button>
              </span>
            )}
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  canIEdit: canIEditCharacter(state, props.character.id),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { updateCharacter }),
)(NotesPopup)
