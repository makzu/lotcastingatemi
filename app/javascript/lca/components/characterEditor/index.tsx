import { type ChangeEvent, Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import { deepEqual } from 'fast-equals'

import DocumentTitle from '@lca/components/shared/DocumentTitle.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import { updateCharacter } from '@lca/ducks/actions.ts'
import { getSpecificCharacter } from '@lca/ducks/selectors/index.ts'
import { getPenalties, getPoolsAndRatings } from '@lca/selectors/index.ts'
import type { Character } from '@lca/types/character.ts'
import AbilityEditor from './editors/AbilityEditor.tsx'
import AbyssalExaltEditor from './editors/AbyssalExaltEditor.tsx'
import ArmorEditor from './editors/ArmorEditor.tsx'
import AttributeEditor from './editors/AttributeEditor.tsx'
import BasicsEditor from './editors/BasicsEditor.tsx'
import CustomAbilityExaltEditor from './editors/CustomAbilityExaltEditor.tsx'
import CustomAttributeExaltEditor from './editors/CustomAttributeExaltEditor.tsx'
import CustomEssenceExaltEditor from './editors/CustomEssenceExaltEditor.tsx'
import DragonbloodExaltEditor from './editors/DragonbloodExaltEditor.tsx'
import HealthLevelEditor from './editors/HealthLevelEditor.tsx'
import IntimacyEditor from './editors/IntimacyEditor.tsx'
import LimitEditor from './editors/LimitEditor.tsx'
import MotePoolEditor from './editors/MotePoolEditor.tsx'
import SiderealExaltEditor from './editors/SiderealExaltEditor.tsx'
import SolarExaltEditor from './editors/SolarExaltEditor.tsx'
import SorceryEditor from './editors/SorceryEditor.tsx'
import SpecialtyEditor from './editors/SpecialtyEditor.tsx'
import WillpowerEditor from './editors/WillpowerEditor.tsx'
import AlchemicalExaltEditor from './exaltTraits/AlchemicalExaltEditor.tsx'
import InfernalExaltEditor from './exaltTraits/InfernalExaltEditor.tsx'
import LunarExaltEditor from './exaltTraits/LunarExaltEditor.tsx'
import WeaponEditor from './weapons/index.tsx'

type Props = {
  character: Character
  pools: Object
  penalties: Object
  updateCharacter: Function
}
class CharacterEditor extends Component<Props> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { character } = this.props

    if (value == null) return
    if (deepEqual(character[name], value)) return

    this.props.updateCharacter(character.id, { [name]: value })
  }

  handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const { character } = this.props
    const value = !character[name]

    this.props.updateCharacter(character.id, { [name]: value })
  }

  handleChangeMulti = (changes) => {
    this.props.updateCharacter(this.props.character.id, changes)
  }

  render() {
    /* Escape hatch */
    if (this.props.character === undefined)
      return (
        <div>
          <Typography paragraph>This Character has not yet loaded.</Typography>
        </div>
      )

    const { character, pools, penalties } = this.props
    const { handleChange, handleCheck, handleChangeMulti } = this
    const showLimit =
      character.type !== 'Character' &&
      (character.exalt_type || '').toLowerCase() !== 'dragon-blood'

    const handleRatingChange = handleChange

    return (
      <div>
        <DocumentTitle title={`${character.name} | Lot-Casting Atemi`} />

        <Hidden smUp>
          <div style={{ height: '2.5em' }}>&nbsp;</div>
        </Hidden>

        <Grid container spacing={3}>
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
          {character.type === 'LunarCharacter' && (
            <Grid item xs={12} md={6}>
              <LunarExaltEditor character={character} onChange={handleChange} />
            </Grid>
          )}
          {character.type === 'SiderealCharacter' && (
            <Grid item xs={12} md={6}>
              <SiderealExaltEditor
                character={character}
                onChange={handleChange}
              />
            </Grid>
          )}
          {character.type === 'AbyssalCharacter' && (
            <Grid item xs={12} md={6}>
              <AbyssalExaltEditor
                character={character}
                onChange={handleChange}
              />
            </Grid>
          )}
          {character.type === 'AlchemicalCharacter' && (
            <Grid item xs={12} md={6}>
              <AlchemicalExaltEditor
                character={character}
                onChange={handleChange}
                onCheck={handleCheck}
                onChangeMulti={handleChangeMulti}
              />
            </Grid>
          )}
          {character.type === 'InfernalCharacter' && (
            <Grid item xs={12} md={6}>
              <InfernalExaltEditor
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
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const id = props.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let pools, penalties

  if (character !== undefined) {
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
  connect(mapStateToProps, { updateCharacter })(CharacterEditor),
)
