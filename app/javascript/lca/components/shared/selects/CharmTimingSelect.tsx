import { useTranslation } from 'react-i18next'

import { MenuItem, TextField } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'
import { Timing } from 'types/_lib'

interface Props extends Pick<TextFieldProps, 'onChange' | 'fullWidth'> {
  value: Timing | Timing[]
  name: string
  SelectProps?: { multiple: true }
}

const CharmTimingSelect = (props: Props) => {
  const [t] = useTranslation()

  return (
    <TextField
      variant="standard"
      select
      label={t('charms:type')}
      margin="dense"
      {...props}
    >
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
