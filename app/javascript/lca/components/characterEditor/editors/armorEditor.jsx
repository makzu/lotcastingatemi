// @flow
import React from 'react'
import { compose, shouldUpdate } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import WeightSelect from 'components/generic/weightSelect.jsx'
import { isUnequalByKeys } from 'utils'
import type { withArmorStats as Character } from 'utils/flow-types'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  poolBlock: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    width: '5.5rem',
    maxHeight: '5rem',
  },
})

type Props = {
  character: Character,
  pools: Object,
  penalties: Object,
  onChange: Function,
  onCheck: Function,
  classes: Object,
}
function ArmorEditor(props: Props) {
  const { character, pools, penalties, onChange, onCheck, classes } = props

  return (
    <BlockPaper>
      <Typography variant="h6">Armor</Typography>

      <TextField
        label="Name"
        margin="dense"
        name="armor_name"
        value={character.armor_name}
        onChange={onChange}
        fullWidth
      />

      <WeightSelect
        armor
        name="armor_weight"
        value={character.armor_weight}
        onChange={onChange}
        margin="dense"
      />

      <FormControlLabel
        label="Artifact"
        control={
          <Checkbox
            name="armor_is_artifact"
            checked={character.armor_is_artifact}
            onChange={onCheck}
          />
        }
      />
      <br />

      <TagsField
        trait="armor_tags"
        label="Tags"
        fullWidth
        margin="dense"
        value={character.armor_tags}
        onChange={onChange}
      />

      <div style={{ display: 'flex' }}>
        <PoolDisplay
          staticRating
          pool={pools.soak}
          label="Soak"
          classes={{ root: classes.poolBlock }}
        />
        {pools.hardness.total > 0 && (
          <PoolDisplay
            noSummary
            staticRating
            pool={pools.hardness}
            label="Hardness"
            classes={{ root: classes.poolBlock }}
          />
        )}
        <PoolDisplay
          noSummary
          staticRating
          pool={{ total: -penalties.mobility }}
          label={penalties.mobility < 0 ? 'Mobility Bonus' : 'Mobility Penalty'}
          classes={{ root: classes.poolBlock }}
        />
      </div>

      <Typography>Armor modifiers</Typography>
      <RatingField
        trait="bonus_soak"
        label="Soak"
        margin="dense"
        value={character.bonus_soak}
        min={-Infinity}
        onChange={onChange}
      />
      <RatingField
        trait="bonus_hardness"
        label="Hardness"
        margin="dense"
        value={character.bonus_hardness}
        min={-Infinity}
        onChange={onChange}
      />
      <RatingField
        trait="bonus_mobility_penalty"
        label="Mobility"
        margin="dense"
        value={character.bonus_mobility_penalty}
        min={-Infinity}
        onChange={onChange}
      />
    </BlockPaper>
  )
}

export default compose(
  withStyles(styles),
  shouldUpdate((props, newProps) =>
    isUnequalByKeys(props.character, newProps.character, [
      'armor_name',
      'armor_weight',
      'armor_tags',
      'armor_is_artifact',
      'bonus_soak',
      'bonus_hardness',
      'bonus_mobility_penalty',
    ])
  )
)(ArmorEditor)
