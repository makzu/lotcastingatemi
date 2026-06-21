import { type ChangeEvent, Component, type ReactNode } from 'react'
import { type ConnectedProps, connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import { createStyles, type Theme, withStyles } from '@material-ui/core/styles'
import type { WithStyles } from '@material-ui/styles'

import PoolDisplay from '@lca/components/generic/PoolDisplay.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import {
  updateBattlegroup,
  updateCharacter,
  updateQc,
} from '@lca/ducks/actions/index.ts'
import { canIEdit, getPoolsAndRatingsGeneric } from '@lca/selectors/index.ts'
import type store from '@lca/store.ts'
import type { RootState } from '@lca/store.ts'

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
  children: ReactNode
  character: { id: number; sorcerous_motes: number; type: 'qc' | string }
}
interface Props
  extends ExposedProps,
    PropsFromRedux,
    WithStyles<typeof styles> {}
type State = {
  open: boolean
  roll: number
  total: number
}

class ShapeSorceryWidget extends Component<Props, State> {
  state = {
    open: false,
    roll: 0,
    total: this.props.character.sorcerous_motes || 0,
  }

  handleChangeRoll = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    this.setState({
      roll: value,
      total: value + this.props.character.sorcerous_motes,
    })
  }

  handleChangeTotal = (e: ChangeEvent<HTMLInputElement>) => {
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

function mapStateToProps(state: RootState, props: ExposedProps) {
  let type: 'character' | 'qc' | 'battlegroup'
  if (props.character.type === 'qc') type = 'qc'
  else if (props.character.type === 'battlegroup') type = 'battlegroup'
  else type = 'character'

  return {
    canEdit: canIEdit(state, props.character.id, type),
    pools: getPoolsAndRatingsGeneric(state, props.character.id, type),
  }
}

function mapDispatchToProps(
  dispatch: typeof store.dispatch,
  props: ExposedProps,
) {
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

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default withStyles(styles)(connector(ShapeSorceryWidget))
