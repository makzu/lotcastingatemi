import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import WeaponFields from './weaponFields.jsx'

import BlockPaper from '../../generic/blockPaper.jsx'
import { createWeapon, destroyWeapon, updateWeapon } from '../../../ducks/actions.js'
import { getWeaponsForCharacter } from '../../../selectors'
import { fullWeapon } from '../../../utils/propTypes'

const SortableItem = SortableElement(({ children }) => children)
const SortableWeaponList = SortableContainer(({ items }) => <div>{ items }</div>)

class WeaponEditor extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  handleChange(id, trait, value) {
    this.props.updateWeapon(id, this.props.character.id, trait, value)
  }

  handleAdd() {
    this.props.addWeapon(this.props.character.id)
  }

  handleRemove(id) {
    this.props.removeWeapon(id, this.props.character.id)
  }

  handleSort({ oldIndex, newIndex }) {
    const weaponA = this.props.weapons[oldIndex]
    const weaponB = this.props.weapons[newIndex]
    const offset = weaponA.sort_order > weaponB.sort_order ? -1 : 1
    this.props.updateWeapon(weaponA.id, this.props.character.id, 'sort_order', weaponB.sort_order + offset)
  }

  render() {
    const { handleChange, handleAdd, handleRemove, handleSort } = this

    const weapons = this.props.weapons.map((weapon, i) =>
      <SortableItem key={ weapon.id } index={ i }>
        <WeaponFields weapon={ weapon } character={ this.props.character }
          onChange={ handleChange } onRemoveClick={ handleRemove }
        />
      </SortableItem>
    )

    return <BlockPaper>
      <Typography variant="title">
        Weapons
        <Button onClick={ handleAdd }>
          Add&nbsp;
          <ContentAddCircle  />
        </Button>
      </Typography>
      <SortableWeaponList
        items={ weapons }
        onSortEnd={ handleSort }
        useDragHandle={ true }
      />
    </BlockPaper>
  }
}
WeaponEditor.propTypes = {
  character: PropTypes.object,
  weapons: PropTypes.arrayOf(PropTypes.shape(fullWeapon)),
  updateWeapon: PropTypes.func,
  addWeapon: PropTypes.func,
  removeWeapon: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const character = ownProps.character
  let weapons = []

  if (character != undefined)
    weapons = getWeaponsForCharacter(state, character.id)

  return {
    weapons
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateWeapon: (id, characterId, trait, value) => {
      dispatch(updateWeapon(id, characterId, trait, value))
    },
    addWeapon: (characterId) => {
      dispatch(createWeapon(characterId))
    },
    removeWeapon: (id, characterId) => {
      dispatch(destroyWeapon(id, characterId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponEditor)
