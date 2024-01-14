import scrollToElement from 'scroll-to-element'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import withStyles from '@mui/styles/withStyles'

import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import { checkVisible } from '@/utils'
import type { Charm } from '@/utils/flow-types'
import styles from './CharmStyles.js'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Typography,
} from '@mui/material'

function scrollToPanel(e, appearing, id) {
  if (appearing) return false
  const elem = document.getElementById(`charm-expando-${id}`)
  if (!checkVisible(elem)) scrollToElement(elem)
}

const showEvo = (charm) =>
  charm.charm_type === 'Evocation' && charm.artifact_name !== ''

interface Props {
  charm: Charm
  classes: Record<string, $TSFixMe>
}
export const PrereqSummaryLine = ({ charm, classes }: Props) => (
  <Typography variant="caption">
    {showEvo(charm) && (
      <span className={classes.capitalize}>
        Evocation of {charm.artifact_name}
        ,&nbsp;
      </span>
    )}
    {charm.ability && (
      <span className={classes.capitalize}>
        {charm.ability} {charm.min_ability}
        ,&nbsp;
      </span>
    )}
    {charm.charm_type === 'MartialArts' && (
      <span className={classes.capitalize}>
        {charm.style} style {charm.min_ability}
        ,&nbsp;
      </span>
    )}
    Essence {charm.min_essence},&nbsp;
  </Typography>
)
export const CharmSummaryLine = ({ charm }: { charm: Charm }) => (
  <MarkdownDisplay
    source={
      charm.summary.length === 0
        ? charm.body.substring(0, 200) + (charm.body.length > 200 ? '...' : '')
        : charm.summary
    }
    noBlocks
  />
)
type BlockProps = Props & {
  isOpen: boolean
}
export const CharmSummaryBlock = ({ charm, isOpen, classes }: BlockProps) => (
  <Collapse in={!isOpen}>
    <PrereqSummaryLine charm={charm} classes={classes} />
    <Typography variant="caption" className={classes.capitalize}>
      {charm.cost}, {charm.timing}, {charm.duration}
    </Typography>
    <CharmSummaryLine charm={charm} />
  </Collapse>
)
type dProps = Props & {
  openCharm: number | null
  onOpenChange: $TSFixMeFunction
}

function CharmDisplay({ charm, openCharm, onOpenChange, classes }: dProps) {
  const isOpen = openCharm === charm.id
  return (
    <Accordion
      expanded={isOpen}
      onChange={onOpenChange(charm.id)}
      CollapseProps={{
        onEntered: (e, a) => scrollToPanel(e, a, charm.id),
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{
          expanded: classes.expandedSummary,
        }}
      >
        <div className={classes.summaryWrap}>
          <div id={`charm-expando-${charm.id}`} className={classes.charmAnchor}>
            &nbsp;
          </div>
          <Typography variant="h6">{charm.name}</Typography>

          <CharmSummaryBlock charm={charm} isOpen={isOpen} classes={classes} />
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div className={classes.detailsWrap}>
          <Typography>
            <strong>Cost:</strong> {charm.cost}
            ;&nbsp;
            <strong>Mins:</strong>
            &nbsp;
            {charm.ability && (
              <span className={classes.capitalize}>
                {charm.ability} {charm.min_ability}
                ,&nbsp;
              </span>
            )}
            {charm.charm_type === 'MartialArts' && (
              <span className={classes.capitalize}>
                Martial Arts ({charm.style} style) {charm.min_ability}
                ,&nbsp;
              </span>
            )}
            Essence {charm.min_essence}
            <br />
            <strong>Type:</strong>
            &nbsp;
            <span className={classes.capitalize}>{charm.timing}</span>
            <br />
            <strong>Keywords:</strong> {charm.keywords.join(', ') || 'None'}
            <br />
            <strong>Duration:</strong>
            &nbsp;
            <span className={classes.capitalize}>{charm.duration}</span>
            <br />
            <strong>Prerequisite Charms:</strong> {charm.prereqs || 'None'}
          </Typography>

          <MarkdownDisplay source={charm.body} />

          {charm.ref != '' && (
            <Typography variant="caption">Ref: {charm.ref}</Typography>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default withStyles(styles)(CharmDisplay)
