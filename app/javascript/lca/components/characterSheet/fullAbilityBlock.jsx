import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import RatingDots from '../generic/ratingDots.jsx'
import { withAbilities, fullChar } from '../../utils/propTypes'
import { isCasteAbility, isFavoredAbility, isSupernalAbility } from '../../utils/calculated'

const styles = theme => ({
  abilityName: { ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  abilityFavored: { ...theme.typography.caption,
  },
})

function _AbilityBlock(props) {
  const { classes } = props
  const rating = props.rating != undefined ? props.rating : props.character[`abil_${props.ability}`]
  const supernal = isSupernalAbility(props.character, props.ability)
  const caste = isCasteAbility(props.character, props.ability)
  const favored = isFavoredAbility(props.character, props.ability)

  return <div>
    <span className={ classes.abilityName }>
      { props.ability }:
    </span>
    <span className={ classes.abilityFavored }>
      { supernal && ' (s)' }
      { caste && !supernal && ' (c)' }
      { favored && ' (f)' }
    </span>

    <RatingDots rating={ rating } />
    <Divider />
  </div>
}
_AbilityBlock.propTypes = {
  ability: PropTypes.string.isRequired,
  rating: PropTypes.number,
  character: PropTypes.shape(fullChar),
  classes: PropTypes.object,
}
const AbilityBlock = withStyles(styles)(_AbilityBlock)

function _CraftAbilityBlock(props) {
  const { classes } = props
  const supernal = isSupernalAbility(props.character, 'craft')
  const caste = isCasteAbility(props.character, 'craft')
  const favored = isFavoredAbility(props.character, 'craft')

  return <div>
    <span className={ classes.abilityName }>
      Craft ({ props.context }):
    </span>
    <span className={ classes.abilityFavored }>
      { supernal && ' (s)' }
      { caste && !supernal && ' (c)' }
      { favored && ' (f)' }
    </span>

    <RatingDots rating={ props.rating } />
    <Divider />
  </div>
}
_CraftAbilityBlock.propTypes = {
  context: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  character: PropTypes.shape(fullChar),
  classes: PropTypes.object,
}
const CraftAbilityBlock = withStyles(styles)(_CraftAbilityBlock)

function _MartialArtsAbilityBlock(props) {
  const { classes } = props
  const supernal = isSupernalAbility(props.character, 'brawl')
  const caste = isCasteAbility(props.character, 'brawl')
  const favored = isFavoredAbility(props.character, 'brawl')

  return <div>
    <span className={ classes.abilityName }>
      Martial Arts ({ props.style }):
    </span>
    <span className={ classes.abilityFavored }>
      { supernal && ' (s)' }
      { caste && !supernal && ' (c)' }
      { favored && ' (f)' }
    </span>

    <RatingDots rating={ props.rating } />
    <Divider />
  </div>
}
_MartialArtsAbilityBlock.propTypes = {
  style: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  character: PropTypes.shape(fullChar),
  classes: PropTypes.object,
}
const MartialArtsAbilityBlock = withStyles(styles)(_MartialArtsAbilityBlock)

export default function FullAbilityBlock(props) {
  const { character } = props

  let craft = ''
  if (character.abil_craft.length == 0) {
    craft = <AbilityBlock ability="craft" rating={ 0 } character={ character } />
  } else {
    craft = character.abil_craft.map((craft) =>
      <CraftAbilityBlock key={craft.craft} context={ craft.craft } rating={craft.rating} character={ character } />
    )
  }

  let ma = ''
  if (character.abil_martial_arts.length == 0) {
    ma = <AbilityBlock ability="Martial Arts" rating={ 0 } character={ character } />
  } else {
    ma = character.abil_martial_arts.map((ma) =>
      <MartialArtsAbilityBlock key={ma.style} style={ ma.style } rating={ma.rating} character={ character } />
    )
  }

  return <div>
    <AbilityBlock ability="archery"       character={ character } />
    <AbilityBlock ability="athletics"     character={ character } />
    <AbilityBlock ability="awareness"     character={ character } />
    <AbilityBlock ability="brawl"         character={ character } />
    <AbilityBlock ability="bureaucracy"   character={ character } />
    { craft }
    <AbilityBlock ability="dodge"         character={ character } />
    <AbilityBlock ability="integrity"     character={ character } />
    <AbilityBlock ability="investigation" character={ character } />
    <AbilityBlock ability="larceny"       character={ character } />
    <AbilityBlock ability="linguistics"   character={ character } />
    <AbilityBlock ability="lore"          character={ character } />
    { ma }
    <AbilityBlock ability="medicine"      character={ character } />
    <AbilityBlock ability="melee"         character={ character } />
    <AbilityBlock ability="occult"        character={ character } />
    <AbilityBlock ability="performance"   character={ character } />
    <AbilityBlock ability="presence"      character={ character } />
    <AbilityBlock ability="resistance"    character={ character } />
    <AbilityBlock ability="ride"          character={ character } />
    <AbilityBlock ability="sail"          character={ character } />
    <AbilityBlock ability="socialize"     character={ character } />
    <AbilityBlock ability="stealth"       character={ character } />
    <AbilityBlock ability="survival"      character={ character } />
    <AbilityBlock ability="thrown"        character={ character } />
    <AbilityBlock ability="war"           character={ character } />
  </div>
}

FullAbilityBlock.propTypes = {
  character: PropTypes.shape(withAbilities)
}
