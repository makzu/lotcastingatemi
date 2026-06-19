import { useReducer } from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import FilterIcon from '@material-ui/icons/FilterList'

import CharacterLoadError from '@lca/components/CharacterSheet/CharacterLoadError'
import CharmFilter from '@lca/components/CharacterSheet/Charms/CharmFilter'
import {
  initialFilters,
  reducer,
} from '@lca/components/CharacterSheet/Charms/useCharmFilters.ts'
import DivWithFilterDrawer from '@lca/components/shared/DivWithFilterDrawer'
import CharmLoadoutSelect from '@lca/components/shared/selects/CharmLoadoutSelect.tsx'
import { createCharm, createSpell, updateCharacter } from '@lca/ducks/entities'
import {
  useAppDispatch,
  useAppSelector,
  useDialogLogic,
  useIdFromParams,
} from '@lca/hooks'
import { getSpecificCharacter } from '@lca/selectors'
import {
  isCustomCharacter,
  nativeCharmType,
  showLoadoutTraits,
} from '@lca/utils/calculated'
import CharmList from './CharmEditorList.tsx'
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
  addButton: {
    marginLeft: theme.spacing(2),
  },
}))

const CharmEditorPage = () => {
  const dispatch = useAppDispatch()
  const id = useIdFromParams()
  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  const [filters, setFilters] = useReducer(reducer, initialFilters)
  const [filtersOpen, setOpen, setClosed] = useDialogLogic()
  const classes = useStyles()

  const handleAddNative = () => {
    const type = nativeCharmType(character)
    let loadouts: string[] | undefined

    if (character.type === 'AlchemicalCharacter') {
      loadouts = [character.current_loadout]
    }
    dispatch(createCharm(id, { type, loadouts }))
  }

  const handleAddMA = () => {
    dispatch(createCharm(character.id, { type: 'Charms::MartialArtsCharm' }))
  }

  const handleAddEvo = () => {
    dispatch(createCharm(character.id, { type: 'Charms::Evocation' }))
  }

  const handleAddSpirit = () => {
    dispatch(createCharm(character.id, { type: 'Charms::SpiritCharm' }))
  }

  const handleAddSpell = () => {
    dispatch(createSpell(character.id))
  }

  const handleSetupLoadouts = () => {
    dispatch(updateCharacter(character.id, { active_loadout: 'Default' }))
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

  if (character === undefined) return <CharacterLoadError />

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
        <Grid
          item
          xs={12}
          className={classes.stickyHeader}
          style={{ display: 'flex' }}
        >
          <Typography variant="h5" style={{ flex: 1 }}>
            Native Charms
            <Button onClick={handleAddNative} className={classes.filterButton}>
              Add Charm &nbsp;
              <ContentAddCircle />
            </Button>
            <FilterButton />
          </Typography>
          {showLoadoutTraits(character) && (
            <CharmLoadoutSelect character={character} />
          )}
          {isCustomCharacter(character) && !showLoadoutTraits(character) && (
            <Button onClick={handleSetupLoadouts}>Use Loadouts</Button>
          )}
        </Grid>
        <CharmList type="native" character={character} filters={filters} />
        <Divider className={classes.divider} />

        <Grid item xs={12} className={classes.stickyHeader}>
          <Typography variant="h5">
            Martial Arts Charms
            <Button onClick={handleAddMA} className={classes.filterButton}>
              Add Charm &nbsp;
              <ContentAddCircle />
            </Button>
            <FilterButton />
          </Typography>
        </Grid>

        <CharmList type="martialArts" character={character} filters={filters} />

        <Divider className={classes.divider} />

        <Grid item xs={12} className={classes.stickyHeader}>
          <Typography variant="h5">
            Evocations
            <Button onClick={handleAddEvo} className={classes.filterButton}>
              Add Charm &nbsp;
              <ContentAddCircle />
            </Button>
            <FilterButton />
          </Typography>
        </Grid>
        <CharmList type="evocation" character={character} filters={filters} />
        <Divider className={classes.divider} />

        <Grid item xs={12} className={classes.stickyHeader}>
          <Typography variant="h5">
            Spirit Charms
            <Button onClick={handleAddSpirit} className={classes.filterButton}>
              Add Charm &nbsp;
              <ContentAddCircle />
            </Button>
            <FilterButton />
          </Typography>
        </Grid>
        <CharmList type="spirit" character={character} filters={filters} />

        <Grid item xs={12} className={classes.stickyHeader}>
          <Typography variant="h5">
            Spells
            <Button onClick={handleAddSpell} className={classes.filterButton}>
              Add Spell &nbsp;
              <ContentAddCircle />
            </Button>
            <FilterButton />
          </Typography>
        </Grid>
        <SpellList character={character} filters={filters} />
      </Grid>
    </DivWithFilterDrawer>
  )
}

export default CharmEditorPage
