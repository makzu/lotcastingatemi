import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import Launch from '@material-ui/icons/Launch'
import CharacterLoadError from '../CharacterSheet/CharacterLoadError'
import AbilityBlock from './blocks/abilityBlock'
import ArmorSummary from './blocks/armorSummary'
import AttributeBlock from './blocks/attributeBlock'
import BasicsBlock from './blocks/BasicsBlock'
import CharmSummaryBlock from './blocks/charmSummaryBlock'
import CombatBlock from './blocks/combatBlock'
import IntimacySummary from './blocks/IntimacySummaryBlock'
import MeritSummaryBlock from './blocks/meritSummaryBlock'
import SocialBlock from './blocks/socialBlock'
import SpecialtyBlock from './blocks/specialtyBlock'
import WeaponSummaryBlock from './blocks/weaponSummaryBlock'
import BlockPaper from '../generic/blockPaper'
import RatingLine from '../generic/ratingLine'
import SpendableBlock from '../generic/SpendableBlock'
import ProtectedComponent from 'containers/ProtectedComponent'
import { getSpecificCharacter } from 'ducks/selectors'
import { getWeaponsForCharacter } from 'ducks/entities/weapon'
import {
  canIEditCharacter,
  getPenalties,
  getPoolsAndRatings,
  getMeritsForCharacter,
} from 'selectors'
import type {
  Character,
  fullMerit as Merit,
  fullWeapon as Weapon,
} from 'utils/flow-types'
export function ResourceBlock({ character }: { character: Character }) {
  const re = character.resources || []
  const res = re.map((r, index) => (
    <Typography key={index}>
      {r.resource}: {r.value}
    </Typography>
  ))
  return (
    <BlockPaper>
      <SpendableBlock character={character} />
      {res.length > 0 && (
        <Typography
          variant="subtitle1"
          style={{
            marginTop: '0.5em',
          }}
        >
          Misc. Resources
        </Typography>
      )}
      {res}
    </BlockPaper>
  )
}
export function LimitTrackBlock({ character }: { character: Character }) {
  return (
    <BlockPaper>
      <Typography variant="h6">Limit</Typography>

      <Typography component="div">
        <RatingLine rating={character.limit} fillTo={10}>
          Current
        </RatingLine>
      </Typography>
      <Typography>Limit Trigger: {character.limit_trigger}</Typography>
    </BlockPaper>
  )
}
export function SorceryBlock({ character }: { character: Character }) {
  const rituals = character.rituals.map((r, i) => (
    <Typography paragraph key={i}>
      {r}
    </Typography>
  ))
  return (
    <BlockPaper>
      <Typography variant="h6">Sorcery</Typography>

      <Typography paragraph>
        Sorcerous Motes: {character.sorcerous_motes}
      </Typography>

      <Typography>Shaping Rituals:</Typography>
      {rituals}
    </BlockPaper>
  )
}
interface Props {
  character: Character
  merits: Merit[]
  weapons: Weapon[]
  penalties: Record<string, $TSFixMe>
  pools: Record<string, $TSFixMe>
  canEdit: boolean
}
export class CharacterSheet extends Component<Props> {
  render() {
    /* Escape hatch */
    if (this.props.character == undefined) return <CharacterLoadError />
    const { character, merits, weapons, pools, penalties, canEdit } = this.props
    const showLimit =
      character.type !== 'Character' &&
      (character.exalt_type || '').toLowerCase() !== 'dragon-blood'
    return (
      <div>
        <DocumentTitle title={`${character.name} | Lot-Casting Atemi`} />

        <Grid container spacing={3}>
          <Hidden smUp>
            <Grid item xs={12}>
              <div
                style={{
                  height: '1em',
                }}
              >
                &nbsp;
              </div>
            </Grid>
          </Hidden>

          <Grid item xs={12} md={6}>
            <BasicsBlock character={character} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ResourceBlock character={character} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AbilityBlock character={character} pools={pools} />
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AttributeBlock character={character} pools={pools} />
              </Grid>

              <Grid item xs={12} md={5}>
                <SpecialtyBlock character={character} />
              </Grid>

              <Grid item xs={12} md={7}>
                <BlockPaper>
                  <Typography
                    variant="h6"
                    component={Link}
                    to={`/characters/${character.id}/merits`}
                    style={{
                      textDecoration: 'none',
                      color: 'unset',
                    }}
                  >
                    Merits&nbsp;&nbsp;
                    <Launch
                      style={{
                        verticalAlign: 'bottom',
                      }}
                    />
                  </Typography>

                  <MeritSummaryBlock character={character} merits={merits} />
                </BlockPaper>
              </Grid>

              <Hidden smDown>
                <Grid item xs={12}>
                  <BlockPaper>
                    <Typography variant="h6">Weapons</Typography>
                    <WeaponSummaryBlock
                      character={character}
                      weapons={weapons}
                    />
                  </BlockPaper>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>

          <Hidden mdUp>
            <Grid item xs={12}>
              <BlockPaper>
                <Typography variant="h6">Weapons</Typography>
                <WeaponSummaryBlock character={character} weapons={weapons} />
              </BlockPaper>
            </Grid>
          </Hidden>

          <Grid item xs={12} md={8}>
            <CombatBlock
              character={character}
              weapons={weapons}
              merits={merits}
              penalties={penalties}
              pools={pools}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <SocialBlock
              character={character}
              penalties={penalties}
              pools={pools}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <ArmorSummary character={character} pools={pools} />
          </Grid>

          <Grid item xs={12} md={3}>
            <IntimacySummary character={character} canEdit={canEdit} />
          </Grid>

          {showLimit && (
            <Grid item xs={12} md={2}>
              <LimitTrackBlock character={character} />
            </Grid>
          )}

          {character.is_sorcerer && (
            <Grid item xs={12} md={2}>
              <SorceryBlock character={character} />
            </Grid>
          )}

          {character.type != 'Character' && (
            <Grid item xs={12}>
              <CharmSummaryBlock character={character} />
            </Grid>
          )}
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, props: Props) {
  const id = props.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let weapons = []
  let merits = []
  let pools
  let penalties

  if (character != undefined) {
    weapons = getWeaponsForCharacter(state, id)
    merits = getMeritsForCharacter(state, id)
    pools = getPoolsAndRatings(state, id)
    penalties = getPenalties(state, id)
  }

  return {
    character,
    weapons,
    merits,
    penalties,
    pools,
    canEdit: canIEditCharacter(state, id),
  }
}

export default ProtectedComponent(connect(mapStateToProps)(CharacterSheet))
