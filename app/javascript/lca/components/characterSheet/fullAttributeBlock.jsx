import React from 'react'
import RatingDots from '../../utils/ratingDots.jsx'

function AttributeBlock(props) {
  return(<div className="attributeBlock">
    { props.attribute }:
    <RatingDots rating={ props.rating } />
  </div>);
}

function FullAttributeBlock(props) {
  return (
    <div className="fullAttributeBlock">
      <h3>Attributes</h3>
      <div className="attrContainer physical">
        <AttributeBlock attribute="Strength" rating={props.character.attr_strength} />
        <AttributeBlock attribute="Dexterity" rating={props.character.attr_dexterity} />
        <AttributeBlock attribute="Stamina" rating={props.character.attr_stamina} />
      </div>
      <div className="attrContainer social">
        <AttributeBlock attribute="Charisma" rating={props.character.attr_charisma} />
        <AttributeBlock attribute="Manipulation" rating={props.character.attr_manipulation} />
        <AttributeBlock attribute="Appearance" rating={props.character.attr_appearance} />
      </div>
      <div className="attrContainer mental">
        <AttributeBlock attribute="Perception" rating={props.character.attr_perception} />
        <AttributeBlock attribute="Intelligence" rating={props.character.attr_intelligence} />
        <AttributeBlock attribute="Wits" rating={props.character.attr_wits} />
      </div>
    </div>
  );
}

export default FullAttributeBlock
