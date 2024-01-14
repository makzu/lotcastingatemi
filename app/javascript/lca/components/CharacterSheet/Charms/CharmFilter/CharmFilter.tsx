import type { Dispatch } from 'react'
import { connect } from 'react-redux'

import { Button, MenuItem, Switch, TextField, Typography } from '@mui/material'

import { makeStyles } from '@mui/styles'
import Checkbox from 'components/shared/inputs/Checkbox'
import ResponsiveFilterDrawer from 'components/shared/ResponsiveFilterDrawer'
import CharmTimingSelect from 'components/shared/selects/CharmTimingSelect'
import {
  getAllAbilitiesWithCharmsForCharacter,
  getAllCharmKeywordsForCharacter,
} from 'ducks/entities'
import { getAllCharmCategoriesForCharacter } from 'selectors'
import { useDialogLogic } from 'hooks'
import type { Charm } from 'types'
import type { CharmFilter, CharmFilterAction } from '../useCharmFilters'
import type { RootState } from 'store'

const useStyles = makeStyles({
  capitalize: {
    textTransform: 'capitalize',
  },
})

interface Props {
  filters: CharmFilter
  setfilters: Dispatch<CharmFilterAction>
  allAbilities: Charm['ability'][]
  allCategories: string[]
  allKeywords: string[]
  id: number
}

const ExclusiveSwitch = (props) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      margin: '-0.5rem auto 0.5rem',
    }}
  >
    All
    <Switch
      name={props.name}
      value={props.value}
      onChange={(e, checked) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        props.onChange({ target: { name: props.name, value: checked } })
      }
    />
    Any
  </div>
)

const CharmFilterDrawer = (props: Props) => {
  const handleChange = (e) =>
    void props.setfilters({ type: e.target.name, payload: e.target.value })

  const [filtersOpen, setOpen, setClosed] = useDialogLogic()
  const classes = useStyles()

  return (
    <>
      <Button onClick={filtersOpen ? setClosed : setOpen}>Filter</Button>

      <ResponsiveFilterDrawer open={filtersOpen} onClose={setClosed}>
        <Typography variant="h5">Filter Charms</Typography>

        <CharmTimingSelect
          name="timing"
          value={props.filters.timing}
          SelectProps={{ multiple: true }}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          variant="standard"
          name="ability"
          label="Ability/Attribute"
          select
          value={props.filters.ability}
          SelectProps={{ multiple: true }}
          onChange={handleChange}
          margin="dense"
        >
          {props.allAbilities.map((a) =>
            a === 'martial_arts' ? (
              <span key={a} />
            ) : (
              <MenuItem key={a} value={a} className={classes.capitalize}>
                {a === '' ? 'None' : a}
              </MenuItem>
            ),
          )}
        </TextField>

        <TextField
          variant="standard"
          name="keyword"
          label="Keyword"
          select
          value={props.filters.keyword}
          SelectProps={{ multiple: true }}
          onChange={handleChange}
          margin="dense"
        >
          {props.allKeywords.map((a) => (
            <MenuItem key={a} value={a}>
              {a}
            </MenuItem>
          ))}
        </TextField>
        <ExclusiveSwitch
          name="keywordInclusive"
          // @ts-expect-error Charm page rewrite will fix this
          value={props.filters.keywordInclusive}
          onChange={handleChange}
        />

        <TextField
          variant="standard"
          name="category"
          label="Category"
          select
          value={props.filters.category}
          SelectProps={{ multiple: true }}
          onChange={handleChange}
          margin="dense"
        >
          {props.allCategories.map((a) => (
            <MenuItem key={a} value={a}>
              {a}
            </MenuItem>
          ))}
        </TextField>
        <ExclusiveSwitch
          name="categoryInclusive"
          // @ts-expect-error Charm page rewrite will fix this
          value={props.filters.categoryInclusive}
          onChange={handleChange}
        />

        <div style={{ display: 'flex' }}>
          {/*
          // @ts-expect-error Charm page rewrite will fix this */}
          <Checkbox label="Mute Only" name="muteOnly" onChange={handleChange} />

          {/*
          // @ts-expect-error Charm page rewrite will fix this */}
          <Checkbox
            label="Hide Perilous"
            name="hidePerilous"
            onChange={handleChange}
          />
        </div>

        <Button fullWidth onClick={() => props.setfilters({ type: 'reset' })}>
          Reset Filters
        </Button>
      </ResponsiveFilterDrawer>
    </>
  )
}

const mapState = (state: RootState, props: Props) => ({
  allAbilities: getAllAbilitiesWithCharmsForCharacter(state, props.id),
  allCategories: getAllCharmCategoriesForCharacter(state, props.id),
  allKeywords: getAllCharmKeywordsForCharacter(state, props.id),
})

export default connect(mapState)(CharmFilterDrawer)
