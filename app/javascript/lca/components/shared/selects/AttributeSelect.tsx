import { MenuItem, TextField, type TextFieldProps } from '@material-ui/core'

import type { Attribute } from '@lca/types'
import { capitalize } from '@lca/utils'
import { ATTRIBUTE_NAMES } from '@lca/utils/constants'

type PropsUnion = 'name' | 'label' | 'onChange' | 'margin'
interface Props extends Pick<TextFieldProps, PropsUnion> {
  value: Attribute | 'universal' | ''
  includeUniversal?: boolean
}

const AttributeSelect = (props: Props) => {
  return (
    <TextField select label="Attribute" style={{ width: '8em' }} {...props}>
      {(props.includeUniversal ?? false) && (
        <MenuItem value="universal">Universal</MenuItem>
      )}
      {ATTRIBUTE_NAMES.map((a) => (
        <MenuItem key={a} value={a}>
          {capitalize(a)}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default AttributeSelect
