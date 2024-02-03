import type { AnchorHTMLAttributes } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { type SxProps, Typography } from '@mui/material'

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
  children?: string
  // @deprecated
  source?: string
  noBlocks?: boolean
  sx?: SxProps
}
const MarkdownDisplay = ({ children, source, noBlocks, sx }: Props) => (
  <Typography className="markdown" component="div" sx={sx}>
    <ReactMarkdown
      components={{ a: LinkRenderer }}
      allowedElements={
        noBlocks ? ['text', 'strong', 'emphasis', 'delete', 'link'] : undefined
      }
      unwrapDisallowed={noBlocks}
    >
      {children ?? source}
    </ReactMarkdown>
  </Typography>
)

export default MarkdownDisplay
