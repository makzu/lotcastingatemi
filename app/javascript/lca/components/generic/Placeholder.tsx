import React from 'react'

import Typography from '@material-ui/core/Typography'

import { sample } from 'utils'

const loadingMessages = [
  'Loading',
  'Waiting for anima banner to fade',
  'Waiting for motes to recover',
  'Activating scene-longs',
  'Counting d10s',
  'Memorizing Craft Charms',
  'Reticulating Splines',
  'Rolling Strength+Bureaucracy',
  'Rolling Dexterity+Medicine',
  'Rolling Stamina+Lore',
  'Rolling Charisma+Integrity',
  'Rolling Manipulation+Sail',
  'Rolling Appearance+Sail',
  'Rolling Perception+Dodge',
  'Rolling Intelligence+Melee',
  'Rolling Wits+Resistance',
  'Waiting for the next splatbook Kickstarter',
  'Cross-referencing Adversaries of the Righteous PDFs',
  'Cross-referencing Hundred Devils Night Parade PDFs',
  'Forgetting 2e lore',
  'Avoiding the wyld hunt',
  'Looking for anathema to slay',
  'Introducing a fact',
  'Looking for a scroll of errata',
  'Asking the devs about mechanics',
  'Complaining about Exigents',
  'Deprotagonizing entire splats',
  'Finding F-15s for these T-Rexes',
  'Checking for new supplements',
  'Consulting the Thousand Correct Actions',
  'Sacred hunting new files',
  'Petitioning the Incarnae',
  'Consulting the Loom of Fate',
  'Entering Devil-Body',
  'Memorizing the new Infernal Caste names',
]

const Placeholder = () => <Typography>{sample(loadingMessages)}...</Typography>

export default Placeholder
