import { Component, type ReactNode } from 'react'
import { type ConnectedProps, connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { spendWillpower } from '@lca/ducks/events/index.ts'
import {
  canIEditBattlegroup,
  canIEditCharacter,
  canIEditQc,
} from '@lca/selectors'
import type { RootState } from '@lca/store.ts'
import type { WithSharedStats } from '@lca/types/shared.ts'
import { clamp } from '@lca/utils/math.ts'
import RatingField from './RatingField.tsx'
import ResourceDisplay from './ResourceDisplay.tsx'

interface ExposedProps {
  children: ReactNode
  character: WithSharedStats
  qc?: boolean
  bg?: boolean
}
interface Props extends ExposedProps, PropsFromRedux {}
type State = {
  open: boolean
  toSpend: number
}

class WillpowerSpendWidget extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { open: false, toSpend: 0 }
  }

  max = () => {
    return this.props.character.willpower_temporary
  }

  min = () => {
    return -Infinity
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false, toSpend: 0 })
  }

  handleAdd = (wp) => {
    this.setState({
      toSpend: clamp(this.state.toSpend + wp, this.min(), this.max()),
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { toSpend } = this.state
    const { character, qc, bg } = this.props

    let characterType = 'character'
    if (qc) {
      characterType = 'qc'
    } else if (this.props.bg) {
      characterType = 'battlegroup'
    }

    this.props.spendWillpower(character.id, toSpend, characterType)

    this.setState({ open: false, toSpend: 0 })
  }

  render() {
    const { toSpend, open } = this.state
    const {
      min,
      max,
      handleOpen,
      handleClose,
      handleAdd,
      handleChange,
      handleSubmit,
    } = this
    const { character, canEdit, children } = this.props

    if (!canEdit) {
      return children
    }

    return (
      <>
        <ButtonBase onClick={handleOpen}>{children}</ButtonBase>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {toSpend >= 0 ? 'Spend' : 'Recover'} Willpower
          </DialogTitle>

          <DialogContent>
            <div style={{ textAlign: 'center' }}>
              <ResourceDisplay
                current={character.willpower_temporary}
                total={character.willpower_permanent}
                label="Current Willpower"
              />
            </div>
            <Button size="small" onClick={() => handleAdd(-1)}>
              -1
            </Button>
            &nbsp;&nbsp;
            <RatingField
              trait="toSpend"
              value={toSpend}
              label="Willpower"
              narrow
              margin="dense"
              max={max()}
              min={min()}
              onChange={handleChange}
            />
            <Button
              size="small"
              onClick={() =>
                handleChange({ target: { name: 'toSpend', value: 0 } })
              }
            >
              0
            </Button>
            <Button size="small" onClick={() => handleAdd(1)}>
              +1
            </Button>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {toSpend >= 0 ? 'Spend' : 'Recover'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

function mapStateToProps(state: RootState, props: ExposedProps) {
  if (props.bg) {
    return {
      canEdit: canIEditBattlegroup(state, props.character.id),
    }
  }
  return {
    canEdit: props.qc
      ? canIEditQc(state, props.character.id)
      : canIEditCharacter(state, props.character.id),
  }
}

const connector = connect(mapStateToProps, {
  spendWillpower,
})
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(WillpowerSpendWidget)
