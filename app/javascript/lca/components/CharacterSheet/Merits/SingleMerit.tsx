import { Typography } from '@mui/material'

import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import RatingLine from 'components/generic/ratingLine.jsx'
import BlockPaper from 'components/shared/BlockPaper'

import type { Merit } from 'types'

const SingleMerit = ({ merit }: { merit: Merit }) => (
  <BlockPaper>
    <Typography variant="h6">
      <RatingLine rating={merit.rating} dontFill merit>
        <span className="capitalize">{merit.label || merit.merit_name}</span>
        {merit.label && (
          <Typography component="span" variant="caption" sx={{ ml: 1 }}>
            <span className="capitalize"> ({merit.merit_name}) </span>
          </Typography>
        )}
      </RatingLine>
    </Typography>

    <Typography className="capitalize" variant="caption" gutterBottom>
      {merit.supernatural && 'Supernatural '}
      {merit.merit_cat} {merit.merit_cat !== 'flaw' && 'Merit'}
    </Typography>

    <MarkdownDisplay source={merit.description} />

    <Typography variant="caption">Ref: {merit.ref}</Typography>
  </BlockPaper>
)

export default SingleMerit
