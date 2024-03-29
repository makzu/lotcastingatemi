// @flow
import * as React from 'react'
const { Component } = React

import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import { ABILITIES_ALL, ATTRIBUTES } from 'utils/constants.ts'

const styles = (theme) => ({
  root: {
    width: '8em',
    marginRight: theme.spacing(),
    textTransform: 'capitalize',
  },
  multiple: {
    marginRight: theme.spacing(),
    textTransform: 'capitalize',
  },
})

type Props = {
  abilities?: Array<Object>,
  attributes?: Array<Object>,
  prependOptions?: React.Node,
  withAttributes?: boolean,
  attributesOnly?: boolean,
  includeUniversal?: boolean,
  multiple?: boolean,
  name: string,
  value: string | Array<string>,
  label: string,
  fullWidth?: boolean,
  margin?: 'none' | 'dense' | 'normal',
  classes: Object,
  onChange: Function,
}
class AbilitySelect extends Component<Props> {
  checkChange = (e) => {
    if (e.target.value === '-') return

    this.props.onChange(e)
  }

  render() {
    const { props, checkChange } = this
    const {
      attributes,
      abilities,
      multiple,
      withAttributes,
      attributesOnly,
      prependOptions,
      includeUniversal,
      classes,
    } = props

    const abils = attributesOnly ? [] : abilities || ABILITIES_ALL
    const attrs =
      attributesOnly || withAttributes || (attributes && attributes.length > 0)
        ? props.attributes || ATTRIBUTES
        : []

    const abilItems = abils.map((a) => (
      <MenuItem key={a.abil} value={a.abil.substring(5)}>
        {a.pretty}
      </MenuItem>
    ))
    const attrItems = attrs.map((a) => (
      <MenuItem key={a.attr} value={a.pretty.toLowerCase()}>
        {a.pretty}
      </MenuItem>
    ))

    return (
      <TextField
        select
        className={multiple ? classes.multiple : classes.root}
        name={props.name}
        value={props.value}
        label={props.label}
        onChange={checkChange}
        margin={props.margin || 'none'}
        fullWidth={props.fullWidth}
        SelectProps={{ multiple: multiple }}
      >
        {includeUniversal && (
          <MenuItem value="universal">
            Universal (No {attributesOnly ? 'Attribute' : 'Ability'})
          </MenuItem>
        )}
        {prependOptions}
        {abilItems.length > 0 && (
          <ListSubheader value="-">Abilities</ListSubheader>
        )}
        {abilItems}
        {attrItems.length > 0 && (
          <ListSubheader value="-">Attributes</ListSubheader>
        )}
        {attrItems}
      </TextField>
    )
  }
}

export default withStyles(styles)(AbilitySelect)
