import MenuItem from '@material-ui/core/MenuItem'

import AbilitySelect from '@lca/components/generic/AbilitySelect.tsx'
import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from '@lca/components/generic/ListAttributeEditor.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import type { Character } from '@lca/types/index.ts'
import { abilitiesWithRatings } from '@lca/utils/calculated/index.ts'

type Props = {
  character: Character
  onChange: Function
}

const SpecialtyEditor = ({ character, onChange }: Props) => {
  const abilities = abilitiesWithRatings(character)

  const SpecialtyFields = (props: ListAttributeFieldTypes) => {
    return (
      <>
        <AbilitySelect
          name="ability"
          value={props.trait.ability}
          label="Ability"
          onChange={props.onChange}
          abilities={abilities}
          prependOptions={
            abilities.length === 0 && (
              <MenuItem disabled>No Abilities with ratings &gt; 0</MenuItem>
            )
          }
        />

        <TextField
          name="context"
          value={props.trait.context}
          label="Specialty"
          margin="dense"
          onChange={props.onChange}
          style={{ flex: 1 }}
        />
      </>
    )
  }

  return (
    <BlockPaper>
      <ListAttributeEditor
        label="Specialties"
        traitName="specialties"
        trait={character.specialties}
        Fields={SpecialtyFields}
        newObject={{
          context: `New Specialty ${character.specialties.length + 1}`,
          ability: '',
        }}
        onChange={onChange}
      />
    </BlockPaper>
  )
}

export default SpecialtyEditor
