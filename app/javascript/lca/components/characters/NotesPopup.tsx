import { type ChangeEvent, Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import DescriptionIcon from '@material-ui/icons/Description'
import { deepEqual } from 'fast-equals'

import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import { updateCharacter } from '@lca/ducks/actions.ts'
import { canIEditCharacter } from '@lca/selectors/index.ts'
import commonStyles from '@lca/styles/index.ts'
import type { Character } from '@lca/types/index.ts'

const styles = (theme) => ({
  ...commonStyles(theme),
  wrapper: {
    margin: '-0.75em -1em 0 0',
  },
})

type Props = {
  character: Character
  canIEdit: boolean
  classes: Object
  updateCharacter: Function
}
type State = { open: boolean; editing: boolean }
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

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                minRows={5}
                maxRows={100}
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

export default withStyles(styles)(
  connect(mapStateToProps, { updateCharacter })(NotesPopup),
)
