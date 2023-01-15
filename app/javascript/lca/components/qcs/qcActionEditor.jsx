// @flow
import { Fragment } from 'react'

import { SorceryFields } from 'components/characterEditor/editors/sorceryEditor.jsx'
import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from '../generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import type { fullQc } from 'utils/flow-types'

function ActionFields({ trait, onChange, classes }: ListAttributeFieldTypes) {
  const { action, pool } = trait

  return (
    <Fragment>
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
    </Fragment>
  )
}

type Props = { qc: fullQc, onChange: Function }
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
        character={qc}
        trait="actions"
        Fields={ActionFields}
        newObject={{ action: 'New Action', pool: 2 }}
        onChange={onChange}
      />

      {qc.is_sorcerer && (
        <ListAttributeEditor
          label="Shaping Rituals"
          character={qc}
          trait="rituals"
          Fields={SorceryFields}
          newObject={''}
          onChange={onChange}
          nonObject
        />
      )}
    </div>
  )
}

export default QcActionEditor
