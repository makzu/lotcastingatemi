// @flow
import { shouldUpdate } from 'recompose'

import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import MuiTextField from '@mui/material/TextField'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import { isUnequalByKeys } from 'utils'
import type { withMotePool, Enhancer } from 'utils/flow-types'

function CommitFields(props: ListAttributeFieldTypes) {
  const { trait, onChange, classes } = props
  const { pool, label, motes, scenelong } = trait

  return (
    <>
      <MuiTextField
        select
        name="pool"
        value={pool}
        className={classes.withMargin}
        label="Pool"
        margin="dense"
        onChange={onChange}
      >
        <MenuItem value="personal">Pers</MenuItem>
        <MenuItem value="peripheral">Peri</MenuItem>
      </MuiTextField>

      <TextField
        name="label"
        value={label}
        className={classes.nameField}
        label="For"
        margin="dense"
        onChange={onChange}
      />

      <RatingField
        trait="motes"
        value={motes}
        label="Motes"
        min={0}
        margin="dense"
        narrow
        onChange={onChange}
      />
      <div className={classes.checkboxWrap}>
        <div className={classes.floatingLabel}>Scene</div>
        <Checkbox
          name="scenelong"
          checked={scenelong}
          value={(scenelong || false).toString()}
          onChange={onChange}
        />
      </div>
    </>
  )
}

type Props = {
  character: withMotePool & { id: number },
  onChange: Function,
}

const MoteCommittmentEditor = ({ character, onChange }: Props) => {
  return (
    <ListAttributeEditor
      label="Mote Committments"
      character={character}
      trait="motes_committed"
      Fields={CommitFields}
      newObject={{ pool: 'peripheral', label: '', motes: 0 }}
      onChange={onChange}
    />
  )
}

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, ['motes_committed']),
)

export default enhance(MoteCommittmentEditor)
