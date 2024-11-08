import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/hooks'

import BlockPaper from '@/components/shared/BlockPaper'
import { Typography } from '@mui/material'

const GoodbyePage = () => {
  const shouldRedirect = useAppSelector(
    (state) => !state.session.deleted && !state.app.loading,
  )
  // Do not show this page unless the account really is deleted
  if (shouldRedirect) return <Navigate to="/" />

  return (
    <BlockPaper>
      <Typography>Your account has been deleted.</Typography>
    </BlockPaper>
  )
}

export default GoodbyePage