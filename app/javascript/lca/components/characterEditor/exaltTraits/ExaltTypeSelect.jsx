// @flow
import * as React from 'react'
const { PureComponent } = React

import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

type Props = { value: string, onChange: Function }
class ExaltTypeSelect extends PureComponent<Props> {
  render() {
    const { value, onChange } = this.props

    return (
      <TextField
        select
        name="type"
        value={value}
        label={value === 'Character' ? 'Character Type' : 'Exalt Type '}
        onChange={onChange}
        fullWidth
        margin="normal"
        data-cy="select-exalt-type"
      >
        <ListSubheader disabled value="">
          Canon/Published Exalts
        </ListSubheader>
        <MenuItem value="Character">Mortal</MenuItem>
        <MenuItem value="SolarCharacter">Solar Exalt</MenuItem>
        <MenuItem value="DragonbloodCharacter">Dragon-Blooded Exalt</MenuItem>

        <ListSubheader disabled value="">
          Custom / Houserule / Exigent Exalts
        </ListSubheader>
        <MenuItem value="CustomAbilityCharacter">Ability-Based Exalt</MenuItem>
        <MenuItem value="CustomAttributeCharacter">
          Attribute-Based Exalt
        </MenuItem>
        <MenuItem value="CustomEssenceCharacter">
          Essence-Based Exalt / Spirit
        </MenuItem>
      </TextField>
    )
  }
}

export default ExaltTypeSelect
