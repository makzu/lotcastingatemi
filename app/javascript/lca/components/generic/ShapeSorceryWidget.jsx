// @flow
import { Component, Node } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { updateCharacter, updateQc, updateBattlegroup } from 'ducks/actions.js'
import { getPoolsAndRatingsGeneric, canIEdit } from 'selectors'
import type { Enhancer } from 'utils/flow-types'

const styles = (theme) => ({
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

type ExposedProps = {
  children: Node,
  character: { id: number, sorcerous_motes: number, type: 'qc' | string },
}
type Props = ExposedProps & {
  canEdit: boolean,
  update: Function,
  pools: Object,
  classes: Object,
}
type State = {
  open: boolean,
  roll: number,
  total: number,
}

class ShapeSorceryWidget extends Component<Props, State> {
  state = {
    open: false,
    roll: 0,
    total: this.props.character.sorcerous_motes || 0,
  }

  handleChangeRoll = (e) => {
    let { value } = e.target
    this.setState({
      roll: value,
      total: value + this.props.character.sorcerous_motes,
    })
  }

  handleChangeTotal = (e) => {
    let { value } = e.target
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

  handleClose = () => this.setState({ open: false })

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

function mapDispatchToProps(dispatch: Function, props) {
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
    update: (id, value) => dispatch(action(id, { sorcerous_motes: value })),
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)

export default enhance(ShapeSorceryWidget)
