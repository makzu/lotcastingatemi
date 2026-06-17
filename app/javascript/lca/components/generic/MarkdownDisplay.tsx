import type { AnchorHTMLAttributes } from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import commonStyles from 'styles'

type LinkRendererProps = AnchorHTMLAttributes<HTMLAnchorElement>
// This won't work for mailto: links or any other non-http(/s) link.
// Does it need to?
export const LinkRenderer = ({ href, ...props }: LinkRendererProps) =>
  href?.match(/^(https?:)?\/\//) ? (
    <a href={href} {...props} />
  ) : (
    <Link to={href || '#'} {...props} />
  )

interface Props {
  source: string
  noBlocks?: boolean
  className?: string
}

const useStyles = makeStyles((_theme) => ({
  markdown: {
    '& a': {
      color: 'unset',
    },
    '& img': {
      maxWidth: '100%',
    },
    '& code': {
      opacity: 0.7,
    },
  },
}))

const MarkdownDisplay = ({ source, noBlocks, className }: Props) => {
  const classes = useStyles()
  return (
    <Typography
      component="div"
      className={`${classes.markdown} ${className ?? ''}`}
    >
      <Markdown
        components={{ a: LinkRenderer }}
        allowedElements={noBlocks ? ['strong', 'em', 'del', 'a'] : undefined}
        unwrapDisallowed={noBlocks}
      >
        {source}
      </Markdown>
    </Typography>
  )
}

export default withStyles(commonStyles)(MarkdownDisplay)
