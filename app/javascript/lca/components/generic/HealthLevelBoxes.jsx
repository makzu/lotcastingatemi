import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import * as calc from '../../utils/calculated'
import { withHealthLevels } from '../../utils/propTypes'

const styles = theme => ({
  boxWrap: {
    display: 'inline-block',
    textAlign: 'center',
    marginRight: '0.25em',
  },
  healthLevelBox: {
    backgroundColor: theme.palette.background.paper,
    width: '1.25em',
    height: '1.25em',
    border: '0.2em solid black'
  },
  healthLevelLabel: { ...theme.typography.caption,
    textAlign: 'center',
  },
  bashingDamage: {
    fontSize: '100%',
    fontWeight: 'bold',
    position: 'relative',
    top: '-0.125em',
    left: '-0.05em',
  },
  lethalDamage: {
    fontSize: '180%',
    fontWeight: '100',
    position: 'relative',
    top: '-0.35em',
    left: '-0.1em',
  },
  aggDamage: {
    fontSize: '150%',
    position: 'relative',
    top: '-0.25em',
    left: '-0.15em',
  },
})

function HealthLevelBoxes(props) {
  const { character, classes } = props
  const totalHealthLevels = calc.totalHealthLevels(character)

  let hlBoxes = []
  let box
  let level

  let aggDamage = character.damage_aggravated
  let lthDamage = character.damage_lethal
  let bshDamage = character.damage_bashing

  let lv0s = character.health_level_0s
  let lv1s = character.health_level_1s
  let lv2s = character.health_level_2s
  let lv4s = character.health_level_4s
  let lvis = character.health_level_incap

  for (var i = 0; i < totalHealthLevels; i++) {
    if (lv0s > 0) {
      level = '0'
      lv0s--
    } else if (lv1s > 0) {
      level = '-1'
      lv1s--
    } else if (lv2s > 0) {
      level = '-2'
      lv2s--
    } else if (lv4s > 0) {
      level = '-4'
      lv4s--
    } else if (lvis > 0) {
      level = 'in'
      lvis--
    } else {
      level = 'X'
    }

    if (aggDamage > 0) {
      box = <div className={ classes.boxWrap } key={ i }>
        <div className={ classes.healthLevelBox }>
          <span className={ classes.aggDamage }>✱</span>
        </div>
        <div className={ classes.healthLevelLabel }>
          { level }
        </div>
      </div>
      aggDamage--
    } else if (lthDamage > 0) {
      box = <div className={ classes.boxWrap } key={ i }>
        <div className={ classes.healthLevelBox }>
          <span className={ classes.lethalDamage }>❌</span>
        </div>
        <div className={ classes.healthLevelLabel }>
          { level }
        </div>
      </div>
      lthDamage--
    } else if (bshDamage > 0) {
      box = <div className={ classes.boxWrap } key={ i }>
        <div className={ classes.healthLevelBox }>
          <span className={ classes.bashingDamage }>╲</span>
        </div>
        <div className={ classes.healthLevelLabel }>
          { level }
        </div>
      </div>
      bshDamage--
    } else {
      box = <div className={ classes.boxWrap } key={ i }>
        <div className={ classes.healthLevelBox }>
          &nbsp;
        </div>
        <div className={ classes.healthLevelLabel }>
          { level }
        </div>
      </div>
    }

    hlBoxes.push(box)
  }

  return <div>
    { hlBoxes }
  </div>
}

HealthLevelBoxes.propTypes = {
  character: PropTypes.shape(withHealthLevels),
  classes: PropTypes.object,
}

export default withStyles(styles)(HealthLevelBoxes)
