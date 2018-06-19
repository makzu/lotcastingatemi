// @flow
import { isEqual } from 'lodash'
import * as React from 'react'
const { Component } = React
import { SortableHandle } from 'react-sortable-hoc'
import scrollToElement from 'scroll-to-element'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import MuiTextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from './CharmStyles.js'
import CharmCategoryAutocomplete from './CharmCategoryAutocomplete.jsx'
import { SpellSummaryBlock } from './SpellDisplay.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import { checkVisible } from 'utils'
import type { Character, Spell } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

type Props = {
  spell: Spell,
  character: Character,
  onUpdate: Function,
  onRemove: Function,
  openSpell: number,
  onOpenChange: Function,
  classes: Object,
}
type State = { spell: Spell }
class SpellFields extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { spell: this.props.spell }
  }

  static getDerivedStateFromProps(props) {
    return { spell: props.spell }
  }

  handleChange = e => {
    let { name, value } = e.target

    this.setState({ spell: { ...this.state.spell, [name]: value } })
  }

  handleBlur = e => {
    const { name, value } = e.target
    const { spell } = this.props

    if (isEqual(spell[name], value)) return

    this.props.onUpdate(spell.id, spell.character_id, name, value)
  }

  handleRatingChange = e => {
    let { name, value } = e.target
    const { spell } = this.state

    this.setState({ spell: { ...spell, [name]: value } })
    this.props.onUpdate(spell.id, spell.character_id, name, value)
  }

  handleCheck = e => {
    const { name } = e.target
    const value = !this.state.spell[name]

    this.setState({ spell: { ...this.state.spell, [name]: value } })
    this.props.onUpdate(
      this.state.spell.id,
      this.state.spell.character_id,
      name,
      value
    )
  }

  handleRemove = () => {
    this.props.onRemove(this.state.spell.id)
  }

  scrollToPanel = (e, appearing) => {
    if (appearing) return false
    const elem = document.getElementById(
      `spell-editor-expando-${this.state.spell.id}`
    )
    if (!checkVisible(elem)) scrollToElement(elem)
  }

  render() {
    const { character, openSpell, onOpenChange, classes } = this.props
    const { spell } = this.state
    const {
      handleChange,
      handleBlur,
      handleRatingChange,
      handleCheck,
      handleRemove,
      scrollToPanel,
    } = this

    const isOpen = openSpell === spell.id
    const circles: React.Node = [
      <MenuItem key="t" value="terrestrial">
        Terrestrial
      </MenuItem>,
      <MenuItem key="c" value="celestial">
        Celestial
      </MenuItem>,
      <MenuItem key="s" value="solar">
        Solar
      </MenuItem>,
    ]
    return (
      <ExpansionPanel
        expanded={isOpen}
        onChange={onOpenChange(spell.id)}
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
              id={`spell-editor-expando-${spell.id}`}
              className={classes.charmAnchor}
            >
              &nbsp;
            </div>
            <Collapse in={!isOpen}>
              <Typography variant="title">
                <Handle /> &nbsp;
                {spell.name}
              </Typography>
              <SpellSummaryBlock
                spell={spell}
                isOpen={isOpen}
                classes={classes}
              />
            </Collapse>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <div className={classes.detailsWrap}>
            <TextField
              name="name"
              value={spell.name}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Name"
              margin="dense"
              style={{ width: '25em' }}
            />
            <br />
            <CharmCategoryAutocomplete
              value={spell.categories}
              id={character.id}
              onChange={handleRatingChange}
            />
            <TextField
              name="cost"
              value={spell.cost}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Cost"
              margin="dense"
            />
            <TextField
              name="duration"
              value={spell.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Duration"
              margin="dense"
            />
            <MuiTextField
              select
              name="circle"
              label="Circle"
              margin="dense"
              value={spell.circle}
              onChange={handleRatingChange}
            >
              {circles}
            </MuiTextField>&nbsp;&nbsp;
            <FormControlLabel
              label="Control Spell"
              control={
                <Checkbox
                  name="control"
                  checked={spell.control}
                  onChange={handleCheck}
                />
              }
            />
            <br />
            <TagsField
              trait="keywords"
              value={spell.keywords}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth={true}
              label="Keywords (comma separated)"
              margin="dense"
            />
            <TextField
              name="body"
              value={spell.body}
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
            <br />
            <TextField
              name="ref"
              value={spell.ref}
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

export default withStyles(styles)(SpellFields)
