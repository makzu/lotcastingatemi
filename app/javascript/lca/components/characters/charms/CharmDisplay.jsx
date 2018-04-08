import React from 'react'
import PropTypes from 'prop-types'
import scrollToElement from 'scroll-to-element'

import { withStyles } from 'material-ui/styles'
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, } from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from './CharmStyles.js'

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect()
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}

function scrollToPanel(e, appearing, id) {
  if (appearing)
    return false
  const elem = document.getElementById(`charm-expando-${id}`)
  if(!checkVisible(elem))
    scrollToElement(elem)
}

export const PrereqSummaryLine = ({ charm, classes }) =>
  <Typography variant="caption">
    { charm.type === 'Evocation' && charm.artifact_name !== '' &&
      <span className={ classes.capitalize }>
        Evocation of { charm.artifact_name },&nbsp;
      </span>
    }
    { charm.ability &&
      <span className={ classes.capitalize }>
        { charm.ability } { charm.min_ability},&nbsp;
      </span>
    }
    { charm.type === 'MartialArtsCharm' &&
      <span className={ classes.capitalize }>
        { charm.style } style { charm.min_ability},&nbsp;
      </span>
    }
    Essence { charm.min_essence }
  </Typography>
PrereqSummaryLine.propTypes = { charm: PropTypes.object, classes: PropTypes.object }
export const CharmSummaryLine = ({ charm, classes }) =>
  <Typography className={ classes.summary }>
    { charm.summary.length > 0 && charm.summary }
    { charm.summary.length === 0 &&
      <span>
        { charm.body.substring(0, 160) }
        { charm.body.length > 160 && '...' }
      </span>
    }
  </Typography>
CharmSummaryLine.propTypes = { charm: PropTypes.object, classes: PropTypes.object }

export const CharmSummaryBlock = ({ charm, isOpen, classes }) =>
  <Collapse in={ !isOpen }>
    <PrereqSummaryLine charm={ charm } classes={ classes } />
    <Typography variant="caption" className={ classes.capitalize }>
      { charm.cost }, { charm.timing }, { charm.duration }
    </Typography>
    <CharmSummaryLine charm={ charm } classes={ classes } />
  </Collapse>
CharmSummaryBlock.propTypes = {
  charm: PropTypes.object,
  isOpen: PropTypes.bool,
  classes: PropTypes.object,
}

function CharmDisplay({ charm, openCharm, onOpenChange, classes }) {
  const isOpen = openCharm === charm.id
  return <ExpansionPanel
    expanded={ isOpen }
    onChange={ onOpenChange(charm.id) }
    CollapseProps={{ onEntered: (e, a) => scrollToPanel(e, a, charm.id) }}
  >
    <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }
      classes={{ expanded: classes.expandedSummary }}
    >
      <div className={ classes.summaryWrap }>
        <div id={ `charm-expando-${charm.id}` } className={ classes.charmAnchor }>&nbsp;</div>
        <Typography variant="title">
          { charm.name }
        </Typography>

        <CharmSummaryBlock charm={ charm } isOpen={ isOpen } classes={ classes } />
      </div>
    </ExpansionPanelSummary>

    <ExpansionPanelDetails>
      <div className={ classes.detailsWrap }>
        <Typography paragraph>
          <strong>Cost:</strong> { charm.cost };&nbsp;
          <strong>Mins:</strong>&nbsp;
          { charm.ability &&
            <span className={ classes.capitalize }>
              { charm.ability } { charm.min_ability},&nbsp;
            </span>
          }
          { charm.type == 'MartialArtsCharm' &&
            <span className={ classes.capitalize }>
              Martial Arts ({ charm.style } style) { charm.min_ability},&nbsp;
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

        <Typography className={ classes.charmBody }>{ charm.body }</Typography>

        { charm.ref != '' &&
          <Typography variant="caption">Ref: { charm.ref }</Typography>
        }
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>
}
CharmDisplay.propTypes = {
  charm: PropTypes.object.isRequired,
  openCharm: PropTypes.number,
  onOpenChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}
export default withStyles(styles)(CharmDisplay)
