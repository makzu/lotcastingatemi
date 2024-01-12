import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'

import BlockPaper from 'components/shared/BlockPaper'
import { RootState } from 'store'

interface Props {
  shouldRedirect: boolean
}

const GoodbyePage = ({ shouldRedirect }: Props) => {
  // Do not show this page unless the account really is deleted
  if (shouldRedirect) return <Navigate to="/" />

  return (
    <BlockPaper>
      <Typography>Your account has been deleted.</Typography>
    </BlockPaper>
  )
}

const mapState = (state: RootState) => ({
  shouldRedirect: !state.session.deleted && !state.app.loading,
})

export default connect(mapState)(GoodbyePage)
