// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import QcActionEditor from './qcActionEditor.jsx'
import QcAttackEditor from './qcAttackEditor.jsx'
import QcCharmEditor from './qcCharmEditor.jsx'
import QcMeritEditor from './qcMeritEditor.jsx'
import AnimaSelect from '../generic/AnimaSelect.jsx'
import BlockPaper from '../generic/blockPaper.jsx'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import IntimacyEditor from '../generic/intimacyEditor.jsx'
import RatingField from '../generic/RatingField.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateQc } from 'ducks/actions.js'
import { getSpecificQc } from 'selectors'
import { woundPenalty } from 'utils/calculated'
import type { fullQc } from 'utils/flow-types'

type Props = { qc: fullQc, updateQc: Function }
type State = { qc: fullQc }
class QcEditor extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      qc: this.props.qc,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
  }

  componentWillReceiveProps = newProps => {
    this.setState({ qc: newProps.qc })
  }

  handleChange = e => {
    this.setState({ qc: { ...this.state.qc, [e.target.name]: e.target.value } })
  }

  handleBlur = e => {
    const { name } = e.target
    const { qc } = this.state
    if (qc[name] == this.props.qc[name]) return

    this.props.updateQc(qc.id, name, qc[name])
  }

  handleRatingChange = e => {
    let { name, value } = e.target
    const { qc } = this.state

    this.setState({ qc: { ...qc, [name]: value } })
    this.props.updateQc(qc.id, name, value)
  }

  render() {
    /* Escape hatch */
    if (this.props.qc == undefined)
      return (
        <BlockPaper>
          <Typography paragraph>
            This Quick Character has not yet loaded.
          </Typography>
        </BlockPaper>
      )

    const { qc } = this.state
    const { handleChange, handleBlur, handleRatingChange } = this

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <BlockPaper>
            <Typography paragraph variant="caption">
              Rules for Quick Characters can be found in the core book starting
              at page 494. Sample QCs are also available in{' '}
              <em>Adversaries of the Righteous</em> and{' '}
              <em>Hundred Devils Night Parade</em>.
            </Typography>
            <TextField
              name="name"
              value={qc.name}
              label="Name"
              margin="dense"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            &nbsp;&nbsp;
            <TextField
              name="ref"
              value={qc.ref}
              label="Reference"
              margin="dense"
              onChange={handleRatingChange}
            />
            <TextField
              name="description"
              value={qc.description}
              label="Description"
              margin="dense"
              multiline
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              rowsMax={5}
            />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <BlockPaper>
            <Typography component="div">
              <RatingField
                trait="essence"
                value={qc.essence}
                label="Essence"
                min={1}
                max={10}
                margin="dense"
                narrow
                onChange={handleRatingChange}
              />
              &nbsp;&nbsp;
              <RatingField
                trait="willpower_temporary"
                value={qc.willpower_temporary}
                label="Willpower"
                margin="dense"
                narrow
                onChange={handleRatingChange}
              />
              /&nbsp;
              <RatingField
                trait="willpower_permanent"
                value={qc.willpower_permanent}
                label=""
                min={1}
                max={10}
                margin="dense"
                narrow
                onChange={handleRatingChange}
              />
            </Typography>

            <Typography component="div">Motes</Typography>

            <Typography component="div">
              <RatingField
                trait="motes_personal_current"
                value={qc.motes_personal_current}
                label="Personal"
                max={qc.motes_personal_total}
                margin="dense"
                narrow
                onChange={handleRatingChange}
              />
              /
              <RatingField
                trait="motes_personal_total"
                value={qc.motes_personal_total}
                label="Motes"
                margin="dense"
                narrow
                onChange={handleRatingChange}
              />
              <RatingField
                trait="motes_peripheral_current"
                value={qc.motes_peripheral_current}
                label="Peripheral"
                max={qc.motes_peripheral_total}
                margin="dense"
                narrow
                onChange={handleRatingChange}
              />
              /
              <RatingField
                trait="motes_peripheral_total"
                value={qc.motes_peripheral_total}
                label="Motes"
                margin="dense"
                narrow
                onChange={handleRatingChange}
              />
              <AnimaSelect character={qc} onChange={handleRatingChange} />
              <div>
                <TextField
                  select
                  value={qc.excellency}
                  name="excellency"
                  label="Excellency Type"
                  margin="dense"
                  onChange={handleRatingChange}
                  fullWidth
                >
                  <MenuItem value="">No Excellency</MenuItem>
                  <MenuItem value="dragonblood">Dragon-Blood</MenuItem>
                  <MenuItem value="lunar">Lunar</MenuItem>
                  <MenuItem value="sidereal">Sidereal</MenuItem>
                  <MenuItem value="solar">Solar/Abyssal</MenuItem>
                  <MenuItem value="liminal">Liminal</MenuItem>
                </TextField>
              </div>
            </Typography>
          </BlockPaper>
        </Grid>

        <Grid item xs={12} sm={6} lg={4} xl={3}>
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
              onChange={handleRatingChange}
            />
            <RatingField
              trait="health_level_1s"
              value={qc.health_level_1s}
              label="-1 HLs"
              margin="dense"
              narrow
              onChange={handleRatingChange}
            />
            <RatingField
              trait="health_level_2s"
              value={qc.health_level_2s}
              label="-2 HLs"
              margin="dense"
              narrow
              onChange={handleRatingChange}
            />
            <RatingField
              trait="health_level_4s"
              value={qc.health_level_4s}
              label="-4 HLs"
              margin="dense"
              narrow
              onChange={handleRatingChange}
            />
            <RatingField
              trait="health_level_incap"
              value={qc.health_level_incap}
              label="Incap"
              margin="dense"
              narrow
              onChange={handleRatingChange}
            />
            <br />

            <RatingField
              trait="damage_bashing"
              value={qc.damage_bashing}
              label="Bashing"
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="damage_lethal"
              value={qc.damage_lethal}
              label="Lethal"
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="damage_aggravated"
              value={qc.damage_aggravated}
              label="Aggravated"
              margin="dense"
              onChange={handleRatingChange}
            />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <BlockPaper>
            <QcActionEditor qc={qc} onChange={handleRatingChange} />
          </BlockPaper>
        </Grid>

        <Grid item xs={12}>
          <BlockPaper>
            <Typography variant="subheading">Combat</Typography>
            <RatingField
              trait="join_battle"
              value={qc.join_battle}
              label="JB"
              min={1}
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="movement"
              value={qc.movement}
              label="Move"
              min={1}
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="evasion"
              value={qc.evasion}
              label="Evasion"
              min={1}
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="parry"
              value={qc.parry}
              label="Parry"
              min={1}
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="soak"
              value={qc.soak}
              label="Soak"
              min={1}
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="hardness"
              value={qc.hardness}
              label="Hardness"
              margin="dense"
              onChange={handleRatingChange}
            />
            <TextField
              name="armor_name"
              value={qc.armor_name}
              label="Armor Name"
              margin="dense"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />

            <RatingField
              trait="grapple"
              value={qc.grapple}
              label="Grapple"
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="grapple_control"
              value={qc.grapple_control}
              label="Grapple Control"
              margin="dense"
              onChange={handleRatingChange}
            />

            <QcAttackEditor qc={qc} />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <BlockPaper>
            <Typography variant="subheading">Social</Typography>
            <RatingField
              trait="resolve"
              value={qc.resolve}
              label="Resolve"
              min={1}
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="guile"
              value={qc.guile}
              label="Guile"
              min={1}
              margin="dense"
              onChange={handleRatingChange}
            />
            <RatingField
              trait="appearance"
              value={qc.appearance}
              label="Appearance"
              min={1}
              max={10}
              margin="dense"
              onChange={handleRatingChange}
            />

            <Typography variant="subheading">Intimacies</Typography>

            <IntimacyEditor
              character={qc}
              characterType="qc"
              onChange={handleRatingChange}
            />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <BlockPaper>
            <QcMeritEditor qc={qc} />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <BlockPaper>
            <QcCharmEditor qc={qc} />
          </BlockPaper>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.qcId
  const qc = getSpecificQc(state, id)

  return {
    id,
    qc,
  }
}
export default ProtectedComponent(
  connect(mapStateToProps, { updateQc })(QcEditor)
)
