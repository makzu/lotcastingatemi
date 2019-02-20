import * as React from 'react'
import { NavLink } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'

const LcaNavLink = ({ to, ...props }: any) => (
  <NavLink exact to={to} {...props} />
)

const NavLinkListItem = (props: {
  to: string;
  children: React.ReactNode;
  isActive?(): boolean;
}) => <ListItem button component={LcaNavLink} {...props} />

export default NavLinkListItem
