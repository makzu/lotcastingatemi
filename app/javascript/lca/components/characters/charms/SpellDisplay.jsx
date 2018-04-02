import React from 'react'
import PropTypes from 'prop-types'
import scrollToElement from 'scroll-to-element'

import { withStyles } from 'material-ui/styles'
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, } from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

import styles from './CharmStyles.js'

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect()
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}

function scrollToPanel(e, appearing, id) {
  if (appearing)
    return false
  const elem = document.getElementById(`spell-expando-${id}`)
  if(!checkVisible(elem))
    scrollToElement(elem)
}

export const PrereqSummaryLine = ({ spell, classes }) =>
  <Typography variant="caption">
    { spell.type === 'Evocation' && spell.artifact_name !== '' &&
      <span className={ classes.capitalize }>
        Evocation of { spell.artifact_name },&nbsp;
      </span>
    }
    { spell.ability &&
      <span className={ classes.capitalize }>
        { spell.ability } { spell.min_ability},&nbsp;
      </span>
    }
    { spell.type === 'MartialArtsSpell' &&
      <span className={ classes.capitalize }>
        { spell.style } style { spell.min_ability},&nbsp;
      </span>
    }
    Essence { spell.min_essence }
  </Typography>
PrereqSummaryLine.propTypes = { spell: PropTypes.object, classes: PropTypes.object }
export const SpellSummaryLine = ({ spell, classes }) =>
  <Typography className={ classes.summary }>
    { spell.body.substring(0, 160) }
    { spell.body.length > 160 && '...' }
  </Typography>
SpellSummaryLine.propTypes = { spell: PropTypes.object, classes: PropTypes.object }

export const SpellSummaryBlock = ({ spell, isOpen, classes }) =>
  <Collapse in={ !isOpen }>
    { spell.control && <Typography variant="caption">Control Spell</Typography> }
    <Typography variant="caption" className={ classes.capitalize }>
      { spell.cost }, { spell.duration }
    </Typography>
    <SpellSummaryLine spell={ spell } classes={ classes } />
  </Collapse>
SpellSummaryBlock.propTypes = {
  spell: PropTypes.object,
  isOpen: PropTypes.bool,
  classes: PropTypes.object,
}

function SpellDisplay({ spell, openSpell, onOpenChange, classes }) {
  const isOpen = openSpell === spell.id
  return <ExpansionPanel
    expanded={ isOpen }
    onChange={ onOpenChange(spell.id) }
    CollapseProps={{ onEntered: (e, a) => scrollToPanel(e, a, spell.id) }}
  >
    <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }
      classes={{ expanded: classes.expandedSummary }}
    >
      <div className={ classes.summaryWrap }>
        <div id={ `spell-expando-${spell.id}` } className={ classes.charmAnchor }>&nbsp;</div>
        <Typography variant="title">
          { spell.name }
        </Typography>

        <SpellSummaryBlock spell={ spell } isOpen={ isOpen } classes={ classes } />
      </div>
    </ExpansionPanelSummary>

    <ExpansionPanelDetails>
      <div className={ classes.detailsWrap }>
        <Typography paragraph>
          <strong>Circle:</strong> <span className={ classes.capitalize }>{ spell.circle }</span><br />
          <strong>Cost:</strong> { spell.cost };&nbsp;
          <strong>Keywords:</strong> <span className={ classes.capitalize }>{ spell.keywords.join(', ') || 'None' }</span>
          <br />

          <strong>Duration:</strong>&nbsp;
          <span className={ classes.capitalize }>{ spell.duration }</span>
        </Typography>

        <Typography className={ classes.spellBody }>{ spell.body }</Typography>

        { spell.ref != '' &&
          <Typography variant="caption">Ref: { spell.ref }</Typography>
        }
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>
}
SpellDisplay.propTypes = {
  spell: PropTypes.object.isRequired,
  openSpell: PropTypes.number,
  onOpenChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}
export default withStyles(styles)(SpellDisplay)
