import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Filter from '@material-ui/icons/FilterList'
import {
  getPoolsAndRatings,
  getAllAbilitiesWithCharmsForCharacter, getAllCharmCategoriesForCharacter,
  getAllMartialArtsCharmStylesForCharacter, getAllEvocationArtifactsForCharacter,
} from '../../../selectors'

class CharmFilter extends Component {
  render() {
    const {
      abilities, styles, artifacts, currentAbility, charmType,
      categories, currentCategory, exaltTypeBase,
      open, toggleOpen, onChange
    } = this.props
    let filters = [], filterName = '', filterLabel = ''

    switch(charmType) {
    case 'native':
      filters = abilities
      filterName = 'abilityFilter'
      filterLabel = 'Filter by ' + (exaltTypeBase === 'attribute' ? 'Attribute' : 'Ability')
      break
    case 'martial_arts':
      filters = styles
      filterName = 'styleFilter'
      filterLabel = 'Filter by Style'
      break
    case 'evocation':
      filters = artifacts
      filterName = 'artifactFilter'
      filterLabel = 'Filter by Artifact'
      break
    case 'spell':
      filters = ['terrestrial','celestial','solar']
      filterName = 'circleFilter'
      filterLabel = 'Filter by Circle'
      break
    default:
      filterLabel = 'derp'
    }
    const filterOptions = filters.map((abil) =>
      abil === 'martial_arts' ? // Skip Martial Arts, it has its own handling
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
      <Button onClick={ toggleOpen }>
        Filter <Hidden mdDown>{ charmType === 'spell' ? 'Spells' : 'Charms' }</Hidden>&nbsp;
        <Filter />
      </Button>
      { open &&
        <Fragment>
          { charmType !== 'spirit' &&
            (exaltTypeBase !== 'essence' || charmType !== 'native') && <Fragment>
            <TextField select
              style={{ minWidth: '8em', textTransform: 'capitalize', marginTop: '-16px', }}
              name={ filterName }
              label={ filterLabel }
              value={ currentAbility || '' }
              onChange={ onChange }
            >
              <MenuItem value="">No Filter</MenuItem>
              { filterOptions }
            </TextField>
            &nbsp;&nbsp;
          </Fragment>}

          <TextField select
            style={{ minWidth: '8em', textTransform: 'capitalize', marginTop: '-16px', }}
            name="categoryFilter"
            label="Filter by Category"
            value={ currentCategory || [] }
            SelectProps={{ multiple: true }}
            onChange={ onChange }
          >
            { catOptions }
          </TextField>
        </Fragment>
      }
    </Fragment>
  }
}
CharmFilter.propTypes = {
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  styles: PropTypes.arrayOf(PropTypes.string).isRequired,
  artifacts: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAbility: PropTypes.string.isRequired,
  currentCategory: PropTypes.arrayOf(PropTypes.string).isRequired,
  charmType: PropTypes.string,
  exaltTypeBase: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func,
}

const mapStateToProps = (state, props) => ({
  abilities: getAllAbilitiesWithCharmsForCharacter(state, props.id) || [],
  styles: getAllMartialArtsCharmStylesForCharacter(state, props.id) || [],
  artifacts: getAllEvocationArtifactsForCharacter(state, props.id) || [],
  exaltTypeBase: getPoolsAndRatings(state, props.id).exaltTypeBase,
  categories: getAllCharmCategoriesForCharacter(state, props.id) || [],
})

export default connect(mapStateToProps)(
  CharmFilter
)
