import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SortableHandle } from 'react-sortable-hoc'
import scrollToElement from 'scroll-to-element'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import ExpansionPanel, { ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, } from 'material-ui/ExpansionPanel'
import { FormControlLabel } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Collapse from 'material-ui/transitions/Collapse'
import Delete from '@material-ui/icons/Delete'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from './CharmStyles.js'
import CharmCategoryAutocomplete from './CharmCategoryAutocomplete.jsx'
import { SpellSummaryBlock } from './SpellDisplay.jsx'

const Handle = SortableHandle(() => <DragHandleIcon onClick={ (e) => e.preventDefault() } />)

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect()
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
}

class SpellFields extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.scrollToPanel = this.scrollToPanel.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return { spell: props.spell }
  }

  handleChange(e) {
    let { name, value } = e.target
    if (name == 'keywords')
      value = value.split(',')

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
    const { spell } = this.state

    this.setState({ spell: { ...spell, [name]: value }})
    this.props.onUpdate(spell.id, spell.character_id, name, value)
  }

  handleCheck(e) {
    const { name } = e.target
    const value = !this.state.spell[name]

    this.setState({ spell: { ...this.state.spell, [name]: value }})
    this.props.onUpdate(this.state.spell.id, this.state.spell.character_id, name, value)
  }

  handleRemove() {
    this.props.onRemove(this.state.spell.id)
  }

  scrollToPanel(e, appearing) {
    if (appearing)
      return false
    const elem = document.getElementById(`spell-editor-expando-${this.state.spell.id}`)
    if(!checkVisible(elem))
      scrollToElement(elem)
  }

  render() {
    const { character, openSpell, onOpenChange, classes } = this.props
    const { spell } = this.state
    const {
      handleChange, handleBlur, handleRatingChange, handleCheck, handleRemove,
      scrollToPanel,
    } = this

    const isOpen = openSpell === spell.id

    return <ExpansionPanel
      expanded={ isOpen }
      onChange={ onOpenChange(spell.id) }
      CollapseProps={{ onEntered: scrollToPanel, mountOnEnter: true, unmountOnExit: true, }}
    >
      <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }
        classes={{ expanded: classes.expandedEditSummary }}
      >
        <div className={ classes.summaryWrap}>
          <div id={ `spell-editor-expando-${spell.id}` } className={ classes.charmAnchor }>&nbsp;</div>
          <Collapse
            in={ !isOpen }
          >
            <Typography variant="title">
              <Handle /> &nbsp;
              { spell.name }
            </Typography>
            <SpellSummaryBlock spell={ spell } isOpen={ isOpen } classes={ classes } />
          </Collapse>
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <div className={ classes.detailsWrap }>
          <TextField name="name" value={ spell.name }
            onChange={ handleChange } onBlur={ handleBlur }
            label="Name" margin="dense"
            style={{ width: '25em' }}
          />
          <br />

          <CharmCategoryAutocomplete value={ spell.categories } id={ character.id }
            onChange={ handleRatingChange }
          />

          <TextField name="cost" value={ spell.cost }
            onChange={ handleChange } onBlur={ handleBlur }
            label="Cost" margin="dense"
          />&nbsp;&nbsp;

          <TextField name="duration" value={ spell.duration }
            onChange={ handleChange } onBlur={ handleBlur }
            label="Duration" margin="dense"
          />&nbsp;&nbsp;

          <TextField select name="circle"
            label="Circle" margin="dense"
            value={ spell.circle }
            onChange={ handleRatingChange }
          >
            <MenuItem value="terrestrial">Terrestrial</MenuItem>
            <MenuItem value="celestial">Celestial</MenuItem>
            <MenuItem value="solar">Solar</MenuItem>
          </TextField>&nbsp;&nbsp;

          <FormControlLabel
            label="Control Spell"
            control={
              <Checkbox name="control" checked={ spell.control }
                onChange={ handleCheck }
              />
            }
          />
          <br />

          <TextField name="keywords" value={ spell.keywords }
            onChange={ handleChange } onBlur={ handleBlur }
            fullWidth={ true }
            label="Keywords (comma separated)" margin="dense"
          />

          <TextField name="body" value={ spell.body }
            onChange={ handleChange } onBlur={ handleBlur }
            className="editor-description-field" multiline fullWidth
            label="Effect" margin="dense" rows={ 2 } rowsMax={ 15 }
          />
          <br />

          <TextField name="ref" value={ spell.ref } fullWidth
            onChange={ handleChange } onBlur={ handleBlur }
            label="Reference" margin="dense"
          />
        </div>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button onClick={ handleRemove } style={{ float: 'right' }}>
          Delete&nbsp;
          <Delete />
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  }
}
SpellFields.propTypes = {
  spell: PropTypes.object.isRequired,
  character: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  openSpell: PropTypes.number,
  onOpenChange: PropTypes.func.isRequired,
  classes: PropTypes.object,
}

export default withStyles(styles)(SpellFields)
