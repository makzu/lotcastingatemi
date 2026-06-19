import { useReducer } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FilterList } from '@material-ui/icons'

import DivWithFilterDrawer from '@lca/components/shared/DivWithFilterDrawer.tsx'
import { getSpecificCharacter } from '@lca/ducks/entities'
import {
  useAppSelector,
  useDialogLogic,
  useDocumentTitle,
  useIdFromParams,
} from '@lca/hooks'
import CharacterLoadError from '../CharacterLoadError'
import CharmFilter from '../Charms/CharmFilter/CharmFilter.tsx'
import { initialFilters, reducer } from '../Charms/useCharmFilters.ts'
import SpellList from './SpellList.tsx'

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1),
    '&:last-child': {
      display: 'none',
    },
  },
  stickyHeader: {
    position: 'sticky',
    top: '64px',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  filterButton: {
    marginLeft: theme.spacing(2),
  },
}))

const SorceryPage = () => {
  const id = useIdFromParams()
  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  const [filters, setFilters] = useReducer(reducer, initialFilters)
  const [filtersOpen, setOpen, setClosed] = useDialogLogic()
  const classes = useStyles()

  useDocumentTitle(`${character.name} Sorcery | Lot-Casting Atemi`)

  /* Escape hatch */
  if (character === undefined) {
    return <CharacterLoadError />
  }

  const FilterButton = () => (
    <Button
      onClick={filtersOpen ? setClosed : setOpen}
      className={classes.filterButton}
      endIcon={<FilterList />}
    >
      Filter
    </Button>
  )

  return (
    <DivWithFilterDrawer>
      <CharmFilter
        id={id}
        filters={filters}
        setFilters={setFilters}
        open={filtersOpen}
        setClosed={setClosed}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.stickyHeader}>
          <Typography variant="h5">
            Sorcery
            <FilterButton />
          </Typography>
        </Grid>

        <SpellList id={id} filters={filters} />
      </Grid>
    </DivWithFilterDrawer>
  )
}

export default SorceryPage
