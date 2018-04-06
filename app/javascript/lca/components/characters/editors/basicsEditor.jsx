import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import TextField from 'material-ui/TextField'

import BlockPaper from '../../generic/blockPaper.jsx'
import RatingField from '../../generic/RatingField.jsx'
import { canIDeleteCharacter } from '../../../selectors'
import { ESSENCE_MIN, ESSENCE_MAX } from '../../../utils/constants.js'

function BasicsEditor(props) {
  const { character, onChange, onBlur, onRatingChange, onCheck, showPublicCheckbox } = props

  return <BlockPaper>
    <TextField name="name" value={ character.name }
      label="Name" margin="dense"
      onChange={ onChange } onBlur={ onBlur } />&nbsp;&nbsp;

    <RatingField trait="essence" value={ character.essence }
      label="Essence" min={ ESSENCE_MIN } max={ ESSENCE_MAX }
      onChange={ onRatingChange } margin="dense"
    />
    <br />

    <TextField name="description" value={ character.description }
      label="Description" margin="dense"
      multiline fullWidth rows={ 2 } rowsMax={ 10 }
      onChange={ onChange } onBlur={ onBlur } />

    { showPublicCheckbox &&
      <FormControlLabel
        label="Publicly Viewable"
        control={
          <Checkbox name="public" checked={ character.public }
            onChange={ onCheck }
          />
        }
      />
    }
  </BlockPaper>

}
BasicsEditor.propTypes = {
  character: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  showPublicCheckbox: PropTypes.bool,
}
const mapStateToProps = (state, props) => ({
  showPublicCheckbox: canIDeleteCharacter(state, props.character.id),
})

export default connect(mapStateToProps)(BasicsEditor)
