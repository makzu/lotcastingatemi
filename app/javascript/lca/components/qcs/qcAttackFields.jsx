// @flow
import { isEqual } from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import ContentRemoveCircle from '@material-ui/icons/RemoveCircle'

import RangeSelect from 'components/generic/RangeSelect.jsx'
import RatingField from '../generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
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
  handleChange = e => {
    let { name, value } = e.target
    const { attack } = this.props

    if (isEqual(this.props.attack[name], value)) return

    this.props.onAttackChange(attack.id, name, value)
  }

  handleRemove = () => {
    this.props.onRemoveClick(this.state.attack.id)
  }

  render() {
    const { attack } = this.state
    const { battlegroup, fakeBg, classes } = this.props
    const { handleChange, handleRemove } = this

    return (
      <div className={classes.wrap}>
        <TextField
          name="name"
          value={attack.name}
          label="Name"
          className={classes.nameField}
          margin="dense"
          onChange={handleChange}
        />

        <RatingField
          trait="pool"
          value={attack.pool}
          label="Pool"
          min={1}
          narrow
          margin="dense"
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
        />

        <TagsField
          trait="tags"
          value={attack.tags}
          label="Tags (comma separated)"
          className={classes.tagsField}
          margin="dense"
          onChange={handleChange}
        />

        <RangeSelect
          name="range"
          value={attack.range}
          onChange={handleChange}
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
