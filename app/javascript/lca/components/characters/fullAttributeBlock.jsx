import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import AttributePopup from './editors/attributePopup.jsx'

import RatingDots from '../generic/ratingDots.jsx'
import { withAttributes } from '../../utils/propTypes'

const styles = theme => ({
  attributeName: { ...theme.typography.body1,
    textTransform: 'capitalize',
  },
})

function _AttributeBlock(props) {
  const { classes } = props
  return <div>
    <span className={ classes.attributeName }>
      { props.attribute }:
    </span>

    <RatingDots rating={ props.rating } />
    <Divider />
  </div>
}

_AttributeBlock.propTypes = {
  attribute: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  classes: PropTypes.object,
}

const AttributeBlock = withStyles(styles)(_AttributeBlock)

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

    return <Grid item xs={ 12 } sm={ 6 } md={ 9 }>
      <Typography variant="title">
        Attributes
        <AttributePopup character={ character } />
      </Typography>

      <Grid container>
      <Grid item xs={ 12 } md={ 4 }>
        <AttributeBlock attribute="Strength"     rating={ character.attr_strength} />
        <AttributeBlock attribute="Dexterity"    rating={ character.attr_dexterity} />
        <AttributeBlock attribute="Stamina"      rating={ character.attr_stamina} />
      </Grid>

      <Grid item xs={ 12 } md={ 4 }>
        <AttributeBlock attribute="Charisma"     rating={ character.attr_charisma} />
        <AttributeBlock attribute="Manipulation" rating={ character.attr_manipulation} />
        <AttributeBlock attribute="Appearance"   rating={ character.attr_appearance} />
      </Grid>

      <Grid item xs={ 12 } md={ 4 }>
        <AttributeBlock attribute="Perception"   rating={ character.attr_perception} />
        <AttributeBlock attribute="Intelligence" rating={ character.attr_intelligence} />
        <AttributeBlock attribute="Wits"         rating={ character.attr_wits} />
      </Grid>
    </Grid></Grid>
  }
}

FullAttributeBlock.propTypes = {
  character: PropTypes.shape(withAttributes)
}

export default FullAttributeBlock
