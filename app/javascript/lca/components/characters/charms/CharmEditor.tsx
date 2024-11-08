import { Component } from 'react'
import { connect } from 'react-redux'

import ContentAddCircle from '@mui/icons-material/AddCircle'
import withStyles, { type WithStyles } from '@mui/styles/withStyles'

import DocumentTitle from '@/components/generic/DocumentTitle'
import SortableGridList from '@/components/generic/SortableGridList'
import SortableItem from '@/components/generic/SortableItem'
import ProtectedComponent from '@/containers/ProtectedComponent'
import {
  createCharm,
  createSpell,
  destroyCharm,
  destroySpell,
  updateCharm,
  updateSpell,
} from '@/ducks/actions'
import { getSpecificCharacter } from '@/ducks/entities/character'
import {
  getEvocationsForCharacter,
  getEvokableMeritsForCharacter,
  getMartialArtsCharmsForCharacter,
  getNativeCharmsForCharacter,
  getSpellsForCharacter,
  getSpiritCharmsForCharacter,
} from '@/selectors/'
import { type Merit } from '@/types'
import type { Character, Charm, Spell } from '@/utils/flow-types'
import { type RootState } from 'store'
import CharmFields from './CharmFields'
import CharmFilter from './CharmFilter'
import styles from './CharmStyles.js'
import SpellFields from './SpellFields'

import { Button, Grid, Hidden, Typography } from '@mui/material'
import { updateSpellSort, updateCharmSort } from '@/ducks/entities'

const filterByCategory = (categoryFilter) => (charm) =>
  categoryFilter.every((cat) => charm.categories.includes(cat))

export interface Props extends WithStyles<typeof styles> {
  character: Character
  nativeCharms: Charm[]
  martialArtsCharms: Charm[]
  evocations: Charm[]
  spells: Spell[]
  spiritCharms: Charm[]
  createCharm: $TSFixMeFunction
  updateCharm: $TSFixMeFunction
  destroyCharm: $TSFixMeFunction
  createSpell: $TSFixMeFunction
  updateSpell: $TSFixMeFunction
  destroySpell: $TSFixMeFunction
  updateCharmSort: $TSFixMeFunction
  updateSpellSort: $TSFixMeFunction
}
interface State {
  filtersOpen: boolean
  abilityFilter: string
  styleFilter: string
  artifactFilter: string
  circleFilter: string
  categoryFilter: string[]
  openCharm: number | null
  openSpell: number | null
}

class CharmEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      filtersOpen: false,
      abilityFilter: '',
      styleFilter: '',
      artifactFilter: '',
      circleFilter: '',
      categoryFilter: [],
      openCharm: null,
      openSpell: null,
    }
    this.handleSort = this.handleSort.bind(this)
  }

  props: Props

  setFilter = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  toggleFiltersOpen = () => {
    this.setState({
      filtersOpen: !this.state.filtersOpen,
    })
  }
  setOpenCharm = (charm) => {
    return (e, expanded) => {
      this.setState({
        openCharm: expanded ? charm : null,
      })
    }
  }
  setOpenSpell = (charm) => {
    return (e, expanded) =>
      this.setState({
        openSpell: expanded ? charm : null,
      })
  }
  handleUpdate = (id, charId, trait) => {
    this.props.updateCharm(id, charId, trait)
  }
  handleUpdateSpell = (id, charId, trait) => {
    this.props.updateSpell(id, charId, trait)
  }
  handleAddNative = () => {
    let type

    switch (this.props.character.type) {
      case 'SolarCharacter':
      case 'DragonbloodCharacter':
      case 'SiderealCharacter':
      case 'AbyssalCharacter':
      case 'CustomAbilityCharacter':
        type = 'Charms::AbilityCharm'
        break

      case 'LunarCharacter':
      case 'CustomAttributeCharacter':
        type = 'Charms::AttributeCharm'
        break

      case 'CustomEssenceCharacter':
        type = 'Charms::EssenceCharm'
        break

      default:
        type = ''
    }

    this.props.createCharm(this.props.character.id, {
      type,
    })
  }
  handleAddMA = () => {
    this.props.createCharm(this.props.character.id, {
      type: 'Charms::MartialArtsCharm',
    })
  }
  handleAddEvocation = () => {
    this.props.createCharm(this.props.character.id, {
      type: 'Charms::Evocation',
    })
  }
  handleAddSpirit = () => {
    this.props.createCharm(this.props.character.id, {
      type: 'Charms::SpiritCharm',
    })
  }
  handleAddSpell = () => {
    this.props.createSpell(this.props.character.id)
  }

  handleRemove = (id) => {
    this.props.destroyCharm(id, this.props.character.id)
  }

  handleRemoveSpell = (id) => {
    this.props.destroySpell(id, this.props.character.id)
  }
  filteredNativeCharms = () => {
    const { nativeCharms } = this.props
    const { abilityFilter, categoryFilter } = this.state
    let filteredNatives = nativeCharms
    if (abilityFilter !== '')
      filteredNatives = filteredNatives.filter(
        (c) => c.ability === abilityFilter,
      )
    if (categoryFilter.length > 0)
      filteredNatives = filteredNatives.filter(filterByCategory(categoryFilter))
    return filteredNatives
  }
  filteredMACharms = () => {
    const { martialArtsCharms } = this.props
    const { categoryFilter, styleFilter } = this.state
    let filteredMA = martialArtsCharms
    if (styleFilter !== '')
      filteredMA = filteredMA.filter((c) => c.style === styleFilter)
    if (categoryFilter.length > 0)
      filteredMA = filteredMA.filter(filterByCategory(categoryFilter))
    return filteredMA
  }
  filteredEvocations = () => {
    const { evocations } = this.props
    const { categoryFilter, artifactFilter } = this.state
    let filteredEvo = evocations
    if (artifactFilter !== '')
      filteredEvo = filteredEvo.filter(
        (c) => c.artifact_name === artifactFilter,
      )
    if (categoryFilter.length > 0)
      filteredEvo = filteredEvo.filter(filterByCategory(categoryFilter))
    return filteredEvo
  }
  filteredSpiritCharms = () => {
    const { spiritCharms } = this.props
    const { categoryFilter } = this.state
    let filteredSpirit = spiritCharms
    if (categoryFilter.length > 0)
      filteredSpirit = filteredSpirit.filter(filterByCategory(categoryFilter))
    return filteredSpirit
  }
  filteredSpells = () => {
    const { spells } = this.props
    const { categoryFilter, circleFilter } = this.state
    let filteredSpells = spells
    if (circleFilter !== '')
      filteredSpells = filteredSpells.filter((c) => c.circle === circleFilter)
    if (categoryFilter.length > 0)
      filteredSpells = filteredSpells.filter(filterByCategory(categoryFilter))
    return filteredSpells
  }
  handleSort = ({ oldIndex, newIndex, collection }) => {
    if (oldIndex === newIndex) return
    let charms
    let update = this.handleUpdate

    switch (collection) {
      case 'martial_arts':
        charms = this.filteredMACharms()
        break

      case 'evocation':
        charms = this.filteredEvocations()
        break

      case 'spirit':
        charms = this.filteredSpiritCharms()
        break

      case 'spell':
        charms = this.filteredSpells()
        update = this.handleUpdateSpell
        break

      case 'native':
      default:
        charms = this.filteredNativeCharms()
        break
    }

    const charId = this.props.character.id
    const charmA = charms[oldIndex]!
    const charmB = charms[newIndex]!
    const offset = charmA.sorting > charmB.sorting ? -1 : 1
    const updateSort =
      collection === 'spell' ? updateSpellSort : updateCharmSort
    updateSort({ id: charmA.id, sorting: charmB.sorting + offset })
    update(charmA.id, charId, { sorting_position: newIndex })
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return (
        <div>
          <Typography paragraph>This Character has not yet loaded.</Typography>
        </div>
      )
    const { character, classes } = this.props
    const {
      abilityFilter,
      categoryFilter,
      styleFilter,
      artifactFilter,
      circleFilter,
      openCharm,
      openSpell,
      filtersOpen,
    } = this.state
    const {
      handleUpdate,
      handleRemove,
      handleUpdateSpell,
      handleRemoveSpell,
      handleAddNative,
      handleAddMA,
      handleAddEvocation,
      handleAddSpell,
      handleAddSpirit,
      setOpenCharm,
      setOpenSpell,
      setFilter,
      toggleFiltersOpen,
      handleSort,
      filteredNativeCharms,
      filteredMACharms,
      filteredEvocations,
      filteredSpiritCharms,
      filteredSpells,
    } = this
    const natives = filteredNativeCharms().map((c, i) => (
      <SortableItem key={c.id} index={i} collection="native">
        <Grid item xs={12} md={6}>
          <CharmFields
            charm={c}
            character={character}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
            openCharm={openCharm}
            onOpenChange={setOpenCharm}
          />
        </Grid>
      </SortableItem>
    ))
    const maCharms = filteredMACharms().map((c, i) => (
      <SortableItem key={c.id} index={i} collection="martial_arts">
        <Grid item xs={12} md={6}>
          <CharmFields
            charm={c}
            character={character}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
            openCharm={openCharm}
            onOpenChange={setOpenCharm}
          />
        </Grid>
      </SortableItem>
    ))
    const evo = filteredEvocations().map((c, i) => (
      <SortableItem key={c.id} index={i} collection="evocation">
        <Grid item xs={12} md={6}>
          <CharmFields
            charm={c}
            character={character}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
            openCharm={openCharm}
            onOpenChange={setOpenCharm}
          />
        </Grid>
      </SortableItem>
    ))
    const spirit = filteredSpiritCharms().map((c, i) => (
      <SortableItem key={c.id} index={i} collection="spirit">
        <Grid item xs={12} md={6}>
          <CharmFields
            charm={c}
            character={character}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
            openCharm={openCharm}
            onOpenChange={setOpenCharm}
          />
        </Grid>
      </SortableItem>
    ))
    const spl = filteredSpells().map((c, i) => (
      <SortableItem key={c.id} index={i} collection="spell">
        <Grid item xs={12} md={6}>
          <SpellFields
            spell={c}
            character={character}
            onUpdate={handleUpdateSpell}
            onRemove={handleRemoveSpell}
            openSpell={openSpell}
            onOpenChange={setOpenSpell}
          />
        </Grid>
      </SortableItem>
    ))
    // */
    return (
      <div>
        <DocumentTitle title={`${character.name} Charms | Lot-Casting Atemi`} />

        <Hidden smUp>
          <div
            style={{
              height: '1.5em',
            }}
          >
            &nbsp;
          </div>
        </Hidden>

        {character.type != 'Character' && (
          <>
            <SortableGridList
              header={
                <Typography variant="h5">
                  Charms &nbsp;&nbsp;
                  <Button onClick={handleAddNative}>
                    Add <Hidden mdDown>Charm</Hidden>
                    &nbsp;
                    <ContentAddCircle />
                  </Button>
                  <CharmFilter
                    id={character.id}
                    charmType="native"
                    currentAbility={abilityFilter}
                    currentCategory={categoryFilter}
                    open={filtersOpen}
                    toggleOpen={toggleFiltersOpen}
                    onChange={setFilter}
                  />
                </Typography>
              }
              items={natives}
              classes={classes}
              onSortEnd={handleSort}
              useDragHandle
              axis="xy"
            />
            <SortableGridList
              header={
                <Typography variant="h5">
                  Martial Arts &nbsp;&nbsp;
                  <Button onClick={handleAddMA}>
                    Add <Hidden mdDown>MA Charm</Hidden>
                    &nbsp;
                    <ContentAddCircle />
                  </Button>
                  <CharmFilter
                    id={character.id}
                    charmType="martial_arts"
                    currentAbility={styleFilter}
                    currentCategory={categoryFilter}
                    open={filtersOpen}
                    toggleOpen={toggleFiltersOpen}
                    onChange={setFilter}
                  />
                </Typography>
              }
              items={maCharms}
              classes={classes}
              onSortEnd={handleSort}
              useDragHandle
              axis="xy"
            />
            <SortableGridList
              header={
                <Typography variant="h5">
                  Evocations &nbsp;&nbsp;
                  <Button onClick={handleAddEvocation}>
                    Add <Hidden mdDown>Evocation</Hidden>
                    &nbsp;
                    <ContentAddCircle />
                  </Button>
                  <CharmFilter
                    id={character.id}
                    charmType="evocation"
                    currentAbility={artifactFilter}
                    currentCategory={categoryFilter}
                    open={filtersOpen}
                    toggleOpen={toggleFiltersOpen}
                    onChange={setFilter}
                  />
                </Typography>
              }
              items={evo}
              classes={classes}
              onSortEnd={handleSort}
              useDragHandle
              axis="xy"
            />
            <SortableGridList
              header={
                <Typography variant="h5">
                  Spirit Charms &nbsp;&nbsp;
                  <Button onClick={handleAddSpirit}>
                    Add <Hidden mdDown>Spirit Charm</Hidden>
                    &nbsp;
                    <ContentAddCircle />
                  </Button>
                  <CharmFilter
                    id={character.id}
                    charmType="spirit"
                    currentAbility={''}
                    currentCategory={categoryFilter}
                    open={filtersOpen}
                    toggleOpen={toggleFiltersOpen}
                    onChange={setFilter}
                  />
                </Typography>
              }
              items={spirit}
              classes={classes}
              onSortEnd={handleSort}
              useDragHandle
              axis="xy"
            />
          </>
        )}
        <SortableGridList
          header={
            <Typography variant="h5">
              Spells &nbsp;&nbsp;
              <Button onClick={handleAddSpell}>
                Add Spell&nbsp;
                <ContentAddCircle />
              </Button>
              <CharmFilter
                id={character.id}
                charmType="spell"
                currentAbility={circleFilter}
                currentCategory={categoryFilter}
                open={filtersOpen}
                toggleOpen={toggleFiltersOpen}
                onChange={setFilter}
              />
            </Typography>
          }
          items={spl}
          classes={classes}
          onSortEnd={handleSort}
          useDragHandle
          axis="xy"
        />
      </div>
    )
  }
}

function mapStateToProps(state: RootState, ownProps) {
  const id = ownProps.params.id
  const character = getSpecificCharacter(state, id)
  let nativeCharms: Charm[] = []
  let martialArtsCharms: Charm[] = []
  let evocations: Charm[] = []
  let artifacts: Merit[] = []
  let spiritCharms: Charm[] = []
  let spells: Spell[] = []

  if (character !== undefined) {
    nativeCharms = getNativeCharmsForCharacter(state, id)
    martialArtsCharms = getMartialArtsCharmsForCharacter(state, id)
    evocations = getEvocationsForCharacter(state, id)
    spells = getSpellsForCharacter(state, id)
    spiritCharms = getSpiritCharmsForCharacter(state, id)
    artifacts = getEvokableMeritsForCharacter(state, id)
  }

  return {
    character,
    nativeCharms,
    martialArtsCharms,
    evocations,
    artifacts,
    spells,
    spiritCharms,
  }
}

export default ProtectedComponent(
  withStyles(styles)(
    connect(mapStateToProps, {
      createCharm,
      updateCharm,
      destroyCharm,
      createSpell,
      updateSpell,
      destroySpell,
      updateCharmSort,
      updateSpellSort,
    })(CharmEditor),
  ),
)