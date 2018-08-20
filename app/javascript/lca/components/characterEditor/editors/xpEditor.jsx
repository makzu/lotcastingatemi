// @flow
import React, { Fragment } from 'react'
import { compose, shouldUpdate } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import { isUnequalByKeys } from 'utils'
import { spentXp, spentSolarXp, spentBp } from 'utils/calculated'
import type { Character } from 'utils/flow-types'

const styles = theme => ({
  separator: {
    ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
  subheading: {
    marginTop: theme.spacing.unit,
  },
  xpWrap: {
    display: 'flex',
  },
  xpCol: {
    flex: 1,
  },
})

const XpFields = (props: ListAttributeFieldTypes) => {
  const { onChange, classes } = props
  const { label, points } = props.trait

  return (
    <Fragment>
      <TextField
        name="label"
        value={label}
        className={classes.nameField}
        label="For"
        margin="dense"
        onChange={onChange}
      />

      <RatingField
        trait="points"
        value={points}
        label="Points"
        min={-Infinity}
        margin="dense"
        narrow
        onChange={onChange}
      />
    </Fragment>
  )
}

type Props = { character: Character, onChange: Function, classes: Object }
const XpEditor = ({ character, onChange, classes }: Props) => (
  <BlockPaper>
    <Typography variant="title">XP:</Typography>

    <div className={classes.xpWrap}>
      <div className={classes.xpCol}>
        <ListAttributeEditor
          label="XP Log"
          character={character}
          trait="xp_log"
          Fields={XpFields}
          newObject={{ label: '', points: 0 }}
          onChange={onChange}
        />

        <Typography component="div">
          <RatingField
            trait="xp_total"
            value={character.xp_total}
            label="Earned"
            margin="dense"
            onChange={onChange}
            dontFocus
          />
          Total: {spentXp(character)}, Remaining:{' '}
          {character.xp_total - spentXp(character)}
        </Typography>
      </div>

      <div className={classes.xpCol}>
        <ListAttributeEditor
          label={
            character.exalt_type === 'Dragon-Blood'
              ? 'Dragon XP Log'
              : 'Solar XP Log'
          }
          character={character}
          trait="xp_log_solar"
          Fields={XpFields}
          newObject={{ label: '', points: 0 }}
          onChange={onChange}
        />

        <Typography component="div">
          <RatingField
            trait="xp_solar_total"
            value={character.xp_solar_total}
            label="Earned"
            margin="dense"
            onChange={onChange}
            dontFocus
          />
          Total: {spentSolarXp(character)}, Remaining:{' '}
          {character.xp_solar_total - spentSolarXp(character)}
        </Typography>
      </div>
    </div>

    <div className={classes.xpWrap}>
      <div className={classes.xpCol}>
        <Typography variant="subheading" className={classes.subheading}>
          Craft XP:
        </Typography>
        <div>
          <RatingField
            trait="xp_craft_silver"
            value={character.xp_craft_silver}
            label="Silver"
            margin="dense"
            narrow
            onChange={onChange}
            dontFocus
          />
          <span className={classes.separator}>/</span>
          <RatingField
            trait="xp_craft_gold"
            value={character.xp_craft_gold}
            label="Gold"
            margin="dense"
            narrow
            onChange={onChange}
            dontFocus
          />
          <span className={classes.separator}>/</span>
          <RatingField
            trait="xp_craft_white"
            value={character.xp_craft_white}
            label="White"
            margin="dense"
            narrow
            onChange={onChange}
            dontFocus
          />
        </div>
      </div>

      <div className={classes.xpCol}>
        <ListAttributeEditor
          label="BP Log"
          character={character}
          trait="bp_log"
          Fields={XpFields}
          newObject={{ label: '', points: 0 }}
          onChange={onChange}
        />
        <Typography>Total: {spentBp(character)}</Typography>
      </div>
    </div>
  </BlockPaper>
)

export default compose(
  withStyles(styles),
  shouldUpdate((props, nextProps) =>
    isUnequalByKeys(props.character, nextProps.character, [
      'xp_log',
      'xp_log_solar',
      'xp_total',
      'xp_solar_total',
      'xp_craft_silver',
      'xp_craft_gold',
      'xp_craft_white',
      'bp_log',
    ])
  )
)(XpEditor)
