// @flow
import React from 'react'
import { connect } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { compose, shouldUpdate } from 'recompose'
import { canIDeleteCharacter } from 'selectors'

import BlockPaper from 'components/generic/BlockPaper.tsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import { ESSENCE_MAX, ESSENCE_MIN } from 'utils/constants.ts'
import { isUnequalByKeys } from 'utils'

import type { Character, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  character: Character,
  onChange: Function,
  onRatingChange: Function,
  onCheck: Function,
}
type Props = ExposedProps & {
  showPublicCheckbox: boolean,
}

const BasicsEditor = ({
  character,
  onChange,
  onRatingChange,
  onCheck,
  showPublicCheckbox,
}: Props) => (
  <BlockPaper>
    <div style={{ display: 'flex' }}>
      <TextField
        name="name"
        value={character.name}
        label="Name"
        margin="dense"
        onChange={onChange}
        inputProps={{
          autocomplete: 'off',
          'data-1p-ignore': 'true',
          'data-lp-ignore': 'true',
        }}
      />

      <RatingField
        trait="essence"
        value={character.essence}
        label="Essence"
        min={ESSENCE_MIN}
        max={ESSENCE_MAX}
        onChange={onRatingChange}
        margin="dense"
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
    </div>

    <TextField
      name="description"
      value={character.description}
      label="Description"
      margin="dense"
      multiline
      fullWidth
      minRows={2}
      maxRows={10}
      onChange={onChange}
    />
  </BlockPaper>
)

const mapStateToProps = (state, props) => ({
  showPublicCheckbox: canIDeleteCharacter(state, props.character.id),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  shouldUpdate(
    (props, nextProps) =>
      isUnequalByKeys(props.character, nextProps.character, [
        'name',
        'essence',
        'description',
        'public',
      ]) || props.showPublicCheckbox !== nextProps.showPublicCheckbox,
  ),
)

export default enhance(BasicsEditor)
