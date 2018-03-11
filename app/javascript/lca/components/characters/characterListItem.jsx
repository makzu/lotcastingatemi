import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import ModeEdit from 'material-ui-icons/ModeEdit'

import DeleteButton from '../generic/deleteButton.jsx'
import HideButton from '../generic/hideButton.jsx'
import PinButton from '../generic/pinButton.jsx'
import { prettyFullExaltType } from '../../utils/calculated'
import { fullChar } from '../../utils/propTypes'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  characterName: {
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
})

function CharacterListItem({ character, classes }) {
  return <div>
    <Paper className={ classes.root }>

      <Typography variant="title" className={ classes.characterName }
        component={ Link } to={ `/characters/${character.id}` }
      >
        { character.name }
        <Launch className={ classes.icon } />
      </Typography>

      <Typography paragraph>
        Essence { character.essence } { prettyFullExaltType(character) }
      </Typography>


      <Button component={ Link } to={ `/characters/${ character.id }/edit` }>
        Edit
        <ModeEdit />
      </Button>

      <HideButton characterType="characters" id={ character.id } />
      <PinButton characterType="characters" id={ character.id } />
      <DeleteButton characterType="characters" id={ character.id } />
    </Paper>
  </div>
}
CharacterListItem.propTypes = {
  character: PropTypes.shape(fullChar).isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(CharacterListItem)
