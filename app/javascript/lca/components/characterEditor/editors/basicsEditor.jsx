// @flow
import { connect } from 'react-redux'
import { compose, shouldUpdate } from 'recompose'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import { canIDeleteCharacter } from 'selectors'
import { isUnequalByKeys } from 'utils'
import { ESSENCE_MIN, ESSENCE_MAX } from 'utils/constants.js'
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
      rowsMax={10}
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
