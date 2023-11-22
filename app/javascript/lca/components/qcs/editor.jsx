// @flow
import { deepEqual } from 'fast-equals'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import QcActionEditor from './qcActionEditor.jsx'
import QcAttackEditor from './qcAttackEditor.jsx'
import QcCharmEditor from './qcCharmEditor.jsx'
import QcExcellencySelect from './QcExcellencySelect.jsx'
import QcMeritEditor from './qcMeritEditor.jsx'
import QcSpellEditor from './QcSpellEditor'
import AnimaSelect from '../generic/AnimaSelect.jsx'
import BlockPaper from '../generic/blockPaper.jsx'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import IntimacyEditor from '../generic/intimacyEditor.jsx'
import RatingField from '../generic/RatingField.jsx'
import TextField from '../generic/TextField.jsx'
import AuraSelect from 'components/shared/selects/AuraSelect'

import ProtectedComponent from 'containers/ProtectedComponent'
import { updateQc } from 'ducks/actions.js'
import { getSpecificQc, canIDeleteQc } from 'selectors'
import commonStyles from 'styles'
import { woundPenalty } from 'utils/calculated'
import type { fullQc, Enhancer } from 'utils/flow-types'

const styles = (theme) => ({
  ...commonStyles(theme),
})

type ExposedProps = {
  match: { params: { qcId: number } },
}
type Props = ExposedProps & {
  qc: fullQc,
  showPublicCheckbox: boolean,
  updateQc: Function,
  classes: Object,
}

class QcEditor extends Component<Props> {
  handleChange = (e) => {
    const { name, value } = e.target
    const { qc } = this.props

    if (deepEqual(qc[name], value)) return

    this.props.updateQc(qc.id, { [name]: value })
  }

  handleCheck = (e) => {
    const { name } = e.target
    const { qc } = this.props
    const value = !qc[name]

    this.props.updateQc(qc.id, { [name]: value })
  }

  render() {
    const { qc, showPublicCheckbox, classes } = this.props
    const { handleChange, handleCheck } = this

    /* Escape hatch */
    if (qc == undefined)
      return (
        <BlockPaper>
          <Typography paragraph>
            This Quick Character has not yet loaded.
          </Typography>
        </BlockPaper>
      )

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} xl={6}>
          <BlockPaper>
            <Typography paragraph variant="caption">
              Rules for Quick Characters can be found in the core book starting
              at page 494. Sample QCs are also available in&nbsp;
              <a
                href="http://www.drivethrurpg.com/browse.php?keywords=Adversaries&cPath=8329_24225&sort=6a&x=19&y=22&author=&artist=&pfrom=&pto=&affiliate_id=286472"
                style={{ color: 'inherit' }}
              >
                <em>Adversaries of the Righteous</em>
              </a>
              {' and '}
              <a
                href="http://www.drivethrurpg.com/browse.php?keywords=Night+Parade&cPath=8329_24225&sort=6a&x=0&y=0&author=&artist=&pfrom=&pto=&affiliate_id=286472"
                style={{ color: 'inherit' }}
              >
                <em>Hundred Devils Night Parade</em>
              </a>
              .
            </Typography>
            <TextField
              name="name"
              value={qc.name}
              label="Name"
              margin="dense"
              onChange={handleChange}
              inputProps={{ autocomplete: 'off' }}
            />
            <TextField
              name="ref"
              value={qc.ref}
              label="Reference"
              margin="dense"
              onChange={handleChange}
            />

            {showPublicCheckbox && (
              <FormControlLabel
                label="Publicly Viewable"
                control={
                  <Checkbox
                    name="public"
                    checked={qc.public}
                    onChange={handleCheck}
                  />
                }
              />
            )}

            <TextField
              name="description"
              value={qc.description}
              label="Description"
              margin="dense"
              multiline
              fullWidth
              onChange={handleChange}
              rowsMax={5}
            />

            <TextField
              name="portrait_link"
              value={qc.portrait_link}
              label="Portrait Link"
              margin="dense"
              onChange={handleChange}
              fullWidth
            />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <BlockPaper>
            <Typography component="div" className={classes.flexContainer}>
              <RatingField
                trait="essence"
                value={qc.essence}
                label="Essence"
                min={1}
                max={10}
                margin="dense"
                onChange={handleChange}
              />
              <RatingField
                trait="willpower_temporary"
                value={qc.willpower_temporary}
                label="Willpower"
                margin="dense"
                narrow
                onChange={handleChange}
              />
              <span className={classes.fieldSeparator}>{'/ '}</span>
              <RatingField
                trait="willpower_permanent"
                value={qc.willpower_permanent}
                label="Total"
                min={1}
                max={10}
                margin="dense"
                narrow
                onChange={handleChange}
              />
            </Typography>

            <Typography component="div">Motes</Typography>

