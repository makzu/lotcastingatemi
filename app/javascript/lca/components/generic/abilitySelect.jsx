import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { ListSubheader } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import { ABILITIES_ALL, ATTRIBUTES } from '../../utils/constants.js'

const styles = theme => ({
  root: {
    width: '8em',
    marginRight: theme.spacing.unit,
  },
  multiple: {
    marginRight: theme.spacing.unit,
  },
})

class AbilitySelect extends Component {
  constructor(props) {
    super(props)

    this.checkChange = this.checkChange.bind(this)
  }

  checkChange(e) {
    if (e.target.value === '-')
      return

    this.props.onChange(e)
  }

  render() {
    const { props, checkChange } = this
    const { attributes, abilities, multiple, withAttributes, attributesOnly, prependOptions, classes, } = props

    const abils = attributesOnly ? [] : abilities || ABILITIES_ALL
    const attrs = (attributesOnly || withAttributes || (attributes && attributes.length > 0)) ?
      props.attributes || ATTRIBUTES : []

    const abilItems = abils.map((a) =>
      <MenuItem key={ a.abil } value={ a.abil.substring(5) }>
        { a.pretty }
      </MenuItem>
    )
    const attrItems = attrs.map((a) =>
      <MenuItem key={ a.attr } value={ a.pretty.toLowerCase() }>
        { a.pretty }
      </MenuItem>
    )

    return <TextField select
      className={ multiple ? classes.multiple : classes.root }
      name={ props.name } value={ props.value } label={ props.label }
      onChange={ checkChange }
      margin={ props.margin || 'none' } fullWidth={ props.fullWidth }
      SelectProps={{ multiple: multiple }}
    >
      { prependOptions}
      { abilItems.length > 0 && <ListSubheader value="-">Abilities</ListSubheader> }
      { abilItems }
      { attrItems.length > 0 && <ListSubheader value="-">Attributes</ListSubheader>}
      { attrItems }
    </TextField>
  }
}
AbilitySelect.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.object),
  attributes: PropTypes.arrayOf(PropTypes.object),
  prependOptions: PropTypes.node,
  withAttributes: PropTypes.bool,
  attributesOnly: PropTypes.bool,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  label: PropTypes.string,
  classes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(AbilitySelect)
