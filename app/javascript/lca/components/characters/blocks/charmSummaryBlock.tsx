import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Launch } from '@mui/icons-material'
import { Divider, Typography, type SxProps } from '@mui/material'

import BlockPaper from '@/components/shared/BlockPaper'
import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import {
  getEvocationsForCharacter,
  getMartialArtsCharmsForCharacter,
  getNativeCharmsForCharacter,
  getSpellsForCharacter,
  getSpiritCharmsForCharacter,
} from '@/selectors'
import type { Character, Charm, Enhancer, Spell } from '@/utils/flow-types'

const charmName: SxProps = {
  typography: 'body2',
  fontSize: '1rem',
  marginRight: 0.5,
}
const charmInfo: SxProps = {
  typography: 'caption',
  textTransform: 'capitalize',
  marginRight: 0.5,
}
const charmBody: SxProps = {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'noWrap',
  minWidth: { xl: '10em', xs: '100%' },
}

function SingleCharm({ charm }: { charm: Charm }) {
  return (
    <>
      <Typography
        component="div"
        className="flexContainerWrap"
        sx={{ marginY: 0.5, alignItems: 'baseline' }}
      >
        <Typography component="div" sx={charmName}>
          {charm.name}
        </Typography>
        <Typography sx={charmInfo}>
          ({charm.cost && charm.cost != '-' && charm.cost + ', '}
          {charm.timing}
          {charm.duration && ', ' + charm.duration}
          {charm.keywords.length > 0 &&
            ', keywords: ' + charm.keywords.join(', ')}
          )
        </Typography>
        <MarkdownDisplay noBlocks sx={charmBody}>
          {charm.summary.length > 0 ? charm.summary : charm.body}
        </MarkdownDisplay>
      </Typography>

      <Divider />
    </>
  )
}

function SingleSpell({ spell }: { spell: Spell }) {
  return (
    <>
      <Typography
        component="div"
        className="flexContainerWrap"
        sx={{ marginY: 0.5, alignItems: 'baseline' }}
      >
        <Typography component="div" sx={charmName}>
          {spell.name}
        </Typography>
        <Typography sx={charmInfo}>
          {spell.control && '(Control Spell) '}({spell.cost}
          ,&nbsp;
          {spell.duration}
          {spell.keywords.length > 0 &&
            ', keywords: ' + spell.keywords.join(', ')}
          )
        </Typography>
        <Typography component="div" sx={charmBody}>
          {spell.body}
        </Typography>
      </Typography>
      <Divider />
    </>
  )
}

interface ExposedProps {
  character: Character
}
type Props = ExposedProps & {
  nativeCharms: Charm[]
  martialArtsCharms: Charm[]
  evocations: Charm[]
  spiritCharms: Charm[]
  spells: Spell[]
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

  const natives = nativeCharms.map((c) => (
    <SingleCharm key={c.id} charm={c} character={character} />
  ))
  const maCharms = martialArtsCharms.map((c) => (
    <SingleCharm key={c.id} charm={c} character={character} />
  ))
  const evo = evocations.map((c) => (
    <SingleCharm key={c.id} charm={c} character={character} />
  ))
  const spirit = spiritCharms.map((c) => (
    <SingleCharm key={c.id} charm={c} character={character} />
  ))
  const spl = spells.map((c) => (
    <SingleSpell key={c.id} spell={c} character={character} />
  ))
  return (
    <BlockPaper>
      <Typography
        variant="h6"
        gutterBottom
        component={Link}
        to={`/characters/${character.id}/charms`}
        sx={{ textDecoration: 'none', color: 'unset' }}
      >
        Charms&nbsp;&nbsp;
        <Launch sx={{ verticalAlign: 'bottom' }} />
      </Typography>
      {natives}
      {maCharms}
      {evo}
      {spirit}
      {spl}
    </BlockPaper>
  )
}

function mapStateToProps(state, ownProps: ExposedProps) {
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

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps)
export default enhance(CharmSummaryBlock)
