// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import MuiTextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import BlockPaper from 'components/shared/BlockPaper'
import TextField from 'components/generic/TextField.jsx'
import ProtectedComponent from 'containers/ProtectedComponent'

import { updatePlayer, destroyAccount } from 'ducks/actions.js'
import { switchTheme } from 'features/themeSlice'
import { getSpecificPlayer } from 'selectors'
import type { Player, Enhancer } from 'utils/flow-types'

type Props = {
  player: Player,
  theme: string,
  updatePlayer: Function,
  switchTheme: Function,
  destroyAccount: Function,
}

class SettingsPage extends Component<Props, { open: boolean }> {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChangeName = (e) => {
    this.props.updatePlayer(this.props.player.id, {
      [e.target.name]: e.target.value,
    })
  }

  handleChangeTheme = (e) => {
    this.props.switchTheme(e.target.value)
  }

  handleClickDelete = () => {
    this.props.destroyAccount()
    this.setState({ open: false })
  }

  render() {
    /* Escape hatch */
    if (this.props.player == undefined)
      return <Typography paragraph>Not yet loaded</Typography>

    const {
      handleOpen,
      handleClose,
      handleChangeName,
      handleChangeTheme,
      handleClickDelete,
    } = this
    const { open } = this.state
    const { player, theme } = this.props

    return (
      <BlockPaper>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>

        <TextField
          label="Display Name"
          name="display_name"
          value={player.display_name}
          onChange={handleChangeName}
          margin="dense"
        />
        <Typography paragraph>
          Displayed to other players in your chronicles.
        </Typography>

        <Divider style={{ margin: '1em 0' }} />

        <MuiTextField
          variant="standard"
          select
          label="Theme"
          value={theme}
          onChange={handleChangeTheme}
          margin="dense"
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </MuiTextField>

        <Divider style={{ margin: '1em 0' }} />

        <Button onClick={handleOpen}>Delete Account</Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete your account?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will delete your account, as well as all of your chronicles,
              characters, QCs, and battlegroups. This includes any characters or
              QCs you may have marked as public.
            </DialogContentText>
            <DialogContentText>
              <strong>This cannot be undone!</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClickDelete}>Delete Account</Button>
          </DialogActions>
        </Dialog>
      </BlockPaper>
    )
  }
}

const mapStateToProps = (state) => {
  const id = state.session.id
  const player = getSpecificPlayer(state, id)
  const { theme } = state
  return { player, theme }
}

const enhance: Enhancer<Props, {}> = compose(
  ProtectedComponent,
  connect(mapStateToProps, { updatePlayer, switchTheme, destroyAccount }),
)

export default enhance(SettingsPage)
