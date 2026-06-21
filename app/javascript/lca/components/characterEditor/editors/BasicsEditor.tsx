import { connect } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import TextField from '@lca/components/generic/TextField.tsx'
import { canIDeleteCharacter } from '@lca/selectors/index.ts'
import type { Character } from '@lca/types/character.ts'
import { ESSENCE_MAX, ESSENCE_MIN } from '@lca/utils/constants.ts'

type ExposedProps = {
  character: Character
  onChange: Function
  onRatingChange: Function
  onCheck: Function
}
type Props = ExposedProps & {
  showPublicCheckbox: boolean
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

export default connect(mapStateToProps)(BasicsEditor)
