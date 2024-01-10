import * as React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import RatingField from './RatingField'
import ResourceDisplay from './ResourceDisplay'
import { spendWillpower } from 'ducks/actions.js'
import { canIEditCharacter, canIEditQc } from 'selectors'
import { clamp } from 'utils'
import type { withWillpower, Enhancer } from 'utils/flow-types'
interface ExposedProps {
  children: React.ReactNode
  character: withWillpower & {
    id: number
  }
  qc?: boolean
}
type Props = ExposedProps & {
  canEdit: boolean
  spendWillpower: $TSFixMeFunction
}
interface State {
  open: boolean
  toSpend: number
}

class WillpowerSpendWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
      toSpend: 0,
    }
  }

  max = () => {
    return this.props.character.willpower_temporary
  }
  min = () => {
    return -Infinity
  }
  handleOpen = () => {
    this.setState({
      open: true,
    })
  }
  handleClose = () => {
    this.setState({
      open: false,
      toSpend: 0,
    })
  }
  handleAdd = (wp: number) => {
    this.setState({
      toSpend: clamp(this.state.toSpend + wp, this.min(), this.max()),
    })
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = () => {
    const { toSpend } = this.state
    const { character, qc } = this.props
    const characterType = qc ? 'qc' : 'character'
    this.props.spendWillpower(character.id, toSpend, characterType)
    this.setState({
      open: false,
      toSpend: 0,
    })
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
            <div
              style={{
                textAlign: 'center',
              }}
            >
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
                handleChange({
                  target: {
                    name: 'toSpend',
                    value: 0,
                  },
                })
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

function mapStateToProps(state: Record<string, $TSFixMe>, props: Props) {
  return {
    canEdit: props.qc
      ? canIEditQc(state, props.character.id)
      : canIEditCharacter(state, props.character.id),
  }
}

export default connect(mapStateToProps, { spendWillpower })(
  WillpowerSpendWidget,
)
