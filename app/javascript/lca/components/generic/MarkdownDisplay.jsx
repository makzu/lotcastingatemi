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
const LinkRenderer = (props: LinkRendererProps) =>
  props.href.match(/^(https?:)?\/\//) ? (
    <a href={props.href}>{props.children}</a>
  ) : (
    <Link to={props.href}>{props.children}</Link>
  )

type Props = {
  source: string,
  classes: Object,
}
const MarkdownDisplay = ({ source, classes }: Props) => (
  <Typography
    component={ReactMarkdown}
    source={source}
    className={classes.markdown}
    renderers={{ link: LinkRenderer }}
  />
)

export default withStyles(commonStyles)(MarkdownDisplay)
