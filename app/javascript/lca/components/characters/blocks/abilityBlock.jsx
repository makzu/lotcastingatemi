/* @flow */
import * as React from 'react'
const { Fragment } = React

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingLine from '../../generic/ratingLine.jsx'
import type { Character } from 'utils/flow-types'
import { isCasteAbility, isFavoredAbility, isSupernalAbility } from 'utils/calculated'

const styles = theme => ({
  abilityName: { ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  abilityFavored: { ...theme.typography.caption,
  },
})

export type _AbilityLineProps = {
  ability: string,
  rating: number,
  character: Character,
  pools: Object,
  classes: Object,
}

function _AbilityLine({ character, ability, rating, pools, classes }: _AbilityLineProps) {
  const r = rating != undefined ? rating : character[`abil_${ability}`]
  const supernal = isSupernalAbility(character, ability)
  const caste = isCasteAbility(character, ability)
  const favored = isFavoredAbility(character, ability)
  const excellency = pools.excellencyAbils.includes('*') || pools.excellencyAbils.includes(ability)

  return <Fragment>
    <RatingLine rating={ r }>
      <span className={ classes.abilityName }>
        { ability }
      </span>
      <span className={ classes.abilityFavored }>
        { excellency && ' *' }
        { supernal && ' (s)' }
        { caste && !supernal && !character.aspect && ' (c)' }
        { caste && character.aspect && ' (a)'}
        { favored && ' (f)' }
      </span>
    </RatingLine>

    <Divider />
  </Fragment>
}
const AbilityLine = withStyles(styles)(_AbilityLine)

export type _CraftAbilityLineProps = {
  context: string,
  rating: number,
  character: Character,
  pools: Object,
  classes: Object,
}

function _CraftAbilityLine({ character, context, rating, pools, classes }: _CraftAbilityLineProps) {
  const supernal = isSupernalAbility(character, 'craft')
  const caste = isCasteAbility(character, 'craft')
  const favored = isFavoredAbility(character, 'craft')
  const excellency = pools.excellencyAbils.includes('*') || pools.excellencyAbils.includes('craft')

  return <Fragment>
    <RatingLine rating={ rating }>
      <span className={ classes.abilityName }>
        Craft ({ context })
      </span>
      <span className={ classes.abilityFavored }>
        { excellency && ' *' }
        { supernal && ' (s)' }
        { caste && !supernal && ' (c)' }
        { favored && ' (f)' }
      </span>
    </RatingLine>

    <Divider />
  </Fragment>
}
const CraftAbilityLine = withStyles(styles)(_CraftAbilityLine)

export type _MartialArtsAbilityLineProps = {
  style: string,
  rating: number,
  character: Character,
  pools: Object,
  classes: Object,
}

function _MartialArtsAbilityLine({ character, style, rating, pools, classes }: _MartialArtsAbilityLineProps) {
  const supernal = isSupernalAbility(character, 'martial_arts')
  const caste = isCasteAbility(character, 'brawl')
  const favored = isFavoredAbility(character, 'brawl')
  const s = style ? ' (' + style + ')' : ''
  const excellency = pools.excellencyAbils.includes('*') || pools.excellencyAbils.includes('martial_arts')

  return <Fragment>
    <RatingLine rating={ rating }>
      <span className={ classes.abilityName }>
        Martial Arts{ s }
      </span>
      <span className={ classes.abilityFavored }>
        { excellency && ' *' }
        { supernal && ' (s)' }
        { caste && !supernal && ' (c)' }
        { favored && ' (f)' }
      </span>
    </RatingLine>

    <Divider />
  </Fragment>
}
const MartialArtsAbilityLine = withStyles(styles)(_MartialArtsAbilityLine)

export type AbilityBlockProps = {
  character: Character,
  pools: Object,
};

export default function AbilityBlock({ character, pools }: AbilityBlockProps) {
  let craft = ''
  if (character.abil_craft.length == 0) {
    craft = <AbilityLine ability="craft" rating={ 0 } character={ character } pools={ pools } />
  } else {
    craft = character.abil_craft.map((craft) =>
      <CraftAbilityLine key={craft.craft} context={ craft.craft } rating={craft.rating} character={ character } pools={ pools } />
    )
  }

  let ma = ''
  if (character.abil_martial_arts.length == 0) {
    ma = <MartialArtsAbilityLine rating={ 0 } character={ character } pools={ pools } />
  } else {
    ma = character.abil_martial_arts.map((ma) =>
      <MartialArtsAbilityLine key={ma.style} style={ ma.style } rating={ma.rating} character={ character } pools={ pools } />
    )
  }

  return <BlockPaper>
    <Typography variant="title">
      Abilities
    </Typography>

    <AbilityLine ability="archery"       character={ character } pools={ pools } />
    <AbilityLine ability="athletics"     character={ character } pools={ pools } />
    <AbilityLine ability="awareness"     character={ character } pools={ pools } />
    <AbilityLine ability="brawl"         character={ character } pools={ pools } />
    <AbilityLine ability="bureaucracy"   character={ character } pools={ pools } />
    { craft }
    <AbilityLine ability="dodge"         character={ character } pools={ pools } />
    <AbilityLine ability="integrity"     character={ character } pools={ pools } />
    <AbilityLine ability="investigation" character={ character } pools={ pools } />
    <AbilityLine ability="larceny"       character={ character } pools={ pools } />
    <AbilityLine ability="linguistics"   character={ character } pools={ pools } />
    <AbilityLine ability="lore"          character={ character } pools={ pools } />
    { ma }
    <AbilityLine ability="medicine"      character={ character } pools={ pools } />
    <AbilityLine ability="melee"         character={ character } pools={ pools } />
    <AbilityLine ability="occult"        character={ character } pools={ pools } />
    <AbilityLine ability="performance"   character={ character } pools={ pools } />
    <AbilityLine ability="presence"      character={ character } pools={ pools } />
    <AbilityLine ability="resistance"    character={ character } pools={ pools } />
    <AbilityLine ability="ride"          character={ character } pools={ pools } />
    <AbilityLine ability="sail"          character={ character } pools={ pools } />
    <AbilityLine ability="socialize"     character={ character } pools={ pools } />
    <AbilityLine ability="stealth"       character={ character } pools={ pools } />
    <AbilityLine ability="survival"      character={ character } pools={ pools } />
    <AbilityLine ability="thrown"        character={ character } pools={ pools } />
    <AbilityLine ability="war"           character={ character } pools={ pools } />

    { character.type !== 'Character' &&
      <Typography variant="caption" style={{ marginTop: '0.5em' }}>
        { pools.exaltTypeBase !== 'attribute' && '*: Excellency, ' }
        { character.supernal_ability && 's: Supernal, '}
        { pools.exaltTypeBase === 'ability' &&
          (character.aspect ? 'a: Aspect, ' : 'c: Caste, ')
        }
        f: Favored
      </Typography>
    }
  </BlockPaper>
}
