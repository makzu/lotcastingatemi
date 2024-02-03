import { Box, Typography } from '@mui/material'

import RatingField, {
  type RatingFieldProps,
} from '@/components/fields/RatingField'
import BlockPaper from '@/components/shared/BlockPaper'
import { type Character } from '@/types'
import { ATTRIBUTE_MAX as MAX, ATTRIBUTE_MIN as MIN } from '@/utils/constants'

function AttributeField(props: RatingFieldProps) {
  return <RatingField min={MIN} max={MAX} margin="dense" {...props} />
}

interface Props {
  character: Character
  onChange: $TSFixMeFunction
}

function AttributeEditor(props: Props) {
  const { character, onChange } = props
  const totalPhysical =
    character.attr_strength + character.attr_dexterity + character.attr_stamina
  const totalSocial =
    character.attr_charisma +
    character.attr_manipulation +
    character.attr_appearance
  const totalMental =
    character.attr_perception +
    character.attr_intelligence +
    character.attr_wits

  return (
    <BlockPaper>
      <Typography variant="h6">Attributes</Typography>
      <Box mb={2}>
        <Typography variant="subtitle1">
          Physical&nbsp;
          <Typography component="span" variant="caption">
            ({totalPhysical} total, {totalPhysical - 3} purchased)
          </Typography>
        </Typography>

        <AttributeField
          name="attr_strength"
          value={character.attr_strength}
          label="Strength"
          onChange={onChange}
        />
        <AttributeField
          name="attr_dexterity"
          value={character.attr_dexterity}
          label="Dexterity"
          onChange={onChange}
        />
        <AttributeField
          name="attr_stamina"
          value={character.attr_stamina}
          label="Stamina"
          onChange={onChange}
        />
        <Typography />
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle1">
          Social&nbsp;
          <Typography component="span" variant="caption">
            ({totalSocial} total, {totalSocial - 3} purchased)
          </Typography>
        </Typography>

        <AttributeField
          name="attr_charisma"
          value={character.attr_charisma}
          label="Charisma"
          onChange={onChange}
        />
        <AttributeField
          name="attr_manipulation"
          value={character.attr_manipulation}
          label="Manipulation"
          onChange={onChange}
        />
        <AttributeField
          name="attr_appearance"
          value={character.attr_appearance}
          label="Appearance"
          onChange={onChange}
        />
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle1">
          Mental&nbsp;
          <Typography component="span" variant="caption">
            ({totalMental} total, {totalMental - 3} purchased)
          </Typography>
        </Typography>

        <AttributeField
          name="attr_perception"
          value={character.attr_perception}
          label="Perception"
          onChange={onChange}
        />
        <AttributeField
          name="attr_intelligence"
          value={character.attr_intelligence}
          label="Intelligence"
          onChange={onChange}
        />
        <AttributeField
          name="attr_wits"
          value={character.attr_wits}
          label="Wits"
          onChange={onChange}
        />
      </Box>
    </BlockPaper>
  )
}

export default AttributeEditor
