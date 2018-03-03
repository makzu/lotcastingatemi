import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'

import BlockPaper from '../../generic/blockPaper.jsx'

const styles = theme => ({
  nameField: {
    marginRight: theme.spacing.unit,
  },
  costField: {
    marginRight: theme.spacing.unit,
  },
})

class SpellEditorBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { spell: this.props.spell }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ spell: newProps.spell })
  }

  handleChange(e) {
    let { name, value } = e.target

    this.setState({ spell: { ...this.state.spell, [name]: value }})
  }

  handleBlur(e) {
    const { name } = e.target
    const { spell } = this.state

    if (spell[name] != this.props.spell[name]) {
      this.props.onUpdate(spell.id, spell.character_id, name, spell[name])
    }
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { charm } = this.state

    this.setState({ charm: { ...charm, [name]: value }})
    this.props.onUpdate(charm.id, charm.character_id, name, value)
  }

  handleRemove() {
    this.props.onRemove(this.state.spell.id)
  }

  render() {
    const { spell } = this.state
    const { handleChange, handleBlur, handleRatingChange, handleRemove } = this
    const { classes } = this.props

    return <BlockPaper>
      <Button onClick={ handleRemove } style={{ float: 'right' }}>
       Remove
        <ContentRemoveCircle />
      </Button>

      <TextField name="name" value={ spell.name }
        className={ classes.nameField }
        onChange={ handleChange } onBlur={ handleBlur }
        label="Name" margin="dense"
      />

      <TextField select name="circle"
        label="Circle" margin="dense"
        value={ spell.circle }
        onChange={ handleRatingChange }
      >
        <MenuItem value="emerald">Terrestrial</MenuItem>
        <MenuItem value="sapphire">Celestial</MenuItem>
        <MenuItem value="adamant">Solar</MenuItem>
      </TextField>
      <br />


      <TextField name="cost" value={ spell.cost } spellCheck={ false }
        className={ classes.costField }
        onChange={ handleChange } onBlur={ handleBlur }
        label="Cost" margin="dense"
      />

      <TextField name="duration" value={ spell.duration }
        onChange={ handleChange } onBlur={ handleBlur }
        label="Duration" margin="dense"
      />
      <br />

      <TextField name="keywords" value={ spell.keywords }
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth={ true }
        label="Keywords" margin="dense"
      />
      <br />

      <TextField name="body" value={ spell.body }
        onChange={ handleChange } onBlur={ handleBlur }
        className="editor-description-field" multiline fullWidth
        label="Effect" margin="dense"
      />
      <br />

      <TextField name="ref" value={ spell.ref }
        onChange={ handleChange } onBlur={ handleBlur }
        fullWidth={ true }
        label="Ref" margin="dense"
      />
    </BlockPaper>
  }
}
SpellEditorBlock.propTypes = {
  spell: PropTypes.object.isRequired,
  character: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(SpellEditorBlock)
