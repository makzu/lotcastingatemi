import { Component } from 'react'
import { type ConnectedProps, connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  createStyles,
  type Theme,
  type WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { updateBattlegroup as update } from '@lca/ducks/actions/index.ts'
import { canIEditBattlegroup } from '@lca/selectors/index.ts'
import type { RootState } from '@lca/store.ts'
import sharedStyles from '@lca/styles/index.ts'
import type { Battlegroup } from '@lca/types/battlegroup.ts'
import { totalMagnitude } from '@lca/utils/calculated/index.ts'
import PoolDisplay from '../generic/PoolDisplay.tsx'
import RatingField from '../generic/RatingField.tsx'
import ResourceDisplay from '../generic/ResourceDisplay.tsx'

const styles = (theme: Theme) =>
  createStyles({
    ...sharedStyles(theme),
    display: {
      marginRight: theme.spacing(),
    },
    rulesRef: {
      ...theme.typography.caption,
      marginTop: theme.spacing(),
    },
  })

interface ExposedProps {
  battlegroup: Battlegroup
  className?: string
  DisplayClassName?: string
}

interface Props
  extends ExposedProps,
    PropsFromRedux,
    WithStyles<typeof styles> {}

type State = { open: boolean; magnitude: number; size: number }
class BattlegroupHealthDisplay extends Component<Props, State> {
  state = {
    open: false,
    magnitude: this.props.battlegroup.magnitude,
    size: this.props.battlegroup.size,
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
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
      <>
        <ButtonBase
          disabled={!canEdit}
          onClick={handleOpen}
          className={className}
          style={{ alignItems: 'inherit' }}
        >
          <ResourceDisplay
            current={battlegroup.magnitude}
            total={totalMagnitude(this.props.battlegroup)}
            label="Magnitude"
            className={DisplayClassName || classes.display}
          />
          <PoolDisplay
            battlegroup
            pool={{ total: battlegroup.size }}
            label="Size"
            classes={{ root: DisplayClassName }}
          />
        </ButtonBase>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Battlegroup Health</DialogTitle>

          <DialogContent>
            <div className={classes.flexContainer}>
              <div style={{ flex: 1 }}>
                <ResourceDisplay
                  current={battlegroup.magnitude}
                  total={totalMagnitude(battlegroup)}
                  label="Current Magnitude"
                />
              </div>

              <div style={{ flex: 1 }}>
                <PoolDisplay
                  battlegroup
                  staticRating
                  pool={{ total: battlegroup.size }}
                  label="Current Size"
                />
              </div>
            </div>

            <div className={classes.flexContainer}>
              <Typography component="div" style={{ flex: 1 }}>
                <RatingField
                  label="Magnitude"
                  trait="magnitude"
                  value={magnitude}
                  onChange={handleChange}
                />
                {` / ${totalMagnitude({ ...battlegroup, size: size })}`}
              </Typography>

              <div style={{ flex: 1 }}>
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
      </>
    )
  }
}

const mapStateToProps = (state: RootState, props: ExposedProps) => ({
  canEdit: canIEditBattlegroup(state, props.battlegroup.id),
})
const connector = connect(mapStateToProps, { update })
type PropsFromRedux = ConnectedProps<typeof connector>

export default withStyles(styles)(connector(BattlegroupHealthDisplay))
