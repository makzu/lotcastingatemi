// @flow
import { connect } from 'react-redux'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import BlockPaper from 'components/shared/BlockPaper'
import { canIDeleteCharacter } from 'selectors'
import { ESSENCE_MAX, ESSENCE_MIN } from 'utils/constants'
import type { Character } from 'utils/flow-types'

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
    <TextField
      name="name"
      value={character.name}
      label="Name"
      margin="dense"
      onChange={onChange}
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

    <TextField
      name="description"
      value={character.description}
      label="Description"
      margin="dense"
      multiline
      fullWidth
      rows={2}
      maxRows={10}
      onChange={onChange}
    />
  </BlockPaper>
)

const mapStateToProps = (state, props) => ({
  showPublicCheckbox: canIDeleteCharacter(state, props.character.id),
})

export default connect(mapStateToProps)(BasicsEditor)
