import * as React from 'react'
import { shouldUpdate } from 'recompose'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import MuiTextField from '@material-ui/core/TextField'
import type { ListAttributeFieldTypes } from 'components/generic/ListAttributeEditor'
import ListAttributeEditor from 'components/generic/ListAttributeEditor'
import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
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

const enhance: Enhancer<Props, Props> = shouldUpdate(
  (props: Props, newProps: Props) =>
    isUnequalByKeys(props.character, newProps.character, ['motes_committed']),
)
export default enhance(MoteCommittmentEditor)
