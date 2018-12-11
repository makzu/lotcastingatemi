// @flow
import React, { Fragment } from 'react'

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

      <ListAttributeEditor
        label="Actions"
        character={qc}
        trait="actions"
        Fields={ActionFields}
        newObject={{ action: 'New Action', pool: 2 }}
        onChange={onChange}
      />
    </div>
  )
}

export default QcActionEditor
