// @flow
import React, { Fragment } from 'react'
import { shouldUpdate } from 'recompose'

import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import ListAttributeEditor, {
  type ListAttributeFieldTypes,
} from 'components/generic/ListAttributeEditor.jsx'
import BlockPaper from 'components/generic/blockPaper'
import RatingField from 'components/generic/RatingField.jsx'
import { isUnequalByKeys } from 'utils'
import {
  ABILITY_MAX as MAX,
  ABILITY_MIN as MIN,
  ABILITIES_ALL,
} from 'utils/constants.js'
import type { withAbilities as Character } from 'utils/flow-types'

function AbilityField(props) {
  return <RatingField min={MIN} max={MAX} margin="dense" {...props} />
}

const CraftFields = (props: ListAttributeFieldTypes) => {
  const { trait, onChange, onBlur, onRatingChange, classes } = props
  const { craft, rating } = trait

  return (
    <Fragment>
      <TextField
        name="craft"
        value={craft}
        className={classes.nameField}
        label="Craft"
        margin="dense"
        onChange={onChange}
        onBlur={onBlur}
      />

      <RatingField
        trait="rating"
        value={rating}
        label="Rating"
        min={MIN}
        max={MAX}
        margin="dense"
        narrow
        onChange={onRatingChange}
      />
    </Fragment>
  )
}

const MartialArtsFields = (props: ListAttributeFieldTypes) => {
  const { trait, onChange, onBlur, onRatingChange, classes } = props
  const { style, rating } = trait

  return (
    <Fragment>
      <TextField
        name="style"
        value={style}
        className={classes.nameField}
        label="Style"
        margin="dense"
        onChange={onChange}
        onBlur={onBlur}
      />

      <RatingField
        trait="rating"
        value={rating}
        label="Rating"
        min={MIN}
        max={MAX}
        margin="dense"
        narrow
        onChange={onRatingChange}
      />
    </Fragment>
  )
}

type Props = { character: Character, onRatingChange: Function }
function AbilityEditor(props: Props) {
  const { character, onRatingChange } = props

  return (
    <BlockPaper>
      <Typography variant="title">Abilities</Typography>

      <div>
        <AbilityField
          label="Archery"
          trait="abil_archery"
          value={character.abil_archery}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Athletics"
          trait="abil_athletics"
          value={character.abil_athletics}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Awareness"
          trait="abil_awareness"
          value={character.abil_awareness}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Brawl"
          trait="abil_brawl"
          value={character.abil_brawl}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Bureaucracy"
          trait="abil_bureaucracy"
          value={character.abil_bureaucracy}
          onChange={onRatingChange}
        />
      </div>

      <div>
        <AbilityField
          label="Dodge"
          trait="abil_dodge"
          value={character.abil_dodge}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Integrity"
          trait="abil_integrity"
          value={character.abil_integrity}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Investigation"
          trait="abil_investigation"
          value={character.abil_investigation}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Larceny"
          trait="abil_larceny"
          value={character.abil_larceny}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Linguistics"
          trait="abil_linguistics"
          value={character.abil_linguistics}
          onChange={onRatingChange}
        />
      </div>

      <div>
        <AbilityField
          label="Lore"
          trait="abil_lore"
          value={character.abil_lore}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Medicine"
          trait="abil_medicine"
          value={character.abil_medicine}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Melee"
          trait="abil_melee"
          value={character.abil_melee}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Occult"
          trait="abil_occult"
          value={character.abil_occult}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Performance"
          trait="abil_performance"
          value={character.abil_performance}
          onChange={onRatingChange}
        />
      </div>

      <div>
        <AbilityField
          label="Presence"
          trait="abil_presence"
          value={character.abil_presence}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Resistance"
          trait="abil_resistance"
          value={character.abil_resistance}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Ride"
          trait="abil_ride"
          value={character.abil_ride}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Sail"
          trait="abil_sail"
          value={character.abil_sail}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Socialize"
          trait="abil_socialize"
          value={character.abil_socialize}
          onChange={onRatingChange}
        />
      </div>

      <div>
        <AbilityField
          label="Stealth"
          trait="abil_stealth"
          value={character.abil_stealth}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Survival"
          trait="abil_survival"
          value={character.abil_survival}
          onChange={onRatingChange}
        />
        <AbilityField
          label="Thrown"
          trait="abil_thrown"
          value={character.abil_thrown}
          onChange={onRatingChange}
        />
        <AbilityField
          label="War"
          trait="abil_war"
          value={character.abil_war}
          onChange={onRatingChange}
        />
      </div>

      <ListAttributeEditor
        label="Craft"
        character={character}
        trait="abil_craft"
        Fields={CraftFields}
        newObject={{ craft: 'New Craft', rating: 1 }}
        onChange={onRatingChange}
      />

      <ListAttributeEditor
        label="Martial Arts"
        character={character}
        trait="abil_martial_arts"
        Fields={MartialArtsFields}
        newObject={{ style: 'New MA', rating: 1 }}
        onChange={onRatingChange}
      />
    </BlockPaper>
  )
}

export default shouldUpdate((props, newProps) =>
  isUnequalByKeys(
    props.character,
    newProps.character,
    ABILITIES_ALL.map(a => a.abil)
  )
)(AbilityEditor)
