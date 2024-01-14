import type { AnchorHTMLAttributes } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography'

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
}
const MarkdownDisplay = ({ source, noBlocks }: Props) => (
  <Typography className="markdown" component="div">
    <ReactMarkdown
      components={{ a: LinkRenderer }}
      allowedElements={
        noBlocks ? ['text', 'strong', 'emphasis', 'delete', 'link'] : undefined
      }
      unwrapDisallowed={noBlocks}
    >
      {source}
    </ReactMarkdown>
  </Typography>
)

export default MarkdownDisplay
