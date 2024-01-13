import { deepEqual } from 'fast-equals'
import { Component } from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import scrollToElement from 'scroll-to-element'

import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import MuiTextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Delete from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import styles from './CharmStyles.js'
import CharmCategoryAutocomplete from './CharmCategoryAutocomplete'
import { SpellSummaryBlock } from './SpellDisplay'
import TagsField from 'components/generic/TagsField'
import TextField from 'components/generic/TextField'
import { checkVisible } from 'utils'
import type { Character, Spell } from 'utils/flow-types'
const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))
interface Props {
  spell: Spell
  character: Character
  onUpdate: $TSFixMeFunction
  onRemove: $TSFixMeFunction
  openSpell: number | null
  onOpenChange: $TSFixMeFunction
  classes: Record<string, $TSFixMe>
}

class SpellFields extends Component<Props> {
  handleChange = (e) => {
    const { name, value } = e.target
    const { spell } = this.props
    if (deepEqual(spell[name], value)) return
    this.props.onUpdate(spell.id, spell.sorcerer_id, {
      [name]: value,
    })
  }
  handleCheck = (e) => {
    const { name, checked } = e.target
    const { spell } = this.props
    this.props.onUpdate(spell.id, spell.sorcerer_id, {
      [name]: checked,
    })
  }
  handleRemove = () => {
    this.props.onRemove(this.props.spell.id)
  }
  scrollToPanel = (e, appearing) => {
    if (appearing) return false
    const elem = document.getElementById(
      `spell-editor-expando-${this.props.spell.id}`,
    )
    if (!checkVisible(elem)) scrollToElement(elem)
  }

  render() {
    const { spell, character, openSpell, onOpenChange, classes } = this.props
    const { handleChange, handleCheck, handleRemove, scrollToPanel } = this
    const isOpen = openSpell === spell.id
    return (
      <Accordion
        expanded={isOpen}
        onChange={onOpenChange(spell.id)}
        CollapseProps={{
          onEntered: scrollToPanel,
          mountOnEnter: true,
          unmountOnExit: true,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            expanded: classes.expandedEditSummary,
          }}
        >
          <div className={classes.summaryWrap}>
            <div
              id={`spell-editor-expando-${spell.id}`}
              className={classes.charmAnchor}
            >
              &nbsp;
            </div>
            <Collapse in={!isOpen}>
              <Typography variant="h6">
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
        </AccordionSummary>

        <AccordionDetails>
          <div className={classes.detailsWrap}>
            <TextField
              name="name"
              value={spell.name}
              onChange={handleChange}
              label="Name"
              margin="dense"
              style={{
                width: '25em',
              }}
              inputProps={{
                autocomplete: 'off',
                'data-1p-ignore': 'true',
                'data-lp-ignore': 'true',
              }}
            />
            <br />
            <CharmCategoryAutocomplete
              value={spell.categories}
              id={character.id}
              onChange={handleChange}
            />
            <TextField
              name="cost"
              value={spell.cost}
              onChange={handleChange}
              label="Cost"
              margin="dense"
            />
            <TextField
              name="duration"
              value={spell.duration}
              onChange={handleChange}
              label="Duration"
              margin="dense"
            />
            <MuiTextField
              variant="standard"
              select
              name="circle"
              label="Circle"
              margin="dense"
              value={spell.circle}
              onChange={handleChange}
            >
              <MenuItem value="terrestrial">Terrestrial</MenuItem>
              <MenuItem value="celestial">Celestial</MenuItem>
              <MenuItem value="solar">Solar</MenuItem>
            </MuiTextField>
            &nbsp;&nbsp;
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
              fullWidth
              label="Keywords (comma separated)"
              margin="dense"
            />
            <TextField
              name="body"
              value={spell.body}
              onChange={handleChange}
              className="editor-description-field"
              multiline
              fullWidth
              label="Effect"
              margin="dense"
              rows={2}
              maxRows={15}
            />
            <br />
            <TextField
              name="ref"
              value={spell.ref}
              fullWidth
              onChange={handleChange}
              label="Reference"
              margin="dense"
            />
          </div>
        </AccordionDetails>
        <AccordionActions>
          <Button onClick={handleRemove} style={{ float: 'right' }}>
            Delete&nbsp;
            <Delete />
          </Button>
        </AccordionActions>
      </Accordion>
    )
  }
}

export default withStyles(styles)(SpellFields)
