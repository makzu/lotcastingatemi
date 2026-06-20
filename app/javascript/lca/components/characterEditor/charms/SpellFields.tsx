import {
  AccordionActions,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import Accordion, { type AccordionProps } from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
  Delete,
  DragHandle as DragHandleIcon,
  ExpandMore,
} from '@material-ui/icons'
import { deepEqual } from 'fast-equals'

import SpellSummaryBlock from '@lca/components/CharacterSheet/Sorcery/SpellSummaryBlock'
import TagsField from '@lca/components/generic/TagsField.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import SpellCircleSelect from '@lca/components/shared/selects/SpellCircleSelect'
import { updateSpell } from '@lca/ducks/entities'
import { useAppDispatch } from '@lca/hooks'
import type { Character, Spell } from '@lca/types'
import CharmCategoryAutocomplete from './CharmCategoryAutocomplete'

const useStyles = makeStyles((_theme) => ({
  summary: {
    alignItems: 'flex-start',
  },
  summaryButton: {
    '&.Mui-expanded': {
      marginRight: '-0.5em',
    },
  },
  expandedSummary: {
    margin: '0 0 -60px',
  },
  details: {
    display: 'block',
  },
  circleRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '1em',
  },
  circleRowItem: {},
}))

interface Props {
  spell: Spell
  character: Character
  isOpen: boolean
  setOpenSpell: React.Dispatch<React.SetStateAction<number>>
}

const SpellFields = (props: Props) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { character, spell, isOpen } = props

  const id = `spell-accordion-${spell.id}`
  const handleChangeOpen: AccordionProps['onChange'] = (_e, isExpanded) => {
    props.setOpenSpell(isExpanded ? spell.id : 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (deepEqual(spell[name as keyof Spell], value)) return

    dispatch(updateSpell(spell.id, character.id, { [name]: value }))
  }

  const handleCheck = () => {}
  const handleRemove = () => {}

  return (
    <Accordion
      expanded={isOpen}
      onChange={handleChangeOpen}
      TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        id={`${id}-header`}
        aria-controls={`${id}-content`}
        classes={{
          root: classes.summary,
          expanded: classes.expandedSummary,
          expandIcon: classes.summaryButton,
        }}
        // IconButtonProps={{ className: classes.summaryButton }}
      >
        <div>
          <Collapse in={!isOpen}>
            <Typography variant="h6">
              <DragHandleIcon onClick={(e) => e.preventDefault()} /> &nbsp;
              {spell.name}
            </Typography>
            <SpellSummaryBlock spell={spell} isOpen={isOpen} />
          </Collapse>
        </div>
      </AccordionSummary>

      <AccordionDetails className={classes.details}>
        <div>
          <TextField
            name="name"
            value={spell.name}
            onChange={handleChange}
            label="Name"
            margin="dense"
            style={{ width: 'calc(100% - 4em)' }}
            inputProps={{
              autocomplete: 'off',
              'data-1p-ignore': 'true',
              'data-lp-ignore': 'true',
            }}
          />
        </div>
        <div>
          <CharmCategoryAutocomplete
            value={spell.categories}
            id={character.id}
            onChange={handleChange}
          />
        </div>
        <div>
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
        </div>
        <div className={classes.circleRow}>
          <span>
            <SpellCircleSelect spell={spell} onChange={handleChange} />
          </span>
          <span>
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
          </span>
        </div>
        <div>
          <TagsField
            trait="keywords"
            value={spell.keywords}
            onChange={handleChange}
            fullWidth
            label="Keywords (comma separated)"
            margin="dense"
          />
        </div>
        <div>
          <TextField
            name="body"
            value={spell.body}
            onChange={handleChange}
            className="editor-description-field"
            multiline
            fullWidth
            label="Effect"
            margin="dense"
            minRows={2}
            maxRows={15}
          />
        </div>
        <div>
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

export default SpellFields
