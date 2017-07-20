import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import styled from 'styled-jss'

import AbilityPopup from './editors/abilityPopup.jsx'
import RatingDots from '../generic/ratingDots.jsx'
import { withAbilities, fullChar } from '../../utils/propTypes'
import { isCasteAbility, isFavoredAbility, isSupernalAbility } from '../../utils/calculated'

const AbilityNameSpan = styled('span')({
  textTransform: 'capitalize',
})

function AbilityBlock(props) {
  const rating = props.rating != undefined ? props.rating : props.character[`abil_${props.ability}`]
  const supernal = isSupernalAbility(props.character, props.ability)
  const caste = isCasteAbility(props.character, props.ability)
  const favored = isFavoredAbility(props.character, props.ability)

  return(<div className="abilityBlock">
    <AbilityNameSpan>
      { props.ability }:
    </AbilityNameSpan>
    { supernal && ' (s)' }
    { caste && !supernal && ' (c)' }
    { favored && ' (f)' }

    <RatingDots rating={ rating } />
    <Divider />
  </div>)
}
AbilityBlock.propTypes = {
  ability: PropTypes.string.isRequired,
  rating: PropTypes.number,
  character: PropTypes.shape(fullChar),
}

function CraftAbilityBlock(props) {
  const supernal = isSupernalAbility(props.character, 'craft')
  const caste = isCasteAbility(props.character, 'craft')
  const favored = isFavoredAbility(props.character, 'craft')

  return (<div className="abilityBlock">
    <AbilityNameSpan>
      Craft ({ props.context }):
    </AbilityNameSpan>

    { supernal && ' (s)' }
    { caste && !supernal && ' (c)' }
    { favored && ' (f)' }

    <RatingDots rating={ props.rating } />
    <Divider />
  </div>)
}
CraftAbilityBlock.propTypes = {
  context: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  character: PropTypes.shape(fullChar),
}

function MartialArtsAbilityBlock(props) {
  const supernal = isSupernalAbility(props.character, 'brawl')
  const caste = isCasteAbility(props.character, 'brawl')
  const favored = isFavoredAbility(props.character, 'brawl')

  return (<div className="abilityBlock">
    <AbilityNameSpan>
      Martial Arts ({ props.style }):
    </AbilityNameSpan>

    { supernal && ' (s)' }
    { caste && !supernal && ' (c)' }
    { favored && ' (f)' }

    <RatingDots rating={ props.rating } />
    <Divider />
  </div>)
}
MartialArtsAbilityBlock.propTypes = {
  style: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  character: PropTypes.shape(fullChar),
}


export default function FullAbilityBlock(props) {
  const { character } = props

  let craft = ''
  if (character.abil_craft.length == 0) {
    craft = <AbilityBlock ability="craft" rating={0} character={ character } />
  } else {
    craft = character.abil_craft.map((craft) =>
      <CraftAbilityBlock key={craft.craft} context={ craft.craft } rating={craft.rating} character={ character } />
    )
  }

  let ma = ''
  if (character.abil_martial_arts.length == 0) {
    ma = <AbilityBlock ability="Martial Arts" rating={0} character={ character } />
  } else {
    ma = character.abil_martial_arts.map((ma) =>
      <MartialArtsAbilityBlock key={ma.style} style={ ma.style } rating={ma.rating} character={ character } />
    )
  }

  return(
    <div className="fullAbilityBlock">
      <h3>Abilities<AbilityPopup character={ character } /></h3>
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
  )
}
FullAbilityBlock.propTypes = {
  character: PropTypes.shape(withAbilities)
}
