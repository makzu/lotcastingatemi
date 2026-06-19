import type React from 'react'
import { Chip, MenuItem, TextField } from '@material-ui/core'
import { Check } from '@material-ui/icons'
import {
  Autocomplete,
  type AutocompleteProps,
  createFilterOptions,
} from '@material-ui/lab'

import {
  getAllCharmLoadoutsForCharacter,
  getSpecificCharacter,
} from '@lca/ducks/entities'
import { useAppSelector } from '@lca/hooks/UseAppSelector'
import type { Character, NativeCharm } from '@lca/types'

interface CLAProps {
  value: NonNullable<NativeCharm['loadouts']>
  id: Character['id']
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const filter = createFilterOptions<string>()

type ChangeHandlerProp = AutocompleteProps<
  string,
  true,
  false,
  true
>['onChange']

const CharmLoadoutAutocomplete = (props: CLAProps) => {
  const { value, id } = props

  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  const loadouts = useAppSelector((state) =>
    getAllCharmLoadoutsForCharacter(state, id),
  )

  const handleChange: ChangeHandlerProp = (_e, newValue) => {
    const massagedValue = [
      ...new Set(
        newValue.map((c) => (c.startsWith('✚ Add ') ? c.substring(6) : c)),
      ),
    ]

    props.onChange({
      target: {
        name: 'loadouts',
        value: massagedValue as unknown as string,
      },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  const optionIsInstalled = (option: string) =>
    option === character.active_loadout || option === '*'

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={loadouts}
      defaultValue={[]}
      freeSolo
      onChange={handleChange}
      value={value}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            key={option}
            label={option}
            size="small"
            icon={optionIsInstalled(option) ? <Check /> : undefined}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Loadouts"
          placeholder="Select or start typing to create one or more loadouts"
        />
      )}
      filterSelectedOptions
      filterOptions={(options, state) => {
        const filtered = filter(options, state)
        if (state.inputValue !== '') {
          filtered.push(`✚ Add ${state.inputValue}`)
        }

        return filtered
      }}
      renderOption={(option) => {
        if (option === '*') return <MenuItem value="*">* All Loadouts</MenuItem>

        return <MenuItem value={option}>{option}</MenuItem>
      }}
    />
  )
}

export default CharmLoadoutAutocomplete
