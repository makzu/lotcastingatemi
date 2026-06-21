// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import type { Enhancer } from '@lca/utils/flow-types'

type Props = {
  shouldRedirect: boolean
}

const GoodbyePage = ({ shouldRedirect }: Props) => {
  // Do not show this page unless the account really is deleted
  if (shouldRedirect) return <Redirect to="/" />

  return (
    <BlockPaper>
      <Typography>Your account has been deleted.</Typography>
    </BlockPaper>
  )
}

const mapState = (state) => ({
  shouldRedirect: !state.session.deleted && !state.app.loading,
})

const enhance: Enhancer<Props, {}> = connect(mapState)

export default enhance(GoodbyePage)
