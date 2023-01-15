// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withStyles from '@mui/styles/withStyles'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import { getPoolsForWeapon } from 'selectors'
import type { fullWeapon } from 'utils/flow-types'

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
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
  poolBlock: {
    margin: theme.spacing(),
    marginLeft: 0,
    width: '5.5rem',
    maxHeight: '5rem',
  },
  narrowPoolBlock: {
    margin: theme.spacing(),
    marginLeft: 0,
    width: '4.5rem',
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
    <>
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
    </>
  )
}

type WeaponPoolDisplayProps = {
  weapon: fullWeapon,
  weaponPools: Object,
  classes: Object,
}
function WeaponPoolDisplay({ weaponPools, classes }: WeaponPoolDisplayProps) {
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

  return (
    <>
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
    </>
  )
}
const mapStateToProps = (state, props) => ({
  weaponPools: getPoolsForWeapon(state, props.weapon.id),
})
export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(WeaponPoolDisplay)
