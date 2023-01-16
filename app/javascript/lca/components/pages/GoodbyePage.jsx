// @flow
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Typography from '@mui/material/Typography'

import BlockPaper from 'components/shared/BlockPaper'
import type { Enhancer } from 'utils/flow-types'

type Props = {
  shouldRedirect: boolean,
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
