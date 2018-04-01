import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ListItemIcon, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import RemoveCircle from 'material-ui-icons/RemoveCircle'

import { removeThingFromChronicle } from '../../../ducks/actions.js'
import { canIEdit } from '../../../selectors/'

function CardMenuHide({ id, chronId, characterType, canIEdit, removeThing }) {
  if (!canIEdit || chronId == undefined)
    return <div />

  return <Fragment>
    <MenuItem button onClick={ () => removeThing(chronId, id, characterType)}>
      <ListItemIcon><RemoveCircle /></ListItemIcon>
      <ListItemText inset primary="Remove from Chronicle" />
    </MenuItem>
  </Fragment>
}
CardMenuHide.propTypes = {
  chronId: PropTypes.number,
  id: PropTypes.number.isRequired,
  characterType: PropTypes.string.isRequired,
  canIEdit: PropTypes.bool,
  removeThing: PropTypes.func,
}
const  mapStateToProps = (state, ownProps) => ({
  canIEdit: canIEdit(state, ownProps.id, ownProps.characterType),
  chronId: state.entities[ownProps.characterType + 's'][ownProps.id].chronicle_id
})
const mapDispatchToProps = (dispatch) => ({
  removeThing: (chronId, id, type) => dispatch(removeThingFromChronicle(chronId, id, type)),
})
export default connect(mapStateToProps, mapDispatchToProps)(CardMenuHide)
