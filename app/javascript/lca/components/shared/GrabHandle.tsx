import { SortableHandle } from 'react-sortable-hoc'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DragHandleIcon from '@material-ui/icons/DragHandle'

const useStyles = makeStyles((theme: Theme) => ({
  handle: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(),
  },
}))

const Handle = () => {
  const classes = useStyles()
  return (
    <div className={classes.handle}>
      <DragHandleIcon />
    </div>
  )
}

export default SortableHandle(() => <Handle />)
