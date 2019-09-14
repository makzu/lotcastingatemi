// @flow
import { deepEqual } from 'fast-equals'
import React, { Component, Fragment } from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import scrollToElement from 'scroll-to-element'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from './CharmStyles.js'
import CharmCategoryAutocomplete from './CharmCategoryAutocomplete.jsx'
import { CharmSummaryBlock } from './CharmDisplay.jsx'
import AbilitySelect from 'components/generic/abilitySelect.jsx'
import CharmTimingSelect from 'components/shared/selects/CharmTimingSelect'
import RatingField from 'components/generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
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
  openCharm: number | null,
  onOpenChange: Function,
  classes: Object,
}
class CharmFields extends Component<Props, { charm: Charm }> {
  handleChange = e => {
    const { name, value } = e.target
    const { charm } = this.props

    if (deepEqual(charm[name], value)) return

    this.props.onUpdate(charm.id, charm.character_id, { [name]: value })
  }

  handleRemove = () => {
    this.props.onRemove(this.props.charm.id)
  }

  scrollToPanel = (e, appearing) => {
    if (appearing) return false
    const elem = document.getElementById(
      `charm-editor-expando-${this.props.charm.id}`
    )
    if (!checkVisible(elem)) scrollToElement(elem)
  }

  render() {
    const { charm, character, openCharm, onOpenChange, classes } = this.props
    const { handleChange, handleRemove, scrollToPanel } = this
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
              <Typography variant="h6">
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
              label="Name"
              margin="dense"
              style={{ width: '25em' }}
            />
            {charm.charm_type === 'Evocation' && (
              <TextField
                name="artifact_name"
                value={charm.artifact_name || ''}
                onChange={handleChange}
                label="Artifact Name"
                margin="dense"
              />
            )}
            {charm.charm_type === 'MartialArts' && (
              <TextField
                name="style"
                value={charm.style || ''}
                onChange={handleChange}
                label="Style"
                margin="dense"
              />
            )}
            <CharmCategoryAutocomplete
              value={charm.categories}
              id={character.id}
              onChange={handleChange}
            />
            <br />
            <TextField
              name="cost"
              value={charm.cost}
              onChange={handleChange}
              label="Cost"
              margin="dense"
            />
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
                onChange={handleChange}
                multiple={false}
                includeUniversal
              />
            )}
            {(charm.charm_type === 'Ability' ||
              charm.charm_type === 'MartialArts') && (
              <RatingField
                trait="min_ability"
                value={charm.min_ability}
                min={1}
                max={ABILITY_MAX}
                onChange={handleChange}
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
                  onChange={handleChange}
                  multiple={false}
                  includeUniversal
                />
                <RatingField
                  trait="min_ability"
                  value={charm.min_ability}
                  min={1}
                  max={ATTRIBUTE_MAX}
                  onChange={handleChange}
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
              onChange={handleChange}
              label="Essence"
              margin="dense"
            />
            <br />
            <CharmTimingSelect
              name="timing"
              value={charm.timing}
              onChange={handleChange}
            />
            &nbsp;&nbsp;
            <TextField
              name="duration"
              value={charm.duration}
              onChange={handleChange}
              label="Duration"
              margin="dense"
            />
            <br />
            <TagsField
              trait="keywords"
              value={charm.keywords}
              onChange={handleChange}
              fullWidth
              label="Keywords (comma separated)"
              margin="dense"
            />
            <TextField
              name="prereqs"
              value={charm.prereqs}
              onChange={handleChange}
              fullWidth
              label="Prerequisite Charms"
              margin="dense"
            />
            <TextField
              name="body"
              value={charm.body}
              onChange={handleChange}
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
              label="Summary (optional)"
              margin="dense"
            />
            <br />
            <TextField
              name="ref"
              value={charm.ref}
              fullWidth
              onChange={handleChange}
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
