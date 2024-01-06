// @flow
import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import commonStyles from 'styles'

type LinkRendererProps = {
  href: string,
  children: React.Node,
}
// This won't work for mailto: links or any other non-http(/s) link.
// Does it need to?
export const LinkRenderer = (props: LinkRendererProps) =>
  props.href.match(/^(https?:)?\/\//) ? (
    <a href={props.href}>{props.children}</a>
  ) : (
    <Link to={props.href}>{props.children}</Link>
  )

type Props = {
  source: string,
  noBlocks?: boolean,
  classes: Object,
  className?: string,
}
const MarkdownDisplay = ({ source, noBlocks, classes, className }: Props) => (
  <Typography
    component={ReactMarkdown}
    className={classes.markdown + ' ' + (className || '')}
    components={{ a: LinkRenderer }}
    allowedElements={noBlocks && ['strong', 'em', 'del', 'a']}
    unwrapDisallowed={noBlocks}
  >
    {source}
  </Typography>
)

export default withStyles(commonStyles)(MarkdownDisplay)
