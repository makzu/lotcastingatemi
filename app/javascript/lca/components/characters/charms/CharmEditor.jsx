import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Hidden from 'material-ui/Hidden'
import Typography from 'material-ui/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import styles from './CharmStyles.js'
import CharmFields from './CharmFields.jsx'
import CharmFilter from './CharmFilter.jsx'
import SpellFields from './SpellFields.jsx'

import ProtectedComponent from '../../../containers/ProtectedComponent.jsx'
import {
  updateCharm, createCharm, destroyCharm,
  updateSpell, createSpell, destroySpell,
} from '../../../ducks/actions.js'
import {
  getSpecificCharacter, getEvokableMeritsForCharacter,
  getNativeCharmsForCharacter, getMartialArtsCharmsForCharacter,
  getEvocationsForCharacter, getSpellsForCharacter, getSpiritCharmsForCharacter,
} from '../../../selectors/'

const filterByCategory = categoryFilter => charm => (
  categoryFilter.every((cat) => charm.categories.includes(cat))
)
const SortableItem = SortableElement(({ children }) => children)
const SortableGridList = SortableContainer(({ header, items, classes }) =>
  <Grid container spacing={ 24 }>
    <Grid item xs={ 12 } className={ classes.stickyHeader }>
      { header }
    </Grid>
    { items }
  </Grid>
)

