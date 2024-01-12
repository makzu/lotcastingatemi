import withStyles from '@mui/styles/withStyles'

import * as calc from 'utils/calculated'
import { WithSharedStats } from 'types/shared'

const styles = (theme) => ({
  boxWrap: {
    display: 'inline-block',
    textAlign: 'center',
    marginRight: '0.25em',
  },
  healthLevelBox: {
    backgroundColor: theme.palette.background.paper,
    width: '1.25em',
    height: '1.25em',
    border: '0.2em solid black',
    overflow: 'hidden',
  },
  healthLevelLabel: {
    ...theme.typography.caption,
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
    fontSize: '170%',
    fontWeight: '100',
    position: 'relative',
    top: '-0.3em',
    left: '-0.15em',
  },
  aggDamage: {
    fontSize: '150%',
    position: 'relative',
    top: '-0.25em',
    left: '-0.15em',
  },
})

function HealthLevelBoxes({ character, classes }: Props) {
  const totalHealthLevels = calc.totalHealthLevels(character)
  const hlBoxes = []
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

  for (let i = 0; i < totalHealthLevels; i++) {
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
      box = (
        <div className={classes.boxWrap} key={i}>
          <div className={classes.healthLevelBox}>
            <span className={classes.aggDamage}>✱</span>
          </div>
          <div className={classes.healthLevelLabel}>{level}</div>
        </div>
      )
      aggDamage--
    } else if (lthDamage > 0) {
      box = (
        <div className={classes.boxWrap} key={i}>
          <div className={classes.healthLevelBox}>
            <span className={classes.lethalDamage}>✖</span>
          </div>
          <div className={classes.healthLevelLabel}>{level}</div>
        </div>
      )
      lthDamage--
    } else if (bshDamage > 0) {
      box = (
        <div className={classes.boxWrap} key={i}>
          <div className={classes.healthLevelBox}>
            <span className={classes.bashingDamage}>╲</span>
          </div>
          <div className={classes.healthLevelLabel}>{level}</div>
        </div>
      )
      bshDamage--
    } else {
      box = (
        <div className={classes.boxWrap} key={i}>
          <div className={classes.healthLevelBox}>&nbsp;</div>
          <div className={classes.healthLevelLabel}>{level}</div>
        </div>
      )
    }

    hlBoxes.push(box)
  }

  return <div>{hlBoxes}</div>
}

export default withStyles(styles)(HealthLevelBoxes)
