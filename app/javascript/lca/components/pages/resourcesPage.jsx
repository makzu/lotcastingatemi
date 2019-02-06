// @flow
import React from 'react'

import Typography from '@material-ui/core/Typography'

import BlockPaper from '../generic/blockPaper.jsx'

const ResourcesPage = () => (
  <BlockPaper>
    <Typography variant="h5" gutterBottom>
      Resources
    </Typography>

    <Typography
      paragraph
      component="a"
      href="https://www.reddit.com/r/exalted/comments/4yby39/madletters_charm_cascades_version_3_including/"
    >
      Solar / Martial Arts Charm Cascades and other resources by MadLetter
      (Reddit)
    </Typography>

    <Typography
      paragraph
      component="a"
      href="https://www.reddit.com/r/exalted/comments/8barde/madletters_dragonblooded_cascades/"
    >
      Dragon-Blooded Charm Cascades by MadLetter (Reddit)
    </Typography>

    <Typography
      paragraph
      component="a"
      href="http://forum.theonyxpath.com/forum/main-category/exalted/766048-ex3-i-made-a-1-page-combat-flowchart"
    >
      Combat flowchart by GivenFlesh (OPP Forums)
    </Typography>

    <Typography
      paragraph
      component="a"
      href="http://forum.theonyxpath.com/forum/main-category/exalted/1180122-ex3-social-system-cheat-sheet-and-flowchart"
    >
      Social system cheat sheet by Redthorn (OPP Forums)
    </Typography>

    <Typography
      paragraph
      component="a"
      href="http://forum.theonyxpath.com/forum/main-category/exalted/65025-exalted-3rd-edition-useful-links-and-topics"
    >
      &quot;Useful Links&quot; thread on the official Exalted forums
    </Typography>
  </BlockPaper>
)
export default ResourcesPage
