import Typography from '@mui/material/Typography'
import withStyles from '@mui/styles/withStyles'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor'
import RatingField from 'components/generic/RatingField'
import TextField from 'components/generic/TextField'
import BlockPaper from 'components/shared/BlockPaper'
import commonStyles from 'styles'
import { solarXpName, spentBp, spentSolarXp, spentXp } from 'utils/calculated'
import type { Character } from '@/types'

const styles = (theme) => ({
  ...commonStyles(theme),
  separator: { ...theme.typography.body1, marginRight: theme.spacing() },
  subheading: {
    marginTop: theme.spacing(),
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
    <>
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
    </>
  )
}

interface Props {
  character: Character
  onChange: $TSFixMeFunction
  classes: Record<string, $TSFixMe>
}

const XpEditor = ({ character, onChange, classes }: Props) => (
  <BlockPaper>
    <Typography variant="h6">XP:</Typography>

    <div className={classes.xpWrap}>
      <div className={classes.xpCol}>
        <ListAttributeEditor
          label="XP Log"
          character={character}
          trait="xp_log"
          Fields={XpFields}
          newObject={{
            label: '',
            points: 0,
          }}
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
          label={solarXpName(character) + ' XP Log'}
          character={character}
          trait="xp_log_solar"
          Fields={XpFields}
          newObject={{
            label: '',
            points: 0,
          }}
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
        <Typography variant="subtitle1" className={classes.subheading}>
          Craft XP:
        </Typography>
        <Typography component="div" className="flexContainerWrap">
          <div className={classes.flexCol}>
            <RatingField
              trait="xp_craft_silver"
              value={character.xp_craft_silver}
              label="Silver"
              margin="dense"
              narrow
              onChange={onChange}
              dontFocus
            />
            <span className={classes.fieldSeparator}>/</span>
            <RatingField
              trait="xp_craft_gold"
              value={character.xp_craft_gold}
              label="Gold"
              margin="dense"
              narrow
              onChange={onChange}
              dontFocus
            />
            <span className={classes.fieldSeparator}>/</span>
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
        </Typography>
      </div>

      <div className={classes.xpCol}>
        <ListAttributeEditor
          label="BP Log"
          character={character}
          trait="bp_log"
          Fields={XpFields}
          newObject={{
            label: '',
            points: 0,
          }}
          onChange={onChange}
        />
        <Typography>Total: {spentBp(character)}</Typography>
      </div>
    </div>
  </BlockPaper>
)

export default withStyles(styles)(XpEditor)
