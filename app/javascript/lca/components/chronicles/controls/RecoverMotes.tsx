import * as React from 'react'
const { Component, Fragment } = React
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
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
    this.state = {
      open: false,
      toRecover: 0,
      qcs: false,
    }
  }

  handleOpen = () =>
    this.setState({
      open: true,
    })
  handleClose = () =>
    this.setState({
      open: false,
      toRecover: 0,
      qcs: false,
    })
  handleAdd = (motes) =>
    this.setState({
      toRecover: Math.max(this.state.toRecover + motes, 0),
    })
  handleReset = () =>
    this.setState({
      toRecover: 0,
    })
  handleChange = (e) => {
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
      <Fragment>
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
      </Fragment>
    )
  }
}

export default connect(null, {
  respireMotes,
})(MoteRespirePopup)
