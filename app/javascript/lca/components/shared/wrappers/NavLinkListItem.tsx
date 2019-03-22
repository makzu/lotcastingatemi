import * as React from 'react'
import { NavLink } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import { Location } from 'history'

const LcaNavLink = ({ to, ...props }: any) => (
  <NavLink exact to={to} {...props} />
)

const NavLinkListItem = (props: {
  to: string
  children: React.ReactNode
  exact?: boolean
  isActive?(_: {}, location: Location): boolean
  onClick?(): void
}) => <ListItem button component={LcaNavLink} {...props} />

export default NavLinkListItem
