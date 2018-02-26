import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import { ABILITIES_ALL } from '../../utils/constants.js'

const styles = theme => ({
  select: {
    width: '8em',
    marginRight: theme.spacing.unit,
  }
})

class AbilitySelect extends React.Component {
  render() {
    const { classes } = this.props
    const abils = this.props.abilities || ABILITIES_ALL
    const menuItems = abils.map((a) =>
      <MenuItem key={ a.abil } value={ a.pretty.toLowerCase() }>
        { a.pretty }
      </MenuItem>
    )

    return (
      <TextField select className={ classes.select } { ...this.props }
      >
        { menuItems }
      </TextField>
    )
  }
}
AbilitySelect.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.object),
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  label: PropTypes.string,
  classes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(AbilitySelect)
