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
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

import RatingField from 'components/generic/RatingField'
import { downtime } from 'ducks/events'
interface Props {
  id: number
  downtime: $TSFixMeFunction
}
interface State {
  open: boolean
  time: number
  parsedTime: number
  days: boolean
  endScene: boolean
}

class DowntimePopup extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      time: 1,
      parsedTime: 1,
      days: false,
      endScene: true,
    }
  }

  handleOpen = () =>
    this.setState({
      open: true,
    })
  handleClose = () =>
    this.setState({
      open: false,
      time: 1,
      parsedTime: 1,
      days: false,
      endScene: true,
    })
  handleReset = () =>
    this.setState({
      time: 1,
    })
  handleChange = (e) => {
    const { value } = e.target
  }

  handleReset = () => this.setState({ time: 1 })

  handleChange = (e) => {
    let { value } = e.target
    if (this.state.days) {
      this.setState({
        time: value * 24,
        parsedTime: value,
      })
    } else {
      this.setState({
        time: value,
        parsedTime: value,
      })
    }
  }
  handleSwitch = () => {
    const { time } = this.state

    if (this.state.days) {
      this.setState({
        time: Math.ceil(time / 24),
        parsedTime: time,
        days: false,
      })
    } else {
      this.setState({
        time: time * 24,
        parsedTime: time,
        days: true,
      })
    }
  }

  handleCheck = (e) =>
    this.setState({ [e.target.name]: !this.state[e.target.name] })

  handleSetHours = (hours) =>
    this.setState({ time: hours, parsedTime: hours, days: false })
  handleSetDays = (days) =>
    this.setState({ time: days * 24, parsedTime: days, days: true })

  handleSubmit = () => {
    const { time, endScene } = this.state
    this.props.downtime(this.props.id, time, endScene)
    this.handleClose()
  }

  render() {
    const { parsedTime, endScene, days, open } = this.state
    const {
      handleOpen,
      handleClose,
      handleChange,
      handleSwitch,
      handleCheck,
      handleSetHours,
      handleSetDays,
      handleSubmit,
    } = this
    return (
      <>
        <Button onClick={handleOpen}>Downtime...</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Downtime</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Simulate a set period of time elapsing. All Characters and QCs in
              the Chronicle will recover motes, willpower, and health as
              appropriate, and their anima banners will drop to dim.
            </DialogContentText>
            <Typography variant="caption">
              Note: This is not cumulative. For example, if a particular wound
              would need 2 days to heal, doing 2 one-day downtimes will not heal
              it.
            </Typography>

            <Typography
              style={{
                textAlign: 'center',
                marginTop: '1em',
              }}
              component="div"
            >
              <RatingField
                trait="parsedTime"
                label="Time"
                value={parsedTime}
                onChange={handleChange}
                min={0}
              />
              &nbsp;&nbsp; Hours&nbsp;&nbsp;&nbsp;
              <FormControlLabel
                control={
                  <Switch checked={days} name="days" onChange={handleSwitch} />
                }
                label="Days"
              />
              <div>
                <Button size="small" onClick={() => handleSetHours(1)}>
                  1 hour
                </Button>
                <Button size="small" onClick={() => handleSetHours(4)}>
                  4 hours
                </Button>
                <Button size="small" onClick={() => handleSetHours(8)}>
                  Overnight
                </Button>
              </div>
              <div>
                <Button size="small" onClick={() => handleSetDays(1)}>
                  1 Day
                </Button>

                <Button size="small" onClick={() => handleSetDays(7)}>
                  1 Week
                </Button>

                <Button size="small" onClick={() => handleSetDays(30)}>
                  1 Month
                </Button>
                <Button size="small" onClick={() => handleSetDays(90)}>
                  1 Season
                </Button>
              </div>
            </Typography>

            <FormControlLabel
              label="End Scene-Longs"
              control={
                <Checkbox
                  name="endScene"
                  checked={endScene}
                  onChange={handleCheck}
                />
              }
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Downtime
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default connect(null, { downtime })(DowntimePopup)
