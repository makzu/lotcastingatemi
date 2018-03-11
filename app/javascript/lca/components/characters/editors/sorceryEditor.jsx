import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/ratingField.jsx'

function SorceryEditor(props) {
  const { character, onChange, onBlur, onCheck, onRatingChange } = props

  return <BlockPaper>
    <Typography variant="title">
      Sorcery
    </Typography>

    <FormControlLabel
      label="Is sorcerer"
      control={
        <Checkbox name="is_sorcerer" checked={ character.is_sorcerer }
          onChange={ onCheck }
        />
      }
    />

    { character.is_sorcerer && <Fragment>
      <RatingField trait="sorcerous_motes" value={ character.sorcerous_motes }
        label="S. Motes" margin="dense"
        onChange={ onRatingChange }
      />
      <br />

      <TextField name="shaping_rituals" value={ character.shaping_rituals }
        label="Rituals" margin="dense"
        multiline fullWidth
        onChange={ onChange } onBlur={ onBlur } />
    </Fragment> }
  </BlockPaper>

}
SorceryEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired
}

export default SorceryEditor
