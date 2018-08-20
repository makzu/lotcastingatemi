// @flow
import React, { Fragment } from 'react'
import { shouldUpdate } from 'recompose'

import MenuItem from '@material-ui/core/MenuItem'

import AbilitySelect from 'components/generic/abilitySelect.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import TextField from 'components/generic/TextField.jsx'
import { isUnequalByKeys } from 'utils'
import * as calc from 'utils/calculated'
import type { withIntimacies as Character } from 'utils/flow-types'

function SpecialtyFields(props: ListAttributeFieldTypes) {
  const { trait, character, onChange, classes } = props
  const { ability, context } = trait
  const abilities = calc.abilitiesWithRatings(character)

  return (
    <Fragment>
      <AbilitySelect
        name="ability"
        value={ability}
        label="Ability"
        onChange={onChange}
        abilities={abilities}
        prependOptions={
          abilities.length === 0 && (
            <MenuItem disabled>No Abilities with ratings &gt; 0</MenuItem>
          )
        }
      />

      <TextField
        name="context"
        value={context}
        className={classes.nameField}
        label="Specialty"
        margin="dense"
        onChange={onChange}
      />
    </Fragment>
  )
}

type Props = { character: Character, onChange: Function }
const SpecialtyEditor = ({ character, onChange }: Props) => {
  return (
    <BlockPaper>
      <ListAttributeEditor
        label="Specialties"
        character={character}
        trait="specialties"
        Fields={SpecialtyFields}
        newObject={{ context: 'New Specialty', ability: '' }}
        onChange={onChange}
      />
    </BlockPaper>
  )
}

export default shouldUpdate((props, newProps) =>
  isUnequalByKeys(props.character, newProps.character, ['specialties'])
)(SpecialtyEditor)
