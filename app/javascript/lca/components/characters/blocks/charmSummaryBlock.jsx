import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'

import BlockPaper from '../../generic/blockPaper.jsx'
import { fullChar } from '../../../utils/propTypes'

function SingleCharm({ charm }) {
  return <div>
    <Typography>
      <strong>
        { charm.name }:
      </strong>&nbsp;
      (
      { charm.cost }
      , { charm.timing }
      , duration: { charm.duration }
      , keywords: { charm.keywords.join(', ') || 'none'}
      )&nbsp;
      { charm.body }
    </Typography>
    <Divider />
  </div>
}
SingleCharm.propTypes = {
  charm: PropTypes.object,
}

function SingleSpell({ spell }) {
  return <div>
    <Typography>
      <strong>
        { spell.name }
        { spell.control && ' (Control Spell)' }:
      </strong>&nbsp;
      (
      { spell.cost }
      , duration: { spell.duration }
      , keywords: { spell.keywords.join(', ') || 'none'}
      )&nbsp;
      { spell.body }
    </Typography>
    <Divider />
  </div>
}
SingleSpell.propTypes = {
  spell: PropTypes.object,
}

function CharmSummaryBlock(props) {
  const { character, nativeCharms, martialArtsCharms, evocations, spiritCharms, spells } = props

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
  const spirit = spiritCharms.map((c) =>
    <SingleCharm key={ c.id } charm={ c } character={ character } />
  )
  const spl = spells.map((c) =>
    <SingleSpell key={ c.id } spell={ c } character={ character } />
  )


  return <BlockPaper>
    <Typography variant="title" gutterBottom
      component={ Link } to={ `/characters/${character.id}/charms` }
      style={{ textDecoration: 'none', }}
    >
      Charms&nbsp;&nbsp;
      <Launch style={{ verticalAlign: 'bottom' }} />
    </Typography>
    { natives }
    { maCharms }
    { evo }
    { spirit }
    { spl }
  </BlockPaper>
}
CharmSummaryBlock.propTypes = {
  character: PropTypes.shape(fullChar),
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
  spiritCharms: PropTypes.arrayOf(PropTypes.object),
  spells: PropTypes.arrayOf(PropTypes.object),
}

function mapStateToProps(state, ownProps) {
  const { character } = ownProps
  let evocations = []
  let martialArtsCharms = []
  let nativeCharms = []
  let spiritCharms = []
  let spells = []

  if (character.charms != undefined) {
    nativeCharms = character.charms.map((id) => state.entities.charms[id])
  }
  if (character.evocations != undefined) {
    evocations = character.evocations.map((id) => state.entities.charms[id])
  }
  if (character.martial_arts_charms != undefined) {
    martialArtsCharms = character.martial_arts_charms.map((id) => state.entities.charms[id])
  }
  if (character.spirit_charms != undefined) {
    spiritCharms = character.spirit_charms.map((id) => state.entities.charms[id])
  }
  if (character.spells != undefined) {
    spells = character.spells.map((id) => state.entities.spells[id])
  }

  return {
    nativeCharms,
    martialArtsCharms,
    evocations,
    spiritCharms,
    spells,
  }
}

export default connect(
  mapStateToProps
)(CharmSummaryBlock)
