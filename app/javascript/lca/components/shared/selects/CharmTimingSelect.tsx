import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { MenuItem, TextField } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField'
import { Timing } from 'types/_lib'

interface Props {
  value: Timing | Timing[]
  name: string
  SelectProps?: { multiple: true }
  onChange: TextFieldProps['onChange']
  fullWidth: TextFieldProps['fullWidth']
}

const CharmTimingSelect = (props: Props) => {
  const [t] = useTranslation()

  return (
    <TextField select label={t('charms:type')} margin="dense" {...props}>
      <MenuItem value="simple">{t('charms:simple')}</MenuItem>
      <MenuItem value="supplemental">{t('charms:supplemental')}</MenuItem>
      <MenuItem value="reflexive">{t('charms:reflexive')}</MenuItem>
      <MenuItem value="supplemental/reflexive">
        {t('charms:supplemental/reflexive')}
      </MenuItem>
      <MenuItem value="permanent">{t('charms:permanent')}</MenuItem>
    </TextField>
  )
}

export default CharmTimingSelect
