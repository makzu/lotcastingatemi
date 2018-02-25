import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import { ABILITIES_ALL } from '../../utils/constants.js'

class AbilitySelect extends React.Component {
  render() {
    const abils = this.props.abilities || ABILITIES_ALL
    const menuItems = abils.map((a) =>
      <MenuItem key={ a.abil } value={ a.pretty.toLowerCase() }>
        { a.pretty }
      </MenuItem>
    )

    return (
      <TextField select { ...this.props }
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
  value: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default AbilitySelect
