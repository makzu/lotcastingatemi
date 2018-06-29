// @flow
import React from 'react'
import ReactMarkdown from 'react-markdown'
import scrollToElement from 'scroll-to-element'

import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from './CharmStyles.js'
import { checkVisible } from 'utils'
import type { Spell } from 'utils/flow-types'

function scrollToPanel(e, appearing, id) {
  if (appearing) return false
  const elem = document.getElementById(`spell-expando-${id}`)
  if (!checkVisible(elem)) scrollToElement(elem)
}

export type SpellSummaryLineProps = {
  spell: Spell,
  classes: Object,
}
export const SpellSummaryLine = (props: SpellSummaryLineProps) => {
  const { spell, classes } = props

  return (
    <Typography className={classes.summary} component="div">
      <ReactMarkdown
        source={
          spell.body.substring(0, 200) + (spell.body.length > 200 ? '...' : '')
        }
        allowedTypes={['strong', 'emphasis', 'delete']}
        unwrapDisallowed
        className={classes.markdown}
      />
    </Typography>
  )
}

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
      <SpellSummaryLine spell={spell} classes={classes} />
    </Collapse>
  )
}

export type SpellDisplayProps = {
  spell: Spell,
  openSpell: number,
  onOpenChange: Function,
  classes: Object,
}

function SpellDisplay(props: SpellDisplayProps) {
  const { spell, openSpell, onOpenChange, classes } = props
  const isOpen = openSpell === spell.id
  return (
    <ExpansionPanel
      expanded={isOpen}
      onChange={onOpenChange(spell.id)}
      CollapseProps={{ onEntered: (e, a) => scrollToPanel(e, a, spell.id) }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ expanded: classes.expandedSummary }}
      >
        <div className={classes.summaryWrap}>
          <div id={`spell-expando-${spell.id}`} className={classes.charmAnchor}>
            &nbsp;
          </div>
          <Typography variant="title">{spell.name}</Typography>

          <SpellSummaryBlock spell={spell} isOpen={isOpen} classes={classes} />
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <div className={classes.detailsWrap}>
          <Typography paragraph>
            <strong>Circle:</strong>{' '}
            <span className={classes.capitalize}>{spell.circle}</span>
            <br />
            <strong>Cost:</strong> {spell.cost};&nbsp;
            <strong>Keywords:</strong>{' '}
            <span className={classes.capitalize}>
              {spell.keywords.join(', ') || 'None'}
            </span>
            <br />
            <strong>Duration:</strong>&nbsp;
            <span className={classes.capitalize}>{spell.duration}</span>
          </Typography>

          <Typography className={classes.spellBody} component="div">
            <ReactMarkdown source={spell.body} className={classes.markdown} />
          </Typography>

          {spell.ref != '' && (
            <Typography variant="caption">Ref: {spell.ref}</Typography>
          )}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
export default withStyles(styles)(SpellDisplay)
