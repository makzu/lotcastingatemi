import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import ContentRemoveCircle from 'material-ui-icons/RemoveCircle'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import Typography from 'material-ui/Typography'

import ExpandableListEditor from '../generic/expandableListEditor.jsx'

import { updateQc, createQcAttack, destroyQcAttack, updateQcAttack, createQcMerit, destroyQcMerit, updateQcMerit } from '../../ducks/actions.js'

import { clamp } from '../../utils/'
import * as c from '../../utils/constants.js'
import { fullQc, qcAttack, qcMerit } from '../../utils/propTypes'

class QcAttackFields extends React.Component {
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
        label="Name:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <TextField name="pool" value={ attack.pool }
        label="Pool:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <TextField name="damage" value={ attack.damage }
        label="Damage:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <TextField name="tags" value={ attack.tags }
        label="Tags:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <Select name="range" value={ attack.range }
        label="Range:"
        onChange={ this.handleRangeChange }
      >
        <MenuItem value="close" primarytext="Close" />
        <MenuItem value="short" primarytext="Short" />
        <MenuItem value="medium" primarytext="Medium" />
        <MenuItem value="long" primarytext="Long" />
        <MenuItem value="extreme" primarytext="Extreme" />
      </Select>

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
        label="Name:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
      />
      <IconButton onClick={ this.handleRemove } style={{ minWidth: '2em' }}>
        <ContentRemoveCircle />
      </IconButton>
      <br />
      <TextField name="body" value={ merit.body }
        label="Text:"
        onChange={ this.handleChange } onBlur={ this.handleBlur }
        fullWidth={ true } multiLine={ true }
      />
    </div>
  }
}
QcMeritFields.propTypes = {
  merit: PropTypes.shape(qcMerit).isRequired,
  onMeritChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}

class QcEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      qc: this.props.qc,
      qc_attacks: this.props.qc_attacks,
      qc_merits: this.props.qc_merits
    }
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
    this.setState({ qc: newProps.qc, qc_attacks: newProps.qc_attacks, qc_merits: newProps.qc_merits })
  }

  handleChange(e) {
    e.preventDefault()
    let val

    if (e.target.type == 'number') {
      if (e.target.name == 'essence') {
        val = clamp(parseInt(e.target.value), c.ESSENCE_MIN, c.ESSENCE_MAX)
      } else {
        val = clamp(parseInt(e.target.value), 1, Infinity)
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
    if (this.props.qc == undefined) {
      return(<div>
        <h1>QC Editor</h1>
        <p>The QC has not yet loaded.</p>
      </div>)
    }

    const { qc, qc_attacks, qc_merits } = this.state
    const {
      handleChange, handleBlur,
      onListChange, onListBlur,
      handleAttackAdd, handleAttackChange, handleAttackRemove,
      handleMeritAdd, handleMeritChange, handleMeritRemove
    } = this

    const qcAttacks = qc_attacks.map((attack) =>
      <QcAttackFields key={ attack.id } attack={ attack } qc={ qc }
        onAttackChange={ handleAttackChange } onRemoveClick={ handleAttackRemove }
      />
    )

    const qcMerits = qc_merits.map((merit) =>
      <QcMeritFields key={merit.id} merit={ merit } qc={ qc }
        onMeritChange={ handleMeritChange } onRemoveClick={ handleMeritRemove }
      />
    )

    return(<div>
      <Typography>Editing { qc.name }</Typography>

      <TextField name="name" value={ qc.name }
        label="Name:"
        className="editor-name-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="essence" value={ qc.essence }
        label="Essence:"
        type="number" min={ 0 } max={ 10 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="willpower_temporary" value={ qc.willpower_temporary }
        label="Temp WP:"
        type="number" min={ 0 } max={ 10 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur } />
      /
      <TextField name="willpower_permanent" value={ qc.willpower_permanent }
        label="Perm WP"
        type="number" min={ 0 } max={ 10 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur } />
      <br />
      <TextField name="resolve" value={ qc.resolve }
        label="Resolve:"
        type="number" min={ 0 } max={ 10 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="guile" value={ qc.guile }
        label="Guile:"
        type="number" min={ 0 } max={ 10 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="appearance" value={ qc.appearance }
        label="Appearance:"
        type="number" min={ 0 } max={ 10 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <h4 style={{ marginBottom: 0 }}>Combat stats</h4>
      <TextField name="join_battle" value={ qc.join_battle }
        label="JB:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="movement" value={ qc.movement }
        label="Move:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="parry" value={ qc.parry }
        label="Parry:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="evasion" value={ qc.evasion }
        label="Evasion:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="soak" value={ qc.soak }
        label="Soak:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="hardness" value={ qc.hardness }
        label="Hardness:"
        type="number" min={ 1 }
        className="editor-rating-field"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <TextField name="armor_name" value={ qc.armor_name }
        label="Armor Name:"
        type="text"
        onChange={ handleChange } onBlur={ handleBlur }
      />

      <h4 style={{ marginBottom: 0 }}>Attacks</h4>
      { qcAttacks }
      <Button variant="raised" onClick={ handleAttackAdd }>
        Add Attack
        <ContentAddCircle  />
      </Button>

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
      <Button variant="raised" onClick={ handleMeritAdd }>
        Add Merit
        <ContentAddCircle />
      </Button>
    </div>)
  }
}
QcEditor.propTypes = {
  qc: PropTypes.shape(fullQc).isRequired,
  qc_attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
  qc_merits: PropTypes.arrayOf(PropTypes.shape(qcMerit)),
  updateQc: PropTypes.func,
  updateQcAttack: PropTypes.func,
  addQcAttack: PropTypes.func,
  removeQcAttack: PropTypes.func,
  updateQcMerit: PropTypes.func,
  addQcMerit: PropTypes.func,
  removeQcMerit: PropTypes.func
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.qcId
  const qc = state.entities.qcs[id]

  let qc_attacks = []
  let qc_charms = []
  let qc_merits = []

  if (qc != undefined) {
    if (qc.qc_attacks != undefined) {
      qc_attacks = qc.qc_attacks.map((id) => state.entities.qc_attacks[id])
    }
    if (qc.qc_charms != undefined) {
      qc_charms = qc.qc_charms.map((id) => state.entities.qc_charms[id])
    }
    if (qc.qc_merits != undefined) {
      qc_merits = qc.qc_merits.map((id) => state.entities.qc_merits[id])
    }
  }

  return {
    id,
    qc,
    qc_attacks,
    qc_charms,
    qc_merits,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQc: (id, trait, value) => {
      dispatch(updateQc(id, trait, value))
    },
    updateQcAttack: (id, qcId, trait, value) => {
      dispatch(updateQcAttack(id, qcId, 'Qc', trait, value))
    },
    addQcAttack: (qcId) => {
      dispatch(createQcAttack(qcId, 'Qc'))
    },
    removeQcAttack: (id, qcId) => {
      dispatch(destroyQcAttack(id, qcId, 'Qc'))
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
  mapStateToProps,
  mapDispatchToProps
)(QcEditor)
