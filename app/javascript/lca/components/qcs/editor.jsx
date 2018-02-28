import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import Typography from 'material-ui/Typography'

import QcActionEditor from './qcActionEditor.jsx'
import QcAttackEditor from './qcAttackEditor.jsx'
import QcMeritEditor from './qcMeritEditor.jsx'
import QcCharmEditor from './qcCharmEditor.jsx'
import RatingField from '../generic/ratingField.jsx'
import IntimacyEditor from '../generic/intimacyEditor.jsx'

import { updateQc } from '../../ducks/actions.js'

import { fullQc } from '../../utils/propTypes'

class QcEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qc: this.props.qc,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleListChange = this.handleListChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ qc: newProps.qc })
  }

  handleChange(e) {
    this.setState({ qc: { ... this.state.qc, [e.target.name]: e.target.value }})
  }

  handleBlur(e) {
    const { name } = e.target
    const { qc } = this.state
    if (qc[name] == this.props.qc[name])
      return

    this.props.updateQc(qc.id, name, qc[name])
  }

  handleRatingChange(e) {
    let { name, value } = e.target
    const { qc } = this.state

    this.setState({ qc: { ...qc, [name]: value }})
    this.props.updateQc(qc.id, name, value)
  }

  handleListChange(trait, value) {
    this.setState({ qc: { ...this.state.qc, [trait]: value }})
    this.props.updateQc(this.state.qc.id, trait, value)
  }

  render() {
    /* Escape hatch */
    if (this.props.qc == undefined)
      return <div>
        <Typography paragraph>This QC has not yet loaded.</Typography>
      </div>

    const { qc } = this.state
    const {
      handleChange, handleBlur, handleRatingChange, handleListChange
    } = this

    return <div>
      <Typography variant="headline">
        Editing { qc.name }
        <Button component={ Link } to={ `/qcs/${qc.id}` }>Done</Button>
      </Typography>

      <Typography variant="subheading">
        Basics
      </Typography>

      <TextField name="name" value={ qc.name }
        label="Name" margin="dense"
        onChange={ handleChange } onBlur={ handleBlur }
      />
      <br />

      <RatingField trait="essence" value={ qc.essence }
        label="Essence" min={ 1 } max={ 10 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="willpower_temporary" value={ qc.willpower_temporary }
        label="Willpower" margin="dense"
        onChange={ handleRatingChange }
      />
      /
      <RatingField trait="willpower_permanent" value={ qc.willpower_permanent }
        label="" min={ 1 } max={ 10 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="motes_personal_current" value={ qc.motes_personal_current }
        label="Personal" max={ qc.motes_personal_total } margin="dense"
        onChange={ handleRatingChange }
      />
      /
      <RatingField trait="motes_personal_total" value={ qc.motes_personal_total }
        label="" margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="motes_peripheral_current" value={ qc.motes_peripheral_current }
        label="Peripheral" max={ qc.motes_peripheral_total } margin="dense"
        onChange={ handleRatingChange }
      />
      /
      <RatingField trait="motes_peripheral_total" value={ qc.motes_peripheral_total }
        label="" margin="dense"
        onChange={ handleRatingChange }
      />
      <br />
      <RatingField trait="health_level_0s" value={ qc.health_level_0s }
        label="-0 HLs" margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="health_level_1s" value={ qc.health_level_1s }
        label="-1 HLs" margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="health_level_2s" value={ qc.health_level_2s }
        label="-2 HLs" margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="health_level_4s" value={ qc.health_level_4s }
        label="-4 HLs" margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="health_level_incap" value={ qc.health_level_incap }
        label="Incap" margin="dense"
        onChange={ handleRatingChange }
      />
      <br />

      <RatingField trait="damage_bashing" value={ qc.damage_bashing }
        label="Bashing" margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="damage_lethal" value={ qc.damage_lethal }
        label="Lethal" margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="damage_aggravated" value={ qc.damage_aggravated }
        label="Aggravated" margin="dense"
        onChange={ handleRatingChange }
      />

      <Typography variant="subheading">
        Social
      </Typography>
      <RatingField trait="resolve" value={ qc.resolve }
        label="Resolve" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="guile" value={ qc.guile }
        label="Guile" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="appearance" value={ qc.appearance }
        label="Appearance" min={ 1 } max={ 10 } margin="dense"
        onChange={ handleRatingChange }
      />

      <Typography variant="subheading">
        Combat
      </Typography>
      <RatingField trait="join_battle" value={ qc.join_battle }
        label="JB" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="movement" value={ qc.movement }
        label="Move" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="parry" value={ qc.parry }
        label="Parry" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="evasion" value={ qc.evasion }
        label="Evasion" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="soak" value={ qc.soak }
        label="Soak" min={ 1 } margin="dense"
        onChange={ handleRatingChange }
      />
      <RatingField trait="hardness" value={ qc.hardness }
        label="Hardness" margin="dense"
        onChange={ handleRatingChange }
      />
      <TextField name="armor_name" value={ qc.armor_name }
        label="Armor Name" margin="dense"
        type="text"
        onChange={ handleChange } onBlur={ handleBlur }
      />

      <QcAttackEditor qc={ qc } />

      <Typography variant="subheading">
        Actions
      </Typography>
      <QcActionEditor qc={ qc } onChange={ handleListChange } />

      <Typography variant="subheading">
        Intimacies
      </Typography>
      <IntimacyEditor character={ qc } characterType="qc"
        onChange={ handleRatingChange }
      />

      <QcMeritEditor qc={ qc } />

      <QcCharmEditor qc={ qc } />
    </div>
  }
}
QcEditor.propTypes = {
  qc: PropTypes.shape(fullQc),
  updateQc: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.qcId
  const qc = state.entities.qcs[id]

  return {
    id,
    qc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQc: (id, trait, value) => {
      dispatch(updateQc(id, trait, value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QcEditor)
