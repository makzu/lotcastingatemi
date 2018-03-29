import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import CharmDisplay from './CharmDisplay.jsx'
import SpellDisplay from './SpellDisplay.jsx'

class CharmFullPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const { character, nativeCharms, martialArtsCharms, evocations, spiritCharms, spells } = this.props

    const natives = nativeCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmDisplay charm={ c } character={ character } />
      </Grid>
    )
    const maCharms = martialArtsCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmDisplay charm={ c } character={ character } />
      </Grid>
    )
    const evo = evocations.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmDisplay charm={ c } character={ character } />
      </Grid>
    )
    const spirit = spiritCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmDisplay charm={ c } character={ character } />
      </Grid>
    )
    const spl = spells.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SpellDisplay spell={ c } character={ character } />
      </Grid>
    )

    return <Grid container spacing={ 24 }>
      <Grid item hidden={{ smUp: true }} xs={ 12 }>
        <div style={{ height: '1em', }}>&nbsp;</div>
      </Grid>

      <Grid item xs={ 12 }>
        <Typography variant="headline">Charms</Typography>
      </Grid>
      { natives }

      { maCharms.length > 0 &&
        <Grid item xs={ 12 }>
          <Typography variant="headline">Martial Arts</Typography>
        </Grid>
      }
      { maCharms }

      { evo.length > 0 &&
        <Grid item xs={ 12 }>
          <Typography variant="headline">Evocations</Typography>
        </Grid>
      }
      { evo }

      { spirit.length > 0 &&
        <Grid item xs={ 12 }>
          <Typography variant="headline">Spirit Charms</Typography>
        </Grid>
      }
      { spirit }

      { spl.length > 0 &&
        <Grid item xs={ 12 }>
          <Typography variant="headline">Spells</Typography>
        </Grid>
      }
      { spl }

    </Grid>
  }
}
CharmFullPage.propTypes = {
  character: PropTypes.object,
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
  spells: PropTypes.arrayOf(PropTypes.object),
  spiritCharms: PropTypes.arrayOf(PropTypes.object),
}

function mapStateToProps(state, ownProps) {
  const character = state.entities.characters[ownProps.match.params.characterId] || {}

  let nativeCharms = []
  let martialArtsCharms = []
  let evocations = []
  let artifacts = []
  let spiritCharms = []
  let spells = []

  if ( character.charms != undefined) {
    nativeCharms = character.charms.map((id) => state.entities.charms[id])
  }
  if (character.evocations != undefined) {
    evocations = character.evocations.map((id) => state.entities.charms[id])
  }
  if (character.martial_arts_charms != undefined) {
    martialArtsCharms = character.martial_arts_charms.map((id) => state.entities.charms[id])
  }
  if (character.weapons != undefined) {
    artifacts = character.merits.map((id) => state.entities.merits[id]).filter((m) => m.merit_name == 'artifact' )
  }
  if (character.spells != undefined) {
    spells = character.spells.map((id) => state.entities.spells[id])
  }
  if (character.spirit_charms != undefined) {
    spiritCharms = character.spirit_charms.map((id) => state.entities.charms[id])
  }

  return {
    character,
    nativeCharms,
    martialArtsCharms,
    evocations,
    artifacts,
    spells,
    spiritCharms,
  }
}

export default connect(
  mapStateToProps
)(CharmFullPage)
