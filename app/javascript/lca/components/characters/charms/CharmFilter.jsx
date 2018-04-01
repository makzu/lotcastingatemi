import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Filter from 'material-ui-icons/FilterList'
import {
  getAllAbilitiesWithCharmsForCharacter, getAllCharmCategoriesForCharacter
} from '../../../selectors'

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
    const { abilities, categories, currentAbility, currentCategory, onChange } = this.props
    const { open } = this.state
    const abilOptions = abilities.map((abil) =>
      abil === 'martial_arts' ?
        <span key={abil} /> :
        <MenuItem key={ abil } value={ abil } style={{ textTransform: 'capitalize' }}>
          { abil }
        </MenuItem>
    )
    const catOptions = categories.map((cat) =>
      <MenuItem key={ cat } value={ cat } style={{ textTransform: 'capitalize' }}>
        { cat }
      </MenuItem>
    )
    return <Fragment>
      <Button onClick={ this.toggleOpen }>
        Filter <Hidden mdDown>Charms</Hidden>&nbsp;
        <Filter />
      </Button>
      { open &&
        <Fragment>
          <TextField select
            style={{ minWidth: open ? '8em' : 0, width: open ? undefined : 0, textTransform: 'capitalize' }}
            name="abilityFilter"
            label="Ability Filter"
            value={ currentAbility || '' }
            onChange={ onChange }
          >
            <MenuItem value="">No Filter</MenuItem>
            { abilOptions }
          </TextField>
          &nbsp;&nbsp;

          <TextField select
            style={{ minWidth: open ? '8em' : 0, width: open ? undefined : 0, textTransform: 'capitalize' }}
            name="categoryFilter"
            label="Category Filter"
            value={ currentCategory || '' }
            onChange={ onChange }
          >
            <MenuItem value="">No Filter</MenuItem>
            { catOptions }
          </TextField>
        </Fragment>
      }
    </Fragment>
  }
}
CharmFilter.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAbility: PropTypes.string.isRequired,
  currentCategory: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

const mapStateToProps = (state, props) => ({
  abilities: getAllAbilitiesWithCharmsForCharacter(state, props.id) || [],
  categories: getAllCharmCategoriesForCharacter(state, props.id) || [],
})

export default connect(mapStateToProps)(
  CharmFilter
)
