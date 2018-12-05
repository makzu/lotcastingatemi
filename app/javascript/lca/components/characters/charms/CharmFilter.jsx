// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Filter from '@material-ui/icons/FilterList'
import {
  getPoolsAndRatings,
  getAllAbilitiesWithCharmsForCharacter,
  getAllCharmCategoriesForCharacter,
  getAllMartialArtsCharmStylesForCharacter,
  getAllEvocationArtifactsForCharacter,
} from 'selectors'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  id: number,
  open: boolean,
  charmType: string,
  currentAbility: string,
  currentCategory: Array<string>,
  toggleOpen: Function,
  onChange: Function,
}
export type Props = ExposedProps & {
  abilities: Array<string>,
  styles: Array<string>,
  artifacts: Array<string>,
  exaltTypeBase: string,
  categories: Array<string>,
}

class CharmFilter extends React.Component<Props> {
  render() {
    const {
      abilities,
      styles,
      artifacts,
      currentAbility,
      charmType,
      categories,
      currentCategory,
      exaltTypeBase,
      open,
      toggleOpen,
      onChange,
    } = this.props
    let filters = [],
      filterName = '',
      filterLabel = ''

    switch (charmType) {
      case 'native':
        filters = abilities
        filterName = 'abilityFilter'
        filterLabel =
          'Filter by ' +
          (exaltTypeBase === 'attribute' ? 'Attribute' : 'Ability')
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
        filters = ['terrestrial', 'celestial', 'solar']
        filterName = 'circleFilter'
        filterLabel = 'Filter by Circle'
        break
      default:
        filterLabel = 'derp'
    }
    const filterOptions: React.Node = [
      <MenuItem key="none" value="">
        No Filter
      </MenuItem>,
      ...filters.map(abil =>
        abil === 'martial_arts' ? ( // Skip Martial Arts, it has its own handling
          <span key={abil} />
        ) : (
          <MenuItem
            key={abil}
            value={abil}
            style={{ textTransform: 'capitalize' }}
          >
            {abil}
          </MenuItem>
        )
      ),
    ]
    const catOptions = categories.map(cat => (
      <MenuItem key={cat} value={cat} style={{ textTransform: 'capitalize' }}>
        {cat}
      </MenuItem>
    ))
    const showFilter =
      charmType !== 'spirit' &&
      (exaltTypeBase !== 'essence' || charmType !== 'native')

    return (
      <>
        <Button onClick={toggleOpen}>
          Filter{' '}
          <Hidden mdDown>{charmType === 'spell' ? 'Spells' : 'Charms'}</Hidden>
          &nbsp;
          <Filter />
        </Button>
        {open && (
          <>
            {showFilter && (
              <>
                <TextField
                  select
                  style={{
                    minWidth: '8em',
                    textTransform: 'capitalize',
                    marginTop: '-16px',
                  }}
                  name={filterName}
                  label={filterLabel}
                  value={currentAbility || ''}
                  onChange={onChange}
                >
                  {filterOptions}
                </TextField>
                &nbsp;&nbsp;
              </>
            )}

            <TextField
              select
              style={{
                minWidth: '8em',
                textTransform: 'capitalize',
                marginTop: '-16px',
              }}
              name="categoryFilter"
              label="Filter by Category"
              value={currentCategory || []}
              SelectProps={{ multiple: true }}
              onChange={onChange}
            >
              {catOptions}
            </TextField>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = (state, props) => ({
  abilities: getAllAbilitiesWithCharmsForCharacter(state, props.id) || [],
  styles: getAllMartialArtsCharmStylesForCharacter(state, props.id) || [],
  artifacts: getAllEvocationArtifactsForCharacter(state, props.id) || [],
  exaltTypeBase: getPoolsAndRatings(state, props.id).exaltTypeBase,
  categories: getAllCharmCategoriesForCharacter(state, props.id) || [],
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps)

export default enhance(CharmFilter)
