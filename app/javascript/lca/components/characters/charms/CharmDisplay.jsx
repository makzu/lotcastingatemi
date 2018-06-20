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
import type { Charm } from 'utils/flow-types'

function scrollToPanel(e, appearing, id) {
  if (appearing) return false
  const elem = document.getElementById(`charm-expando-${id}`)
  if (!checkVisible(elem)) scrollToElement(elem)
}

const showEvo = charm =>
  charm.charm_type === 'Evocation' && charm.artifact_name !== ''

type Props = { charm: Charm, classes: Object }
export const PrereqSummaryLine = ({ charm, classes }: Props) => (
  <Typography variant="caption">
    {showEvo(charm) && (
      <span className={classes.capitalize}>
        Evocation of {charm.artifact_name},&nbsp;
      </span>
    )}
    {charm.ability && (
      <span className={classes.capitalize}>
        {charm.ability} {charm.min_ability},&nbsp;
      </span>
    )}
    {charm.charm_type === 'MartialArts' && (
      <span className={classes.capitalize}>
        {charm.style} style {charm.min_ability},&nbsp;
      </span>
    )}
    Essence {charm.min_essence}
  </Typography>
)

export const CharmSummaryLine = ({ charm, classes }: Props) => (
  <Typography className={classes.summary} component="div">
    <ReactMarkdown
      source={
        charm.summary.length === 0
          ? charm.body.substring(0, 200) +
            (charm.body.length > 200 ? '...' : '')
          : charm.summary
      }
      allowedTypes={['strong', 'emphasis', 'delete']}
      unwrapDisallowed
      className={classes.markdown}
    />
  </Typography>
)

type BlockProps = Props & { isOpen: boolean }
export const CharmSummaryBlock = ({ charm, isOpen, classes }: BlockProps) => (
  <Collapse in={!isOpen}>
    <PrereqSummaryLine charm={charm} classes={classes} />
    <Typography variant="caption" className={classes.capitalize}>
      {charm.cost}, {charm.timing}, {charm.duration}
    </Typography>
    <CharmSummaryLine charm={charm} classes={classes} />
  </Collapse>
)

type dProps = Props & { openCharm: number, onOpenChange: Function }
function CharmDisplay({ charm, openCharm, onOpenChange, classes }: dProps) {
  const isOpen = openCharm === charm.id
  return (
    <ExpansionPanel
      expanded={isOpen}
      onChange={onOpenChange(charm.id)}
      CollapseProps={{ onEntered: (e, a) => scrollToPanel(e, a, charm.id) }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ expanded: classes.expandedSummary }}
      >
        <div className={classes.summaryWrap}>
          <div id={`charm-expando-${charm.id}`} className={classes.charmAnchor}>
            &nbsp;
          </div>
          <Typography variant="title">{charm.name}</Typography>

          <CharmSummaryBlock charm={charm} isOpen={isOpen} classes={classes} />
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <div className={classes.detailsWrap}>
          <Typography>
            <strong>Cost:</strong> {charm.cost};&nbsp;
            <strong>Mins:</strong>&nbsp;
            {charm.ability && (
              <span className={classes.capitalize}>
                {charm.ability} {charm.min_ability},&nbsp;
              </span>
            )}
            {charm.charm_type === 'MartialArts' && (
              <span className={classes.capitalize}>
                Martial Arts ({charm.style} style) {charm.min_ability},&nbsp;
              </span>
            )}
            Essence {charm.min_essence}
            <br />
            <strong>Type:</strong>&nbsp;
            <span className={classes.capitalize}>{charm.timing}</span>
            <br />
            <strong>Keywords:</strong> {charm.keywords.join(', ') || 'None'}
            <br />
            <strong>Duration:</strong>&nbsp;
            <span className={classes.capitalize}>{charm.duration}</span>
            <br />
            <strong>Prerequisite Charms:</strong> {charm.prereqs || 'None'}
          </Typography>

          <Typography className={classes.charmBody} component="div">
            <ReactMarkdown source={charm.body} />
          </Typography>

          {charm.ref != '' && (
            <Typography variant="caption">Ref: {charm.ref}</Typography>
          )}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
export default withStyles(styles)(CharmDisplay)
