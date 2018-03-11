import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import { ATTRIBUTES } from '../../utils/constants.js'

const styles = theme => ({
  root: {
    width: '8em',
    marginRight: theme.spacing.unit,
  },
  multiple: {
    marginRight: theme.spacing.unit,
  },
})

class AttributeSelect extends React.Component {
  render() {
    const { props } = this
    const { classes } = props
    const attrs = props.attributes || ATTRIBUTES
    const menuItems = attrs.map((a) =>
      <MenuItem key={ a.attr } value={ a.pretty.toLowerCase() }>
        { a.pretty }
      </MenuItem>
    )

    return (
      <TextField select className={ props.multiple ? classes.multiple : classes.root }
        name={ props.name } value={ props.value } label={ props.label }
        onChange={ props.onChange }
        margin={ props.margin || 'none' } fullWidth={ props.fullWidth }
        SelectProps={{ multiple: props.multiple }}
      >
        <MenuItem value="" disabled>Attribute</MenuItem>
        { menuItems }
      </TextField>
    )
  }
}
AttributeSelect.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object),
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  label: PropTypes.string,
  classes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(AttributeSelect)
