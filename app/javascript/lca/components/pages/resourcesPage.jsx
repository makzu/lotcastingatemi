import React from 'react'
import { Link } from 'react-router-dom'

import Typography from 'material-ui/Typography'

import BlockPaper from '../generic/blockPaper.jsx'

export default function ResourcesPage() {
  return <BlockPaper>
    <Typography variant="headline" gutterBottom>
      Resources
    </Typography>

    <Typography paragraph>
      <Link to="https://www.reddit.com/r/exalted/comments/4yby39/madletters_charm_cascades_version_3_including/">
        Charm Cascades and other resources
      </Link>
      &nbsp;
      by MadLetter
    </Typography>

    <Typography paragraph>
      <Link to="http://forum.theonyxpath.com/forum/main-category/exalted/766048-ex3-i-made-a-1-page-combat-flowchart">
        Combat flowchart
      </Link>
      &nbsp;
      by GivenFlesh
    </Typography>

    <Typography paragraph>
      <Link to="http://forum.theonyxpath.com/forum/main-category/exalted/1180122-ex3-social-system-cheat-sheet-and-flowchart">
        Social system cheat sheet
      </Link>
      &nbsp;
      by Redthorn
    </Typography>

    <Typography paragraph>
      <Link to="http://forum.theonyxpath.com/forum/main-category/exalted/65025-exalted-3rd-edition-useful-links-and-topics">
        &apos;Useful Links&apos; thread on the official Exalted forums
      </Link>
    </Typography>
  </BlockPaper>
}
