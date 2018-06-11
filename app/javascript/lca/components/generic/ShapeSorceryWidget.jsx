// @flow
import * as React from 'react'
const { Component, Fragment } = React
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import {
  updateCharacterMulti,
  updateQcMulti,
  updateBattlegroupMulti,
} from 'ducks/actions.js'
import { getPoolsAndRatingsGeneric, canIEdit } from 'selectors'
import type { Character, fullQc } from 'utils/flow-types'

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  col: {
    flex: 1,
  },
  divider: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  content: {
    minWidth: '15em',
  },
})

type Props = {
  children: React.Node,
  character: Character | fullQc,
  canEdit: boolean,
  update: Function,
  pools: Object,
  classes: Object,
}
type State = { open: boolean, roll: number, total: number }
class ShapeSorceryWidget extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      roll: 0,
      total: this.props.character.sorcerous_motes || 0,
    }
  }

  handleChangeRoll = e => {
    let { value } = e.target
    this.setState({
      roll: value,
      total: value + this.props.character.sorcerous_motes,
    })
  }
  handleChangeTotal = e => {
    let { value } = e.target
    this.setState({
      roll: value - this.props.character.sorcerous_motes,
      total: value,
    })
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false, roll: 0 })

  handleSubmit = () => {
    this.setState({ open: false })
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
      <Fragment>
        <ButtonBase onClick={handleOpen}>{children}</ButtonBase>

        <Dialog open={this.state.open} onClose={handleClose}>
          <DialogTitle>Shape Sorcery</DialogTitle>
          <DialogContent className={classes.content}>
            <div className={classes.wrap}>
              <div className={classes.col}>
                <PoolDisplay
                  qc={character.type === 'qc'}
                  pool={pools.joinBattle}
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
            <Button onClick={handleSubmit} variant="raised" color="primary">
              Shape
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
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
function mapDispatchToProps(dispatch: Function, props) {
  let action
  switch (props.character.type) {
    case 'qc':
      action = updateQcMulti
      break
    case 'battlegroup':
      action = updateBattlegroupMulti
      break
    case 'character':
    default:
      action = updateCharacterMulti
  }

  return {
    update: (id, value) => dispatch(action(id, { sorcerous_motes: value })),
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShapeSorceryWidget)
)