            <Typography component="div" className={classes.flexContainerWrap}>
              <RatingField
                trait="motes_personal_current"
                value={qc.motes_personal_current}
                label="Personal"
                max={qc.motes_personal_total}
                margin="dense"
                narrow
                onChange={handleChange}
              />
              <span className={classes.fieldSeparator}>{'/ '}</span>
              <RatingField
                trait="motes_personal_total"
                value={qc.motes_personal_total}
                label="Motes"
                margin="dense"
                narrow
                onChange={handleChange}
              />
              <RatingField
                trait="motes_peripheral_current"
                value={qc.motes_peripheral_current}
                label="Peripheral"
                max={qc.motes_peripheral_total}
                margin="dense"
                narrow
                onChange={handleChange}
              />
              <span className={classes.fieldSeparator}>{'/ '}</span>
              <RatingField
                trait="motes_peripheral_total"
                value={qc.motes_peripheral_total}
                label="Motes"
                margin="dense"
                narrow
                onChange={handleChange}
              />
            </Typography>

            <div className={classes.flexContainer}>
              <AnimaSelect
                character={qc}
                onChange={handleChange}
                style={{ flex: 1, marginRight: '0.5em' }}
              />
              <AuraSelect
                character={qc}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
            </div>

            <QcExcellencySelect
              name="excellency"
              value={qc.excellency}
              onChange={handleChange}
            />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} sm={6} xl={3}>
          <BlockPaper>
            <div style={{ textAlign: 'center' }}>
              <HealthLevelBoxes character={qc} />
              <Typography>
                Current wound penalty: -{woundPenalty(qc, [])}
              </Typography>
            </div>

            <RatingField
              trait="health_level_0s"
              value={qc.health_level_0s}
              label="-0 HLs"
              margin="dense"
              narrow
              onChange={handleChange}
            />
            <RatingField
              trait="health_level_1s"
              value={qc.health_level_1s}
              label="-1 HLs"
              margin="dense"
              narrow
              onChange={handleChange}
            />
            <RatingField
              trait="health_level_2s"
              value={qc.health_level_2s}
              label="-2 HLs"
              margin="dense"
              narrow
              onChange={handleChange}
            />
            <RatingField
              trait="health_level_4s"
              value={qc.health_level_4s}
              label="-4 HLs"
              margin="dense"
              narrow
              onChange={handleChange}
            />
            <RatingField
              trait="health_level_incap"
              value={qc.health_level_incap}
              label="Incap"
              margin="dense"
              narrow
              onChange={handleChange}
            />
            <br />

            <RatingField
              trait="damage_bashing"
              value={qc.damage_bashing}
              label="Bashing"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="damage_lethal"
              value={qc.damage_lethal}
              label="Lethal"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="damage_aggravated"
              value={qc.damage_aggravated}
              label="Aggravated"
              margin="dense"
              onChange={handleChange}
            />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <BlockPaper>
            <QcActionEditor qc={qc} onChange={handleChange} />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <BlockPaper>
            <Typography variant="h6">Social</Typography>
            <RatingField
              trait="resolve"
              value={qc.resolve}
              label="Resolve"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="guile"
              value={qc.guile}
              label="Guile"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="appearance"
              value={qc.appearance}
              label="Appearance"
              max={10}
              margin="dense"
              onChange={handleChange}
            />

            <IntimacyEditor
              character={qc}
              characterType="qc"
              onChange={handleChange}
            />
          </BlockPaper>
        </Grid>

        <Grid item xs={12}>
          <BlockPaper>
            <Typography variant="h6">Combat</Typography>
            <RatingField
              trait="join_battle"
              value={qc.join_battle}
              label="JB"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="movement"
              value={qc.movement}
              label="Move"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="evasion"
              value={qc.evasion}
              label="Evasion"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="parry"
              value={qc.parry}
              label="Parry"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="soak"
              value={qc.soak}
              label="Soak"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="hardness"
              value={qc.hardness}
              label="Hardness"
              margin="dense"
              onChange={handleChange}
            />
            <TextField
              name="armor_name"
              value={qc.armor_name}
              label="Armor Name"
              margin="dense"
              onChange={handleChange}
            />
            <br />

            <RatingField
              trait="grapple"
              value={qc.grapple}
              label="Grapple"
              margin="dense"
              onChange={handleChange}
            />
            <RatingField
              trait="grapple_control"
              value={qc.grapple_control}
              label="Grapple Control"
              margin="dense"
              onChange={handleChange}
            />

            <QcAttackEditor qc={qc} />
          </BlockPaper>
        </Grid>

        <Grid item xs={12}>
          <QcMeritEditor qc={qc} classes={classes} />
        </Grid>

        <Grid item xs={12}>
          <QcCharmEditor qc={qc} classes={classes} />
        </Grid>

        <Grid item xs={12}>
          <QcSpellEditor qc={qc} classes={classes} changeQc={handleChange} />
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const id = ownProps.match.params.qcId
  const qc = getSpecificQc(state, id)
  const showPublicCheckbox = canIDeleteQc(state, id)

  return {
    id,
    qc,
    showPublicCheckbox,
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, { updateQc }),
  withStyles(styles),
  ProtectedComponent,
)

export default enhance(QcEditor)
