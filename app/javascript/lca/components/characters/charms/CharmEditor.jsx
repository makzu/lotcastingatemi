import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Hidden from 'material-ui/Hidden'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'

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
  getAllAbilitiesWithCharmsForCharacter,
} from '../../../selectors/'

class CharmEditor extends Component {
  constructor(props) {
    super(props)

    this.state = { charmFilter: '' }

    this.setFilter = this.setFilter.bind(this)
    this.setOpenCharm = this.setOpenCharm.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAddNative = this.handleAddNative.bind(this)
    this.handleAddMA = this.handleAddMA.bind(this)
    this.handleAddEvocation = this.handleAddEvocation.bind(this)
    this.handleAddSpirit = this.handleAddSpirit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdateSpell = this.handleUpdateSpell.bind(this)
    this.handleAddSpell = this.handleAddSpell.bind(this)
    this.handleRemoveSpell = this.handleRemoveSpell.bind(this)
  }

  setFilter(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  setOpenCharm(charm) {
    return (e, expanded) => {
      this.setState({ openCharm: expanded ? charm : null })
    }
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

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const {
      character, nativeCharms, abilities, martialArtsCharms, evocations,
      spiritCharms, spells, classes
    } = this.props
    const {
      handleUpdate, handleRemove, handleUpdateSpell, handleRemoveSpell,
      handleAddNative, handleAddMA, handleAddEvocation, handleAddSpell, handleAddSpirit,
      setOpenCharm,
    } = this
    const { charmFilter, openCharm } = this.state

    let filteredNatives = nativeCharms
    if (charmFilter !== '')
      filteredNatives = nativeCharms.filter((c) => c.ability === charmFilter)


    let natives = filteredNatives.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    )
    let maCharms = martialArtsCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    )
    let evo = evocations.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    )
    let spirit = spiritCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
          openCharm={ openCharm } onOpenChange={ setOpenCharm }
        />
      </Grid>
    )
    let spl = spells.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SpellFields spell={ c } character={ character }
          onUpdate={ handleUpdateSpell } onRemove={ handleRemoveSpell }
        />
      </Grid>
    )

    return <div>
      <Hidden smUp>
        <div style={{ height: '1.5em', }}>&nbsp;</div>
      </Hidden>

      { character.type != 'Character' &&
      <Fragment>
        <Grid container spacing={ 24 }>
          <Grid item xs={ 12 } className={ classes.stickyHeader }>
            <Typography variant="headline">
              Charms
              &nbsp;&nbsp;

              <Button onClick={ handleAddNative }>
                Add <Hidden smDown>Charm</Hidden>&nbsp;
                <ContentAddCircle />
              </Button>

              <CharmFilter abilities={ abilities } filter={ charmFilter }
                name="charmFilter" onChange={ this.setFilter }
              />
            </Typography>
          </Grid>
          { natives }
        </Grid>

        <Grid container spacing={ 24 }>
          <Grid item xs={ 12 } className={ classes.stickyHeader }>
            <Typography variant="headline">
              Martial Arts
              &nbsp;&nbsp;

              <Button onClick={ handleAddMA }>
                Add <Hidden smDown>MA Charm</Hidden>&nbsp;
                <ContentAddCircle />
              </Button>
            </Typography>
          </Grid>
          { maCharms }
        </Grid>

        <Grid container spacing={ 24 }>
          <Grid item xs={ 12 } className={ classes.stickyHeader }>
            <Typography variant="headline">
              Evocations
              &nbsp;&nbsp;

              <Button onClick={ handleAddEvocation }>
                Add <Hidden smDown>Evocation</Hidden>&nbsp;
                <ContentAddCircle />
              </Button>
            </Typography>
          </Grid>
          { evo }
        </Grid>

        <Grid container spacing={ 24 }>
          <Grid item xs={ 12 } className={ classes.stickyHeader }>
            <Typography variant="headline">
              Spirit Charms
              &nbsp;&nbsp;

              <Button onClick={ handleAddSpirit }>
                Add <Hidden smDown>Spirit Charm</Hidden>&nbsp;
                <ContentAddCircle />
              </Button>
            </Typography>
          </Grid>
          { spirit }
        </Grid>
      </Fragment> }

      <Grid container spacing={ 24 }>
        <Grid item xs={ 12 } className={ classes.stickyHeader }>
          <Typography variant="headline">
            Spells
            &nbsp;&nbsp;

            <Button onClick={ handleAddSpell }>
              Add Spell&nbsp;
              <ContentAddCircle />
            </Button>
          </Typography>
        </Grid>
        { spl }
      </Grid>
    </div>
  }
}
CharmEditor.propTypes = {
  character: PropTypes.object,
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  abilities: PropTypes.arrayOf(PropTypes.string),
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
  let abilities = []
  let martialArtsCharms = []
  let evocations = []
  let artifacts = []
  let spiritCharms = []
  let spells = []

  if (character !== undefined) {
    nativeCharms = getNativeCharmsForCharacter(state, id)
    abilities = getAllAbilitiesWithCharmsForCharacter(state, id)
    martialArtsCharms = getMartialArtsCharmsForCharacter(state, id)
    evocations = getEvocationsForCharacter(state, id)
    spells = getSpellsForCharacter(state, id)
    spiritCharms = getSpiritCharmsForCharacter(state, id)
    artifacts = getEvokableMeritsForCharacter(state, id)
  }

  return {
    character,
    nativeCharms,
    abilities,
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
