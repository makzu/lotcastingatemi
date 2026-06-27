import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Checkbox as MuiCheckbox,
  Select,
  Switch,
  type SwitchProps,
  TextField,
  type Theme,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ResponsiveFilterDrawer from '@lca/components/shared/ResponsiveFilterDrawer.tsx'
import CharmTimingSelect from '@lca/components/shared/selects/CharmTimingSelect.tsx'
import {
  getAllAbilitiesWithCharmsForCharacter as getAbilities,
  getAllCharmCategoriesForCharacter as getCategories,
  getAllCharmKeywordsForCharacter as getKeywords,
  getAllCharmLoadoutsForCharacter as getLoadouts,
  getSpecificCharacter,
} from '@lca/ducks/entities/index.ts'
import { useAppSelector } from '@lca/hooks/index.ts'
import type { Timing } from '@lca/types/_lib.ts'
import type {
  AbilityCharm,
  AttributeCharm,
  Character,
  Charm,
  NativeCharm,
} from '@lca/types/index.ts'
import { showLoadoutTraits } from '@lca/utils/calculated/index.ts'
import type { CharmFilter, CharmFilterAction } from '../useCharmFilters.ts'

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    ...theme.typography.caption,
    marginBottom: '-0.5em',
  },
}))

interface Props {
  id: Character['id']
  open: boolean
  setClosed: () => void
  filters: CharmFilter
  setFilters: React.Dispatch<CharmFilterAction>
}

const ExclusiveSwitch = (
  props: Pick<SwitchProps, 'name' | 'value' | 'onChange'>,
) => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      margin: '-0.5rem auto 0.5rem',
    }}
  >
    All
    <Switch name={props.name} value={props.value} onChange={props.onChange} />
    Any
  </Box>
)

const CharmFilterDrawer = (props: Props) => {
  const { filters, setFilters, open, setClosed, id } = props
  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  const allAbilities = useAppSelector((state) => getAbilities(state, id))
  const allCategories = useAppSelector((state) => getCategories(state, id))
  const allKeywords = useAppSelector((state) => getKeywords(state, id))
  const allLoadouts = useAppSelector((state) => getLoadouts(state, id))

  const classes = useStyles()

  return (
    <ResponsiveFilterDrawer open={open} onClose={setClosed}>
      <Typography variant="h6">Filter Charms</Typography>

      {showLoadoutTraits(character) && (
        <>
          <TextField
            name="loadouts"
            label="Loadouts"
            select
            value={filters.loadout}
            SelectProps={{ multiple: true }}
            onChange={(e) =>
              setFilters({
                type: 'loadout',
                payload: e.target.value as unknown as NonNullable<
                  NativeCharm['loadouts']
                >,
              })
            }
          >
            {allLoadouts.map((a) =>
              a === '*' ? null : (
                <MenuItem key={a} value={a}>
                  {a}
                  {character.active_loadout === a ? ' (Current)' : ''}
                </MenuItem>
              ),
            )}
          </TextField>

          <ExclusiveSwitch
            name="loadoutInclusive"
            value={filters.keywordInclusive}
            onChange={(_e, checked) =>
              setFilters({ type: 'loadoutInclusive', payload: checked })
            }
          />
        </>
      )}

      <CharmTimingSelect
        name="timing"
        value={filters.timing}
        SelectProps={{ multiple: true }}
        onChange={(e) =>
          setFilters({
            type: 'timing',
            payload: e.target.value as unknown as Timing[],
          })
        }
        fullWidth
      />

      {character.type !== 'CustomEssenceCharacter' && (
        <FormControl>
          <InputLabel htmlFor="charmFilter-ability">
            Ability/Attribute
          </InputLabel>
          <Select
            name="ability"
            id="charmFilter-ability"
            multiple
            fullWidth
            value={filters.ability}
            className="capitalize"
            onChange={(e) =>
              setFilters({
                type: 'ability',
                payload: e.target.value as (
                  | AbilityCharm
                  | AttributeCharm
                )['ability'][],
              })
            }
          >
            {allAbilities.map((a) =>
              a === 'martial_arts' ? (
                <span key={a} />
              ) : (
                <MenuItem key={a} value={a} className="capitalize">
                  {a === '' ? 'None' : a}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
      )}

      <FormControl>
        <InputLabel htmlFor="charmFilter-keyword">Keywords</InputLabel>
        <Select
          name="keyword"
          id="charmFilter-keyword"
          value={filters.keyword}
          multiple
          onChange={(e) =>
            setFilters({
              type: 'keyword',
              payload: e.target.value as Charm['keywords'],
            })
          }
        >
          {allKeywords.map((a) => (
            <MenuItem key={a} value={a} className="capitalize">
              {a}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ExclusiveSwitch
        name="keywordInclusive"
        value={filters.keywordInclusive}
        onChange={(_e, checked) =>
          setFilters({ type: 'keywordInclusive', payload: checked })
        }
      />

      <TextField
        name="category"
        label="Categories"
        select
        value={filters.category}
        SelectProps={{ multiple: true }}
        onChange={(e) =>
          setFilters({
            type: 'category',
            payload: e.target.value as unknown as Charm['categories'],
          })
        }
      >
        {allCategories.map((a) => (
          <MenuItem key={a} value={a}>
            {a}
          </MenuItem>
        ))}
      </TextField>
      <ExclusiveSwitch
        name="categoryInclusive"
        value={filters.categoryInclusive}
        onChange={(_e, checked) =>
          setFilters({ type: 'categoryInclusive', payload: checked })
        }
      />

      <Box sx={{ display: 'flex' }}>
        <FormControlLabel
          label="Mute Only"
          labelPlacement="top"
          classes={classes}
          control={
            <MuiCheckbox
              name="muteOnly"
              checked={filters.muteOnly}
              onChange={(e) =>
                setFilters({ type: 'muteOnly', payload: e.target.checked })
              }
            />
          }
        />
        <FormControlLabel
          label="Hide Perilous"
          labelPlacement="top"
          classes={classes}
          control={
            <MuiCheckbox
              name="hidePerilous"
              checked={filters.hidePerilous}
              onChange={(e) =>
                setFilters({
                  type: 'hidePerilous',
                  payload: e.target.checked,
                })
              }
            />
          }
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={() => setFilters({ type: 'reset' })}
      >
        Reset Filters
      </Button>
    </ResponsiveFilterDrawer>
  )
}

export default CharmFilterDrawer
