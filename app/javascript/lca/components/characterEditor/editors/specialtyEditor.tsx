import React from 'react'
import { shouldUpdate } from 'recompose'
import MenuItem from '@material-ui/core/MenuItem'
import AbilitySelect from 'components/generic/abilitySelect'
import BlockPaper from 'components/generic/blockPaper'
import type { ListAttributeFieldTypes } from 'components/generic/ListAttributeEditor'
import ListAttributeEditor from 'components/generic/ListAttributeEditor'
import TextField from 'components/generic/TextField'
import { isUnequalByKeys } from 'utils'
import * as calc from 'utils/calculated'
import type { withIntimacies as Character, Enhancer } from 'utils/flow-types'

function SpecialtyFields(props: ListAttributeFieldTypes) {
  const { trait, character, onChange, classes } = props
  const { ability, context } = trait
  const abilities = calc.abilitiesWithRatings(character)
  return (
    <>
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
    </>
  )
}

interface Props {
  character: Character
  onChange: $TSFixMeFunction
}

const SpecialtyEditor = ({ character, onChange }: Props) => {
  return (
    <BlockPaper>
      <ListAttributeEditor
        label="Specialties"
        character={character}
        trait="specialties"
        Fields={SpecialtyFields}
        newObject={{
          context: 'New Specialty',
          ability: '',
        }}
        onChange={onChange}
        showCount
      />
    </BlockPaper>
  )
}

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, ['specialties']),
)
export default enhance(SpecialtyEditor)
