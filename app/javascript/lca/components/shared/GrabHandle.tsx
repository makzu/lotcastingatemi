import { SortableHandle } from 'react-sortable-hoc'

import { Theme } from '@material-ui/core'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import { makeStyles } from '@material-ui/styles'

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
