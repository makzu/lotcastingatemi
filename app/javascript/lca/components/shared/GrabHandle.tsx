import { SortableHandle } from 'react-sortable-hoc'

import { Theme } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  handle: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(),
  },
}))

const Handle = () => {
  const classes = useStyles({})
  return (
    <div className={classes.handle}>
      <DragHandleIcon />
    </div>
  )
}

export default SortableHandle(() => <Handle />)
