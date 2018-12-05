// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import MuiTextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import TextField from 'components/generic/TextField.jsx'

import { updatePlayer, switchTheme, destroyAccount } from 'ducks/actions.js'
import { getSpecificPlayer } from 'selectors'
import type { Player, Enhancer } from 'utils/flow-types'

type Props = {
  player: Player,
  theme: string,
  updatePlayer: Function,
  switchTheme: Function,
  destroyAccount: Function,
}

class SettingsPage extends React.Component<Props, { open: boolean }> {
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

  handleChangeName = e => {
    this.props.updatePlayer(this.props.player.id, e.target.name, e.target.value)
  }

  handleChangeTheme = e => {
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
        <Typography variant="headline" gutterBottom>
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

const mapStateToProps = state => {
  const id = state.session.id
  const player = getSpecificPlayer(state, id)
  const { theme } = state.app
  return { player, theme }
}

const enhance: Enhancer<Props, {}> = compose(
  connect(
    mapStateToProps,
    { updatePlayer, switchTheme, destroyAccount }
  )
)

export default enhance(SettingsPage)
