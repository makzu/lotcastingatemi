import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import ExpandableListEditor from '../generic/expandableListEditor.jsx'

import { updateQc } from '../../actions'

import * as c from '../../utils/constants.js'

class _QcEditorPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      qc: this.props.qc
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.onListChange = this.onListChange.bind(this)
    this.onListBlur = this.onListBlur.bind(this)
  }

  handleOpen() {
    this.setState({ open: true, qc: this.props.qc })
  }

  handleClose() {
    this.setState({ open: false })
  }
  handleChange(e) {
    e.preventDefault()
    let val

    if (e.target.type == "number") {
      val = parseInt(e.target.value)
      if (e.target.name == "essence") {
        if (val > c.ESSENCE_MAX) {
          val = c.ESSENCE_MAX
        } else if (val < c.ESSENCE_MIN) {
          val = c.ESSENCE_MIN
        }
      } else {
        if (val < 1)
          val = 1
      }
    } else
      val = e.target.value

    this.setState({qc: {... this.state.qc, [e.target.name]: val}})
  }
  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    if (this.state.qc[trait] == this.props.qc[trait])
      return

    this.props.updateQc(this.state.qc.id, trait, this.state.qc[trait])
  }

  onListChange(trait, value) {
    console.log('in onListChange')
    this.setState({ qc: { ...this.state.qc, [trait]: value}})
    this.props.updateQc(this.state.qc.id, trait, value)
  }

  onListBlur(trait, value) {
    console.log('in onListBlur', this.state)
    this.setState({ qc: { ...this.state.qc, [trait]: value}})
    this.props.updateQc(this.state.qc.id, trait, value)
  }

  /* TODO: Clean this up. Yikes. */
  /* TODO also: replace popup with an editor that appears in-place */
  render() {
    const qc = this.state.qc
    const { handleOpen, handleClose, handleChange, handleBlur, onListChange, onListBlur } = this

    const actions = [
      <FlatButton
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]
    return(<div className="editor-wrap qc-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title={ "Editing " + qc.name }
        className="editor-popup"
        actions={ actions }
        open={ this.state.open }
        onRequestClose={ handleClose }
        autoScrollBodyContent={true}
      >
        <TextField name="name" value={ qc.name }
          floatingLabelText="Name:"
          className="editor-name-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="essence" value={ qc.essence }
          floatingLabelText="Essence:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="willpower_temporary" value={ qc.willpower_temporary }
          floatingLabelText="Temp WP:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur } />
        /
        <TextField name="willpower_permanent" value={ qc.willpower_permanent }
          floatingLabelText="Perm WP"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur } />
        <br />
        <TextField name="resolve" value={ qc.resolve }
          floatingLabelText="Resolve:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="guile" value={ qc.guile }
          floatingLabelText="Guile:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="appearance" value={ qc.appearance }
          floatingLabelText="Appearance:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <h4 style={{marginBottom: 0}}>Combat stats</h4>
        <TextField name="join_battle" value={ qc.join_battle }
          floatingLabelText="JB:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="movement" value={ qc.movement }
          floatingLabelText="Move:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="parry" value={ qc.parry }
          floatingLabelText="Parry:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="evasion" value={ qc.evasion }
          floatingLabelText="Evasion:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="soak" value={ qc.soak }
          floatingLabelText="Soak:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="hardness" value={ qc.hardness }
          floatingLabelText="Hardness:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="armor_name" value={ qc.armor_name }
          floatingLabelText="Armor Name:"
          type="text"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <h4>Actions</h4>
        <ExpandableListEditor character={ qc } trait="actions"
          onUpdate={ onListChange } onBlur={ onListBlur }
        />
        <h4>Ties</h4>
        <ExpandableListEditor character={ qc } trait="ties"
          onUpdate={ onListChange } onBlur={ onListBlur } numberMax={ c.INTIMACY_RATING_MAX }
        />
        <h4>Principles</h4>
        <ExpandableListEditor character={ qc } trait="principles"
          onUpdate={ onListChange } onBlur={ onListBlur } numberMax={ c.INTIMACY_RATING_MAX }
        />
      </Dialog>
    </div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQc: (id, trait, value) => {
      dispatch(updateQc(id, trait, value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(_QcEditorPopup)
