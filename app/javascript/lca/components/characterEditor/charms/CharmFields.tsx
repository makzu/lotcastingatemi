import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Collapse,
  MenuItem,
  Typography,
} from '@material-ui/core'
import type { AccordionProps } from '@material-ui/core/Accordion'
import { makeStyles } from '@material-ui/core/styles'
import {
  Delete,
  DragHandle as DragHandleIcon,
  ExpandMore,
} from '@material-ui/icons'
import { deepEqual } from 'fast-equals'

import CharmSummaryBlock from '@lca/components/CharacterSheet/Charms/CharmDisplay/AbbreviatedCharmSummary'
import AbilitySelect from '@lca/components/generic/abilitySelect.jsx'
import RatingField from '@lca/components/generic/RatingField.jsx'
import TagsField from '@lca/components/generic/TagsField.jsx'
import TextField from '@lca/components/generic/TextField.jsx'
import CharmTimingSelect from '@lca/components/shared/selects/CharmTimingSelect.tsx'
import { destroyCharm, updateCharm } from '@lca/ducks/entities'
import { useAppDispatch } from '@lca/hooks'
import type { Character, Charm } from '@lca/types'
import {
  ABILITY_MAX,
  ATTRIBUTE_MAX,
  ESSENCE_MAX,
  ESSENCE_MIN,
} from '@lca/utils/constants'
import { abilitiesWithRatings, showLoadoutTraits } from 'utils/calculated'
import CharmCategoryAutocomplete from './CharmCategoryAutocomplete'
import HouseOptions from './CharmHouseOptions'
import CharmLoadoutAutocomplete from './CharmLoadoutAutocomplete'

const noAbils = [
  <MenuItem key="no-abils" disabled>
    No Abilities with ratings
  </MenuItem>,
]

const showLoadout = (
  character: Character,
  type: 'evocation' | 'martialArts' | 'native' | 'spirit',
) => {
  return showLoadoutTraits(character) && type === 'native'
}

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
}))

interface Props {
  charm: Charm
  character: Character
  isOpen: boolean
  type: 'evocation' | 'martialArts' | 'native' | 'spirit'
  setOpenCharm: React.Dispatch<React.SetStateAction<number>>
}

const CharmFields = (props: Props) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { character, charm, type, isOpen } = props

  const id = `charm-accordion-${charm.id}`
  const handleChangeOpen: AccordionProps['onChange'] = (_e, isExpanded) => {
    props.setOpenCharm(isExpanded ? charm.id : 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (deepEqual(charm[name as keyof Charm], value)) return

    dispatch(updateCharm(charm.id, character.id, { [name]: value }))
  }

  const handleRemove = () => {
    dispatch(destroyCharm(charm.id, character.id))
  }

  const abilities = abilitiesWithRatings(character)

  let abilOptions: JSX.Element[] = []
  if (abilities.length === 0) abilOptions = abilOptions.concat(noAbils)
  if (character.type === 'SiderealCharacter')
    abilOptions = abilOptions.concat(HouseOptions)

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
      >
        <div>
          <Collapse in={!isOpen}>
            <Typography variant="h6">
              <DragHandleIcon onClick={(e) => e.preventDefault()} /> &nbsp;
              {charm.name}
            </Typography>
          </Collapse>
          <CharmSummaryBlock charm={charm} isOpen={isOpen} />
        </div>
      </AccordionSummary>

      <AccordionDetails className={classes.details}>
        <div>
          <TextField
            name="name"
            value={charm.name}
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
            value={charm.categories}
            id={character.id}
            onChange={handleChange}
          />
        </div>
        {showLoadout(character, type) && (
          <div>
            <CharmLoadoutAutocomplete
              value={charm.loadouts}
              id={character.id}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
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
              prependOptions={abilOptions}
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
            <>
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
            </>
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
            minRows={2}
            maxRows={15}
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

export default CharmFields
