import * as React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import MoteCommittmentPopup from './MoteCommittmentPopup'
import RatingField from './RatingField'
import ResourceDisplay from './ResourceDisplay'
import { spendMotes } from 'ducks/actions'
import { canIEditCharacter, canIEditQc } from 'selectors'
import { clamp } from 'utils'
import {
  prettyAnimaLevel,
  committedPersonalMotes,
  committedPeripheralMotes,
} from 'utils/calculated'
import { RootState } from 'store'
import { WithId } from 'types/_lib'
import { WithSharedStats } from 'types/shared'

interface wraProps {
  current: number
  spending: number
  mute: boolean
}

const WillRaiseAnima = ({ current, spending, mute }: wraProps) => {
  if (spending < 5 || current === 3)
    return (
      <Typography>
        No change to anima
        {current === 3 && ' (already at Bonfire)'}
      </Typography>
    )
  if (mute) return <Typography>Will not change anima (mute)</Typography>
  const newLevel = Math.min(current + Math.floor(spending / 5), 3)
  return (
    <Typography>
      Will raise anima from {prettyAnimaLevel(current)} to{' '}
      {prettyAnimaLevel(newLevel)}
    </Typography>
  )
}

interface ExposedProps {
  children: React.ReactNode
  character: WithId & WithSharedStats
  peripheral?: boolean
  qc?: boolean
}
type Props = ExposedProps & {
  canEdit: boolean
  spendMotes: $TSFixMeFunction
}
interface State {
  open: boolean
  toSpend: number
  commit: boolean
  commitName: string
  mute: boolean
  scenelong: boolean
}
const defaultState: State = {
  open: false,
  toSpend: 0,
  commit: false,
  commitName: '',
  mute: false,
  scenelong: false,
}

class MoteSpendWidget extends React.Component<Props, State> {
  state = defaultState
  max = () => {
    const { peripheral, character } = this.props
    return peripheral
      ? character.motes_peripheral_current
      : character.motes_personal_current
  }
  min = () => {
    const { peripheral, character } = this.props
    if (peripheral)
      return (
        character.motes_peripheral_current -
        (character.motes_peripheral_total - committedPeripheralMotes(character))
      )
    else
      return (
        character.motes_personal_current -
        (character.motes_personal_total - committedPersonalMotes(character))
      )
  }
  handleOpen = () => {
    this.setState({
      open: true,
    })
  }
  handleClose = () => {
    this.setState(defaultState)
  }
  handleAdd = (motes: number) => {
    const commit = this.state.toSpend + motes <= 0 ? false : this.state.commit
    this.setState({
      toSpend: clamp(this.state.toSpend + motes, this.min(), this.max()),
      commit: commit,
    })
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let { commit } = this.state

    if (name === 'toSpend') {
      const val = parseInt(value)
      commit = this.state.toSpend + val <= 0 ? false : commit
      this.setState({
        toSpend: val,
        commit: commit,
      })
    } else {
      // @ts-expect-error TODO Tighten up this typing
      this.setState({ [name]: value })
    }
  }
  handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error TODO Tighten up this typing
    this.setState({ [e.target.name]: !this.state[e.target.name] })
  }
  handleSubmit = () => {
    const { toSpend, commit, commitName, mute, scenelong } = this.state
    const { character, qc, peripheral } = this.props
    const pool = peripheral ? 'peripheral' : 'personal'
    const characterType = qc ? 'qc' : 'character'
    let committments

    if (commit) {
      committments = [
        ...this.props.character.motes_committed,
        {
          pool: pool,
          label: commitName,
          motes: toSpend,
          scenelong: scenelong,
        },
      ]
    }

    this.props.spendMotes(
      character.id,
      toSpend,
      pool,
      characterType,
      committments,
      mute,
    )
    this.setState(defaultState)
  }

  render() {
    const { toSpend, commit, commitName, open, mute, scenelong } = this.state
    const {
      handleOpen,
      handleClose,
      handleAdd,
      handleChange,
      handleCheck,
      handleSubmit,
      max,
      min,
    } = this
    const { canEdit, children, character, peripheral } = this.props

    if (!canEdit) {
      return children
    }

    return (
      <>
        <ButtonBase onClick={handleOpen}>{children}</ButtonBase>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {toSpend >= 0 ? 'Spend' : 'Recover'}{' '}
            {peripheral ? 'Peripheral' : 'Personal'} Motes
          </DialogTitle>

          <DialogContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ResourceDisplay
                current={
                  peripheral
                    ? character.motes_peripheral_current
                    : character.motes_personal_current
                }
                total={
                  peripheral
                    ? character.motes_peripheral_total
                    : character.motes_personal_total
                }
                committed={
                  peripheral
                    ? committedPeripheralMotes(character)
                    : committedPersonalMotes(character)
                }
                label="Current Pool"
              />
            </div>
            <div>
              <Button size="small" onClick={() => handleAdd(-5)}>
                -5
              </Button>
              <Button size="small" onClick={() => handleAdd(-1)}>
                -1
              </Button>
              &nbsp;&nbsp;
              <RatingField
                trait="toSpend"
                value={toSpend}
                label="Motes"
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
              <Button size="small" onClick={() => handleAdd(5)}>
                +5
              </Button>
              <Button size="small" onClick={() => handleAdd(10)}>
                +10
              </Button>
            </div>

            <div>
              <FormControlLabel
                label="Commit motes?"
                style={{
                  marginTop: '1em',
                }}
                control={
                  <Checkbox
                    name="commit"
                    checked={commit}
                    onChange={handleCheck}
                    disabled={toSpend < 0}
                  />
                }
              />
              {commit && (
                <>
                  <TextField
                    name="commitName"
                    value={commitName}
                    label="Commit label"
                    margin="dense"
                    onChange={handleChange}
                  />
                  &nbsp;&nbsp;
                  <FormControlLabel
                    label="Scenelong"
                    control={
                      <Checkbox
                        name="scenelong"
                        checked={scenelong}
                        onChange={handleCheck}
                      />
                    }
                  />
                </>
              )}
            </div>

            {peripheral && (
              <>
                <div>
                  <FormControlLabel
                    label="Mute"
                    control={
                      <Checkbox
                        name="mute"
                        checked={mute}
                        onChange={handleCheck}
                      />
                    }
                  />
                </div>
                <WillRaiseAnima
                  current={character.anima_level}
                  spending={toSpend}
                  mute={mute}
                />
              </>
            )}
          </DialogContent>

          <DialogActions>
            <span
              style={{
                flex: 1,
              }}
            >
              <MoteCommittmentPopup character={character} qc={this.props.qc} />
            </span>
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

const mapStateToProps = (state: RootState, props: ExposedProps) => ({
  canEdit: props.qc
    ? canIEditQc(state, props.character.id)
    : canIEditCharacter(state, props.character.id),
})

export default connect(mapStateToProps, { spendMotes })(MoteSpendWidget)
