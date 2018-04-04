import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import Hidden from 'material-ui/Hidden'
import Typography from 'material-ui/Typography'

import AbilityEditor from './editors/abilityEditor.jsx'
import ArmorEditor from './editors/armorEditor.jsx'
import AttributeEditor from './editors/attributeEditor.jsx'
import BasicsEditor from './editors/basicsEditor.jsx'
import CustomAbilityExaltEditor from './editors/customAbilityExaltEditor.jsx'
import CustomAttributeExaltEditor from './editors/customAttributeExaltEditor.jsx'
import CustomEssenceExaltEditor from './editors/customEssenceExaltEditor.jsx'
import HealthLevelEditor from './editors/healthLevelEditor.jsx'
import IntimacyEditor from './editors/intimacyEditor.jsx'
import LimitEditor from './editors/limitEditor.jsx'
import MotePoolEditor from './editors/motePoolEditor.jsx'
import SpecialtyEditor from './editors/specialtyEditor.jsx'
import SolarExaltEditor from './editors/solarExaltEditor.jsx'
import SorceryEditor from './editors/sorceryEditor.jsx'
import WeaponEditor from './editors/weaponEditor.jsx'
import WillpowerEditor from './editors/willpowerEditor.jsx'
import XpEditor from './editors/xpEditor.jsx'
import ProtectedComponent from '../../containers/ProtectedComponent.jsx'
import { updateCharacter } from '../../ducks/actions.js'
import { getSpecificCharacter, getPenalties, getPoolsAndRatings } from '../../selectors'
import { fullChar } from '../../utils/propTypes'

class CharacterEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      character: this.props.character,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ character: newProps.character })
  }

  handleChange(e) {
    let { name, value } = e.target
    if (name == 'armor_tags')
      value = value.split(',')

    this.setState({ character: { ...this.state.character, [name]: value }})
  }

  handleBlur(e) {
    const { name } = e.target
    const { character } = this.state

    if (character[name] == this.props.character[name])
      return

    this.props.updateChar(character.id, name, character[name])
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { character } = this.state

    this.setState({ character: { ...character, [name]: value }})
    this.props.updateChar(character.id, name, value)
  }

  handleCheck(e) {
    const { name } = e.target
    const { character } = this.state
    const value = ! character[name]

    this.props.updateChar(character.id, name, value)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const { character } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleCheck } = this
    const { pools, penalties } = this.props

    return <div>
      <Hidden smUp>
        <div style={{ height: '2.5em', }}>&nbsp;</div>
      </Hidden>

      <Grid container spacing={ 24 }>
        <Grid item xs={ 12 } md={ character.type == 'Character' ? 12 : 6 }>
          <BasicsEditor character={ character }
            onChange={ handleChange } onBlur={ handleBlur }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        { character.type == 'SolarCharacter' &&
          <Grid item xs={ 12 } md={ 6 }>
            <SolarExaltEditor character={ character }
              onChange={ handleChange } onBlur={ handleBlur }
              onRatingChange={ handleRatingChange }
            />
          </Grid>
        }
        { character.type == 'CustomAbilityCharacter' &&
          <Grid item xs={ 12 } md={ 6 }>
            <CustomAbilityExaltEditor character={ character }
              onChange={ handleChange } onBlur={ handleBlur }
              onRatingChange={ handleRatingChange }
              onCheck={ handleCheck }
            />
          </Grid>
        }
        { character.type == 'CustomAttributeCharacter' &&
          <Grid item xs={ 12 } md={ 6 }>
            <CustomAttributeExaltEditor character={ character }
              onChange={ handleChange } onBlur={ handleBlur }
              onRatingChange={ handleRatingChange }
              onCheck={ handleCheck }
            />
          </Grid>
        }
        { character.type == 'CustomEssenceCharacter' &&
          <Grid item xs={ 12 } md={ 6 }>
            <CustomEssenceExaltEditor character={ character }
              onChange={ handleChange } onBlur={ handleBlur }
              onRatingChange={ handleRatingChange }
              onCheck={ handleCheck }
            />
          </Grid>
        }

        <Grid item xs={ 12 } sm={ 6 } lg={ 3 }>
          <HealthLevelEditor character={ character }
            penalties={ penalties }
            onChange={ handleChange } onBlur={ handleBlur }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } lg={ 4 }>
          <WillpowerEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 6 } lg={ 5 }>
          <MotePoolEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 6 } lg={ 3 }>
          <AttributeEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 6 } lg={ 4 }>
          <AbilityEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 6 } lg={ 5 }>
          <SpecialtyEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } md={ 6 }>
          <IntimacyEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 6 }>
          <ArmorEditor character={ character }
            pools={ pools }
            onChange={ handleChange } onBlur={ handleBlur }
            onCheck={ handleCheck }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        { character.type != 'Character' &&
          <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
            <LimitEditor character={ character }
              onChange={ handleChange } onBlur={ handleBlur }
              onRatingChange={ handleRatingChange }
            />
          </Grid>
        }

        <Grid item xs={ 12 } md={ 4 }>
          <SorceryEditor character={ character }
            onChange={ handleChange } onBlur={ handleBlur }
            onCheck={ handleCheck }
            onRatingChange={ handleRatingChange }
          />
        </Grid>

        <Grid item xs={ 12 }>
          <WeaponEditor character={ character } />
        </Grid>

        <Grid item xs={ 12 } lg={ 6 }>
          <XpEditor character={ character }
            onRatingChange={ handleRatingChange }
          />
        </Grid>
      </Grid>
    </div>
  }
}
CharacterEditor.propTypes = {
  character: PropTypes.shape(fullChar),
  pools: PropTypes.object,
  penalties: PropTypes.object,
  updateChar: PropTypes.func,
}

function mapStateToProps(state, props) {
  const id = props.match.params.characterId
  const character = getSpecificCharacter(state, id)
  let pools
  let penalties

  if (character != undefined) {
    penalties = getPenalties(state, id)
    pools = getPoolsAndRatings(state, id)
  }

  return {
    character,
    pools,
    penalties,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateChar: (id, trait, value) => {
      dispatch(updateCharacter(id, trait, value))
    },
  }
}

export default ProtectedComponent(
  connect(mapStateToProps, mapDispatchToProps)(
    CharacterEditor
  )
)
