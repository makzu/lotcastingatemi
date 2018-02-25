import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

import BlockPaper from '../generic/blockPaper.jsx'
import { fullChar } from '../../utils/propTypes'

function SingleCharm(props) {
  return <div>
    <Typography>
      <strong>
        { props.charm.name }:
      </strong>&nbsp;
      (
      { props.charm.cost }
      , { props.charm.timing }
      , duration: { props.charm.duration }
      , keywords: { props.charm.keywords || 'none'}
      )&nbsp;
      { props.charm.body }
    </Typography>
    <Divider />
  </div>
}
SingleCharm.propTypes = {
  charm: PropTypes.object,
}

function CharmSummaryBlock(props) {
  const { character, nativeCharms, martialArtsCharms, evocations } = props

  // Mortals don't need Charms displayed
  if (character.type == 'Character' ) {
    return <div />
  }

  const natives = nativeCharms.map((c) =>
    <SingleCharm key={ c.id } charm={ c } character={ character } />
  )
  const maCharms = martialArtsCharms.map((c) =>
    <SingleCharm key={ c.id } charm={ c } character={ character } />
  )
  const evo = evocations.map((c) =>
    <SingleCharm key={ c.id } charm={ c } character={ character } />
  )


  return <BlockPaper>
    <Typography variant="title" gutterBottom>
      <Link to={ `/characters/${character.id}/charms` }>Charms</Link>
    </Typography>
    { natives }
    { maCharms }

    { evocations.length > 0 && <h3>Evocations</h3> }
    { evocations.length > 0 && evo }
  </BlockPaper>
}
CharmSummaryBlock.propTypes = {
  character: PropTypes.shape(fullChar),
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
}

function mapStateToProps(state, ownProps) {
  const { character } = ownProps
  let evocations = []
  let martialArtsCharms = []
  let nativeCharms = []

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

  return {
    nativeCharms,
    martialArtsCharms,
    evocations,
  }
}

export default connect(
  mapStateToProps
)(CharmSummaryBlock)
