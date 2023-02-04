// @flow

import Typography from '@mui/material/Typography'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import TextField from 'components/generic/TextField.jsx'
import BlockPaper from 'components/shared/BlockPaper'
import {
  ABILITIES,
  ABILITY_MAX as MAX,
  ABILITY_MIN as MIN,
} from 'utils/constants'
import type { withAbilities as Character } from 'utils/flow-types'

function AbilityField(props) {
  return <RatingField min={MIN} max={MAX} margin="dense" {...props} />
}

const CraftFields = (props: ListAttributeFieldTypes) => {
  const { trait, onChange, classes } = props
  const { craft, rating } = trait

  return (
    <>
      <TextField
        name="craft"
        value={craft}
        className={classes.nameField}
        label="Craft"
        margin="dense"
        onChange={onChange}
      />

      <RatingField
        trait="rating"
        value={rating}
        label="Rating"
        min={MIN}
        max={MAX}
        margin="dense"
        narrow
        onChange={onChange}
      />
    </>
  )
}

const MartialArtsFields = (props: ListAttributeFieldTypes) => {
  const { trait, onChange, classes } = props
  const { style, rating } = trait

  return (
    <>
      <TextField
        name="style"
        value={style}
        className={classes.nameField}
        label="Style"
        margin="dense"
        onChange={onChange}
      />

      <RatingField
        trait="rating"
        value={rating}
        label="Rating"
        min={MIN}
        max={MAX}
        margin="dense"
        narrow
        onChange={onChange}
      />
    </>
  )
}

type Props = {
  character: Character,
  onChange: Function,
}

function AbilityEditor({ character, onChange }: Props) {
  let totalDots = 0,
    dotsOverThree = 0,
    dotsUnderThree = 0

  ABILITIES.forEach((a) => {
    const score = character[a.abil]
    totalDots += score
    dotsOverThree += Math.max(score - 3, 0)
    dotsUnderThree += Math.min(score, 3)
  })
  character.abil_craft.concat(character.abil_martial_arts).forEach((a) => {
    const score = a.rating
    totalDots += score
    dotsOverThree += Math.max(score - 3, 0)
    dotsUnderThree += Math.min(score, 3)
  })

  return (
    <BlockPaper>
      <Typography variant="h6" component="div">
        Abilities&nbsp;
        <Typography
          variant="caption"
          component="span"
          style={{ display: 'inline' }}
        >
          ({totalDots} total, {dotsUnderThree} at or under 3, {dotsOverThree}{' '}
          over 3)
        </Typography>
      </Typography>

      <div>
        <AbilityField
          label="Archery"
          trait="abil_archery"
          value={character.abil_archery}
          onChange={onChange}
        />
        <AbilityField
          label="Athletics"
          trait="abil_athletics"
          value={character.abil_athletics}
          onChange={onChange}
        />
        <AbilityField
          label="Awareness"
          trait="abil_awareness"
          value={character.abil_awareness}
          onChange={onChange}
        />
        <AbilityField
          label="Brawl"
          trait="abil_brawl"
          value={character.abil_brawl}
          onChange={onChange}
        />
        <AbilityField
          label="Bureaucracy"
          trait="abil_bureaucracy"
          value={character.abil_bureaucracy}
          onChange={onChange}
        />
      </div>

      <div>
        <AbilityField
          label="Dodge"
          trait="abil_dodge"
          value={character.abil_dodge}
          onChange={onChange}
        />
        <AbilityField
          label="Integrity"
          trait="abil_integrity"
          value={character.abil_integrity}
          onChange={onChange}
        />
        <AbilityField
          label="Investigation"
          trait="abil_investigation"
          value={character.abil_investigation}
          onChange={onChange}
        />
        <AbilityField
          label="Larceny"
          trait="abil_larceny"
          value={character.abil_larceny}
          onChange={onChange}
        />
        <AbilityField
          label="Linguistics"
          trait="abil_linguistics"
          value={character.abil_linguistics}
          onChange={onChange}
        />
      </div>

      <div>
        <AbilityField
          label="Lore"
          trait="abil_lore"
          value={character.abil_lore}
          onChange={onChange}
        />
        <AbilityField
          label="Medicine"
          trait="abil_medicine"
          value={character.abil_medicine}
          onChange={onChange}
        />
        <AbilityField
          label="Melee"
          trait="abil_melee"
          value={character.abil_melee}
          onChange={onChange}
        />
        <AbilityField
          label="Occult"
          trait="abil_occult"
          value={character.abil_occult}
          onChange={onChange}
        />
        <AbilityField
          label="Performance"
          trait="abil_performance"
          value={character.abil_performance}
          onChange={onChange}
        />
      </div>

      <div>
        <AbilityField
          label="Presence"
          trait="abil_presence"
          value={character.abil_presence}
          onChange={onChange}
        />
        <AbilityField
          label="Resistance"
          trait="abil_resistance"
          value={character.abil_resistance}
          onChange={onChange}
        />
        <AbilityField
          label="Ride"
          trait="abil_ride"
          value={character.abil_ride}
          onChange={onChange}
        />
        <AbilityField
          label="Sail"
          trait="abil_sail"
          value={character.abil_sail}
          onChange={onChange}
        />
        <AbilityField
          label="Socialize"
          trait="abil_socialize"
          value={character.abil_socialize}
          onChange={onChange}
        />
      </div>

      <div>
        <AbilityField
          label="Stealth"
          trait="abil_stealth"
          value={character.abil_stealth}
          onChange={onChange}
        />
        <AbilityField
          label="Survival"
          trait="abil_survival"
          value={character.abil_survival}
          onChange={onChange}
        />
        <AbilityField
          label="Thrown"
          trait="abil_thrown"
          value={character.abil_thrown}
          onChange={onChange}
        />
        <AbilityField
          label="War"
          trait="abil_war"
          value={character.abil_war}
          onChange={onChange}
        />
      </div>

      <ListAttributeEditor
        label="Craft"
        character={character}
        trait="abil_craft"
        Fields={CraftFields}
        newObject={{ craft: 'New Craft', rating: 1 }}
        onChange={onChange}
      />

      <ListAttributeEditor
        label="Martial Arts"
        character={character}
        trait="abil_martial_arts"
        Fields={MartialArtsFields}
        newObject={{ style: 'New MA', rating: 1 }}
        onChange={onChange}
      />
    </BlockPaper>
  )
}

export default AbilityEditor
