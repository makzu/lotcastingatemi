import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import WeightSelect from '../../generic/weightSelect.jsx'

import { withArmorStats } from '../../../utils/propTypes'

function ArmorEditor(props) {
  const { character, onChange, onBlur, onRatingChange, onCheck } = props

  // TODO show interesting calculated values here
  return <BlockPaper>
    <Typography variant="title">
      Armor
    </Typography>

    <TextField label="Name" margin="dense"
      name="armor_name" value={ character.armor_name }
      onChange={ onChange } onBlur={ onBlur }
    />

    <WeightSelect armor name="armor_weight" value={ character.armor_weight }
      onChange={ onRatingChange }
      margin="dense"
    />

    <FormControlLabel
      label="Artifact"
      control={
        <Checkbox name="armor_is_artifact" checked={ character.armor_is_artifact }
          onChange={ onCheck }
        />
      }
    />

    <br />

    <TextField name="armor_tags" value={ character.armor_tags }
      label="Tags" margin="dense"
      onChange={ onChange } onBlur={ onBlur }
    />

  </BlockPaper>
}


ArmorEditor.propTypes = {
  character: PropTypes.shape(withArmorStats).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
}

export default ArmorEditor
