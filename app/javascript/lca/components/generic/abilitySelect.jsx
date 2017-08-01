import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { ABILITIES_ALL } from '../../utils/constants.js'

class AbilitySelect extends React.Component {
  render() {
    const abils = this.props.abilities || ABILITIES_ALL
    const menuItems = abils.map((a) =>
      <MenuItem key={ a.abil }
        checked={ this.props.value && ( this.props.value.indexOf(a.pretty.toLowerCase()) > -1 ) }
        value={ a.pretty.toLowerCase() }
        primaryText={ a.pretty }
      />
    )

    return (
      <SelectField { ...this.props }
      >
        { menuItems }
      </SelectField>
    )
  }
}
AbilitySelect.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.object),
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  floatingLabelText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default AbilitySelect
