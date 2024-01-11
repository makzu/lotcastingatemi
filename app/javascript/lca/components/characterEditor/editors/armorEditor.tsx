import React from 'react'
import {
  Theme,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TagsField from 'components/generic/TagsField.jsx'
import TextField from 'components/generic/TextField.jsx'
import WeightSelect from 'components/shared/selects/WeightSelect'
import type { withArmorStats as Character } from 'utils/flow-types'

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
    },
    poolBlock: {
      margin: theme.spacing(),
      marginLeft: 0,
      width: '5.5rem',
      maxHeight: '5rem',
    },
  })

interface Props extends WithStyles<typeof styles> {
  character: Character
  pools: Record<string, $TSFixMe>
  penalties: Record<string, $TSFixMe>
  onChange: $TSFixMeFunction
  onCheck: $TSFixMeFunction
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

      <div
        style={{
          display: 'flex',
        }}
      >
        <PoolDisplay
          staticRating
          pool={pools.soak}
          label="Soak"
          classes={{
            root: classes.poolBlock,
          }}
        />
        {pools.hardness.total > 0 && (
          <PoolDisplay
            noSummary
            staticRating
            pool={pools.hardness}
            label="Hardness"
            classes={{
              root: classes.poolBlock,
            }}
          />
        )}
        <PoolDisplay
          noSummary
          staticRating
          pool={{
            total: -penalties.mobility,
          }}
          label={penalties.mobility < 0 ? 'Mobility Bonus' : 'Mobility Penalty'}
          classes={{
            root: classes.poolBlock,
          }}
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

export default withStyles(styles)(ArmorEditor)
