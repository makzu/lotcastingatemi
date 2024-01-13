import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
import { Form } from 'types'

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
