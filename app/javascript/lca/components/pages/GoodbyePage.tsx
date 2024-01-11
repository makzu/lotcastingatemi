import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import BlockPaper from 'components/generic/blockPaper'
import type { Enhancer } from 'utils/flow-types'
import { RootState } from 'store'

interface Props {
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

const mapState = (state: RootState) => ({
  shouldRedirect: !state.session.deleted && !state.app.loading,
})

const enhance: Enhancer<Props, never> = connect(mapState)
export default enhance(GoodbyePage)
