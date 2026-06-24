import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from '@lca/components/generic/ListAttributeEditor.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import type { Character, QC } from '@lca/types/index.ts'

function ResourceFields(props: ListAttributeFieldTypes) {
  const { trait, onChange, classes } = props
  const { resource, value } = trait

  return (
    <>
      <TextField
        name="resource"
        value={resource}
        className={classes.nameField}
        label="Resource"
        margin="dense"
        onChange={onChange}
      />
      <RatingField
        trait="value"
        value={value}
        label="Value"
        min={0}
        margin="dense"
        narrow
        onChange={onChange}
      />
    </>
  )
}

type Props = { character: Character | QC; onChange: Function }
const ResourceEditor = ({ character, onChange }: Props) => {
  return (
    <ListAttributeEditor
      label="Misc Resources"
      traitName="resources"
      trait={character.resources}
      Fields={ResourceFields}
      newObject={{
        resource: `New Resource ${character.resources.length + 1}`,
        value: 0,
      }}
      onChange={onChange}
    />
  )
}

export default ResourceEditor
