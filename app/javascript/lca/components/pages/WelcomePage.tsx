import BlockPaper from '@/components/shared/BlockPaper'

import { Grid, Hidden, Typography } from '@mui/material'

const WelcomePage = () => (
  <Grid container spacing={3}>
    <Hidden lgDown>
      <Grid item xs={2} />
    </Hidden>

    <Grid item xs={12} lg={8}>
      <BlockPaper>
        <Typography variant="h5" gutterBottom>
          Lot-Casting Atemi
        </Typography>
        <Typography gutterBottom>
          <strong>Cost:</strong> 15m, 1wp, <strong>Mins:</strong> Essence 2
          <br />
          <strong>Type:</strong> Simple
          <br />
          <strong>Keywords:</strong> None
          <br />
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

    <Hidden lgDown>
      <Grid item xs={1} />
    </Hidden>
    <Grid item xs={12} lg={6}>
      <Typography variant="h3" style={{ textAlign: 'right' }}>
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

        <Typography paragraph>
          Supports Solar, Lunar, and Dragon-Blooded Exalts and Mortal
          Characters, with automatic tracking of Caste/Aspect/Favored Abilities,
          and Excellencies. Or forge your own path with Custom Attribute,
          Ability, or Essence Exalt types.
        </Typography>

        <Typography>
          Bonuses and penalties from a growing list of merits, flaws, and
          control spells are automatically included in dice pools. Nearly every
          weapon tag is supported, even for esoteric weapons like The Burning
          Name, Elemental Bolt Attack, and Crypt Bolt Attack..
        </Typography>
      </BlockPaper>
    </Grid>

    <Grid item xs={12}>
      <div style={{ height: '5em' }} />
    </Grid>

    <Hidden lgUp>
      <Grid item xs={12}>
        <Typography variant="h3" style={{ textAlign: 'right' }}>
          Ideal Battle(group) Knowledge Prana
        </Typography>
      </Grid>
    </Hidden>
    <Grid item xs={12} lg={5}>
      <BlockPaper>
        <Typography>
          Quick characters and Battlegroups are also fully supported, giving you
          full stat blocks for antagonists and any Command, Familiar, or
          Retainer merits you may need stats for. Size, drill, might, and morale
          bonuses for Battlegroups are automatically factored into the relevant
          pools.
        </Typography>
      </BlockPaper>
    </Grid>
    <Hidden lgDown>
      <Grid item lg={6}>
        <Typography variant="h3">
          Ideal Battle(group) Knowledge Prana
        </Typography>
      </Grid>
    </Hidden>

    <Grid item xs={12}>
      <div style={{ height: '5em' }} />
    </Grid>

    <Hidden lgDown>
      <Grid item xs={1} />
    </Hidden>
    <Grid item xs={12} lg={6}>
      <Typography variant="h3" style={{ textAlign: 'right' }}>
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
          is right. You can also hide individual Principles and Ties on your
          sheet to control exactly how much of a mysterious stranger your
          character is.
        </Typography>
      </BlockPaper>
    </Grid>
  </Grid>
)

export default WelcomePage
