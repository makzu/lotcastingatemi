// @flow
import React from 'react'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import BlockPaper from '../generic/blockPaper.jsx'

const WelcomePage = () => (
  <Grid container spacing={24}>
    <Grid item xs={2} hidden={{ mdDown: true }} />

    <Grid item xs={12} lg={8}>
      <BlockPaper>
        <Typography variant="headline" gutterBottom>
          Lot-Casting Atemi
        </Typography>
        <Typography gutterBottom>
          <strong>Cost:</strong> 15m, 1wp, <strong>Mins:</strong> Essence 2<br />
          <strong>Type:</strong> Simple<br />
          <strong>Keywords:</strong> None<br />
          <strong>Duration:</strong> One scene
        </Typography>
        <Typography>
          The Solar Exalted have achieved such heights of skill that even their
          games become effortless. When a Solar activates Lot-Casting Atemi she
          instantly becomes aware of her scores and those of the other players.
          She likewise never forgets the strength of her signature moves, or the
          number of dice required to play them. She can roll those dice with but
          a thought, and no matter how distant she is from the game, all
          participants become aware of her successes.
        </Typography>
      </BlockPaper>
    </Grid>

    <Grid item xs={12}>
      <div style={{ height: '8em' }} />
    </Grid>

    <Grid item xs={1} hidden={{ mdDown: true }} />
    <Grid item xs={12} lg={6}>
      <Typography variant="display2" style={{ textAlign: 'right' }}>
        Harmonious Exalted 3e character management for a new age
      </Typography>
    </Grid>
    <Grid item xs={12} lg={5}>
      <BlockPaper>
        <Typography paragraph>
          Keep track of your characters&apos; attributes, abilities, charms,
          merits, and more all from one place, accessible from any device with
          an Internet connection. PC screens, phones, and tablets are all
          supported, and character sheets are synced in real-time across all
          devices.
        </Typography>

        <Typography>
          Mortal Characters and Solar Exalts are fully tracked, but for the
          impatient, Custom Attribute, Ability, and Essence exalt types are also
          supported.
        </Typography>
      </BlockPaper>
    </Grid>

    <Grid item xs={12}>
      <div style={{ height: '5em' }} />
    </Grid>

    <Grid item xs={12} hidden={{ lgUp: true }}>
      <Typography variant="display2" style={{ textAlign: 'right' }}>
        Ideal Battle(group) Knowledge Prana
      </Typography>
    </Grid>
    <Grid item xs={12} lg={5}>
      <BlockPaper>
        <Typography>
          Quick characters and Battlegroups are also fully supported, giving you
          full stat blocks for antagonists and any Command, Familiar, or
          Retainer merits you may need stats for.
        </Typography>
      </BlockPaper>
    </Grid>
    <Grid item lg={6} hidden={{ mdDown: true }}>
      <Typography variant="display2">
        Ideal Battle(group) Knowledge Prana
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <div style={{ height: '5em' }} />
    </Grid>
    <Grid item xs={1} hidden={{ mdDown: true }} />
    <Grid item xs={12} lg={6}>
      <Typography variant="display2" style={{ textAlign: 'right' }}>
        Excellent Friend Approach
      </Typography>
    </Grid>
    <Grid item xs={12} lg={5}>
      <BlockPaper>
        <Typography paragraph>
          Create or join a Chronicle to see other players&apos; characters, qcs,
          and battlegroups, with access to a full sheet for each one and a
          summary page showing a subset of dice pools and defenses. Storytellers
          can even make edits to their players&apos; characters, and all changes
          are synced in real-time with other players.
        </Typography>

        <Typography>
          Don&apos;t want to spoil a surprise? Mark a Character as Hidden and
          only the owner and Storyteller will be able to see it until the time
          is right.
        </Typography>
      </BlockPaper>
    </Grid>
  </Grid>
)
export default WelcomePage
