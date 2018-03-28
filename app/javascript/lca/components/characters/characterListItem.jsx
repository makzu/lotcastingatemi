import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import ModeEdit from 'material-ui-icons/ModeEdit'

import CharacterCardMenu from '../generic/CharacterCardMenu'
import { prettyFullExaltType } from '../../utils/calculated'
import { fullChar } from '../../utils/propTypes'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  nameRow: {
    display: 'flex',
  },
  characterName: {
    flex: 1,
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
  controlGroup: {
    display: 'inline-block',
  },
})

function CharacterListItem({ character, classes }) {
  return <Paper className={ classes.root }>
    <div className={ classes.nameRow }>
      <Typography variant="title" className={ classes.characterName }
        component={ Link } to={ `/characters/${character.id}` }
      >
        { character.name }
        <Launch className={ classes.icon } />
      </Typography>

      <CharacterCardMenu characterType="character" id={ character.id } />
    </div>

    <Typography paragraph>
      Essence { character.essence } { prettyFullExaltType(character) }
    </Typography>

    <div className={ classes.controlGroup }>
      <Button component={ Link } to={ `/characters/${ character.id }/edit` }>
        Edit
        <ModeEdit />
      </Button>
    </div>
  </Paper>
}
CharacterListItem.propTypes = {
  character: PropTypes.shape(fullChar).isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(CharacterListItem)
