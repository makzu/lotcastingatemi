import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'

import PoolLine from '../PoolLine.jsx'
import { getPoolsForWeapon } from '../../../selectors'
import { withAttributes, withAbilities, fullWeapon } from '../../../utils/propTypes'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  label: { ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    height: '2.5em',
    width: '5em',
    display: 'flex',
  },
  labelSpan: {
    alignSelf: 'flex-end',
  },
  name: { ...theme.typography.body2,
    width: '10rem',
    margin: theme.spacing.unit,
    marginLeft: 0,
    maxHeight: '5rem',
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  poolBlock: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    width: '5.5rem',
    maxHeight: '5rem',
  },
  narrowPoolBlock: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    width: '4.5rem',
  },
  tags: { ...theme.typography.body1,
    margin: theme.spacing.unit,
    marginLeft: 0,
    flex: 1,
    minWidth: '10rem',
    textTransform: 'capitalize',
    maxHeight: '5rem',
    overflow: 'hidden',
  }
})

function RangedWeaponAttacks({ weaponPools, classes }) {
  const pool = weaponPools.rangedWitheringAttack
  const poolLineClasses = { root: classes.narrowPoolBlock, label: classes.label, labelSpan: classes.labelSpan }

  return <React.Fragment>
    <PoolLine pool={ pool.close } label="Withering Close" classes={ poolLineClasses } />
    { pool.short.available &&
      <PoolLine pool={ pool.short } label="Withering Short" classes={ poolLineClasses } />
    }
    { pool.medium.available &&
      <PoolLine pool={ pool.medium } label="Withering Medium" classes={poolLineClasses } />
    }
    { pool.long.available &&
      <PoolLine pool={ pool.long } label="Withering Long" classes={ poolLineClasses } />
    }
    { pool.extreme.available &&
      <PoolLine pool={ pool.extreme } label="Withering Extreme" classes={ poolLineClasses }  />
    }
  </React.Fragment>
}
RangedWeaponAttacks.propTypes = {
  weapon: PropTypes.shape(fullWeapon),
  character: PropTypes.shape({ ...withAttributes, ...withAbilities }),
  weaponPools: PropTypes.object,
  classes: PropTypes.object,
}

function _WeaponLine({ weapon, weaponPools, classes }) {
  const poolLineClasses = { root: classes.poolBlock, label: classes.label, labelSpan: classes.labelSpan }

  let attackLine
  if (weaponPools.rangedWitheringAttack) {
    attackLine = <RangedWeaponAttacks weaponPools={ weaponPools } classes={ classes } />
  } else {
    attackLine = <PoolLine pool={ weaponPools.witheringAttack } label="Withering Attack" classes={{ ...poolLineClasses, root: classes.narrowPoolBlock }}  />
  }
  return <div className={ classes.container }>
    <div className={ classes.name }>
      <div className={ classes.label }>
        <span className={ classes.labelSpan }>Name</span>
      </div>
      { weapon.name }
    </div>

    { attackLine }
    <PoolLine pool={ weaponPools.witheringDamage } label="Withering Damage" classes={{ ...poolLineClasses, root: classes.narrowPoolBlock }} />
    <PoolLine pool={ weaponPools.decisiveAttack } label="Decisive Attack" classes={ poolLineClasses }  />
    { !weaponPools.rangedWitheringAttack &&
      <PoolLine pool={ weaponPools.parry } label="Parry" classes={ poolLineClasses }  />
    }

    <div className={ classes.tags }>
      <div className={ classes.label }>
        <span className={ classes.labelSpan }>Tags</span>
      </div>
      { weapon.tags.join(', ') || 'none' }
    </div>
  </div>
}
_WeaponLine.propTypes = {
  weapon: PropTypes.shape(fullWeapon),
  character: PropTypes.shape({ ...withAttributes, ...withAbilities }),
  weaponPools: PropTypes.object,
  classes: PropTypes.object,
}
const mapStateToProps = (state, props) => ({
  weaponPools: getPoolsForWeapon(state, props.weapon.id)
})
const WeaponLine = withStyles(styles)(connect(mapStateToProps)(_WeaponLine))

function WeaponSummaryBlock({ character, weapons }) {

  const weas = weapons.map((weapon) => <React.Fragment key={ weapon.id } >
    <WeaponLine character={ character } weapon={ weapon } />
    <Divider />
  </React.Fragment>)

  return <div>
    { weas }
  </div>
}
WeaponSummaryBlock.propTypes = {
  weapons: PropTypes.arrayOf(PropTypes.shape(fullWeapon)),
  character: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
}

export default WeaponSummaryBlock
