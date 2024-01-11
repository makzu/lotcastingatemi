import { deepEqual } from 'fast-equals'
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import DescriptionIcon from '@material-ui/icons/Description'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import TextField from 'components/generic/TextField.jsx'
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

interface Props {
  character: Character
  canIEdit: boolean
  classes: Record<string, $TSFixMe>
  updateCharacter: $TSFixMeFunction
}
interface State {
  open: boolean
  editing: boolean
}

class NotesPopup extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      editing: false,
    }
  }

  handleOpen = (e) => {
    this.setState({
      open: true,
    })
    e.preventDefault()
  }
  handleClose = () => {
    this.setState({
      open: false,
      editing: false,
    })
  }
  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing,
    })
  }
  handleChange = (e: React.SyntheticEvent) => {
    const { name, value } = e.target
    const { character } = this.props
    if (deepEqual(character[name], value)) return
    this.props.updateCharacter(character.id, {
      [name]: value,
    })
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
              <span
                style={{
                  flex: '1',
                }}
              >
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
  connect(mapStateToProps, {
    updateCharacter,
  }),
)(NotesPopup)
