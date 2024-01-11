import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Theme, createStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions'
import { getPoolsAndRatingsGeneric, canIEdit } from 'selectors'
import type { Enhancer } from 'utils/flow-types'
import { WithStyles } from '@material-ui/styles'

// eslint-disable-next-line no-unused-vars
const styles = (theme: Theme) =>
  createStyles({
    wrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    col: {
      flex: 1,
    },
    divider: {
      marginBottom: theme.spacing(),
      marginTop: theme.spacing(),
    },
    content: {
      minWidth: '15em',
    },
  })

interface ExposedProps {
  children: React.ReactNode
  character: {
    id: number
    sorcerous_motes: number
    type: 'qc' | string
  }
}
type Props = ExposedProps &
  WithStyles<typeof styles> & {
    update: $TSFixMeFunction
    pools: Record<string, $TSFixMe>
    classes: Record<string, $TSFixMe>
  }
interface State {
  open: boolean
  roll: number
  total: number
}

class ShapeSorceryWidget extends React.Component<Props, State> {
  state = {
    open: false,
    roll: 0,
    total: this.props.character.sorcerous_motes || 0,
  }
  handleChangeRoll = (e) => {
    const { value } = e.target
    this.setState({
      roll: value,
      total: value + this.props.character.sorcerous_motes,
    })
  }
  handleChangeTotal = (e) => {
    const { value } = e.target
    this.setState({
      roll: value - this.props.character.sorcerous_motes,
      total: value,
    })
  }
  handleOpen = () =>
    this.setState({
      open: true,
      roll: 0,
      total: this.props.character.sorcerous_motes || 0,
    })
  handleClose = () =>
    this.setState({
      open: false,
    })
  handleSubmit = () => {
    this.setState({
      open: false,
    })
    this.props.update(this.props.character.id, this.state.total)
  }

  render() {
    const {
      handleOpen,
      handleClose,
      handleChangeRoll,
      handleChangeTotal,
      handleSubmit,
    } = this
    const { character, pools, canEdit, children, classes } = this.props

    if (!canEdit) {
      return children
    }

    return (
      <>
        <ButtonBase onClick={handleOpen}>{children}</ButtonBase>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Shape Sorcery</DialogTitle>
          <DialogContent className={classes.content}>
            <div className={classes.wrap}>
              <div className={classes.col}>
                <PoolDisplay
                  qc={character.type === 'qc'}
                  pool={pools.shapeSorcery}
                  label="Pool"
                />
              </div>
              <div className={classes.col}>
                <RatingField
                  trait="roll"
                  label="Roll"
                  value={this.state.roll}
                  onChange={handleChangeRoll}
                  min={-Infinity}
                />
              </div>
            </div>
            <Divider className={classes.divider} />
            <center>
              <RatingField
                trait="total"
                label="Total"
                value={this.state.total}
                onChange={handleChangeTotal}
              />
            </center>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Shape
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state, props) {
  let type
  if (props.character.type === 'qc') type = 'qc'
  else if (props.character.type === 'battlegroup') type = 'battlegroup'
  else type = 'character'
  return {
    canEdit: canIEdit(state, props.character.id, type),
    pools: getPoolsAndRatingsGeneric(state, props.character.id, type),
  }
}

function mapDispatchToProps(dispatch: $TSFixMeFunction, props) {
  let action

  switch (props.character.type) {
    case 'qc':
      action = updateQc
      break

    case 'battlegroup':
      action = updateBattlegroup
      break

    case 'character':
    default:
      action = updateCharacter
  }

  return {
    update: (id, value) =>
      dispatch(
        action(id, {
          sorcerous_motes: value,
        }),
      ),
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)
export default enhance(ShapeSorceryWidget)
