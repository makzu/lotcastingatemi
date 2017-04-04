import React from 'react'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { updateCharacter } from '../../actions'

import AttributePopup from './editors/attributePopup.jsx'
import RatingDots from '../generic/ratingDots.jsx'

function AttributeBlock(props) {
  return(<div className="attributeBlock">
    <span className="attributeName">{ props.attribute }:</span>
    <RatingDots rating={ props.rating } />
  </div>)
}

class FullAttributeBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      character: this.props.character
    }

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    this.toggleEditor = this.toggleEditor.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ character: nextProps.character })
  }

  toggleEditor() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {
    const { character } = this.props

    return (
      <div className="fullAttributeBlock">
        <h3>
          Attributes
          <AttributePopup character={ character }
          />
        </h3>

        <div className="attrContainer physical">
          <AttributeBlock attribute="Strength" rating={ character.attr_strength} />
          <Divider />
          <AttributeBlock attribute="Dexterity" rating={ character.attr_dexterity} />
          <Divider />
          <AttributeBlock attribute="Stamina" rating={ character.attr_stamina} />
        </div>

        <div className="attrContainer social">
          <AttributeBlock attribute="Charisma" rating={ character.attr_charisma} />
          <Divider />
          <AttributeBlock attribute="Manipulation" rating={ character.attr_manipulation} />
          <Divider />
          <AttributeBlock attribute="Appearance" rating={ character.attr_appearance} />
        </div>

        <div className="attrContainer mental">
          <AttributeBlock attribute="Perception" rating={ character.attr_perception} />
          <Divider />
          <AttributeBlock attribute="Intelligence" rating={ character.attr_intelligence} />
          <Divider />
          <AttributeBlock attribute="Wits" rating={ character.attr_wits} />
        </div>
      </div>
    )
  }
}

export default FullAttributeBlock
