import Typography from '@mui/material/Typography'

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
  'Rolling Intelligence+Athletics',
  'Waiting for the next splatbook Kickstarter',
  'Cross-referencing Adversaries of the Righteous PDFs',
  'Forgetting 2e lore',
  'Avoiding the wyld hunt',
  'Looking for anathema to slay',
  'Introducing a fact',
]

const Placeholder = () => <Typography>{sample(loadingMessages)}...</Typography>

export default Placeholder
