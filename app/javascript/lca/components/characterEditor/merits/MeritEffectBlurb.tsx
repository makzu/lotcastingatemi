import React from 'react'
import Typography from '@material-ui/core/Typography'
interface Props {
  name: string
  rating: number
}

const MeritEffectBlurb = ({ name, rating }: Props) => {
  let effect

  switch ((name || '').toLowerCase()) {
    case 'exalted healing':
      effect = 'Will heal as an exalt during downtime'
      break

    case 'fast reflexes':
      effect = 'Adding 1 to join battle pool'
      break

    case 'fleet of foot':
      effect = 'Adding 1 to movement pools'
      break

    case 'hearthstone':
      effect = 'Will recover extra motes during downtime'
      break

    case 'pain tolerance':
      effect = 'Reducing wound penalties'
      break

    case 'unusual hide':
      effect = `Adding ${rating} to soak`
      break

    case 'vital focus cultivation':
      effect = 'Ignoring wound penalty on mental pools'
      break

    case 'danger sense':
    case 'well-bred':
      effect = 'Adding conditional bonus'
      break

    case 'thin-blooded':
      effect = 'Adding conditional penalty'
      break

    case 'inhuman visage':
      effect = 'Adding 1 to Guile'
      break

    default:
      return null
  }

  return <Typography variant="caption">{effect}</Typography>
}

export default MeritEffectBlurb
