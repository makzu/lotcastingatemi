import { deepEqual } from 'fast-equals'
import { Component, type SyntheticInputEvent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField as MuiTextField,
  Typography,
  createStyles,
  type Theme,
} from '@mui/material'
import { withStyles, type WithStyles } from '@mui/styles'

import BlockPaper from 'components/shared/BlockPaper'
import RatingField from '../generic/RatingField'
import TextField from '../generic/TextField'
import QcAttackEditor from '../qcs/qcAttackEditor'

import {
  canIDeleteBattlegroup,
  getSpecificBattlegroup,
} from '@/ducks/entities/battlegroup'
import ProtectedComponent from 'containers/ProtectedComponent'
import withRouter from 'containers/withRouter'
import { updateBattlegroup } from 'ducks/actions'
import commonStyles from 'styles'
import { bgDefenseBonus, bgSoak, totalMagnitude } from 'utils/calculated/'
import type { Battlegroup } from 'utils/flow-types'

const styles = (theme: Theme) =>
  createStyles({
    ...commonStyles(theme),
    bgBonus: {
      ...theme.typography.caption,
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(),
      marginBottom: theme.spacing(),
      alignSelf: 'flex-end',
    },
    nameField: {
      marginRight: theme.spacing(),
    },
    drill: {
      marginRight: theme.spacing(),
    },
  })

interface Props extends WithStyles<typeof styles> {
  battlegroup: Battlegroup
  showPublicCheckbox: boolean
  updateBattlegroup: $TSFixMeFunction
}

