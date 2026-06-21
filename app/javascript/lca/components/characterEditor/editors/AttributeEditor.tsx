// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { compose, shouldUpdate } from 'recompose'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import { isUnequalByKeys } from '@lca/utils'
import {
  ATTRIBUTES,
  ATTRIBUTE_MAX as MAX,
  ATTRIBUTE_MIN as MIN,
} from '@lca/utils/constants.ts'
import type { withAttributes as Character } from '@lca/utils/flow-types'

const styles = (theme) => ({
  fieldSet: {
    marginBottom: theme.spacing(2),
  },
  total: {
    ...theme.typography.caption,
  },
})

function AttributeField(props) {
  return <RatingField min={MIN} max={MAX} margin="dense" {...props} />
}

type Props = { character: Character; onChange: Function; classes: Object }
function AttributeEditor(props: Props) {
  const { character, onChange, classes } = props

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
      <div className={classes.fieldSet}>
        <Typography variant="subtitle1">
          Physical&nbsp;
          <span className={classes.total}>
            ({totalPhysical} total, {totalPhysical - 3} purchased)
          </span>
        </Typography>
        <AttributeField
          trait="attr_strength"
          value={character.attr_strength}
          label="Strength"
          onChange={onChange}
        />
        <AttributeField
          trait="attr_dexterity"
          value={character.attr_dexterity}
          label="Dexterity"
          onChange={onChange}
        />
        <AttributeField
          trait="attr_stamina"
          value={character.attr_stamina}
          label="Stamina"
          onChange={onChange}
        />
        <Typography />
      </div>

      <div className={classes.fieldSet}>
        <Typography variant="subtitle1">
          Social&nbsp;
          <span className={classes.total}>
            ({totalSocial} total, {totalSocial - 3} purchased)
          </span>
        </Typography>

        <AttributeField
          trait="attr_charisma"
          value={character.attr_charisma}
          label="Charisma"
          onChange={onChange}
        />
        <AttributeField
          trait="attr_manipulation"
          value={character.attr_manipulation}
          label="Manipulation"
          onChange={onChange}
        />
        <AttributeField
          trait="attr_appearance"
          value={character.attr_appearance}
          label="Appearance"
          onChange={onChange}
        />
      </div>

      <div className={classes.fieldSet}>
        <Typography variant="subtitle1">
          Mental&nbsp;
          <span className={classes.total}>
            ({totalMental} total, {totalMental - 3} purchased)
          </span>
        </Typography>

        <AttributeField
          trait="attr_perception"
          value={character.attr_perception}
          label="Perception"
          onChange={onChange}
        />
        <AttributeField
          trait="attr_intelligence"
          value={character.attr_intelligence}
          label="Intelligence"
          onChange={onChange}
        />
        <AttributeField
          trait="attr_wits"
          value={character.attr_wits}
          label="Wits"
          onChange={onChange}
        />
      </div>
    </BlockPaper>
  )
}

export default compose(
  withStyles(styles),
  shouldUpdate((props, newProps) =>
    isUnequalByKeys(
      props.character,
      newProps.character,
      ATTRIBUTES.map((a) => a.attr),
    ),
  ),
)(AttributeEditor)
