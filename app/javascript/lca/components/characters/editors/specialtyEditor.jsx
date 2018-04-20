// @flow
import React, { Fragment } from 'react'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import * as calc from 'utils/calculated'
import type { withIntimacies as Character } from 'utils/flow-types'

function SpecialtyFields(props: ListAttributeFieldTypes) {
  const { trait, character, onChange, onBlur, onRatingChange, classes } = props
  const { ability, context } = trait
  const abilities = calc.abilitiesWithRatings(character)
  const options = [
    <MenuItem key="1" disabled>
      No Abilities with ratings &gt; 0
    </MenuItem>,
  ]

  return (
    <Fragment>
      <AbilitySelect
        name="ability"
        value={ability}
        label="Ability"
        onChange={onRatingChange}
        abilities={abilities}
        prependOptions={abilities.length === 0 && options}
      />

      <TextField
        name="context"
        value={context}
        className={classes.nameField}
        label="Specialty"
        margin="dense"
        onChange={onChange}
        onBlur={onBlur}
      />
    </Fragment>
  )
}

type Props = { character: Character, onRatingChange: Function }
const SpecialtyEditor = ({ character, onRatingChange }: Props) => {
  return (
    <BlockPaper>
      <ListAttributeEditor
        label="Specialties"
        character={character}
        trait="specialties"
        Fields={SpecialtyFields}
        newObject={{ context: 'New Specialty', ability: '' }}
        onChange={onRatingChange}
      />
    </BlockPaper>
  )
}

export default SpecialtyEditor
