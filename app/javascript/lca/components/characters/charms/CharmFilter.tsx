import { Component } from 'react'
import { connect } from 'react-redux'

import Filter from '@mui/icons-material/FilterList'
import {
  getPoolsAndRatings,
  getAllAbilitiesWithCharmsForCharacter,
  getAllCharmCategoriesForCharacter,
  getAllMartialArtsCharmStylesForCharacter,
  getAllEvocationArtifactsForCharacter,
} from '@/selectors'
import type { Enhancer } from '@/utils/flow-types'
import { Button, Hidden, MenuItem, TextField } from '@mui/material'
interface ExposedProps {
  id: number
  open: boolean
  charmType: string
  currentAbility: string | null
  currentCategory: string[]
  toggleOpen: $TSFixMeFunction
  onChange: $TSFixMeFunction
}
export type Props = ExposedProps & {
  abilities: string[]
  styles: string[]
  artifacts: string[]
  exaltTypeBase: string
  categories: string[]
}

class CharmFilter extends Component<Props> {
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
        filters = [
          'terrestrial',
          'celestial',
          'solar',
          'ivory',
          'shadow',
          'void',
        ]
        filterName = 'circleFilter'
        filterLabel = 'Filter by Circle'
        break

      default:
        filterLabel = 'derp'
    }
    const filterOptions = [
      <MenuItem key="none" value={null}>
        No Filter
      </MenuItem>,
      charmType === 'native' ? (
        <MenuItem key="universal" value="universal">
          Universal
        </MenuItem>
      ) : null,
      ...filters.map((abil) => {
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
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {abil}
              </MenuItem>
            )
        }
      }),
    ]
    const catOptions = categories.map((cat) => (
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
          <Hidden lgDown>{charmType === 'spell' ? 'Spells' : 'Charms'}</Hidden>
          &nbsp;
          <Filter />
        </Button>
        {open && (
          <>
            {showFilter && (
              <>
                <TextField
                  variant="standard"
                  select
                  style={{
                    minWidth: '8em',
                    textTransform: 'capitalize',
                    marginTop: '-16px',
                  }}
                  name={filterName}
                  label={filterLabel}
                  value={currentAbility}
                  onChange={onChange}
                >
                  {filterOptions}
                </TextField>
                &nbsp;&nbsp;
              </>
            )}

            <TextField
              variant="standard"
              select
              style={{
                minWidth: '8em',
                textTransform: 'capitalize',
                marginTop: '-16px',
              }}
              name="categoryFilter"
              label="Filter by Category"
              value={currentCategory || []}
              onChange={onChange}
              slotProps={{
                select: {
                  multiple: true,
                },
              }}
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
