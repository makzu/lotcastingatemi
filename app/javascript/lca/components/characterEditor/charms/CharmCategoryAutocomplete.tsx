import type React from 'react'
import { Chip, TextField } from '@material-ui/core'
import {
  Autocomplete,
  type AutocompleteProps,
  createFilterOptions,
} from '@material-ui/lab'

import { getAllCharmCategoriesForCharacter } from '@lca/ducks/entities/index.ts'
import { useAppSelector } from '@lca/hooks/UseAppSelector.ts'
import type { Character, Charm } from '@lca/types/index.ts'

interface CCAProps {
  value: Charm['categories']
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

const CharmCategoryAutocomplete = (props: CCAProps) => {
  const { value, id } = props

  const categories = useAppSelector((state) =>
    getAllCharmCategoriesForCharacter(state, id),
  )

  const handleChange: ChangeHandlerProp = (_e, newValue) => {
    const massagedValue = [
      ...new Set(
        newValue.map((c) => (c.startsWith('✚ Add ') ? c.substring(6) : c)),
      ),
    ]

    props.onChange({
      target: {
        name: 'categories',
        value: massagedValue as unknown as string,
      },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={categories}
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
          label="Categories"
          placeholder="Select or start typing to create one or more categories"
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

export default CharmCategoryAutocomplete
