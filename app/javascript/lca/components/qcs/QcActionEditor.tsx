import { SorceryFields } from '@lca/components/characterEditor/editors/SorceryEditor.tsx'
import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from '@lca/components/generic/ListAttributeEditor.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import type { QC } from '@lca/types/qc.ts'
import RatingField from '../generic/RatingField.tsx'

function ActionFields({ trait, onChange, classes }: ListAttributeFieldTypes) {
  const { action, pool } = trait

  return (
    <>
      <TextField
        name="action"
        value={action}
        className={classes.nameField}
        label="Action"
        margin="dense"
        onChange={onChange}
      />

      <RatingField
        trait="pool"
        value={pool}
        label="Pool"
        min={1}
        narrow
        margin="dense"
        onChange={onChange}
      />
    </>
  )
}

type Props = { qc: QC; onChange: Function }
const QcActionEditor = ({ qc, onChange }: Props) => {
  return (
    <div>
      <RatingField
        label="Senses"
        trait="senses"
        value={qc.senses}
        onChange={onChange}
      />

      <RatingField
        label="Feats of Strength"
        trait="feats_of_strength"
        value={qc.feats_of_strength}
        onChange={onChange}
        helperText="0 = hidden"
      />
      <RatingField
        label="Strength"
        trait="strength"
        value={qc.strength}
        onChange={onChange}
      />

      {qc.is_sorcerer && (
        <RatingField
          label="Shape Sorcery"
          trait="shape_sorcery"
          value={qc.shape_sorcery}
          onChange={onChange}
        />
      )}

      <ListAttributeEditor
        label="Actions"
        traitName="actions"
        trait={qc.actions}
        Fields={ActionFields}
        newObject={{ action: `New Action ${qc.actions.length + 1}`, pool: 2 }}
        onChange={onChange}
      />

      {qc.is_sorcerer && (
        <ListAttributeEditor
          label="Shaping Rituals"
          traitName="rituals"
          trait={qc.rituals}
          Fields={SorceryFields}
          newObject={`New Ritual ${qc.rituals.length + 1}`}
          onChange={onChange}
        />
      )}
    </div>
  )
}

export default QcActionEditor
