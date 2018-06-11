// @flow
import * as React from 'react'
const { Component } = React
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import BlockPaper from '../generic/blockPaper.jsx'
import RatingField from '../generic/RatingField.jsx'
import QcAttackEditor from '../qcs/qcAttackEditor.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateBattlegroup } from 'ducks/actions.js'
import { getSpecificBattlegroup } from 'selectors'
import { bgDefenseBonus, bgSoak, totalMagnitude } from 'utils/calculated/'
import type { Battlegroup } from 'utils/flow-types'

const drillOptions: React.Node = [
  <MenuItem key="poor" value={0}>
    Poor
  </MenuItem>,
  <MenuItem key="average" value={1}>
    Average
  </MenuItem>,
  <MenuItem key="elite" value={2}>
    Elite
  </MenuItem>,
]

const styles = theme => ({
  bgBonus: {
    ...theme.typography.caption,
    marginLeft: -theme.spacing.unit / 2,
    marginRight: theme.spacing.unit,
  },
  nameField: {
    marginRight: theme.spacing.unit,
  },
  drill: {
    marginRight: theme.spacing.unit,
  },
})
type Props = {
  battlegroup: Battlegroup,
  classes: Object,
  updateBattlegroup: Function,
}
type State = {
  battlegroup: Battlegroup,
}
class BattlegroupEditor extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      battlegroup: this.props.battlegroup,
    }
  }

  componentWillReceiveProps = newProps => {
    this.setState({ battlegroup: newProps.battlegroup })
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    let { name, value } = e.target

    this.setState({ battlegroup: { ...this.state.battlegroup, [name]: value } })
  }

  handleBlur = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { battlegroup } = this.state
    if (battlegroup[name] == this.props.battlegroup[name]) return

    this.props.updateBattlegroup(battlegroup.id, name, battlegroup[name])
  }

  handleRatingChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target

    this.setState({ battlegroup: { ...this.state.battlegroup, [name]: value } })
    this.props.updateBattlegroup(this.state.battlegroup.id, name, value)
  }

  handleCheck = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const value = !this.state.battlegroup[name]

    this.setState({ battlegroup: { ...this.state.battlegroup, [name]: value } })
    this.props.updateBattlegroup(this.state.battlegroup.id, name, value)
  }

  render() {
    /* Escape hatch */
    if (this.props.battlegroup == undefined)
      return (
        <BlockPaper>
          <Typography paragraph>This QC has not yet loaded.</Typography>
        </BlockPaper>
      )

    const { battlegroup } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleCheck } = this
    const { classes } = this.props

    return (
      <BlockPaper>
        <Typography variant="caption">
          Rules for battlegroups can be found in the Core book starting at page
          205.
        </Typography>
        <Typography variant="caption">
          (Use the stats of an average member of the group - bonuses from
          drill/might/etc are added automatically)
        </Typography>
        <TextField
          name="name"
          value={battlegroup.name}
          label="Name"
          className={classes.nameField}
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br />
        <TextField
          name="description"
          value={battlegroup.description}
          label="Description"
          margin="dense"
          multiline
          fullWidth
          rowsMax={5}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br />
        <RatingField
          trait="essence"
          value={battlegroup.essence}
          min={1}
          max={10}
          label="Essence"
          margin="dense"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="health_levels"
          value={battlegroup.health_levels}
          label="Health Levels"
          margin="dense"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="willpower_temporary"
          value={battlegroup.willpower_temporary}
          label="Temp WP"
          margin="dense"
          onChange={handleRatingChange}
        />
        /
        <RatingField
          trait="willpower_permanent"
          value={battlegroup.willpower_permanent}
          min={1}
          max={10}
          label="Perm WP"
          margin="dense"
          onChange={handleRatingChange}
        />
        <br />
        <RatingField
          trait="initiative"
          value={battlegroup.initiative}
          min={-Infinity}
          label="Initiative"
          margin="dense"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="onslaught"
          value={battlegroup.onslaught}
          label="Onslaught"
          margin="dense"
          onChange={handleRatingChange}
        />
        <br />
        <RatingField
          trait="size"
          value={battlegroup.size}
          max={5}
          label="Size"
          margin="dense"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="magnitude"
          value={battlegroup.magnitude}
          label="Magnitude"
          margin="dense"
          onChange={handleRatingChange}
        />
        <span className={classes.bgBonus}>
          {' '}
          / {totalMagnitude(battlegroup)}
        </span>
        <TextField
          select
          name="drill"
          value={battlegroup.drill}
          label="Drill"
          className={classes.drill}
          margin="dense"
          onChange={handleRatingChange}
        >
          {drillOptions}
        </TextField>
        <RatingField
          trait="might"
          value={battlegroup.might}
          max={3}
          label="Might"
          margin="dense"
          onChange={handleRatingChange}
        />
        <FormControlLabel
          label="Perfect Morale"
          control={
            <Checkbox
              name="perfect_morale"
              checked={battlegroup.perfect_morale}
              onChange={handleCheck}
            />
          }
        />
        <br />
        <RatingField
          trait="resolve"
          value={battlegroup.resolve}
          label="Resolve"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="guile"
          value={battlegroup.guile}
          label="Guile"
          margin="dense"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="appearance"
          value={battlegroup.appearance}
          label="Appearance"
          margin="dense"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="senses"
          value={battlegroup.senses}
          label="Senses"
          margin="dense"
          onChange={handleRatingChange}
        />
        <Typography variant="subheading">Combat stats</Typography>
        <RatingField
          trait="join_battle"
          value={battlegroup.join_battle}
          label="JB"
          margin="dense"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="movement"
          value={battlegroup.movement}
          label="Move"
          margin="dense"
          onChange={handleRatingChange}
        />
        <RatingField
          trait="parry"
          value={battlegroup.parry}
          label="Parry"
          margin="dense"
          onChange={handleRatingChange}
        />
        <span className={classes.bgBonus}>
          ({battlegroup.parry + bgDefenseBonus(battlegroup)} total)
        </span>
        <RatingField
          trait="evasion"
          value={battlegroup.evasion}
          label="Evasion"
          margin="dense"
          onChange={handleRatingChange}
        />
        <span className={classes.bgBonus}>
          ({battlegroup.evasion + bgDefenseBonus(battlegroup)} total)
        </span>
        <RatingField
          trait="soak"
          value={battlegroup.soak}
          label="Soak"
          margin="dense"
          onChange={handleRatingChange}
        />
        <span className={classes.bgBonus}>({bgSoak(battlegroup)} total)</span>
        <RatingField
          trait="hardness"
          value={battlegroup.hardness}
          label="Hardness"
          margin="dense"
          onChange={handleRatingChange}
        />
        <TextField
          name="armor_name"
          value={battlegroup.armor_name}
          label="Armor Name"
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <QcAttackEditor qc={battlegroup} battlegroup />
      </BlockPaper>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.battlegroupId
  const battlegroup = getSpecificBattlegroup(state, id)

  return {
    id,
    battlegroup,
  }
}

export default ProtectedComponent(
  withStyles(styles)(
    connect(
      mapStateToProps,
      { updateBattlegroup }
    )(BattlegroupEditor)
  )
)
