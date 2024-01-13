import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import MuiTextField from '@mui/material/TextField'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor'
import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
import type { withMotePool } from 'utils/flow-types'

function CommitFields(props: ListAttributeFieldTypes) {
  const { trait, onChange, classes } = props
  const { pool, label, motes, scenelong } = trait
  return (
    <>
      <MuiTextField
        variant="standard"
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

interface Props {
  character: withMotePool & {
    id: number
  }
  onChange: $TSFixMeFunction
}

const MoteCommittmentEditor = ({ character, onChange }: Props) => {
  return (
    <ListAttributeEditor
      label="Mote Committments"
      character={character}
      trait="motes_committed"
      Fields={CommitFields}
      newObject={{
        pool: 'peripheral',
        label: '',
        motes: 0,
      }}
      onChange={onChange}
    />
  )
}

export default MoteCommittmentEditor
