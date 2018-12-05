// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'

import type { CharacterType } from './index.jsx'

type Props = {
  id: number,
  characterType: CharacterType,
}

function CardMenuLinks({ id, characterType }: Props) {
  return (
    <>
      <MenuItem button component={Link} to={`/${characterType}s/${id}`}>
        <ListItemText primary="Full Sheet" />
      </MenuItem>
    </>
  )
}

export default CardMenuLinks
