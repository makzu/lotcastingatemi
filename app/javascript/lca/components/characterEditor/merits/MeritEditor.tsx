import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import HelpIcon from '@material-ui/icons/Help'

import CharacterLoadError from '@lca/components/CharacterSheet/CharacterLoadError.tsx'
import ProtectedComponent from '@lca/containers/ProtectedComponent.tsx'
import { createMerit, updateMerit } from '@lca/ducks/actions.ts'
import {
  getMeritsForCharacter,
  getSpecificCharacter,
} from '@lca/ducks/entities/index.ts'
import { useAppSelector, useIdFromParams } from '@lca/hooks/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import { useBetterDocumentTitle } from '@lca/hooks/UseDocumentTitle.ts'
import commonStyles from '@lca/styles/index.ts'
import MeritFields from './MeritFields.tsx'

const styles = (theme) => commonStyles(theme)

interface SortableProps {
  id: number
  index: number
  children: ReactNode
}
const Sortable = ({ id, index, children }: SortableProps) => {
  const { ref } = useSortable({ id, index })

  return (
    <Grid item ref={ref} xs={12} md={6} xl={4}>
      {children}
    </Grid>
  )
}

/* LATER: possible autocomplete for merits in the book with merit_name, cat, and
 * ref pre-filled
 * TODO:  See how kosher something like above would be
 * */

type Props = {
  classes: Object
}

const MeritEditor = (props: Props) => {
  const { classes } = props
  const dispatch = useAppDispatch()
  const id = useIdFromParams()
  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  const merits = useAppSelector((state) => getMeritsForCharacter(state, id))

  useBetterDocumentTitle(character ? `${character.name} Merits` : undefined)

  /* Escape hatch */
  if (character === undefined) return <CharacterLoadError />

  const handleAdd = () => {
    dispatch(createMerit(character.id))
  }

  const mts = merits.map((m, i) => (
    <Sortable key={m.id} id={m.id} index={i}>
      <MeritFields merit={m} />
    </Sortable>
  ))

  const totalDots = merits.reduce((acc, merit) => acc + merit.rating, 0)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.stickyHeader}>
        <Typography variant="h5" component="div" style={{ display: 'flex' }}>
          <div>
            Merits &nbsp;&nbsp;
            <Button onClick={handleAdd}>
              Add Merit&nbsp;
              <ContentAddCircle />
            </Button>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <IconButton component={Link} to="/help/merits">
              <HelpIcon />
            </IconButton>
          </div>
        </Typography>
      </Grid>

      <DragDropProvider
        onDragEnd={(event) => {
          const { source } = event.operation

          if (isSortable(source)) {
            if (source.index === source.initialIndex) {
              return
            }

            dispatch(
              updateMerit(source.id as number, character.id, {
                sorting_position: source.index,
              }),
            )
          }
        }}
      >
        {mts}
      </DragDropProvider>

      <Grid item xs={12}>
        <Typography
          variant="caption"
          style={{ marginTop: '2.5em', marginBottom: '-1.5em' }}
        >
          {totalDots} dots of merits total
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ProtectedComponent(withStyles(styles)(MeritEditor))
