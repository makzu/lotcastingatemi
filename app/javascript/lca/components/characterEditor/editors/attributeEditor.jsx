// @flow
import React from 'react'
import { compose, shouldUpdate } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'

import { isUnequalByKeys } from 'utils'
import {
  ATTRIBUTE_MIN as MIN,
  ATTRIBUTE_MAX as MAX,
  ATTRIBUTES,
} from 'utils/constants.js'
import type { withAttributes as Character } from 'utils/flow-types'

const styles = theme => ({
  fieldSet: {
    marginBottom: theme.spacing.unit * 2,
  },
})

function AttributeField(props) {
  return <RatingField min={MIN} max={MAX} margin="dense" {...props} />
}

type Props = { character: Character, onRatingChange: Function, classes: Object }
function AttributeEditor(props: Props) {
  const { character, onRatingChange, classes } = props

  return (
    <BlockPaper>
      <Typography variant="title">Attributes</Typography>
      <div className={classes.fieldSet}>
        <Typography variant="subheading">Physical</Typography>
        <AttributeField
          trait="attr_strength"
          value={character.attr_strength}
          label="Strength"
          onChange={onRatingChange}
        />
        <AttributeField
          trait="attr_dexterity"
          value={character.attr_dexterity}
          label="Dexterity"
          onChange={onRatingChange}
        />
        <AttributeField
          trait="attr_stamina"
          value={character.attr_stamina}
          label="Stamina"
          onChange={onRatingChange}
        />
      </div>

      <div className={classes.fieldSet}>
        <Typography variant="subheading">Social</Typography>

        <AttributeField
          trait="attr_charisma"
          value={character.attr_charisma}
          label="Charisma"
          onChange={onRatingChange}
        />
        <AttributeField
          trait="attr_manipulation"
          value={character.attr_manipulation}
          label="Manipulation"
          onChange={onRatingChange}
        />
        <AttributeField
          trait="attr_appearance"
          value={character.attr_appearance}
          label="Appearance"
          onChange={onRatingChange}
        />
      </div>

      <div className={classes.fieldSet}>
        <Typography variant="subheading">Mental</Typography>

        <AttributeField
          trait="attr_perception"
          value={character.attr_perception}
          label="Perception"
          onChange={onRatingChange}
        />
        <AttributeField
          trait="attr_intelligence"
          value={character.attr_intelligence}
          label="Intelligence"
          onChange={onRatingChange}
        />
        <AttributeField
          trait="attr_wits"
          value={character.attr_wits}
          label="Wits"
          onChange={onRatingChange}
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
      ATTRIBUTES.map(a => a.attr)
    )
  )
)(AttributeEditor)
