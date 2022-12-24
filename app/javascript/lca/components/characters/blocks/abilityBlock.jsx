// @flow
import * as React from 'react'
const { Fragment } = React

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingLine from 'components/generic/ratingLine.jsx'
import type { Character } from 'utils/flow-types'
import {
  isCasteAbility,
  isFavoredAbility,
  isSupernalAbility,
} from 'utils/calculated'
import { ABILITY_NAMES } from 'utils/constants.js'

const styles = theme => ({
  abilityName: {
    ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  abilityFavored: {
    ...theme.typography.caption,
  },
})

type _AbilityLineProps = {
  ability: string,
  rating?: number,
  character: Character,
  pools: Object,
  classes: Object,
}

function _AbilityLine({
  character,
  ability,
  rating,
  pools,
  classes,
}: _AbilityLineProps) {
  const r = rating != undefined ? rating : character[`abil_${ability}`]
  const supernal = isSupernalAbility(character, ability)
  const caste = isCasteAbility(character, ability)
  const favored = isFavoredAbility(character, ability)
  const excellency =
    pools.excellencyAbils.includes('*') ||
    pools.excellencyAbils.includes(ability)

  return (
    <Fragment>
      <RatingLine rating={r}>
        <span className={classes.abilityName}>{ability}</span>
        <span className={classes.abilityFavored}>
          {excellency && ' *'}
          {supernal && ' (s)'}
          {caste && !supernal && (character.aspect ? ' (a)' : ' (c)')}
          {favored && ' (f)'}
        </span>
      </RatingLine>

      <Divider />
    </Fragment>
  )
}
const AbilityLine = withStyles(styles)(_AbilityLine)

type _CraftAbilityLineProps = {
  context: string,
  rating: number,
  character: Character,
  pools: Object,
  classes: Object,
}
function _CraftAbilityLine({
  character,
  context,
  rating,
  pools,
  classes,
}: _CraftAbilityLineProps) {
  const supernal = isSupernalAbility(character, 'craft')
  const caste = isCasteAbility(character, 'craft')
  const favored = isFavoredAbility(character, 'craft')
  const excellency =
    pools.excellencyAbils.includes('*') ||
    pools.excellencyAbils.includes('craft')

  return (
    <Fragment>
      <RatingLine rating={rating}>
        <span className={classes.abilityName}>Craft ({context})</span>
        <span className={classes.abilityFavored}>
          {excellency && ' *'}
          {supernal && ' (s)'}
          {caste && !supernal && (character.aspect ? ' (a)' : ' (c)')}
          {favored && ' (f)'}
        </span>
      </RatingLine>

      <Divider />
    </Fragment>
  )
}
const CraftAbilityLine = withStyles(styles)(_CraftAbilityLine)

type _MartialArtsAbilityLineProps = {
  style?: string,
  rating: number,
  character: Character,
  pools: Object,
  classes: Object,
}
function _MartialArtsAbilityLine({
  character,
  style,
  rating,
  pools,
  classes,
}: _MartialArtsAbilityLineProps) {
  const supernal = isSupernalAbility(character, 'martial_arts')
  const caste = isCasteAbility(character, 'brawl') || isCasteAbility(character, 'martial_arts')
  const favored = isFavoredAbility(character, 'brawl')
  const s = style ? ' (' + style + ')' : ''
  const excellency =
    pools.excellencyAbils.includes('*') ||
    pools.excellencyAbils.includes('martial_arts')

  return (
    <Fragment>
      <RatingLine rating={rating}>
        <span className={classes.abilityName}>
          Martial Arts
          {s}
        </span>
        <span className={classes.abilityFavored}>
          {excellency && ' *'}
          {supernal && ' (s)'}
          {caste && !supernal && (character.aspect ? ' (a)' : ' (c)')}
          {!caste && favored && ' (f)'}
        </span>
      </RatingLine>

      <Divider />
    </Fragment>
  )
}
const MartialArtsAbilityLine = withStyles(styles)(_MartialArtsAbilityLine)

type AbilityBlockProps = {
  character: Character,
  pools: Object,
}
export default function AbilityBlock({ character, pools }: AbilityBlockProps) {
  let craft = ''
  if (character.abil_craft.length == 0) {
    craft = (
      <AbilityLine
        ability="craft"
        rating={0}
        character={character}
        pools={pools}
      />
    )
  } else {
    craft = character.abil_craft.map(craft => (
      <CraftAbilityLine
        key={craft.craft}
        context={craft.craft}
        rating={craft.rating}
        character={character}
        pools={pools}
      />
    ))
  }

  let ma = ''
  if (character.abil_martial_arts.length == 0) {
    ma = (
      <MartialArtsAbilityLine rating={0} character={character} pools={pools} />
    )
  } else {
    ma = character.abil_martial_arts.map(ma => (
      <MartialArtsAbilityLine
        key={ma.style}
        style={ma.style}
        rating={ma.rating}
        character={character}
        pools={pools}
      />
    ))
  }
  const line = array =>
    array.map(abil => (
      <AbilityLine
        key={abil}
        ability={abil}
        character={character}
        pools={pools}
      />
    ))
  const groupA = line(ABILITY_NAMES.slice(0, 5))
  const groupB = line(ABILITY_NAMES.slice(6, 12))
  const groupC = line(ABILITY_NAMES.slice(13, 26))

  return (
    <BlockPaper>
      <Typography variant="h6">Abilities</Typography>
      {groupA}
      {craft}
      {groupB}
      {ma}
      {groupC}
      {character.type !== 'Character' && (
        <Typography variant="caption" style={{ marginTop: '0.5em' }}>
          {pools.exaltTypeBase !== 'attribute' && '*: Excellency, '}
          {character.supernal_ability && 's: Supernal, '}
          {pools.exaltTypeBase === 'ability' &&
            (character.aspect ? 'a: Aspect, ' : 'c: Caste, ')}
          f: Favored
        </Typography>
      )}
    </BlockPaper>
  )
}
