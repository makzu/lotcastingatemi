import { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import RatingField from 'components/generic/RatingField'
import { respireMotes } from 'ducks/events'
interface Props {
  id: number
  respireMotes: $TSFixMeFunction
}
interface State {
  open: boolean
  toRecover: number
  qcs: boolean
}

class MoteRespirePopup extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { open: false, toRecover: 0, qcs: false }
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false, toRecover: 0, qcs: false })

  handleAdd = (motes) =>
    this.setState({ toRecover: Math.max(this.state.toRecover + motes, 0) })

  handleReset = () => this.setState({ toRecover: 0 })

  handleChange = (e) => {
    let { name, value } = e.target

    if (name === 'toRecover') {
      let val = Math.max(parseInt(value), 0)
      this.setState({ toRecover: val })
    } else {
      this.setState({ [name]: value })
    }
  }

  handleCheck = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] })

    const { name, value } = e.target

    if (name === 'toRecover') {
      const val = Math.max(parseInt(value), 0)
      this.setState({
        toRecover: val,
      })
    } else {
      this.setState({
        [name]: value,
      })
    }
  }
  handleCheck = (e) =>
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    })
  handleSubmit = () => {
    const { toRecover, qcs } = this.state
    this.props.respireMotes(this.props.id, toRecover, qcs)
    this.handleClose()
  }

  render() {
    const { toRecover, qcs, open } = this.state
    const {
      handleOpen,
      handleClose,
      handleAdd,
      handleReset,
      handleChange,
      handleCheck,
      handleSubmit,
    } = this
    return (
      <>
        <Button onClick={handleOpen}>Respire Motes</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Respire Motes</DialogTitle>

          <DialogContent>
            <DialogContentText>
              In combat, characters recover 5 motes per round. Out of combat,
              characters recover 5 motes per hour, or 10 while very relaxed.
            </DialogContentText>
            <DialogContentText>
              Peripheral pools are replenished before Personal.
            </DialogContentText>
            <Typography variant="caption">(Core, p.174)</Typography>
            <div>
              <Button size="small" onClick={() => handleAdd(-5)}>
                -5
              </Button>
              <Button size="small" onClick={() => handleAdd(-1)}>
                -1
              </Button>
              &nbsp;&nbsp;
              <RatingField
                trait="toRecover"
                value={toRecover}
                label="Motes"
                margin="dense"
                min={0}
                onChange={handleChange}
              />
              <Button size="small" onClick={handleReset}>
                0
              </Button>
              <Button size="small" onClick={() => handleAdd(1)}>
                +1
              </Button>
              <Button size="small" onClick={() => handleAdd(5)}>
                +5
              </Button>
              <Button size="small" onClick={() => handleAdd(10)}>
                +10
              </Button>
            </div>

            <FormControlLabel
              label="Include QCs"
              control={
                <Checkbox name="qcs" checked={qcs} onChange={handleCheck} />
              }
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Respire
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default connect(null, { respireMotes })(MoteRespirePopup)
