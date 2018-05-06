// @flow
import React from 'react'
import { connect } from 'react-redux'
import { compose, shouldUpdate } from 'recompose'

import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import TextField from 'material-ui/TextField'

import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { canIDeleteCharacter } from 'selectors'
import { isUnequalByKeys } from 'utils'
import { ESSENCE_MIN, ESSENCE_MAX } from 'utils/constants.js'
import type { Character } from 'utils/flow-types'

const BasicsEditor = ({
  character,
  onChange,
  onBlur,
  onRatingChange,
  onCheck,
  showPublicCheckbox,
}: {
  character: Character,
  onChange: Function,
  onBlur: Function,
  onRatingChange: Function,
  onCheck: Function,
  showPublicCheckbox: boolean,
}) => (
  <BlockPaper>
    <TextField
      name="name"
      value={character.name}
      label="Name"
      margin="dense"
      onChange={onChange}
      onBlur={onBlur}
    />&nbsp;&nbsp;
    <RatingField
      trait="essence"
      value={character.essence}
      label="Essence"
      min={ESSENCE_MIN}
      max={ESSENCE_MAX}
      onChange={onRatingChange}
      margin="dense"
    />
    <br />
    <TextField
      name="description"
      value={character.description}
      label="Description"
      margin="dense"
      multiline
      fullWidth
      rows={2}
      rowsMax={10}
      onChange={onChange}
      onBlur={onBlur}
    />
    {showPublicCheckbox && (
      <FormControlLabel
        label="Publicly Viewable"
        control={
          <Checkbox
            name="public"
            checked={character.public}
            onChange={onCheck}
          />
        }
      />
    )}
  </BlockPaper>
)

const mapStateToProps = (state, props) => ({
  showPublicCheckbox: canIDeleteCharacter(state, props.character.id),
})

export default compose(
  connect(mapStateToProps),
  shouldUpdate((props, nextProps) =>
    isUnequalByKeys(props.character, nextProps.character, [
      'name',
      'essence',
      'description',
      'public',
    ])
  )
)(BasicsEditor)