class BattlegroupEditor extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { battlegroup } = this.props
    if (deepEqual(battlegroup[name], value)) return
    this.props.updateBattlegroup(battlegroup.id, {
      [name]: value,
    })
  }

  handleCheck = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name } = e.target
    const value = !this.props.battlegroup[name]
    this.props.updateBattlegroup(this.props.battlegroup.id, {
      [name]: value,
    })
  }

  render() {
    const { battlegroup, showPublicCheckbox } = this.props

    /* Escape hatch */
    if (this.props.battlegroup == undefined)
      return (
        <BlockPaper>
          <Typography paragraph>
            This Battlegroup has not yet loaded.
          </Typography>
        </BlockPaper>
      )
    const { handleChange, handleCheck } = this
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

        <div
          style={{
            display: 'flex',
          }}
        >
          <TextField
            name="name"
            value={battlegroup.name}
            label="Name"
            className={classes.nameField}
            margin="dense"
            onChange={handleChange}
            style={{
              flex: 1,
            }}
            inputProps={{
              autocomplete: 'off',
              'data-1p-ignore': 'true',
              'data-lp-ignore': 'true',
            }}
          />

          {showPublicCheckbox && (
            <FormControlLabel
              label="Publicly Viewable"
              control={
                <Checkbox
                  name="public"
                  checked={battlegroup.public}
                  onChange={handleCheck}
                />
              }
            />
          )}
        </div>

        <br />
        <TextField
          name="description"
          value={battlegroup.description}
          label="Description"
          margin="dense"
          multiline
          fullWidth
          maxRows={5}
          onChange={handleChange}
        />
        <TextField
          name="portrait_link"
          value={battlegroup.portrait_link}
          label="Portrait Link"
          margin="dense"
          onChange={handleChange}
          fullWidth
        />
        <Typography component="div" className="flexContainerWrap">
          <div className={classes.flexCol}>
            <RatingField
              trait="essence"
              value={battlegroup.essence}
              min={1}
              max={10}
              label="Essence"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="health_levels"
              value={battlegroup.health_levels}
              label="Health Levels"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="willpower_temporary"
              value={battlegroup.willpower_temporary}
              label="Temp WP"
              margin="dense"
              onChange={handleChange}
            />
            <span className={classes.fieldSeparator}>/</span>
            <RatingField
              trait="willpower_permanent"
              value={battlegroup.willpower_permanent}
              min={1}
              max={10}
              label="Perm WP"
              margin="dense"
              onChange={handleChange}
            />
          </div>
        </Typography>

        <RatingField
          trait="initiative"
          value={battlegroup.initiative}
          min={-Infinity}
          label="Initiative"
          margin="dense"
          onChange={handleChange}
        />
        <RatingField
          trait="onslaught"
          value={battlegroup.onslaught}
          label="Onslaught"
          margin="dense"
          onChange={handleChange}
        />

        <div className="flexContainerWrap">
          <RatingField
            trait="size"
            value={battlegroup.size}
            max={5}
            label="Size"
            margin="dense"
            onChange={handleChange}
          />
          <RatingField
            trait="magnitude"
            value={battlegroup.magnitude}
            label="Magnitude"
            margin="dense"
            onChange={handleChange}
          />
          <span className={classes.bgBonus}>
            {' '}
            / {totalMagnitude(battlegroup)}
          </span>
          <MuiTextField
            select
            name="drill"
            value={battlegroup.drill}
            label="Drill"
            className={classes.drill}
            margin="dense"
            onChange={handleChange}
          >
            {' '}
            <MenuItem value={0}>Poor</MenuItem>
            <MenuItem value={1}>Average</MenuItem>
            <MenuItem value={2}>Elite</MenuItem>
          </MuiTextField>
          <RatingField
            trait="might"
            value={battlegroup.might}
            max={3}
            label="Might"
            margin="dense"
            onChange={handleChange}
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
        </div>

        <RatingField
          trait="resolve"
          value={battlegroup.resolve}
          label="Resolve"
          margin="dense"
          onChange={handleChange}
        />
        <RatingField
          trait="guile"
          value={battlegroup.guile}
          label="Guile"
          margin="dense"
          onChange={handleChange}
        />
        <RatingField
          trait="appearance"
          value={battlegroup.appearance}
          label="Appearance"
          margin="dense"
          onChange={handleChange}
        />
        <RatingField
          trait="senses"
          value={battlegroup.senses}
          label="Senses"
          margin="dense"
          onChange={handleChange}
        />

        <Typography variant="subtitle1">Combat stats</Typography>
        <div className="flexContainerWrap">
          <RatingField
            trait="join_battle"
            value={battlegroup.join_battle}
            label="JB"
            margin="dense"
            onChange={handleChange}
          />
          <RatingField
            trait="movement"
            value={battlegroup.movement}
            label="Move"
            margin="dense"
            onChange={handleChange}
          />
          <RatingField
            trait="parry"
            value={battlegroup.parry}
            label="Parry"
            margin="dense"
            onChange={handleChange}
          />
          <span className={classes.bgBonus}>
            ({battlegroup.parry + bgDefenseBonus(battlegroup)} total)
          </span>
          <RatingField
            trait="evasion"
            value={battlegroup.evasion}
            label="Evasion"
            margin="dense"
            onChange={handleChange}
          />
          <span className={classes.bgBonus}>
            ({battlegroup.evasion + bgDefenseBonus(battlegroup)} total)
          </span>
          <RatingField
            trait="soak"
            value={battlegroup.soak}
            label="Soak"
            margin="dense"
            onChange={handleChange}
          />
          <span className={classes.bgBonus}>({bgSoak(battlegroup)} total)</span>
          <RatingField
            trait="hardness"
            value={battlegroup.hardness}
            label="Hardness"
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            name="armor_name"
            value={battlegroup.armor_name}
            label="Armor Name"
            margin="dense"
            onChange={handleChange}
          />
        </div>

        <QcAttackEditor qc={battlegroup} battlegroup />
      </BlockPaper>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id
  const battlegroup = getSpecificBattlegroup(state, id)
  const showPublicCheckbox = canIDeleteBattlegroup(state, id)
  return {
    id,
    battlegroup,
    showPublicCheckbox,
  }
}

export default compose(
  withRouter,
  ProtectedComponent,
  withStyles(styles),
  connect(mapStateToProps, { updateBattlegroup }),
)(BattlegroupEditor)
