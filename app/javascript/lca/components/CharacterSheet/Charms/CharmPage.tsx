import { useReducer } from 'react'
import { Button, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FilterList } from '@material-ui/icons'

import DivWithFilterDrawer from '@lca/components/shared/DivWithFilterDrawer.tsx'
import { getSpecificCharacter } from '@lca/ducks/entities/index.ts'
import {
  useAppSelector,
  useDialogLogic,
  useDocumentTitle,
  useIdFromParams,
} from '@lca/hooks/index.ts'
import { showLoadoutTraits } from '@lca/utils/calculated/index.ts'
import CharacterLoadError from '../CharacterLoadError.tsx'
import SpellList from '../Sorcery/SpellList.tsx'
import CharmFilter from './CharmFilter/index.tsx'
import CharmList from './CharmList.tsx'
import { initialFilters, reducer } from './useCharmFilters.ts'

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
            <Grid
              item
              xs={12}
              className={classes.stickyHeader}
              style={{ display: 'flex' }}
            >
              <Typography variant="h5" style={{ flex: 1 }}>
                Native Charms
                <FilterButton />
              </Typography>
              {showLoadoutTraits(character) && (
                <Typography>
                  Current Loadout: {character.active_loadout}
                </Typography>
              )}
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
