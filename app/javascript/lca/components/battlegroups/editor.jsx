import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import RatingField from '../generic/ratingField.jsx'
import QcAttackEditor from '../qcs/qcAttackEditor.jsx'

import { updateBattlegroup } from '../../ducks/actions.js'
import { bgDefenseBonus, bgSoak } from '../../utils/calculated/'

const styles = theme => ({
  bgBonus: { ...theme.typography.caption,
    marginLeft: -theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  nameField: {
    marginRight: theme.spacing.unit,
  },
  drill: {
    marginRight: theme.spacing.unit,
  }
})

class BattlegroupEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      battlegroup: this.props.battlegroup,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ battlegroup: newProps.battlegroup })
  }

  handleChange(e) {
    let { name, value } = e.target

    this.setState({ battlegroup: { ... this.state.battlegroup, [name]: value }})
  }

  handleBlur(e) {
    const { name } = e.target
    const { battlegroup } = this.state
    if (battlegroup[name] == this.props.battlegroup[name])
      return

    this.props.updateBattlegroup(battlegroup.id, name, battlegroup[name])
  }

  handleRatingChange(e) {
    const { name, value } = e.target

    this.setState({ battlegroup: { ...this.state.battlegroup, [name]: value }})
    this.props.updateBattlegroup(this.state.battlegroup.id, name, value)
  }

  render() {
    /* Escape hatch */
    if (this.props.battlegroup == undefined)
      return <div>
        <Typography paragraph>This QC has not yet loaded.</Typography>
      </div>

    const { battlegroup } = this.state
    const { handleChange, handleBlur, handleRatingChange } = this
    const { classes } = this.props

    return <div>
      <Typography variant="headline">
        Editing { battlegroup.name }
        <Button component={ Link } to={ `/battlegroups/${battlegroup.id}` }>Done</Button>
      </Typography>

      <Typography><small>(
        Use the stats of an average member of the group - bonuses from
        drill/might/etc are added automatically
      )</small></Typography>

      <TextField name="name" value={ battlegroup.name }
        label="Name" className={ classes.nameField } margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }

      />
      <RatingField trait="essence" value={ battlegroup.essence }
        label="Essence" min={ 1 } max={ 10 } margin="dense"
        onChange={ handleRatingChange }
      />

      <RatingField trait="willpower_temporary" value={ battlegroup.willpower_temporary }
        label="Temp WP" margin="dense"
        onChange={ handleRatingChange }
      />
      /
      <RatingField trait="willpower_permanent" value={ battlegroup.willpower_permanent }
        label="Perm WP" min={ 1 } max={ 10 } margin="dense"
        onChange={ handleRatingChange }
      />
      <br />

      <RatingField trait="initiative" value={ battlegroup.initiative }
        label="Initiative" min={ -Infinity } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="onslaught" value={ battlegroup.onslaught }
        label="Onslaught" margin="dense"
        onChange={ handleRatingChange }
      />
      <br />

      <RatingField trait="size" value={ battlegroup.size }
        label="Size" max={ 5 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="magnitude_current" value={ battlegroup.magnitude_current }
        label="Mag." margin="dense"
        onChange={ handleRatingChange }
      />
      <span> / </span>
      <RatingField trait="magnitude" value={ battlegroup.magnitude }
        label="Total" margin="dense"
        onChange={ handleRatingChange }
      />
      <TextField select name="drill" value={ battlegroup.drill }
        label="Drill" className={ classes.drill } margin="dense"
        onChange={ handleRatingChange }
      >
        <MenuItem key="poor" value={ 0 }>Poor</MenuItem>
        <MenuItem key="average" value={ 1 }>Average</MenuItem>
        <MenuItem key="elite" value={ 2 }>Elite</MenuItem>
      </TextField>

      <RatingField trait="might" value={ battlegroup.might }
        label="Might" max={ 3 } margin="dense"
        onChange={ handleRatingChange }
      />
      <br />

      <RatingField trait="resolve" value={ battlegroup.resolve }
        label="Resolve" min={ 1 }
        onChange={ handleRatingChange }
      />
      <RatingField trait="guile" value={ battlegroup.guile }
        label="Guile" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="appearance" value={ battlegroup.appearance }
        label="Appearance" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="senses" value={ battlegroup.senses }
        label="Senses" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />

      <Typography variant="subheading">
        Combat stats
      </Typography>
      <RatingField trait="join_battle" value={ battlegroup.join_battle }
        label="JB" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="movement" value={ battlegroup.movement }
        label="Move" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="parry" value={ battlegroup.parry }
        label="Parry" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <span className={ classes.bgBonus }>
        ({ battlegroup.parry + bgDefenseBonus(battlegroup) } total)
      </span>
      <RatingField trait="evasion" value={ battlegroup.evasion }
        label="Evasion" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <span className={ classes.bgBonus }>
        ({ battlegroup.evasion + bgDefenseBonus(battlegroup) } total)
      </span>
      <RatingField trait="soak" value={ battlegroup.soak }
        label="Soak" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <span className={ classes.bgBonus }>
        ({ bgSoak(battlegroup) } total)
      </span>
      <RatingField trait="hardness" value={ battlegroup.hardness }
        label="Hardness" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <TextField name="armor_name" value={ battlegroup.armor_name }
        label="Armor Name" margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
      />

      <QcAttackEditor qc={ battlegroup } battlegroup />
    </div>
  }
}
BattlegroupEditor.propTypes = {
  battlegroup: PropTypes.object.isRequired,
  attacks: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object,
  updateBattlegroup: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.battlegroupId
  const battlegroup = state.entities.battlegroups[id]

  return {
    id,
    battlegroup,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateBattlegroup: (id, trait, value) => {
      dispatch(updateBattlegroup(id, trait, value))
    },
  }
}

export default withStyles(styles)(
  connect( mapStateToProps, mapDispatchToProps)(BattlegroupEditor)
)
