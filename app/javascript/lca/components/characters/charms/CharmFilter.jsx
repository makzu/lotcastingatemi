import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Grow from 'material-ui/transitions/Grow'
import Filter from 'material-ui-icons/FilterList'

class CharmFilter extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { abilities, name, filter, onChange } = this.props
    const { open } = this.state
    const options = abilities.map((abil) =>
      abil === 'martial_arts' ?
        <span key={abil} /> :
        <MenuItem key={ abil } value={ abil } style={{ textTransform: 'capitalize' }}>
          { abil }
        </MenuItem>
    )
    return <Fragment>
      <Button onClick={ this.toggleOpen }>
        Filter <Hidden mdDown>Charms</Hidden>&nbsp;
        <Filter />
      </Button>
      <Grow
        in={ open }
        style={{ transformOrigin: '0 0 0' }}
      >
        <TextField select
          style={{ minWidth: open ? '8em' : 0, width: open ? undefined : 0, textTransform: 'capitalize' }}
          name={ name }
          label="Set Filter"
          value={ filter }
          onChange={ onChange }
        >
          <MenuItem value="">No Filter</MenuItem>
          { options }
        </TextField>
      </Grow>
    </Fragment>
  }
}
CharmFilter.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string,
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default CharmFilter
