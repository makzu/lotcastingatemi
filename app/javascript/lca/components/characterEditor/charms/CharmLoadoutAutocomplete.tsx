import type React from 'react'
import { Chip, TextField } from '@material-ui/core'
import {
  Autocomplete,
  type AutocompleteProps,
  createFilterOptions,
} from '@material-ui/lab'

import { getAllCharmLoadoutsForCharacter } from '@lca/ducks/entities'
import { useAppSelector } from '@lca/hooks/UseAppSelector'
import type { Character, Charm } from '@lca/types'

interface CLAProps {
  value: Charm['loadouts']
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
    />
  )
}

export default CharmLoadoutAutocomplete
