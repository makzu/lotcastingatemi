import MenuItem from '@material-ui/core/MenuItem'

import AbilitySelect from '@lca/components/generic/AbilitySelect.tsx'
import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from '@lca/components/generic/ListAttributeEditor.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import type { Character } from '@lca/types/index.ts'
import { abilitiesWithRatings } from '@lca/utils/calculated/index.ts'

function SpecialtyFields(props: ListAttributeFieldTypes) {
  const { trait, character, onChange, classes } = props
  const { ability, context } = trait
  const abilities = abilitiesWithRatings(character)

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

type Props = {
  character: Character
  onChange: Function
}

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
        showCount
      />
    </BlockPaper>
  )
}

export default SpecialtyEditor
