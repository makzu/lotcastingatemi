// @flow
import { Component, Node } from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import HealthLevelBoxes from './HealthLevelBoxes.jsx'
import RatingField from './RatingField.jsx'
import { takeDamage } from 'ducks/actions.js'
import { canIEditCharacter, canIEditQc } from 'selectors'
import { clamp } from 'utils'
import type { withHealthLevels, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  children: Node,
  character: withHealthLevels & { id: number },
  qc?: boolean,
}
type Props = ExposedProps & {
  canEdit: boolean,
  takeDamage: Function,
}
type State = {
  open: boolean,
  bashing: number,
  lethal: number,
  aggravated: number,
  commit: boolean,
}
const defaultState: State = {
  open: false,
  bashing: 0,
  lethal: 0,
  aggravated: 0,
  commit: false,
}

class DamageWidget extends Component<Props, State> {
  state = defaultState

  min = (type) => {
    return -this.props.character[`damage_${type}`]
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState(defaultState)
  }

  handleAdd = (dmg, type) => {
    this.setState({
      [type]: clamp(this.state[type] + dmg, this.min(type), Infinity),
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    let commit = this.state.commit
    this.setState({ [name]: value, commit: commit })
  }

  handleCheck = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] })
  }

  handleSubmit = () => {
    const { bashing, lethal, aggravated } = this.state
    const { character, qc } = this.props

    const characterType = qc ? 'qc' : 'character'

    if (bashing !== 0)
      this.props.takeDamage(character.id, bashing, 'bashing', characterType)
    if (lethal !== 0)
      this.props.takeDamage(character.id, lethal, 'lethal', characterType)
    if (aggravated !== 0)
      this.props.takeDamage(
        character.id,
        aggravated,
        'aggravated',
        characterType,
      )

    this.setState(defaultState)
  }

  render() {
    const { bashing, lethal, aggravated, open } = this.state
    const {
      handleOpen,
      handleClose,
      handleAdd,
      handleChange,
      handleSubmit,
      min,
    } = this
    const { canEdit, children, character } = this.props

    if (!canEdit) {
      return children
    }

    return (
      <>
        <ButtonBase onClick={handleOpen} style={{ fontSize: '1em' }}>
          {children}
        </ButtonBase>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Health Levels / Damage</DialogTitle>

          <DialogContent>
            <div style={{ textAlign: 'center' }}>
              <HealthLevelBoxes
                character={{
                  ...character,
                  ...{
                    damage_bashing: character.damage_bashing + bashing,
                    damage_lethal: character.damage_lethal + lethal,
                    damage_aggravated: character.damage_aggravated + aggravated,
                  },
                }}
              />
            </div>

            <div>
              <Button
                size="small"
                onClick={() =>
                  handleChange({
                    target: { name: 'bashing', value: min('bashing') },
                  })
                }
              >
                -All
              </Button>
              <Button size="small" onClick={() => handleAdd(-1, 'bashing')}>
                -1
              </Button>
              &nbsp;&nbsp;
              <RatingField
                trait="bashing"
                value={bashing}
                label="Bashing"
                narrow
                margin="dense"
                min={min('bashing')}
                onChange={handleChange}
              />
              <Button size="small" onClick={() => handleAdd(1, 'bashing')}>
                +1
              </Button>
            </div>

            <div>
              <Button
                size="small"
                onClick={() =>
                  handleChange({
                    target: { name: 'lethal', value: min('lethal') },
                  })
                }
              >
                -All
              </Button>
              <Button size="small" onClick={() => handleAdd(-1, 'lethal')}>
                -1
              </Button>
              &nbsp;&nbsp;
              <RatingField
                trait="lethal"
                value={lethal}
                label="Lethal"
                narrow
                margin="dense"
                min={min('lethal')}
                onChange={handleChange}
              />
              <Button size="small" onClick={() => handleAdd(1, 'lethal')}>
                +1
              </Button>
            </div>

            <div>
              <Button
                size="small"
                onClick={() =>
                  handleChange({
                    target: { name: 'aggravated', value: min('aggravated') },
                  })
                }
              >
                -All
              </Button>
              <Button size="small" onClick={() => handleAdd(-1, 'aggravated')}>
                -1
              </Button>
              &nbsp;&nbsp;
              <RatingField
                trait="aggravated"
                value={aggravated}
                label="Aggravated"
                narrow
                margin="dense"
                min={min('aggravated')}
                onChange={handleChange}
              />
              <Button size="small" onClick={() => handleAdd(1, 'aggravated')}>
                +1
              </Button>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = (state, props: ExposedProps) => ({
  canEdit: props.qc
    ? canIEditQc(state, props.character.id)
    : canIEditCharacter(state, props.character.id),
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps, {
  takeDamage,
})

export default enhance(DamageWidget)