class CharmEditor extends Component {
  constructor(props) {
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

    this.setFilter = this.setFilter.bind(this)
    this.toggleFiltersOpen = this.toggleFiltersOpen.bind(this)
    this.setOpenCharm = this.setOpenCharm.bind(this)
    this.setOpenSpell = this.setOpenSpell.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAddNative = this.handleAddNative.bind(this)
    this.handleAddMA = this.handleAddMA.bind(this)
    this.handleAddEvocation = this.handleAddEvocation.bind(this)
    this.handleAddSpirit = this.handleAddSpirit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdateSpell = this.handleUpdateSpell.bind(this)
    this.handleAddSpell = this.handleAddSpell.bind(this)
    this.handleRemoveSpell = this.handleRemoveSpell.bind(this)
    this.filteredNativeCharms = this.filteredNativeCharms.bind(this)
    this.filteredMACharms = this.filteredMACharms.bind(this)
    this.filteredEvocations = this.filteredEvocations.bind(this)
    this.filteredSpiritCharms = this.filteredSpiritCharms.bind(this)
    this.filteredSpells = this.filteredSpells.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  setFilter(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleFiltersOpen() {
    this.setState({ filtersOpen: !this.state.filtersOpen })
  }

  setOpenCharm(charm) {
    return (e, expanded) => {
      this.setState({ openCharm: expanded ? charm : null })
    }
  }

  setOpenSpell(charm) {
    return (e, expanded) => this.setState({ openSpell: expanded ? charm : null })
  }

  handleUpdate(id, charId, trait, value) {
    this.props._handleUpdate(id, charId, trait, value)
  }

  handleUpdateSpell(id, charId, trait, value) {
    this.props._handleUpdateSpell(id, charId, trait, value)
  }

  handleAddNative() {
    let type
    switch(this.props.character.type) {
    case 'SolarCharacter':
      type = 'SolarCharm'
      break
    case 'DragonbloodCharacter':
      type = 'DragonbloodCharm'
      break
    case 'CustomAbilityCharacter':
      type = 'CustomAbilityCharm'
      break
    case 'CustomAttributeCharacter':
      type = 'CustomAttributeCharm'
      break
    case 'CustomEssenceCharacter':
      type = 'CustomEssenceCharm'
      break
    default:
      type = ''
    }
    this.props._handleCreate(this.props.character.id, type)
  }

  handleAddMA() {
    this.props._handleCreate(this.props.character.id, 'MartialArtsCharm')
  }

  handleAddEvocation() {
    this.props._handleCreate(this.props.character.id, 'Evocation')
  }

  handleAddSpirit() {
    this.props._handleCreate(this.props.character.id, 'SpiritCharm')
  }

  handleAddSpell() {
    this.props._handleCreateSpell(this.props.character.id)
  }

  handleRemove(id) {
    this.props._handleDestroy(id, this.props.character.id)
  }

  handleRemoveSpell(id){
    this.props._handleDestroySpell(id, this.props.character.id)
  }

  filteredNativeCharms() {
    const { nativeCharms } = this.props
    const {
      abilityFilter, categoryFilter,
    } = this.state
    let filteredNatives = nativeCharms

    if (abilityFilter !== '')
      filteredNatives = filteredNatives.filter((c) => c.ability === abilityFilter)
    if (categoryFilter.length > 0)
      filteredNatives = filteredNatives.filter(filterByCategory(categoryFilter))
    return filteredNatives
  }

  filteredMACharms() {
    const { martialArtsCharms } = this.props
    const { categoryFilter, styleFilter } = this.state
    let filteredMA = martialArtsCharms

    if (styleFilter !== '')
      filteredMA = filteredMA.filter((c) => c.style === styleFilter)
    if (categoryFilter.length > 0)
      filteredMA = filteredMA.filter(filterByCategory(categoryFilter))

    return filteredMA
  }

  filteredEvocations() {
    const { evocations } = this.props
    const { categoryFilter, artifactFilter } = this.state
    let filteredEvo = evocations

    if (artifactFilter !== '')
      filteredEvo = filteredEvo.filter((c) => c.artifact_name === artifactFilter)
    if (categoryFilter.length > 0)
      filteredEvo = filteredEvo.filter(filterByCategory(categoryFilter))

    return filteredEvo
  }

  filteredSpiritCharms() {
    const { spiritCharms } = this.props
    const { categoryFilter } = this.state
    let filteredSpirit = spiritCharms

    if (categoryFilter.length > 0)
      filteredSpirit = filteredSpirit.filter(filterByCategory(categoryFilter))

    return filteredSpirit
  }

  filteredSpells() {
    const { spells } = this.props
    const { categoryFilter, circleFilter } = this.state
    let filteredSpells = spells

    if (circleFilter !== '')
      filteredSpells = filteredSpells.filter((c) => c.circle === circleFilter)
    if (categoryFilter.length > 0)
      filteredSpells = filteredSpells.filter(filterByCategory(categoryFilter))

    return filteredSpells
  }

  handleSort({ oldIndex, newIndex, collection }) {
    if (oldIndex === newIndex)
      return

    let charms
    let update = this.handleUpdate
    switch(collection) {
    case 'native':
      charms = this.filteredNativeCharms()
      break
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
    }
    const charId = this.props.character.id
    const charmA = charms[oldIndex]
    const charmB = charms[newIndex]
    const offset = charmA.sort_order > charmB.sort_order ? -1 : 1
    update(charmA.id, charId, 'sort_order', charmB.sort_order + offset)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const {
      character, classes
    } = this.props
    const {
      abilityFilter, categoryFilter, styleFilter, artifactFilter, circleFilter,
      openCharm, openSpell, filtersOpen,
    } = this.state
    const {
      handleUpdate, handleRemove, handleUpdateSpell, handleRemoveSpell,
      handleAddNative, handleAddMA, handleAddEvocation, handleAddSpell, handleAddSpirit,
      setOpenCharm, setOpenSpell, setFilter, toggleFiltersOpen, handleSort,
      filteredNativeCharms, filteredMACharms, filteredEvocations, filteredSpiritCharms, filteredSpells
    } = this

    let natives = filteredNativeCharms().map((c, i) => <SortableItem key={ c.id } index={ i } collection="native">
      <Grid item xs={ 12 } md={ 6 }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    </SortableItem>)
    let maCharms = filteredMACharms().map((c, i) => <SortableItem key={ c.id } index={ i } collection="martial_arts">
      <Grid item xs={ 12 } md={ 6 }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    </SortableItem>)
    let evo = filteredEvocations().map((c, i) => <SortableItem key={ c.id } index={ i } collection="evocation">
      <Grid item xs={ 12 } md={ 6 }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    </SortableItem>)
    let spirit = filteredSpiritCharms().map((c, i) => <SortableItem key={ c.id } index={ i } collection="spirit">
      <Grid item xs={ 12 } md={ 6 }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    </SortableItem>)
    let spl = filteredSpells().map((c, i) => <SortableItem key={ c.id } index={ i } collection="spell">
      <Grid item xs={ 12 } md={ 6 }>
        <SpellFields spell={ c } character={ character }
          onUpdate={ handleUpdateSpell } onRemove={ handleRemoveSpell }
          openSpell={ openSpell } onOpenChange={ setOpenSpell }
        />
      </Grid>
    </SortableItem>)
    // */
    return <div>
      <Hidden smUp>
        <div style={{ height: '1.5em', }}>&nbsp;</div>
      </Hidden>

      { character.type != 'Character' &&
      <Fragment>
        <SortableGridList
          header={<Typography variant="headline">
            Charms
            &nbsp;&nbsp;

            <Button onClick={ handleAddNative }>
              Add <Hidden smDown>Charm</Hidden>&nbsp;
              <ContentAddCircle />
            </Button>

            <CharmFilter id={ character.id } charmType="native"
              currentAbility={ abilityFilter } currentCategory={ categoryFilter }
              open={ filtersOpen } toggleOpen={ toggleFiltersOpen }
              onChange={ setFilter }
            />
          </Typography>}
          items={ natives }
          classes={ classes }
          onSortEnd={ handleSort }
          useDragHandle={ true }
          axis="xy"
        />
        <SortableGridList
          header={<Typography variant="headline">
            Martial Arts
            &nbsp;&nbsp;

            <Button onClick={ handleAddMA }>
              Add <Hidden smDown>MA Charm</Hidden>&nbsp;
              <ContentAddCircle />
            </Button>

            <CharmFilter id={ character.id } charmType="martial_arts"
              currentAbility={ styleFilter } currentCategory={ categoryFilter }
              open={ filtersOpen } toggleOpen={ toggleFiltersOpen }
              onChange={ setFilter }
            />
          </Typography>}
          items={ maCharms }
          classes={ classes }
          onSortEnd={ handleSort }
          useDragHandle={ true }
          axis="xy"
        />
        <SortableGridList
          header={<Typography variant="headline">
            Evocations
            &nbsp;&nbsp;

            <Button onClick={ handleAddEvocation }>
              Add <Hidden smDown>Evocation</Hidden>&nbsp;
              <ContentAddCircle />
            </Button>

            <CharmFilter id={ character.id } charmType="evocation"
              currentAbility={ artifactFilter } currentCategory={ categoryFilter }
              open={ filtersOpen } toggleOpen={ toggleFiltersOpen }
              onChange={ setFilter }
            />
          </Typography>}
          items={ evo }
          classes={ classes }
          onSortEnd={ handleSort }
          useDragHandle={ true }
          axis="xy"
        />
        <SortableGridList
          header={<Typography variant="headline">
            Spirit Charms
            &nbsp;&nbsp;

            <Button onClick={ handleAddSpirit }>
              Add <Hidden smDown>Spirit Charm</Hidden>&nbsp;
              <ContentAddCircle />
            </Button>

            <CharmFilter id={ character.id } charmType="spirit"
              currentAbility={ '' } currentCategory={ categoryFilter }
              open={ filtersOpen } toggleOpen={ toggleFiltersOpen }
              onChange={ setFilter }
            />
          </Typography>}
          items={ spirit }
          classes={ classes }
          onSortEnd={ handleSort }
          useDragHandle={ true }
          axis="xy"
        />
      </Fragment> }
      <SortableGridList
        header={<Typography variant="headline">
          Spells
          &nbsp;&nbsp;

          <Button onClick={ handleAddSpell }>
            Add Spell&nbsp;
            <ContentAddCircle />
          </Button>

          <CharmFilter id={ character.id } charmType="spell"
            currentAbility={ circleFilter } currentCategory={ categoryFilter }
            open={ filtersOpen } toggleOpen={ toggleFiltersOpen }
            onChange={ setFilter }
          />
        </Typography>}
        items={ spl }
        classes={ classes }
        onSortEnd={ handleSort }
        useDragHandle={ true }
        axis="xy"
      />
    </div>
  }
}
CharmEditor.propTypes = {
  character: PropTypes.object,
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
  spells: PropTypes.arrayOf(PropTypes.object),
  spiritCharms: PropTypes.arrayOf(PropTypes.object),
  _handleCreate: PropTypes.func,
  _handleUpdate: PropTypes.func,
  _handleDestroy: PropTypes.func,
  _handleCreateSpell: PropTypes.func,
  _handleUpdateSpell: PropTypes.func,
  _handleDestroySpell: PropTypes.func,
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)

  let nativeCharms = []
  let martialArtsCharms = []
  let evocations = []
  let artifacts = []
  let spiritCharms = []
  let spells = []

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
function mapDispatchToProps(dispatch) {
  return {
    _handleUpdate: (id, charId, trait, value) => {
      dispatch(updateCharm(id, charId, trait, value))
    },
    _handleDestroy: (id, charId) => {
      dispatch(destroyCharm(id, charId))
    },
    _handleCreate: (charId, type) => {
      dispatch(createCharm(charId, type))
    },
    _handleUpdateSpell: (id, charId, trait, value) => {
      dispatch(updateSpell(id, charId, trait, value))
    },
    _handleDestroySpell: (id, charId) => {
      dispatch(destroySpell(id, charId))
    },
    _handleCreateSpell: (charId) => {
      dispatch(createSpell(charId))
    },
  }
}

export default ProtectedComponent(
  withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CharmEditor
    )
  )
)
