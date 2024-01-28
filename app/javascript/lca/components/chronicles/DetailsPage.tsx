import { Fragment, type ChangeEvent } from 'react'

import { Box, Divider, Grid, Typography } from '@mui/material'

import TextField from '@/components/fields/TextField'
import BlockPaper from '@/components/shared/BlockPaper'
import MarkdownDisplay from '@/components/shared/MarkdownDisplay'
import ProtectedComponent from '@/containers/ProtectedComponent'
import { updateChronicle } from '@/ducks/actions'
import {
  useAppDispatch,
  useAppSelector,
  useDocumentTitle,
  useIdFromParams,
} from '@/hooks'
import {
  amIStOfChronicle,
  getPlayersForChronicle,
  getSpecificChronicle,
  getStorytellerForChronicle,
} from '@/selectors'
import { ChronicleDeleteDialog } from './ChronicleDeleteDialog'
import ChronicleLeavePopup from './ChronicleLeavePopup'
import ChronicleInvitePopup from './chronicleInvitePopup'
import RemovePlayerPopup from './removePlayerPopup'

const ChronicleDetailsPage = () => {
  const dispatch = useAppDispatch()
  const id = useIdFromParams()
  const chronicle = useAppSelector((state) => getSpecificChronicle(state, id))
  const st = useAppSelector((state) => getStorytellerForChronicle(state, id))
  const is_st = useAppSelector((state) => amIStOfChronicle(state, id))
  const players = useAppSelector((state) => getPlayersForChronicle(state, id))
  useDocumentTitle(`${chronicle?.name} | Lot-Casting Atemi`)

  if (chronicle === undefined) {
    return (
      <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>
    )
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateChronicle(chronicle.id, { [e.target.name]: e.target.value }))
  }

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sx={{ display: { xs: 'block', sm: 'none' }, height: '1em' }}
      >
        &nbsp;
      </Grid>

      <Grid item xs={12} md={8}>
        <BlockPaper>
          <MarkdownDisplay source={chronicle.notes} />
        </BlockPaper>
      </Grid>

      <Grid item xs={12} md={4}>
        <BlockPaper>
          <Typography variant="h5" className="flexContainer">
            <div className="flex">Players</div>

            {is_st && <ChronicleInvitePopup chronicleId={chronicle.id} />}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Storyteller: {st?.display_name}
          </Typography>

          <Divider sx={{ mt: 1, mb: 1 }} />

          {players.map((p, index) => (
            <Fragment key={p.id}>
              {!!index && <Divider sx={{ mt: 1, mb: 1 }} />}
              <div className="flexContainer">
                <Typography gutterBottom sx={{ flex: 1 }}>
                  {p.display_name}
                </Typography>
                {is_st && (
                  <RemovePlayerPopup
                    chronicleId={chronicle.id}
                    playerId={p.id}
                  />
                )}
              </div>
            </Fragment>
          ))}

          {!is_st && (
            <Box sx={{ mt: 2 }}>
              <ChronicleLeavePopup chronicleId={chronicle.id} />
            </Box>
          )}
        </BlockPaper>
      </Grid>

      {is_st && (
        <Grid item xs={12}>
          <BlockPaper>
            <Typography variant="subtitle1">ST Controls</Typography>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="name"
                value={chronicle.name}
                label="Chronicle Name"
                sx={{ width: '30em' }}
                onChange={handleChange}
                margin="dense"
                inputProps={{
                  autocomplete: 'off',
                  'data-1p-ignore': 'true',
                  'data-lp-ignore': 'true',
                }}
              />
            </Box>

            <TextField
              name="notes"
              label="Chronicle Notes"
              value={chronicle.notes}
              margin="dense"
              onChange={handleChange}
              fullWidth
              multiline
            />

            <Box sx={{ mt: 2 }}>
              <ChronicleDeleteDialog chronicleId={chronicle.id} />
            </Box>
          </BlockPaper>
        </Grid>
      )}
    </Grid>
  )
}

export default ProtectedComponent(ChronicleDetailsPage)
