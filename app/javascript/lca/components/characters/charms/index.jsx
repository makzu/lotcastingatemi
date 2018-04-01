import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import styles from './CharmStyles.js'
import CharmDisplay from './CharmDisplay.jsx'
import CharmFilter from './CharmFilter.jsx'
import SpellDisplay from './SpellDisplay.jsx'

import ProtectedComponent from '../../../containers/ProtectedComponent.jsx'
import {
  getSpecificCharacter, getMeritsForCharacter, getNativeCharmsForCharacter,
  getMartialArtsCharmsForCharacter, getEvocationsForCharacter,
  getSpellsForCharacter, getSpiritCharmsForCharacter,
  getAllAbilitiesWithCharmsForCharacter,
} from '../../../selectors/'

class CharmFullPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { charmFilter: '', openCharm: null }
    this.setFilter = this.setFilter.bind(this)
    this.setOpenCharm = this.setOpenCharm.bind(this)
  }

  setFilter(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  setOpenCharm(charm) {
    return (e, expanded) => this.setState({ openCharm: expanded ? charm : null })
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const {
      character, nativeCharms, abilities, martialArtsCharms, evocations,
      spiritCharms, spells, classes
    } = this.props
    const { charmFilter, openCharm } = this.state
    const { setFilter, setOpenCharm } = this

    let filteredNatives = nativeCharms
    if (charmFilter !== '')
      filteredNatives = nativeCharms.filter((c) => c.ability === charmFilter)

    const natives = filteredNatives.map((c) =>
      <Grid item xs={ 12 } md={ 6 } xl={ 4 } key={ c.id }>
        <CharmDisplay charm={ c } character={ character }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    )
    const maCharms = martialArtsCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } xl={ 4 } key={ c.id }>
        <CharmDisplay charm={ c } character={ character }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    )
    const evo = evocations.map((c) =>
      <Grid item xs={ 12 } md={ 6 } xl={ 4 } key={ c.id }>
        <CharmDisplay charm={ c } character={ character }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    )
    const spirit = spiritCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } xl={ 4 } key={ c.id }>
        <CharmDisplay charm={ c } character={ character }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    )
    const spl = spells.map((c) =>
      <Grid item xs={ 12 } md={ 6 } xl={ 4 } key={ c.id }>
        <SpellDisplay spell={ c } character={ character } />
      </Grid>
    )

    return <Grid container spacing={ 24 }>
      <Grid item hidden={{ smUp: true }} xs={ 12 }>
        <div style={{ height: '1em', }}>&nbsp;</div>
      </Grid>

      <Grid item xs={ 12 } className={ classes.stickyHeader }>
        <Typography variant="headline">
          Charms
          <CharmFilter abilities={ abilities } filter={ charmFilter }
            name="charmFilter" onChange={ setFilter }
          />
        </Typography>
      </Grid>
      { natives }

      { maCharms.length > 0 &&
        <Grid item xs={ 12 } className={ classes.stickyHeader }>
          <Typography variant="headline">Martial Arts</Typography>
        </Grid>
      }
      { maCharms }

      { evo.length > 0 &&
        <Grid item xs={ 12 } className={ classes.stickyHeader }>
          <Typography variant="headline">Evocations</Typography>
        </Grid>
      }
      { evo }

      { spirit.length > 0 &&
        <Grid item xs={ 12 } className={ classes.stickyHeader }>
          <Typography variant="headline">Spirit Charms</Typography>
        </Grid>
      }
      { spirit }

      { spl.length > 0 &&
        <Grid item xs={ 12 } className={ classes.stickyHeader }>
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
  abilities: PropTypes.arrayOf(PropTypes.string),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
  spells: PropTypes.arrayOf(PropTypes.object),
  spiritCharms: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)

  let nativeCharms = []
  let abilities = []
  let martialArtsCharms = []
  let evocations = []
  let artifacts = []
  let spiritCharms = []
  let spells = []

  if (character !== undefined) {
    nativeCharms = getNativeCharmsForCharacter(state, id)
    abilities = getAllAbilitiesWithCharmsForCharacter(state, id)
    martialArtsCharms = getMartialArtsCharmsForCharacter(state, id)
    evocations = getEvocationsForCharacter(state, id)
    spells = getSpellsForCharacter(state, id)
    spiritCharms = getSpiritCharmsForCharacter(state, id)
    artifacts = getMeritsForCharacter(state, id).filter((m) =>
      m.merit_name.toLowerCase() == 'artifact' || m.merit_name.toLowerCase() == 'hearthstone' || m.merit_name.toLowerCase() == 'warstrider'
    )
  }

  return {
    character,
    nativeCharms,
    abilities,
    martialArtsCharms,
    evocations,
    artifacts,
    spells,
    spiritCharms,
  }
}

export default ProtectedComponent(
  withStyles(styles)(
    connect(mapStateToProps)(
      CharmFullPage
    )
  )
)
