import React from 'react'
import PropTypes from 'prop-types'

import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import AbilitySelect from '../../generic/abilitySelect.jsx'
import AttributeSelect from '../../generic/attributeSelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'
import { nonCasteAttributes } from '../../../utils/calculated'

function CustomAttributeExaltEditor(props) {
  const { character, onChange, onBlur, onCheck, onRatingChange } = props

  // Mortals don't have 'exalt traits'
  if (character.type == 'Character') {
    return null
  }

  return <BlockPaper>
    <Typography component="div">
      <TextField name="caste" value={ character.caste }
        label={ character.aspect ? 'Aspect' : 'Caste' } onChange={ onChange } onBlur={ onBlur } margin="dense"
      />&nbsp;&nbsp;
      <TextField name="exalt_type" value={ character.exalt_type }
        label="Type" onChange={ onChange } onBlur={ onBlur } margin="dense"
      /><br />
      Has Castes&nbsp;&nbsp;&nbsp;
      <FormControlLabel
        control={
          <Switch checked={ character.aspect } name="aspect" onChange={ onCheck } />
        }
        label="Has Aspects"
      />
    </Typography>

    <AbilitySelect attributesOnly name="caste_attributes"
      label="Caste Attributes"
      value={ character.caste_attributes }
      onChange={ onRatingChange }
      multiple fullWidth margin="dense"
    />
    <br />

    <AbilitySelect name="favored_attributes"
      label="Favored Attributes"
      value={ character.favored_attributes }
      attributes={ nonCasteAttributes(character) }
      onChange={ onRatingChange }
      multiple fullWidth margin="dense"
    />
    <br />

    <AbilitySelect name="favored_abilities"
      label="Favored Abilities"
      value={ character.favored_abilities }
      onChange={ onRatingChange }
      multiple fullWidth margin="dense"
    />
  </BlockPaper>
}
CustomAttributeExaltEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
}

export default CustomAttributeExaltEditor
