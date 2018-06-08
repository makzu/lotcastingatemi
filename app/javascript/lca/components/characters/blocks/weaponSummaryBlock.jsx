// @flow
import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import { getPoolsForWeapon } from 'selectors'
import type { Character, fullWeapon } from 'utils/flow-types'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  label: {
    ...theme.typography.body1,
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
  name: {
    ...theme.typography.body2,
    width: '10rem',
    margin: theme.spacing.unit,
    marginLeft: 0,
    maxHeight: '5rem',
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  artifactLabel: {
    ...theme.typography.caption,
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
  tags: {
    ...theme.typography.body1,
    margin: theme.spacing.unit,
    marginLeft: 0,
    flex: 1,
    minWidth: '10rem',
    textTransform: 'capitalize',
    maxHeight: '5rem',
    overflow: 'hidden',
  },
})

type RangedAttacksProps = { weaponPools: Object, classes: Object }
function RangedWeaponAttacks({ weaponPools, classes }: RangedAttacksProps) {
  const pool = weaponPools.rangedWitheringAttack
  const poolLineClasses = {
    root: classes.narrowPoolBlock,
    label: classes.label,
    labelSpan: classes.labelSpan,
  }

  return (
    <Fragment>
      <PoolDisplay
        pool={pool.close}
        label="Withering Close"
        classes={poolLineClasses}
      />
      {pool.short.available && (
        <PoolDisplay
          pool={pool.short}
          label="Withering Short"
          classes={poolLineClasses}
        />
      )}
      {pool.medium.available && (
        <PoolDisplay
          pool={pool.medium}
          label="Withering Medium"
          classes={poolLineClasses}
        />
      )}
      {pool.long.available && (
        <PoolDisplay
          pool={pool.long}
          label="Withering Long"
          classes={poolLineClasses}
        />
      )}
      {pool.extreme.available && (
        <PoolDisplay
          pool={pool.extreme}
          label="Withering Extreme"
          classes={poolLineClasses}
        />
      )}
    </Fragment>
  )
}

type WeaponLineProps = {
  weapon: fullWeapon,
  weaponPools: Object,
  classes: Object,
}
function _WeaponLine({ weapon, weaponPools, classes }: WeaponLineProps) {
  const poolLineClasses = {
    root: classes.poolBlock,
    label: classes.label,
    labelSpan: classes.labelSpan,
  }

  let attackLine
  if (weaponPools.rangedWitheringAttack) {
    attackLine = (
      <RangedWeaponAttacks weaponPools={weaponPools} classes={classes} />
    )
  } else {
    attackLine = (
      <PoolDisplay
        pool={weaponPools.witheringAttack}
        label="Withering Attack"
        classes={{ ...poolLineClasses, root: classes.narrowPoolBlock }}
      />
    )
  }
  let artifactLabel
  if (weapon.is_artifact && !weapon.tags.includes('elemental bolt'))
    artifactLabel = <div className={classes.artifactLabel}>Artifact</div>
  else if (weapon.tags.includes('elemental bolt'))
    artifactLabel = <div className={classes.artifactLabel}>Elemental Bolt</div>

  return (
    <div className={classes.container}>
      <div className={classes.name}>
        <div className={classes.label}>
          <span className={classes.labelSpan}>Name</span>
        </div>
        {weapon.name}
        {artifactLabel}
      </div>

      {attackLine}
      <PoolDisplay
        damage
        pool={weaponPools.witheringDamage}
        label="Withering Damage"
        classes={{ ...poolLineClasses, root: classes.narrowPoolBlock }}
      />
      <PoolDisplay
        pool={weaponPools.decisiveAttack}
        label="Decisive Attack"
        classes={poolLineClasses}
      />
      {!weaponPools.rangedWitheringAttack && (
        <PoolDisplay
          staticRating
          pool={weaponPools.parry}
          label="Parry"
          classes={poolLineClasses}
        />
      )}

      <div className={classes.tags}>
        <div className={classes.label}>
          <span className={classes.labelSpan}>Tags</span>
        </div>
        {weapon.tags.join(', ') || 'none'}
      </div>
    </div>
  )
}
const mapStateToProps = (state, props) => ({
  weaponPools: getPoolsForWeapon(state, props.weapon.id),
})
const WeaponLine = withStyles(styles)(connect(mapStateToProps)(_WeaponLine))

type Props = { character: Character, weapons: Array<fullWeapon> }
function WeaponSummaryBlock({ character, weapons }: Props) {
  const weas = weapons.map(weapon => (
    <Fragment key={weapon.id}>
      <WeaponLine character={character} weapon={weapon} />
      <Divider />
    </Fragment>
  ))

  return <div>{weas}</div>
}

export default WeaponSummaryBlock
