// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'

function CardMenuLinks({ id, characterType }: { id: number, characterType: string }) {
  return <Fragment>
    <MenuItem button component={ Link } to={ `/${characterType}s/${id}` }>
      <ListItemText primary="Full Sheet" />
    </MenuItem>
  </Fragment>
}

export default CardMenuLinks
