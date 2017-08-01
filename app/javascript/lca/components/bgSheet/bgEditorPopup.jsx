import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'

import { updateBattlegroup, createQcAttack, destroyQcAttack, updateQcAttack } from '../../ducks/actions.js'

import { clamp } from '../../utils/'
import * as c from '../../utils/constants.js'

class BgAttackFields extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this)
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
      val = clamp(parseInt(val), 1, Infinity)
    } else if (e.target.name == 'tags') {
      val = val.split(',')
    }

    this.setState({ attack: { ...this.state.attack, [e.target.name]: val }})
  }

  handleRangeChange(e, index, value) {
    this.setState({ attack: { ...this.state.attack, range: value }})
    this.props.onAttackChange(this.state.attack.id, 'range', value)
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
      <TextField name="damage" value={ attack.damage }
        floatingLabelText="Damage:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <TextField name="tags" value={ attack.tags }
        floatingLabelText="Tags:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <SelectField name="range" value={ attack.range }
        floatingLabelText="Range:"
        onChange={ this.handleRangeChange }
      >
        <MenuItem value="close" primaryText="Close" />
        <MenuItem value="short" primaryText="Short" />
        <MenuItem value="medium" primaryText="Medium" />
        <MenuItem value="long" primaryText="Long" />
        <MenuItem value="extreme" primaryText="Extreme" />
      </SelectField>

      <IconButton onClick={ this.handleRemove } style={{ minWidth: '2em' }}>
        <ContentRemoveCircle />
      </IconButton>
    </div>
  }
}
BgAttackFields.propTypes = {
  attack: PropTypes.object.isRequired,
  onAttackChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}

