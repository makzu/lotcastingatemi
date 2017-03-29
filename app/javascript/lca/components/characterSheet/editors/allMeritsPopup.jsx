import React from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

import { updateMerit } from '../../../actions'
import * as calc from '../../../utils/calculated'
import * as c from '../../../utils/constants.js'


class MeritFieldset extends React.Component {
  constructor(props) {
    super(props)

    this.updateMerit = this.updateMerit.bind(this)
    this.pushUpdate = this.pushUpdate.bind(this)

    this.updateMeritCat = this.updateMeritCat.bind(this)

    this.state = { merit: this.props.merit }
  }

  updateMerit(e) {
    e.preventDefault()
    let val = null
    if (e.target.type == "number") {
      val = parseInt(e.target.value)
      if (val > c.MERIT_RATING_MAX) {
        val = c.MERIT_RATING_MAX
      } else if (val < c.MERIT_RATING_MIN) {
        val = c.MERIT_RATING_MIN
      }
    } else if (e.target.type == "checkbox") {
      val = ! this.state.merit[e.target.name]
      this.props.onUpdate(this.state.merit.id, this.state.merit.character_id, e.target.name, val)
    } else
      val = e.target.value

    this.setState({merit: {...this.state.merit, [e.target.name]: val}})
  }

  updateMeritCat(e, key, value) {
    this.setState({ merit: { ...this.state.merit, merit_cat: value } })

    this.props.onUpdate(this.state.merit.id, this.props.character.id, "merit_cat", value)
  }


  pushUpdate(e) {
    const trait = e.target.name

    if (this.state.merit[trait] != this.props.merit[trait])
      this.props.onUpdate(this.state.merit.id,
        this.state.merit.character_id,
        trait, this.state.merit[trait])
  }

  render() {
    const merit = this.state.merit
    const { pushUpdate, updateMerit, updateMeritCat } = this

    return(<div>
      <TextField name="name" value={ merit.name || "" }
        className="meritNameField" floatingLabelText="Name:"
        onBlur={ pushUpdate } onChange={ updateMerit } />

      <TextField name="merit_name" value={ merit.merit_name }
        className="meritMeritField" floatingLabelText="Merit:"
        onBlur={ pushUpdate } onChange={ updateMerit } />

      <TextField name="rating" value={ merit.rating }
        className="editor-rating-field" floatingLabelText="Rating:"
        type="number" min={ 0 } max={ 5 }
        onBlur={ pushUpdate } onChange={ updateMerit } />

      <SelectField name="merit_cat" value={ merit.merit_cat || "" }
        className="meritCatField"
        floatingLabelText="Type:" onChange={ updateMeritCat }>
        <MenuItem value="story" primaryText="Story" />
        <MenuItem value="innate" primaryText="Innate" />
        <MenuItem value="purchased" primaryText="Purchased" />
      </SelectField>

      <Checkbox label="Supernatural?" name="supernatural" checked={ merit.supernatural }
        onCheck={ updateMerit } style={{ display: 'inline-block', width: '9em' }} />

      <TextField name="ref" value={ merit.ref || "" }
        className="meritRefField" floatingLabelText="Ref:"
        onBlur={ pushUpdate } onChange={ updateMerit } />

      <TextField name="prereqs" value={ merit.prereqs || "" }
        className="meritPrereqsField" floatingLabelText="Prereqs:"
        onBlur={ pushUpdate } onChange={ updateMerit } />

      <TextField name="description" value={ merit.description || "" }
        className="meritDescriptionField" floatingLabelText="Notes:"
        multiLine={ true }
        onBlur={ pushUpdate } onChange={ updateMerit } />
    </div>)
  }
}

class _AllMeritsPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onUpdateMerit = this.onUpdateMerit.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  onUpdateMerit(id, charId, trait, value) {
    this.props._onUpdateMerit(id, charId, trait, value)
  }

  render() {
    const character = this.props.character
    const { handleOpen, handleClose, handleChange, handleBlur } = this

    const merits = this.props.merits.map((merit) =>
      <MeritFieldset key={ merit.id } merit={ merit } character={ character } onUpdate={ this.onUpdateMerit } />
    )

    const actions = [
      <FlatButton
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]
    return(<div className="editor-wrap ability-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title="Editing Merits"
        actions={ actions }
        open={ this.state.open }
        autoScrollBodyContent={ true }
        onRequestClose={ handleClose }
      >
        <div className="editor-popup editor-popup-specialties">
          { merits }
        </div>
      </Dialog>
    </div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _onUpdateMerit: (id, charId, trait, value) => {
      dispatch(updateMerit(id, charId, trait, value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(_AllMeritsPopup)
