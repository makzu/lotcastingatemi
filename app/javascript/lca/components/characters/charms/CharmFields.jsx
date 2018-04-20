// @flow
import React, { Component, Fragment } from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import scrollToElement from 'scroll-to-element'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import ExpansionPanel, {
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Collapse from 'material-ui/transitions/Collapse'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from './CharmStyles.js'
import CharmCategoryAutocomplete from './CharmCategoryAutocomplete.jsx'
import { CharmSummaryBlock } from './CharmDisplay.jsx'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { checkVisible } from 'utils'
import { abilitiesWithRatings } from 'utils/calculated'
import {
  ABILITY_MAX,
  ATTRIBUTE_MAX,
  ESSENCE_MIN,
  ESSENCE_MAX,
} from 'utils/constants.js'
import type { Charm, Character } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

type Props = {
  charm: Charm,
  character: Character,
  onUpdate: Function,
  onRemove: Function,
  openCharm: number,
  onOpenChange: Function,
  classes: Object,
}
class CharmFields extends Component<Props, { charm: Charm }> {
  constructor(props) {
    super(props)
    this.state = { charm: this.props.charm }
  }

  static getDerivedStateFromProps(props) {
    return { charm: props.charm }
  }

  handleChange = e => {
    let { name, value } = e.target
    if (name == 'keywords') value = value.split(',')

    this.setState({ charm: { ...this.state.charm, [name]: value } })
  }

  handleBlur = e => {
    const { name } = e.target
    const { charm } = this.state

    if (charm[name] != this.props.charm[name]) {
      this.props.onUpdate(charm.id, charm.character_id, name, charm[name])
    }
  }

  handleRatingChange = e => {
    let { name, value } = e.target
    const { charm } = this.state

    this.setState({ charm: { ...charm, [name]: value } })
    this.props.onUpdate(charm.id, charm.character_id, name, value)
  }

  handleRemove = () => {
    this.props.onRemove(this.state.charm.id)
  }

  scrollToPanel = (e, appearing) => {
    if (appearing) return false
    const elem = document.getElementById(
      `charm-editor-expando-${this.state.charm.id}`
    )
    if (!checkVisible(elem)) scrollToElement(elem)
  }

  render() {
    const { character, openCharm, onOpenChange, classes } = this.props
    const { charm } = this.state
    const {
      handleChange,
      handleBlur,
      handleRatingChange,
      handleRemove,
      scrollToPanel,
    } = this

    const isOpen = openCharm === charm.id

    const abilities = abilitiesWithRatings(character)
    const abilOptions = (
      <MenuItem key="no-abils" disabled>
        No Abilities with ratings
      </MenuItem>
    )

    return (
      <ExpansionPanel
        expanded={isOpen}
        onChange={onOpenChange(charm.id)}
        CollapseProps={{
          onEntered: scrollToPanel,
          mountOnEnter: true,
          unmountOnExit: true,
        }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{ expanded: classes.expandedEditSummary }}
        >
          <div className={classes.summaryWrap}>
            <div
              id={`charm-editor-expando-${charm.id}`}
              className={classes.charmAnchor}
            >
              &nbsp;
            </div>
            <Collapse in={!isOpen}>
              <Typography variant="title">
                <Handle /> &nbsp;
                {charm.name}
              </Typography>
            </Collapse>
            <CharmSummaryBlock
              charm={charm}
              isOpen={isOpen}
              classes={classes}
            />
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <div className={classes.detailsWrap}>
            <TextField
              name="name"
              value={charm.name}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Name"
              margin="dense"
              style={{ width: '25em' }}
            />&nbsp;&nbsp;
            {charm.charm_type === 'Evocation' && (
              <TextField
                name="artifact_name"
                value={charm.artifact_name}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Artifact Name"
                margin="dense"
              />
            )}
            {charm.charm_type === 'MartialArts' && (
              <TextField
                name="style"
                value={charm.style}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Style"
                margin="dense"
              />
            )}
            <CharmCategoryAutocomplete
              value={charm.categories}
              id={character.id}
              onChange={handleRatingChange}
            />
            <br />
            <TextField
              name="cost"
              value={charm.cost}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Cost"
              margin="dense"
            />&nbsp;&nbsp;
            {charm.charm_type === 'Ability' && (
              <AbilitySelect
                name="ability"
                label="Ability"
                margin="dense"
                abilities={abilities}
                prependOptions={
                  abilities.length === 0 ? [abilOptions] : undefined
                }
                value={charm.ability}
                onChange={handleRatingChange}
                multiple={false}
              />
            )}
            {(charm.charm_type === 'Ability' ||
              charm.charm_type === 'MartialArts') && (
              <RatingField
                trait="min_ability"
                value={charm.min_ability}
                min={1}
                max={ABILITY_MAX}
                onChange={handleRatingChange}
                label="Ability"
                margin="dense"
              />
            )}
            {charm.charm_type === 'Attribute' && (
              <Fragment>
                <AbilitySelect
                  attributesOnly
                  name="ability"
                  label="Attribute"
                  margin="dense"
                  value={charm.ability}
                  onChange={handleRatingChange}
                  multiple={false}
                />
                <RatingField
                  trait="min_ability"
                  value={charm.min_ability}
                  min={1}
                  max={ATTRIBUTE_MAX}
                  onChange={handleRatingChange}
                  label="Attribute"
                  margin="dense"
                />
              </Fragment>
            )}
            <RatingField
              trait="min_essence"
              value={charm.min_essence}
              min={ESSENCE_MIN}
              max={ESSENCE_MAX}
              onChange={handleRatingChange}
              label="Essence"
              margin="dense"
            />
            <br />
            <TextField
              select
              name="timing"
              label="Type"
              margin="dense"
              value={charm.timing}
              onChange={handleRatingChange}
            >
              <MenuItem value="reflexive">Reflexive</MenuItem>
              <MenuItem value="supplemental">Supplemental</MenuItem>
              <MenuItem value="simple">Simple</MenuItem>
              <MenuItem value="permanent">Permanent</MenuItem>
            </TextField>&nbsp;&nbsp;
            <TextField
              name="duration"
              value={charm.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Duration"
              margin="dense"
            />
            <br />
            <TextField
              name="keywords"
              value={charm.keywords}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth={true}
              label="Keywords (comma separated)"
              margin="dense"
            />
            <TextField
              name="prereqs"
              value={charm.prereqs}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth={true}
              label="Prerequisite Charms"
              margin="dense"
            />
            <TextField
              name="body"
              value={charm.body}
              onChange={handleChange}
              onBlur={handleBlur}
              className="editor-description-field"
              multiline
              fullWidth
              label="Effect"
              margin="dense"
              rows={2}
              rowsMax={15}
            />
            <TextField
              name="summary"
              value={charm.summary}
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              label="Summary (optional)"
              margin="dense"
            />
            <br />
            <TextField
              name="ref"
              value={charm.ref}
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              label="Reference"
              margin="dense"
            />
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button onClick={handleRemove} style={{ float: 'right' }}>
            Delete&nbsp;
            <Delete />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(CharmFields)
