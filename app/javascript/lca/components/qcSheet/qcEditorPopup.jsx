import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'

import ExpandableListEditor from '../generic/expandableListEditor.jsx'

import { updateQc, createQcAttack, destroyQcAttack, updateQcAttack, createQcMerit, destroyQcMerit, updateQcMerit } from '../../actions'

import * as c from '../../utils/constants.js'
import { fullQc, qcAttack, qcMerit } from '../../utils/propTypes'

class QcAttackFields extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

    this.state = {
      attack: this.props.attack
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ attack: newProps.attack })
  }

  handleChange(e) {
    e.preventDefault()
    let val = e.target.value
    if (e.target.type == 'number') {
      val = parseInt(val)
      val = (val < 1) ? 1 : val
    }

    this.setState({ attack: { ...this.state.attack, [e.target.name]: val }})
  }

  handleBlur(e) {
    e.preventDefault()
    if (this.state.attack[e.target.name] != this.props.attack[e.target.name])
      this.props.onAttackChange(this.state.attack.id, e.target.name, e.target.value)
  }

  handleRemove(e) {
    e.preventDefault()
    this.props.onRemoveClick(this.state.attack.id)
  }

  render() {
    const { attack } = this.state

    return <div>
      <TextField name="name" value={ attack.name }
        floatingLabelText="Name:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <TextField name="pool" value={ attack.pool }
        floatingLabelText="Pool:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <IconButton onClick={ this.handleRemove } style={{ minWidth: '2em' }}>
        <ContentRemoveCircle />
      </IconButton>
    </div>
  }
}
QcAttackFields.propTypes = {
  attack: PropTypes.shape(qcAttack).isRequired,
  onAttackChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}

class QcMeritFields extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)

    this.state = {
      merit: this.props.merit
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ merit: newProps.merit })
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({ merit: { ...this.state.merit, [e.target.name]: e.target.value }})
  }

  handleBlur(e) {
    e.preventDefault()
    if (this.state.merit[e.target.name] != this.props.merit[e.target.name])
      this.props.onMeritChange(this.state.merit.id, e.target.name, e.target.value)
  }

  handleRemove(e) {
    e.preventDefault()
    this.props.onRemoveClick(this.state.merit.id)
  }

  render() {
    const { merit } = this.state

    return <div>
      <TextField name="name" value={ merit.name }
        floatingLabelText="Name:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <TextField name="body" value={ merit.body }
        floatingLabelText="Text:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <IconButton onClick={ this.handleRemove } style={{ minWidth: '2em' }}>
        <ContentRemoveCircle />
      </IconButton>
    </div>
  }
}
QcMeritFields.propTypes = {
  merit: PropTypes.shape(qcMerit).isRequired,
  onMeritChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}

class QcEditorPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      qc: this.props.qc,
      attacks: this.props.attacks,
      merits: this.props.merits
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.onListChange = this.onListChange.bind(this)
    this.onListBlur = this.onListBlur.bind(this)
    this.handleAttackChange = this.handleAttackChange.bind(this)
    this.handleAttackRemove = this.handleAttackRemove.bind(this)
    this.handleAttackAdd = this.handleAttackAdd.bind(this)
    this.handleMeritChange = this.handleMeritChange.bind(this)
    this.handleMeritRemove = this.handleMeritRemove.bind(this)
    this.handleMeritAdd = this.handleMeritAdd.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      qc: newProps.qc,
      attacks: newProps.attacks,
      merits: newProps.merits
    })
  }

  handleOpen() {
    this.setState({
      open: true,
      qc: this.props.qc,
      attacks: this.props.attacks,
      merits: this.props.merits
    })
  }
  handleClose() {
    this.setState({ open: false })
  }
  handleChange(e) {
    e.preventDefault()
    let val

    if (e.target.type == 'number') {
      val = parseInt(e.target.value)
      if (e.target.name == 'essence') {
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

    this.setState({ qc: { ... this.state.qc, [e.target.name]: val }})
  }
  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    if (this.state.qc[trait] == this.props.qc[trait])
      return

    this.props.updateQc(this.state.qc.id, trait, this.state.qc[trait])
  }

  onListChange(trait, value) {
    this.setState({ qc: { ...this.state.qc, [trait]: value }})
    this.props.updateQc(this.state.qc.id, trait, value)
  }

  onListBlur(trait, value) {
    this.setState({ qc: { ...this.state.qc, [trait]: value }})
    this.props.updateQc(this.state.qc.id, trait, value)
  }

  handleAttackChange(id, trait, value) {
    this.props.updateQcAttack(id, this.state.qc.id, trait, value)
  }
  handleAttackRemove(id) {
    this.props.removeQcAttack(id, this.state.qc.id)
  }
  handleAttackAdd() {
    this.props.addQcAttack(this.state.qc.id)
  }

  handleMeritChange(id, trait, value) {
    this.props.updateQcMerit(id, this.state.qc.id, trait, value)
  }
  handleMeritRemove(id) {
    this.props.removeQcMerit(id, this.state.qc.id)
  }
  handleMeritAdd() {
    this.props.addQcMerit(this.state.qc.id)
  }

  /* TODO: Clean this up. Yikes. */
  /* TODO also: replace popup with an editor that appears in-place */
  render() {
    const { qc, attacks, merits } = this.state
    const {
      handleOpen, handleClose, handleChange, handleBlur,
      onListChange, onListBlur,
      handleAttackAdd, handleAttackChange, handleAttackRemove,
      handleMeritAdd, handleMeritChange, handleMeritRemove
    } = this

    const actions = [
      <FlatButton
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]

    const qcAttacks = attacks.map((attack) =>
      <QcAttackFields key={ attack.id } attack={ attack } qc={ qc }
        onAttackChange={ handleAttackChange } onRemoveClick={ handleAttackRemove }
      />
    )

    const qcMerits = merits.map((merit) =>
      <QcMeritFields key={merit.id} merit={ merit } qc={ qc }
        onMeritChange={ handleMeritChange } onRemoveClick={ handleMeritRemove }
      />
    )

    return(<div className="editor-wrap qc-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title={ 'Editing ' + qc.name }
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
        <h4 style={{ marginBottom: 0 }}>Combat stats</h4>
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

        <h4 style={{ marginBottom: 0 }}>Attacks</h4>
        { qcAttacks }
        <RaisedButton label="Add Attack" icon={ <ContentAddCircle /> } onClick={ handleAttackAdd } />

        <h4 style={{ marginBottom: 0 }}>Actions</h4>
        <ExpandableListEditor character={ qc } trait="actions"
          onUpdate={ onListChange } onBlur={ onListBlur }
        />
        <h4 style={{ marginBottom: 0 }}>Ties</h4>
        <ExpandableListEditor character={ qc } trait="ties"
          onUpdate={ onListChange } onBlur={ onListBlur }
          numberMax={ c.INTIMACY_RATING_MAX }
        />
        <h4 style={{ marginBottom: 0 }}>Principles</h4>
        <ExpandableListEditor character={ qc } trait="principles"
          onUpdate={ onListChange } onBlur={ onListBlur }
          numberMax={ c.INTIMACY_RATING_MAX }
        />
        <h4 style={{ marginBottom: 0 }}>Merits</h4>
        { qcMerits }
        <RaisedButton label="Add Merit" icon={ <ContentAddCircle /> } onClick={ handleMeritAdd } />
      </Dialog>
    </div>)
  }
}
QcEditorPopup.propTypes = {
  qc: PropTypes.shape(fullQc).isRequired,
  attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
  merits: PropTypes.arrayOf(PropTypes.shape(qcMerit)),
  updateQc: PropTypes.func,
  updateQcAttack: PropTypes.func,
  addQcAttack: PropTypes.func,
  removeQcAttack: PropTypes.func,
  updateQcMerit: PropTypes.func,
  addQcMerit: PropTypes.func,
  removeQcMerit: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    updateQc: (id, trait, value) => {
      dispatch(updateQc(id, trait, value))
    },
    updateQcAttack: (id, qcId, trait, value) => {
      dispatch(updateQcAttack(id, qcId, trait, value))
    },
    addQcAttack: (qcId) => {
      dispatch(createQcAttack(qcId))
    },
    removeQcAttack: (id, qcId) => {
      dispatch(destroyQcAttack(id, qcId))
    },
    updateQcMerit: (id, qcId, trait, value) => {
      dispatch(updateQcMerit(id, qcId, trait, value))
    },
    addQcMerit: (qcId) => {
      dispatch(createQcMerit(qcId))
    },
    removeQcMerit: (id, qcId) => {
      dispatch(destroyQcMerit(id, qcId))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(QcEditorPopup)
