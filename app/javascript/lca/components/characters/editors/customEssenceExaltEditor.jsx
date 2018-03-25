import React from 'react'
import PropTypes from 'prop-types'

import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import ExcellencyEditor from './ExcellencyEditor.jsx'
import AbilitySelect from '../../generic/abilitySelect.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'

function CustomEssenceExaltEditor(props) {
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
      <ExcellencyEditor character={ character } onChange={ onRatingChange } />
      <br />

      <TextField name="exalt_type" value={ character.exalt_type }
        label="Type" onChange={ onChange } onBlur={ onBlur } margin="dense"
      />
      <br />

      Has Castes&nbsp;&nbsp;&nbsp;
      <FormControlLabel
        control={
          <Switch checked={ character.aspect } name="aspect" onChange={ onCheck } />
        }
        label="Has Aspects"
      />
    </Typography>

    <AbilitySelect name="favored_abilities"
      label="Favored Abilities"
      value={ character.favored_abilities }
      onChange={ onRatingChange }
      multiple fullWidth margin="dense"
    />
  </BlockPaper>
}
CustomEssenceExaltEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
}

export default CustomEssenceExaltEditor
