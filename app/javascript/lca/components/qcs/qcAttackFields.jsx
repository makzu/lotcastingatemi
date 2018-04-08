import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'

import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'

import RatingField from '../generic/RatingField.jsx'
import { bgAttackPool, bgDamage } from '../../utils/calculated'
import { qcAttack } from '../../utils/propTypes'
import { getSpecificBattlegroup } from '../../selectors'

const styles = theme => ({
  wrap: {
    display: 'flex',
  },
  bgBonus: { ...theme.typography.caption,
    marginLeft: -theme.spacing.unit/2,
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

class QcAttackFields extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

    this.state = {
      attack: this.props.attack
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ attack: newProps.attack })
  }

  handleChange(e) {
    let { name, value } = e.target
    if (name == 'tags') {
      value = value.split(',')
    }

    this.setState({ attack: { ...this.state.attack, [name]: value }})
  }

  handleBlur(e) {
    let { name } = e.target
    const { attack } = this.state
    if (attack[name] == this.props.attack[name])
      return

    this.props.onAttackChange(attack.id, name, attack[name])
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { attack } = this.state

    this.setState({ attack: { ...attack, [name]: value }})
    this.props.onAttackChange(attack.id, name, value)
  }

  handleRemove() {
    this.props.onRemoveClick(this.state.attack.id)
  }

  render() {
    const { attack } = this.state
    const { battlegroup, fakeBg, classes } = this.props
    const { handleChange, handleBlur, handleRatingChange, handleRemove } = this

    return <div className={ classes.wrap }>
      <TextField name="name" value={ attack.name }
        label="Name" className={ classes.nameField } margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
      />

      <RatingField trait="pool" value={ attack.pool }
        label="Pool" min={ 1 } narrow margin="dense"
        onChange={ handleRatingChange }
      />
      { battlegroup &&
        <div className={ classes.bgBonus }>
          ({ bgAttackPool(fakeBg, attack) } total)
        </div>
      }

      <RatingField trait="damage" value={ attack.damage }
        label="Damage" min={ 1 } narrow margin="dense"
        onChange={ handleRatingChange }
      />
      { battlegroup &&
        <div className={ classes.bgBonus }>
          ({ bgDamage(fakeBg, attack) } total)
        </div>
      }

      <RatingField trait="overwhelming" value={ attack.overwhelming }
        label="Min" min={ 1 } narrow margin="dense"
        onChange={ handleRatingChange }
      />

      <TextField name="tags" value={ attack.tags }
        label="Tags (comma separated)" className={ classes.tagsField } margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
      />

      <TextField select name="range" value={ attack.range }
        label="Range" margin="dense"
        onChange={ handleRatingChange }
        className={ classes.rangeField }
      >
        <MenuItem key="close" value="close">Close</MenuItem>
        <MenuItem key="short" value="short">Short</MenuItem>
        <MenuItem key="medium" value="medium">Medium</MenuItem>
        <MenuItem key="long" value="long">Long</MenuItem>
        <MenuItem key="extreme" value="extreme">Extreme</MenuItem>
      </TextField>

      <IconButton onClick={ handleRemove } style={{ minWidth: '2em' }}>
        <ContentRemoveCircle />
      </IconButton>
    </div>
  }
}
QcAttackFields.propTypes = {
  attack: PropTypes.shape(qcAttack).isRequired,
  battlegroup: PropTypes.bool,
  fakeBg: PropTypes.object,
  classes: PropTypes.object,
  onAttackChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
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
    fakeBg
  }
}

export default withStyles(styles)(connect(mapStateToProps)(QcAttackFields))
