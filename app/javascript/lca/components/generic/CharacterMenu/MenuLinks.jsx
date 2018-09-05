// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'

type Props = { id: number, characterType: string }
function CardMenuLinks({ id, characterType }: Props) {
  return (
    <Fragment>
      <MenuItem button component={Link} to={`/${characterType}s/${id}`}>
        <ListItemText primary="Full Sheet" />
      </MenuItem>
    </Fragment>
  )
}

export default CardMenuLinks
