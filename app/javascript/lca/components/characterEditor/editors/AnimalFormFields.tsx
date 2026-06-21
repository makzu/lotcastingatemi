import RatingField from '@lca/components/generic/RatingField.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import type { Form } from '@lca/types'

type ListAttributeFieldTypes = any

const AnimalFormFields = (props: { trait: Form } & ListAttributeFieldTypes) => {
  const { onChange, trait, classes } = props
  return (
    <>
      <TextField
        name="form"
        value={trait.form}
        className={classes.nameField}
        label="Form"
        margin="dense"
        onChange={onChange}
      />

      <RatingField
        trait="qc_id"
        value={trait.qc_id}
        min={0}
        className={classes.idField}
        label="QC ID"
        margin="dense"
        onChange={onChange}
      />
    </>
  )
}

export default AnimalFormFields
