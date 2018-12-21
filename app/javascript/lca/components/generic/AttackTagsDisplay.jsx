// @flow
import React, { Fragment } from 'react'

import DialogContentText from '@material-ui/core/DialogContentText'
import Typography from '@material-ui/core/Typography'

import type { Pool } from 'utils/flow-types'

const style = { marginTop: '0.25em' }

type Props = { pool: Pool }
const AttackTagsDisplay = ({ pool }: Props) => {
  let { specialAttacks } = pool
  specialAttacks = specialAttacks || []

  const showFire = pool.attack === 'decisive' && specialAttacks.includes('fire')
  const showDisarming =
    specialAttacks.includes('disarming') || specialAttacks.includes('water')
  const showClash =
    specialAttacks.includes('two-handed') || specialAttacks.includes('paired')
  const showFlexible =
    specialAttacks.includes('flexible') || specialAttacks.includes('water')
  const showPiercing =
    specialAttacks.includes('piercing') && pool.attack === 'withering'
  const showPoison =
    (specialAttacks.includes('poisonable') ||
      specialAttacks.includes('wood')) &&
    pool.attack === 'decisive'
  const showSmashing =
    specialAttacks.includes('smashing') || specialAttacks.includes('earth')

  return (
    <Fragment>
      {specialAttacks.includes('air') && (
        <DialogContentText style={style}>
          Air:
          {pool.attack == 'withering' && ' Ignore higher of Essence or 3 soak '}
          {pool.attack == 'decisive' && ' Ignore (Essence) hardness '}
          from metal armor
          <Typography variant="caption">wfhw Backer PDF p. 215</Typography>
        </DialogContentText>
      )}

      {showFire && (
        <DialogContentText style={style}>
          Fire: Double 10s on <strong>decisive</strong> damage roll
          <Typography variant="caption">wfhw Backer PDF p. 215</Typography>
        </DialogContentText>
      )}

      {specialAttacks.includes('chopping') && (
        <DialogContentText style={style}>
          Can make <strong>Chopping</strong> attacks: pay 1i, take -1 Defense
          until your next action,
          {pool.attack === 'withering' && ' increase Raw Damage by 3'}
          {pool.attack === 'decisive' && ' ignore 2 points of Hardness'}
          <Typography variant="caption">tag: core p.585-586</Typography>
        </DialogContentText>
      )}

      {showDisarming && (
        <DialogContentText style={style}>
          Disarming: Reduces the difficulty and initiative cost of a Disarm
          gambit by 1
          <Typography variant="caption">
            {specialAttacks.includes('water') && 'wfhw Backer PDF p. 215, '}
            tag: core p.586, disarm: core p.200
          </Typography>
        </DialogContentText>
      )}

      {showPiercing && (
        <DialogContentText style={style}>
          Can make <strong>Piercing</strong> attacks: pay 1i, take -1 Defense
          until your next action, ignore 4 points of soak from armor.
          <Typography variant="caption">tag: core p.586</Typography>
        </DialogContentText>
      )}

      {showFlexible && (
        <DialogContentText style={style}>
          {specialAttacks.includes('water') ? 'Water: ' : 'Flexible: '}
          Ignores the Defense bonus granted by Full Defense actions
          <Typography variant="caption">
            {specialAttacks.includes('water') && 'wfhw Backer PDF p. 215, '}
            tag: core p.586
          </Typography>
        </DialogContentText>
      )}

      {specialAttacks.includes('improvised') && (
        <DialogContentText style={style}>
          Improvised: Must pay 1i to make an attack.
          <Typography variant="caption">tag: core p.586</Typography>
        </DialogContentText>
      )}

      {showPoison && (
        <DialogContentText style={style}>
          Can deliver poison on successfully dealing <strong>decisive </strong>
          damage.
          <Typography variant="caption">
            {specialAttacks.includes('wood') && 'wfhw Backer PDF p. 215, '}
            poison: core p.232-234, tag: core p.586
          </Typography>
        </DialogContentText>
      )}

      {specialAttacks.includes('powerful') && (
        <DialogContentText style={style}>
          Powerful: At close range, deals damage like a heavy weapon.
          {pool.powerfulDamage != null && (
            <span> ({pool.powerfulDamage} damage)</span>
          )}
          <Typography variant="caption">tag: core p.590</Typography>
        </DialogContentText>
      )}

      {pool.shield && (
        <DialogContentText style={style}>
          Shield: You can put a Full Defense action in a flurry, but not with an
          attack.
          <Typography variant="caption">
            full defense: core p.196, tag: core p.586
          </Typography>
        </DialogContentText>
      )}

      {specialAttacks.includes('slow') && (
        <DialogContentText style={style}>
          Slow: Needs a miscellaneous action to reload
          <Typography variant="caption">tag: core p.590</Typography>
        </DialogContentText>
      )}

      {showSmashing && (
        <DialogContentText style={style}>
          Can make <strong>Smashing</strong> attacks: pay 2i, take -1 Defense
          until your next action, if the attack connects the enemy is knocked
          back one range band, or prone.
          <Typography variant="caption">
            prone: core p.202,&nbsp;
            {specialAttacks.includes('earth') && 'wfhw Backer PDF p. 215, '}
            tag: core p.586
          </Typography>
        </DialogContentText>
      )}

      {specialAttacks.includes('subtle') && (
        <DialogContentText style={style}>
          Subtle: This weapon does not do any damage.
          <Typography variant="caption">tag: core p.586</Typography>
        </DialogContentText>
      )}

      {showClash && (
        <DialogContentText style={style}>
          Add 2 non-Charm dice to Clash Attacks.
          <Typography variant="caption">
            clash: core p.202, tag: core p.586
          </Typography>
        </DialogContentText>
      )}
    </Fragment>
  )
}

export default AttackTagsDisplay
