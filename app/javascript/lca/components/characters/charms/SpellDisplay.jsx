// @flow
import scrollToElement from 'scroll-to-element'

import withStyles from '@mui/styles/withStyles'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import styles from './CharmStyles.js'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import { checkVisible } from 'utils'
import type { Spell } from 'utils/flow-types'

function scrollToPanel(e, appearing, id) {
  if (appearing) return false
  const elem = document.getElementById(`spell-expando-${id}`)
  if (!checkVisible(elem)) scrollToElement(elem)
}

export type SpellSummaryLineProps = {
  spell: Spell,
}
export const SpellSummaryLine = ({ spell }: SpellSummaryLineProps) => (
  <MarkdownDisplay
    source={
      spell.body.substring(0, 200) + (spell.body.length > 200 ? '...' : '')
    }
    noBlocks
  />
)

export type SpellSummaryBlockProps = {
  spell: Spell,
  isOpen: boolean,
  classes: Object,
}

export const SpellSummaryBlock = (props: SpellSummaryBlockProps) => {
  const { spell, isOpen, classes } = props

  return (
    <Collapse in={!isOpen}>
      {spell.control && (
        <Typography variant="caption">Control Spell</Typography>
      )}
      <Typography variant="caption" className={classes.capitalize}>
        {spell.cost}, {spell.duration}
      </Typography>
      <SpellSummaryLine spell={spell} />
    </Collapse>
  )
}

export type SpellDisplayProps = {
  spell: Spell,
  openSpell: number | null,
  onOpenChange: Function,
  classes: Object,
}

function SpellDisplay(props: SpellDisplayProps) {
  const { spell, openSpell, onOpenChange, classes } = props
  const isOpen = openSpell === spell.id
  return (
    <Accordion
      expanded={isOpen}
      onChange={onOpenChange(spell.id)}
      CollapseProps={{ onEntered: (e, a) => scrollToPanel(e, a, spell.id) }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ expanded: classes.expandedSummary }}
      >
        <div className={classes.summaryWrap}>
          <div id={`spell-expando-${spell.id}`} className={classes.charmAnchor}>
            &nbsp;
          </div>
          <Typography variant="h6">{spell.name}</Typography>

          <SpellSummaryBlock spell={spell} isOpen={isOpen} classes={classes} />
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div className={classes.detailsWrap}>
          <Typography paragraph>
            <strong>Circle:</strong>{' '}
            <span className={classes.capitalize}>{spell.circle}</span>
            <br />
            <strong>Cost:</strong> {spell.cost}
            ;&nbsp;
            <strong>Keywords:</strong>{' '}
            <span className={classes.capitalize}>
              {spell.keywords.join(', ') || 'None'}
            </span>
            <br />
            <strong>Duration:</strong>
            &nbsp;
            <span className={classes.capitalize}>{spell.duration}</span>
          </Typography>

          <MarkdownDisplay source={spell.body} />

          {spell.ref != '' && (
            <Typography variant="caption">Ref: {spell.ref}</Typography>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
export default withStyles(styles)(SpellDisplay)
