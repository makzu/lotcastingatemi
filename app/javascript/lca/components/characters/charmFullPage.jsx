import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import BlockPaper from '../generic/blockPaper.jsx'
import { isAbilityCharm } from '../../utils/calculated'

const styles = theme => ({
  capitalize: {
    textTransform: 'capitalize',
  },
  meritName: { ...theme.typography.caption,
    textTransform: 'capitalize',
  },
  maStyleLine: {

  },
})

function _SingleCharm(props) {
  const { charm, classes } = props

  const ability = charm.type == 'MartialArtsCharm' ? `Martial Arts (${charm.style} style)` : charm.ability

  return <BlockPaper>
    <Typography variant="title">
      { charm.name }
    </Typography>

    { charm.type == 'Evocation' &&
      <Typography variant="caption" className={ classes.capitalize }>
        Evocation of { charm.artifact_name }
      </Typography>
    }
    { charm.type == 'MartialArtsCharm' &&
      <Typography variant="caption" className={ classes.capitalize }>
        { charm.style } Style
      </Typography>
    }

    <Typography paragraph>
      <strong>Cost:</strong> { charm.cost };&nbsp;
      <strong>Mins:</strong>&nbsp;
      { isAbilityCharm(charm) &&
        <span className={ classes.capitalize }>
          { ability } { charm.min_ability},&nbsp;
        </span>
      }
      Essence { charm.min_essence }
      <br />

      <strong>Type:</strong>&nbsp;
      <span className={ classes.capitalize }>{ charm.timing }</span>
      <br />

      <strong>Keywords:</strong> { charm.keywords.join(', ') || 'None' }
      <br />

      <strong>Duration:</strong>&nbsp;
      <span className={ classes.capitalize }>{ charm.duration }</span>
      <br />

      <strong>Prerequisite Charms:</strong> { charm.prereqs || 'None' }
    </Typography>

    <Typography>{ charm.body }</Typography>

    { charm.ref != '' &&
      <Typography variant="caption">Ref: { charm.ref }</Typography>
    }
  </BlockPaper>
}
_SingleCharm.propTypes = {
  charm: PropTypes.object,
  classes: PropTypes.object,
}
const SingleCharm = withStyles(styles)(_SingleCharm)

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

    const { character, nativeCharms, martialArtsCharms, evocations } = this.props

    const natives = nativeCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SingleCharm charm={ c } character={ character } />
      </Grid>
    )
    const maCharms = martialArtsCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SingleCharm charm={ c } character={ character } />
      </Grid>
    )
    const evo = evocations.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SingleCharm charm={ c } character={ character } />
      </Grid>
    )

    return <div>
      <Grid container spacing={ 24 }>
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

        <Grid item xs={ 12 }>
          <Typography variant="headline">Spells</Typography>
        </Grid>
      </Grid>
    </div>
  }
}
CharmFullPage.propTypes = {
  character: PropTypes.object,
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
}

function mapStateToProps(state, ownProps) {
  const character = state.entities.characters[ownProps.match.params.characterId] || {}

  let nativeCharms = []
  let martialArtsCharms = []
  let evocations = []
  let artifacts = []
  let spells = []

  switch (character.type) {
  case 'SolarCharacter':
    nativeCharms = character.solar_charms.map((id) => state.entities.charms[id])
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

  return {
    character,
    nativeCharms,
    martialArtsCharms,
    evocations,
    artifacts,
    spells,
  }
}

export default connect(
  mapStateToProps
)(CharmFullPage)
