// @flow
import { isEqual } from 'lodash'
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import AbilityEditor from './editors/abilityEditor.jsx'
import ArmorEditor from './editors/armorEditor.jsx'
import AttributeEditor from './editors/attributeEditor.jsx'
import BasicsEditor from './editors/basicsEditor.jsx'
import CustomAbilityExaltEditor from './editors/customAbilityExaltEditor.jsx'
import CustomAttributeExaltEditor from './editors/customAttributeExaltEditor.jsx'
import CustomEssenceExaltEditor from './editors/customEssenceExaltEditor.jsx'
import DragonbloodExaltEditor from './editors/DragonbloodExaltEditor.jsx'
import HealthLevelEditor from './editors/healthLevelEditor.jsx'
import IntimacyEditor from './editors/intimacyEditor.jsx'
import LimitEditor from './editors/limitEditor.jsx'
import MotePoolEditor from './editors/motePoolEditor.jsx'
import SpecialtyEditor from './editors/specialtyEditor.jsx'
import SolarExaltEditor from './editors/solarExaltEditor.jsx'
import SorceryEditor from './editors/sorceryEditor.jsx'
import WillpowerEditor from './editors/willpowerEditor.jsx'
import XpEditor from './editors/xpEditor.jsx'
import WeaponEditor from './weapons/WeaponEditor.jsx'
import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import { updateCharacter, updateCharacterMulti } from 'ducks/actions.js'
import {
  getSpecificCharacter,
  getPoolsAndRatings,
  getPenalties,
} from 'selectors'
import type { Character } from 'utils/flow-types'

type Props = {
  character: Character,
  pools: Object,
  penalties: Object,
  updateCharacter: Function,
  updateCharacterMulti: Function,
}
class CharacterEditor extends Component<Props> {
  handleChange = (e: SyntheticInputEvent<>) => {
    const { name, value } = e.target
    const { character } = this.props

    if (isEqual(character[name], value)) return

    this.props.updateCharacter(character.id, name, value)
  }

  handleCheck = (e: SyntheticInputEvent<>) => {
    const { name } = e.target
    const { character } = this.props
    const value = !character[name]

    this.props.updateCharacter(character.id, name, value)
  }

  handleChangeMulti = (changes: Object) => {
    this.props.updateCharacterMulti(this.props.character.id, changes)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return (
        <div>
          <Typography paragraph>This Character has not yet loaded.</Typography>
        </div>
      )

    const { character, pools, penalties } = this.props
    const { handleChange, handleCheck, handleChangeMulti } = this
    const showLimit =
      character.type !== 'Character' &&
      character.exalt_type.toLowerCase() !== 'dragon-blood'

    const handleRatingChange = handleChange

    return (
      <div>
        <DocumentTitle title={`${character.name} | Lot-Casting Atemi`} />

        <Hidden smUp>
          <div style={{ height: '2.5em' }}>&nbsp;</div>
        </Hidden>

        <Grid container spacing={24}>
          <Grid item xs={12} md={character.type === 'Character' ? 12 : 6}>
            <BasicsEditor
              character={character}
              onChange={handleChange}
              onRatingChange={handleRatingChange}
              onCheck={handleCheck}
            />
          </Grid>

          {character.type === 'SolarCharacter' && (
            <Grid item xs={12} md={6}>
              <SolarExaltEditor character={character} onChange={handleChange} />
            </Grid>
          )}
          {character.type === 'DragonbloodCharacter' && (
            <Grid item xs={12} md={6}>
              <DragonbloodExaltEditor
                character={character}
                onChange={handleChange}
              />
            </Grid>
          )}
          {character.type === 'CustomAbilityCharacter' && (
            <Grid item xs={12} md={6}>
              <CustomAbilityExaltEditor
                character={character}
                onChange={handleChange}
                onCheck={handleCheck}
                onChangeMulti={handleChangeMulti}
              />
            </Grid>
          )}
          {character.type === 'CustomAttributeCharacter' && (
            <Grid item xs={12} md={6}>
              <CustomAttributeExaltEditor
                character={character}
                onChange={handleChange}
                onCheck={handleCheck}
                onChangeMulti={handleChangeMulti}
              />
            </Grid>
          )}
          {character.type === 'CustomEssenceCharacter' && (
            <Grid item xs={12} md={6}>
              <CustomEssenceExaltEditor
                character={character}
                onChange={handleChange}
                onCheck={handleCheck}
                onChangeMulti={handleChangeMulti}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6} lg={3}>
            <HealthLevelEditor
              character={character}
              penalties={penalties}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <WillpowerEditor character={character} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6} lg={5}>
            <MotePoolEditor character={character} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <AttributeEditor character={character} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AbilityEditor character={character} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <SpecialtyEditor character={character} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6}>
            <IntimacyEditor character={character} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ArmorEditor
              character={character}
              pools={pools}
              penalties={penalties}
              onChange={handleChange}
              onCheck={handleCheck}
            />
          </Grid>

          {showLimit && (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <LimitEditor character={character} onChange={handleChange} />
            </Grid>
          )}

          <Grid item xs={12} md={4}>
            <SorceryEditor
              character={character}
              onChange={handleChange}
              onBlur={handleChange}
              onCheck={handleCheck}
              onRatingChange={handleRatingChange}
            />
          </Grid>

          <Grid item xs={12}>
            <WeaponEditor character={character} />
          </Grid>

          <Grid item xs={12}>
            <XpEditor character={character} onChange={handleChange} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const id = props.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let pools, penalties

  if (character != undefined) {
    pools = getPoolsAndRatings(state, id)
    penalties = getPenalties(state, id)
  }

  return {
    character,
    pools,
    penalties,
  }
}

export default ProtectedComponent(
  connect(
    mapStateToProps,
    { updateCharacter, updateCharacterMulti }
  )(CharacterEditor)
)