class BgEditorPopup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      battlegroup: this.props.battlegroup,
      attacks: this.props.attacks,
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
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      battlegroup: newProps.battlegroup,
      attacks: newProps.attacks,
      merits: newProps.merits
    })
  }

  handleOpen() {
    this.setState({
      open: true,
      battlegroup: this.props.battlegroup,
      attacks: this.props.attacks,
    })
  }
  handleClose() {
    this.setState({ open: false })
  }
  handleChange(e) {
    e.preventDefault()
    let val

    if (e.target.type == 'number') {
      if (e.target.name == 'essence') {
        val = clamp(parseInt(e.target.value), c.ESSENCE_MIN, c.ESSENCE_MAX)
      } else if (e.target.name == 'size') {
        val = clamp(parseInt(e.target.value), 1, 5)
      } else if (e.target.name == 'might') {
        val = clamp(parseInt(e.target.value), 0, 3)
      } else if (e.target.name == 'drill') {
        val = clamp(parseInt(e.target.value), 0, 2)
      } else {
        val = clamp(parseInt(e.target.value), 1, Infinity)
      }
    } else
      val = e.target.value

    this.setState({ battlegroup: { ... this.state.battlegroup, [e.target.name]: val }})
  }
  handleBlur(e) {
    e.preventDefault()
    const trait = e.target.name
    if (this.state.battlegroup[trait] == this.props.battlegroup[trait])
      return

    this.props.updateBattlegroup(this.state.battlegroup.id, trait, this.state.battlegroup[trait])
  }

  onListChange(trait, value) {
    this.setState({ battlegroup: { ...this.state.battlegroup, [trait]: value }})
    this.props.updateBattlegroup(this.state.battlegroup.id, trait, value)
  }

  onListBlur(trait, value) {
    this.setState({ battlegroup: { ...this.state.battlegroup, [trait]: value }})
    this.props.updateBattlegroup(this.state.battlegroup.id, trait, value)
  }

  handleAttackChange(id, trait, value) {
    this.props.updateQcAttack(id, this.state.battlegroup.id, trait, value)
  }
  handleAttackRemove(id) {
    this.props.removeQcAttack(id, this.state.battlegroup.id)
  }
  handleAttackAdd() {
    this.props.addQcAttack(this.state.battlegroup.id)
  }

  /* TODO: Clean this up. Yikes. */
  /* TODO also: replace popup with an editor that appears in-place */
  render() {
    const { battlegroup, attacks } = this.state
    const {
      handleOpen, handleClose, handleChange, handleBlur,
      handleAttackAdd, handleAttackChange, handleAttackRemove,
    } = this

    const actions = [
      <FlatButton
        key="close"
        label="Close"
        primary={ true }
        onTouchTap={ handleClose }
      />
    ]

    const qcAttacks = attacks.map((attack) =>
      <BgAttackFields key={ attack.id } attack={ attack } battlegroup={ battlegroup }
        onAttackChange={ handleAttackChange } onRemoveClick={ handleAttackRemove }
      />
    )

    return(<div className="editor-wrap qc-editor-wrap">
      <FlatButton label="Edit" onClick={ handleOpen } />
      <Dialog
        title={ 'Editing ' + battlegroup.name }
        className="editor-popup"
        actions={ actions }
        open={ this.state.open }
        onRequestClose={ handleClose }
        autoScrollBodyContent={true}
      >
        <p><small>
          (For attacks, defenses, etc, do not include size/might/drill bonuses - those are added automatically)
        </small></p>
        <TextField name="name" value={ battlegroup.name }
          floatingLabelText="Name:"
          className="editor-name-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="essence" value={ battlegroup.essence }
          floatingLabelText="Essence:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="willpower_temporary" value={ battlegroup.willpower_temporary }
          floatingLabelText="Temp WP:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur } />
        /
        <TextField name="willpower_permanent" value={ battlegroup.willpower_permanent }
          floatingLabelText="Perm WP"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur } />
        <br />
        <TextField name="size" value={ battlegroup.size }
          floatingLabelText="Size:"
          type="number" min={ 0 } max={ 5 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="magnitude_current" value={ battlegroup.magnitude_current }
          floatingLabelText="Mag.:"
          type="number" min={ 0 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <span> / </span>
        <TextField name="magnitude" value={ battlegroup.magnitude }
          floatingLabelText="Total:"
          type="number" min={ 0 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="drill" value={ battlegroup.drill }
          floatingLabelText="Drill:"
          type="number" min={ 0 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="might" value={ battlegroup.might }
          floatingLabelText="Might:"
          type="number" min={ 0 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <br />
        <TextField name="resolve" value={ battlegroup.resolve }
          floatingLabelText="Resolve:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="guile" value={ battlegroup.guile }
          floatingLabelText="Guile:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="appearance" value={ battlegroup.appearance }
          floatingLabelText="Appearance:"
          type="number" min={ 0 } max={ 10 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <h4 style={{ marginBottom: 0 }}>Combat stats</h4>
        <TextField name="join_battle" value={ battlegroup.join_battle }
          floatingLabelText="JB:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="movement" value={ battlegroup.movement }
          floatingLabelText="Move:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="parry" value={ battlegroup.parry }
          floatingLabelText="Parry:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="evasion" value={ battlegroup.evasion }
          floatingLabelText="Evasion:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="soak" value={ battlegroup.soak }
          floatingLabelText="Soak:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="hardness" value={ battlegroup.hardness }
          floatingLabelText="Hardness:"
          type="number" min={ 1 }
          className="editor-rating-field"
          onChange={ handleChange } onBlur={ handleBlur }
        />
        <TextField name="armor_name" value={ battlegroup.armor_name }
          floatingLabelText="Armor Name:"
          type="text"
          onChange={ handleChange } onBlur={ handleBlur }
        />

        <h4 style={{ marginBottom: 0 }}>Attacks</h4>
        { qcAttacks }
        <RaisedButton label="Add Attack" icon={ <ContentAddCircle /> } onClick={ handleAttackAdd } />

      </Dialog>
    </div>)
  }
}
BgEditorPopup.propTypes = {
  battlegroup: PropTypes.object.isRequired,
  attacks: PropTypes.arrayOf(PropTypes.object),
  updateBattlegroup: PropTypes.func,
  updateQcAttack: PropTypes.func,
  addQcAttack: PropTypes.func,
  removeQcAttack: PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    updateBattlegroup: (id, trait, value) => {
      dispatch(updateBattlegroup(id, trait, value))
    },
    updateQcAttack: (id, qcId, trait, value) => {
      dispatch(updateQcAttack(id, qcId, 'Battlegroup', trait, value))
    },
    addQcAttack: (qcId) => {
      dispatch(createQcAttack(qcId, 'Battlegroup'))
    },
    removeQcAttack: (id, qcId) => {
      dispatch(destroyQcAttack(id, qcId, 'Battlegroup'))
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BgEditorPopup)
