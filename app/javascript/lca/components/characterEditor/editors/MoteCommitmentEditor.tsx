import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import MuiTextField from '@material-ui/core/TextField'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from '@lca/components/generic/ListAttributeEditor.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import type { Character } from '@lca/types/character.ts'
import type { QC } from '@lca/types/qc.ts'

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
        style={{ flex: 1 }}
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
  character: Character | QC
  onChange: Function
}

const MoteCommittmentEditor = ({ character, onChange }: Props) => {
  return (
    <ListAttributeEditor
      label="Mote Committments"
      traitName="motes_committed"
      trait={character.motes_committed}
      Fields={CommitFields}
      newObject={{
        pool: 'peripheral',
        label: `New Commitment ${character.motes_committed.length + 1}`,
        motes: 0,
      }}
      onChange={onChange}
    />
  )
}

export default MoteCommittmentEditor
