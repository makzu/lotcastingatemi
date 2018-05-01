// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

import ContentRemoveCircle from '@material-ui/icons/RemoveCircle'

import RangeSelect from 'components/generic/RangeSelect.jsx'
import RatingField from '../generic/RatingField.jsx'
import { bgAttackPool, bgDamage } from 'utils/calculated'
import { getSpecificBattlegroup } from 'selectors'
import type { QcAttack } from 'utils/flow-types'

const styles = theme => ({
  wrap: {
    display: 'flex',
  },
  bgBonus: {
    ...theme.typography.caption,
    marginLeft: -theme.spacing.unit / 2,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    alignSelf: 'flex-end',
  },
  nameField: {
    flex: 2,
    marginRight: theme.spacing.unit,
  },
  tagsField: {
    flex: 1,
    marginRight: theme.spacing.unit,
  },
  rangeField: {
    width: '6em',
  },
})
type Props = {
  attack: QcAttack,
  onAttackChange: Function,
  onRemoveClick: Function,
  battlegroup?: boolean,
  fakeBg: Object,
  classes: Object,
}
type State = { attack: QcAttack }
class QcAttackFields extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      attack: this.props.attack,
    }
  }
  static getDerivedStateFromProps(props) {
    return { attack: props.attack }
  }

  handleChange = e => {
    let { name, value } = e.target
    if (name == 'tags') {
      value = value.split(',')
    }

    this.setState({ attack: { ...this.state.attack, [name]: value } })
  }

  handleBlur = e => {
    let { name } = e.target
    const { attack } = this.state
    if (attack[name] == this.props.attack[name]) return

    this.props.onAttackChange(attack.id, name, attack[name])
  }

  handleRatingChange = e => {
    let { name, value } = e.target
    const { attack } = this.state

    this.setState({ attack: { ...attack, [name]: value } })
    this.props.onAttackChange(attack.id, name, value)
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.state.attack.id)
  }

  render() {
    const { attack } = this.state
    const { battlegroup, fakeBg, classes } = this.props
    const { handleChange, handleBlur, handleRatingChange, handleRemove } = this

    return (
      <div className={classes.wrap}>
        <TextField
          name="name"
          value={attack.name}
          label="Name"
          className={classes.nameField}
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <RatingField
          trait="pool"
          value={attack.pool}
          label="Pool"
          min={1}
          narrow
          margin="dense"
          onChange={handleRatingChange}
        />
        {battlegroup && (
          <div className={classes.bgBonus}>
            ({bgAttackPool(fakeBg, attack)} total)
          </div>
        )}

        <RatingField
          trait="damage"
          value={attack.damage}
          label="Damage"
          min={1}
          narrow
          margin="dense"
          onChange={handleRatingChange}
        />
        {battlegroup && (
          <div className={classes.bgBonus}>
            ({bgDamage(fakeBg, attack)} total)
          </div>
        )}

        <RatingField
          trait="overwhelming"
          value={attack.overwhelming}
          label="Min"
          min={1}
          narrow
          margin="dense"
          onChange={handleRatingChange}
        />

        <TextField
          name="tags"
          value={attack.tags.join(', ')}
          label="Tags (comma separated)"
          className={classes.tagsField}
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <RangeSelect
          name="range"
          value={attack.range}
          onChange={handleRatingChange}
          className={classes.rangeField}
        />

        <IconButton onClick={handleRemove} style={{ minWidth: '2em' }}>
          <ContentRemoveCircle />
        </IconButton>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let fakeBg
  if (ownProps.battlegroup) {
    let owner = getSpecificBattlegroup(state, ownProps.attack.qc_attackable_id)
    fakeBg = {
      size: owner.size,
      might: owner.might,
    }
  }
  return {
    fakeBg,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(QcAttackFields))
