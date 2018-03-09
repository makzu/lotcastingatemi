import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import PlayerNameSubtitle from './playerNameSubtitle.jsx'
import * as calc from '../../utils/calculated'
import { fullChar } from '../../utils/propTypes'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    marginLeft: theme.spacing.unit
  },
})

function CharacterCard({ character, classes }) {
  const woundPenalty = calc.woundPenalty(character)

  return <Paper className={ classes.root }>

    <Typography variant="title">
      { character.name }
      { character.hidden &&
        <div className={ classes.hiddenLabel }>
          <VisibilityOff />
          Hidden
        </div>
      }

      <Button component={ Link } to={ `/characters/${character.id}` } style={{ float: 'right', }}>
        Full Sheet
      </Button>
    </Typography>

    <PlayerNameSubtitle playerId={ character.player_id } />

    <Typography paragraph>
      Essence { character.essence } { calc.prettyFullExaltType(character) }
    </Typography>

    <Typography>
      { character.motes_personal_total > 0 &&
        <span>
          Motes: { character.motes_personal_current }/{ character.motes_personal_total } Personal,&nbsp;
        </span>
      }
      { character.motes_peripheral_total > 0 &&
        <span>
          { character.motes_peripheral_current }/{ character.motes_peripheral_total } Peripheral,&nbsp;
        </span>
      }
      Willpower: { character.willpower_temporary }/{ character.willpower_permanent }
    </Typography>

    <Typography>
      Evasion: { calc.evasionRaw(character) },&nbsp;
      Soak: { calc.naturalSoak(character) + calc.armorSoak(character) }
    </Typography>

    <Typography>
      { /* TODO: penalties, specialties */}
      Resolve: { calc.resolveRaw(character) },&nbsp;
      Guile:   { calc.guileRaw(character) },&nbsp;
      Appearance: { character.attr_appearance }
    </Typography>

    <Typography paragraph>
      <strong>Penalties:</strong>&nbsp;
      Mobility -{ calc.mobilityPenalty(character) },&nbsp;
      Onslaught -{ character.onslaught },&nbsp;
      Wound -{ woundPenalty }
    </Typography>
  </Paper>
}
CharacterCard.propTypes = {
  character: PropTypes.shape(fullChar).isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(CharacterCard)
