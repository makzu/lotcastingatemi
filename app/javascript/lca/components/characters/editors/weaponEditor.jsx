import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import WeaponFields from './weaponFields.jsx'

import BlockPaper from '../../generic/blockPaper.jsx'
import { createWeapon, destroyWeapon, updateWeapon } from '../../../ducks/actions.js'
import { getWeaponsForCharacter } from '../../../selectors'
import { fullWeapon } from '../../../utils/propTypes'

class WeaponEditor extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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

  render() {
    const { handleChange, handleAdd, handleRemove } = this

    const weapons = this.props.weapons.map((weapon) =>
      <WeaponFields key={ weapon.id } weapon={ weapon } character={ this.props.character }
        onChange={ handleChange } onRemoveClick={ handleRemove }
      />
    )

    return <BlockPaper>
      <Typography variant="title">
        Weapons
        <Button onClick={ handleAdd }>
          Add&nbsp;
          <ContentAddCircle  />
        </Button>
      </Typography>

      { weapons }
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
