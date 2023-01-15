// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@mui/material/Button'
import Hidden from '@mui/material/Hidden'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Filter from '@mui/icons-material/FilterList'
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
  currentAbility: string | null,
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

    const attrLabel = exaltTypeBase === 'attribute' ? 'Attribute' : 'Ability'

    switch (charmType) {
      case 'native':
        filters = abilities
        filterName = 'abilityFilter'
        filterLabel = 'Filter by ' + attrLabel

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
      <MenuItem key="none" value={null}>
        No Filter
      </MenuItem>,
      charmType === 'native' ? (
        <MenuItem key="universal" value="universal">
          Universal
        </MenuItem>
      ) : null,
      ...filters.map(abil => {
        switch (abil) {
          case '':
            return (
              <MenuItem key="blank" value="">
                None
              </MenuItem>
            )
          case 'martial_arts':
            return <span key={abil} />
          default:
            return (
              <MenuItem
                key={abil}
                value={abil}
                style={{ textTransform: 'capitalize' }}
              >
                {abil}
              </MenuItem>
            )
        }
      }),
    ]
    const catOptions = categories.map(cat => (
      <MenuItem key={cat} value={cat} style={{ textTransform: 'capitalize' }}>
        {cat}
      </MenuItem>
    ))
    const showFilter =
      charmType !== 'spirit' &&
      (exaltTypeBase !== 'essence' || charmType !== 'native')

    return <>
      <Button onClick={toggleOpen}>
        Filter{' '}
        <Hidden lgDown>{charmType === 'spell' ? 'Spells' : 'Charms'}</Hidden>
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
                // $FlowFixMe
                value={currentAbility}
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
