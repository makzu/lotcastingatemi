// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'

// eslint-disable-next-line no-unused-vars
const GoodbyePage = ({ shouldRedirect }: { shouldRedirect: boolean }) => {
  // Do not show this page unless the account really is deleted
  if (shouldRedirect) return <Redirect to="/" />

  return (
    <BlockPaper>
      <Typography>Your account has been deleted.</Typography>
    </BlockPaper>
  )
}
const mapState = state => ({
  shouldRedirect: !state.session.deleted && !state.app.loading,
})
export default connect(mapState)(GoodbyePage)
