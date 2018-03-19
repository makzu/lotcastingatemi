import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import PlayerNameSubtitle from './playerNameSubtitle.jsx'
import * as calc from '../../utils/calculated'
import { fullChar } from '../../utils/propTypes'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
  },
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'inherit',
  },
  characterName: {
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
})

function CharacterCard({ character, classes }) {
  const woundPenalty = calc.woundPenalty(character)

  return <Paper className={ classes.root }>

    <Typography variant="title" className={ classes.characterName }
      component={ Link } to={ `/characters/${character.id}` }
    >
      { character.name }
      <Launch className={ classes.icon } />

      { character.hidden &&
        <div className={ classes.hiddenLabel }>
          <VisibilityOff className={ classes.icon } />&nbsp;
          Hidden
        </div>
      }
    </Typography>

    <PlayerNameSubtitle playerId={ character.player_id } />

    <Typography paragraph>
      Essence { character.essence } { calc.prettyFullExaltType(character) }
    </Typography>

    { character.type != 'Character' &&
      <Typography>
        Anima Level: { calc.prettyAnimaLevel(character.anima_level) }
      </Typography>
    }

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
