// @flow
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Launch from '@material-ui/icons/Launch'

import BlockPaper from 'components/generic/blockPaper.jsx'
import {
  getNativeCharmsForCharacter,
  getMartialArtsCharmsForCharacter,
  getEvocationsForCharacter,
  getSpiritCharmsForCharacter,
  getSpellsForCharacter,
} from 'selectors'
import type { Character, Charm, Spell } from 'utils/flow-types'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  bodyWrap: {},
  body: {
    flex: 1,
    minWidth: '10em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'noWrap',
    [theme.breakpoints.down('md')]: { minWidth: '100%' },
  },
  name: {
    ...theme.typography.body2,
    fontSize: '1rem',
    marginRight: theme.spacing.unit / 2,
  },
  info: {
    ...theme.typography.caption,
    textTransform: 'capitalize',
    marginRight: theme.spacing.unit / 2,
  },
})

function _SingleCharm({ charm, classes }: { charm: Charm, classes: Object }) {
  return (
    <Fragment>
      <Typography component="div" className={classes.root}>
        <div className={classes.name}>{charm.name}</div>
        <div className={classes.info}>
          (
          {charm.cost && charm.cost != '-' && charm.cost + ', '}
          {charm.timing}
          {charm.duration && ', ' + charm.duration}
          {charm.keywords.length > 0 &&
            ', keywords: ' + charm.keywords.join(', ')}
          )
        </div>
        <div className={classes.body}>{charm.body}</div>
      </Typography>

      <Divider />
    </Fragment>
  )
}
_SingleCharm.propTypes = {
  charm: PropTypes.object,
  classes: PropTypes.object,
}
const SingleCharm = withStyles(styles)(_SingleCharm)

function _SingleSpell({ spell, classes }: { spell: Spell, classes: Object }) {
  return (
    <Fragment>
      <Typography component="div" className={classes.root}>
        <div className={classes.name}>{spell.name}</div>
        <div className={classes.info}>
          {spell.control && '(Control Spell) '}
          (
          {spell.cost},&nbsp;
          {spell.duration}
          {spell.keywords.length > 0 &&
            ', keywords: ' + spell.keywords.join(', ')}
          )
        </div>
        <div className={classes.body}>{spell.body}</div>
      </Typography>
      <Divider />
    </Fragment>
  )
}
_SingleSpell.propTypes = {
  spell: PropTypes.object,
  classes: PropTypes.object,
}
const SingleSpell = withStyles(styles)(_SingleSpell)

type Props = {
  character: Character,
  nativeCharms: Array<Charm>,
  martialArtsCharms: Array<Charm>,
  evocations: Array<Charm>,
  spiritCharms: Array<Charm>,
  spells: Array<Charm>,
}
function CharmSummaryBlock(props: Props) {
  const {
    character,
    nativeCharms,
    martialArtsCharms,
    evocations,
    spiritCharms,
    spells,
  } = props

  // Mortals don't need Charms displayed
  if (character.type == 'Character') {
    return <div />
  }

  const natives = nativeCharms.map(c => (
    <SingleCharm key={c.id} charm={c} character={character} />
  ))
  const maCharms = martialArtsCharms.map(c => (
    <SingleCharm key={c.id} charm={c} character={character} />
  ))
  const evo = evocations.map(c => (
    <SingleCharm key={c.id} charm={c} character={character} />
  ))
  const spirit = spiritCharms.map(c => (
    <SingleCharm key={c.id} charm={c} character={character} />
  ))
  const spl = spells.map(c => (
    <SingleSpell key={c.id} spell={c} character={character} />
  ))

  return (
    <BlockPaper>
      <Typography
        variant="title"
        gutterBottom
        component={Link}
        to={`/characters/${character.id}/charms`}
        style={{ textDecoration: 'none' }}
      >
        Charms&nbsp;&nbsp;
        <Launch style={{ verticalAlign: 'bottom' }} />
      </Typography>
      {natives}
      {maCharms}
      {evo}
      {spirit}
      {spl}
    </BlockPaper>
  )
}

function mapStateToProps(state, ownProps) {
  const { character } = ownProps
  const { id } = character

  let evocations = [],
    martialArtsCharms = [],
    nativeCharms = [],
    spiritCharms = [],
    spells = []

  if (character !== undefined) {
    nativeCharms = getNativeCharmsForCharacter(state, id)
    martialArtsCharms = getMartialArtsCharmsForCharacter(state, id)
    spiritCharms = getSpiritCharmsForCharacter(state, id)
    evocations = getEvocationsForCharacter(state, id)
    spells = getSpellsForCharacter(state, id)
  }

  return {
    nativeCharms,
    martialArtsCharms,
    evocations,
    spiritCharms,
    spells,
  }
}

export default connect(mapStateToProps)(CharmSummaryBlock)
