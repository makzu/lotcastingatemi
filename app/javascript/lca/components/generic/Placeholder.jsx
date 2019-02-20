// @flow
import React from 'react'

import Typography from '@material-ui/core/Typography'

import { sample } from 'utils'

const loadingMessages = [
  'Loading',
  'Waiting for anima banner to fade',
  'Activating scene-longs',
  'Counting d10s',
  'Memorizing Craft Charms',
  'Reticulating Splines',
  'Rolling Strength+Bureaucracy',
  'Rolling Appearance+Sail',
]

const Placeholder = () => <Typography>{sample(loadingMessages)}...</Typography>

export default Placeholder
