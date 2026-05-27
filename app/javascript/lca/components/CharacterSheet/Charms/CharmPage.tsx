import { useReducer } from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FilterIcon from '@material-ui/icons/FilterList'

import DivWithFilterDrawer from '@lca/components/shared/DivWithFilterDrawer'
import { getSpecificCharacter } from '@lca/ducks/entities'
import {
  useAppSelector,
  useDialogLogic,
  useDocumentTitle,
  useIdFromParams,
} from '@lca/hooks'
import CharacterLoadError from '../CharacterLoadError'
import CharmFilter from './CharmFilter/'
import CharmList from './CharmList'
import SpellList from './SpellList'
import { initialFilters, reducer } from './useCharmFilters'

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

const CharmPage = () => {
  const id = useIdFromParams()
  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  const [filters, setFilters] = useReducer(reducer, initialFilters)
  const [filtersOpen, setOpen, setClosed] = useDialogLogic()
  const classes = useStyles()

  useDocumentTitle(`${character?.name} Charms | Lot-Casting Atemi`)

  if (character?.name == null) {
    return <CharacterLoadError />
  }

  const FilterButton = () => (
    <Button
      onClick={filtersOpen ? setClosed : setOpen}
      className={classes.filterButton}
      endIcon={<FilterIcon />}
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
        {character.charms.length +
          character.martial_arts_charms.length +
          character.evocations.length +
          character.spirit_charms.length ===
          0 && (
          <Grid item xs={12}>
            <Typography>Character has no Charms.</Typography>
          </Grid>
        )}
        {character.charms.length > 0 && (
          <>
            <Grid item xs={12} className={classes.stickyHeader}>
              <Typography variant="h5">
                Native Charms
                <FilterButton />
              </Typography>
            </Grid>
            <CharmList type="native" id={id} filters={filters} />
            <Divider className={classes.divider} />
          </>
        )}
        {character.martial_arts_charms.length > 0 && (
          <>
            <Grid item xs={12} className={classes.stickyHeader}>
              <Typography variant="h5">
                Martial Arts Charms
                <FilterButton />
              </Typography>
            </Grid>
            <CharmList type="martialArts" id={id} filters={filters} />
            <Divider className={classes.divider} />
          </>
        )}
        {character.evocations.length > 0 && (
          <>
            <Grid item xs={12} className={classes.stickyHeader}>
              <Typography variant="h5">
                Evocations
                <FilterButton />
              </Typography>
            </Grid>
            <CharmList type="evocation" id={id} filters={filters} />
            <Divider className={classes.divider} />
          </>
        )}
        {character.spirit_charms.length > 0 && (
          <>
            <Grid item xs={12} className={classes.stickyHeader}>
              <Typography variant="h5">
                Spirit Charms
                <FilterButton />
              </Typography>
            </Grid>
            <CharmList type="spirit" id={id} filters={filters} />
          </>
        )}
        {character.spells.length > 0 && (
          <>
            <Grid item xs={12} className={classes.stickyHeader}>
              <Typography variant="h5">
                Spells
                <FilterButton />
              </Typography>
            </Grid>
            <SpellList id={id} filters={filters} />
          </>
        )}
      </Grid>
    </DivWithFilterDrawer>
  )
}

export default CharmPage
