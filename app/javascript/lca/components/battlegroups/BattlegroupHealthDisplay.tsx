import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PoolDisplay from '../generic/PoolDisplay'
import RatingField from '../generic/RatingField'
import ResourceDisplay from '../generic/ResourceDisplay'
import sharedStyles from 'styles/'
import { updateBattlegroup as update } from 'ducks/actions'
import { canIEditBattlegroup } from 'selectors'
import { totalMagnitude } from 'utils/calculated'
import type { Battlegroup } from 'utils/flow-types'

const styles = (theme) => ({
  ...sharedStyles(theme),
  display: {
    marginRight: theme.spacing(),
  },
  rulesRef: { ...theme.typography.caption, marginTop: theme.spacing() },
})

interface Props {
  battlegroup: Battlegroup
  className?: string
  DisplayClassName?: string
  classes: Record<string, $TSFixMe>
  canEdit: boolean
  update: $TSFixMeFunction
}
interface State {
  open: boolean
  magnitude: number
  size: number
}

class BattlegroupHealthDisplay extends React.Component<Props, State> {
  state = {
    open: false,
    magnitude: this.props.battlegroup.magnitude,
    size: this.props.battlegroup.size,
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = () => {
    this.props.update(this.props.battlegroup.id, {
      size: this.state.size,
      magnitude: this.state.magnitude,
    })
    this.setState({
      open: false,
    })
  }
  handleOpen = () => {
    this.setState({
      open: true,
      magnitude: this.props.battlegroup.magnitude,
      size: this.props.battlegroup.size,
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
      magnitude: this.props.battlegroup.magnitude,
      size: this.props.battlegroup.size,
    })
  }

  render() {
    const { battlegroup, className, DisplayClassName, canEdit, classes } =
      this.props
    const { open, size, magnitude } = this.state
    const { handleOpen, handleClose, handleChange, handleSubmit } = this
    return (
      <Fragment>
        <ButtonBase
          disabled={!canEdit}
          onClick={handleOpen}
          className={className}
          style={{
            alignItems: 'inherit',
          }}
        >
          <ResourceDisplay
            current={battlegroup.magnitude}
            total={totalMagnitude(this.props.battlegroup)}
            label="Magnitude"
            className={DisplayClassName || classes.display}
          />
          <PoolDisplay
            battlegroup
            staticRating
            pool={{
              total: battlegroup.size,
            }}
            label="Size"
            classes={{
              root: DisplayClassName,
            }}
          />
        </ButtonBase>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Battlegroup Health</DialogTitle>

          <DialogContent>
            <div className={classes.flexContainer}>
              <div
                style={{
                  flex: 1,
                }}
              >
                <ResourceDisplay
                  current={battlegroup.magnitude}
                  total={totalMagnitude(battlegroup)}
                  label="Current Magnitude"
                />
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                <PoolDisplay
                  battlegroup
                  staticRating
                  pool={{
                    total: battlegroup.size,
                  }}
                  label="Current Size"
                />
              </div>
            </div>

            <div className={classes.flexContainer}>
              <Typography
                component="div"
                style={{
                  flex: 1,
                }}
              >
                <RatingField
                  label="Magnitude"
                  trait="magnitude"
                  value={magnitude}
                  onChange={handleChange}
                />
                {' / ' + totalMagnitude({ ...battlegroup, size: size })}
              </Typography>

              <div
                style={{
                  flex: 1,
                }}
              >
                <RatingField
                  label="Size"
                  trait="size"
                  max={5}
                  value={size}
                  onChange={handleChange}
                />
              </div>
            </div>

            <DialogContentText className={classes.rulesRef}>
              BG Damage and Rout rules can be found in Core p.208-209
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  canEdit: canIEditBattlegroup(state, props.battlegroup.id),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    update,
  }),
)(BattlegroupHealthDisplay)
