import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import type { TextFieldProps } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {
  amIStOfChronicle,
  getPlayersForChronicle,
  getSpecificChronicle,
  getStorytellerForChronicle,
} from 'selectors'

import { updateChronicle } from '@lca/ducks/entities/chronicle.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useAppSelector from '@lca/hooks/UseAppSelector.ts'
import { useBetterDocumentTitle } from '@lca/hooks/UseDocumentTitle.ts'
import BlockPaper from 'components/generic/BlockPaper.tsx'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.tsx'
import TextField from 'components/generic/TextField.tsx'
import ProtectedComponent from 'containers/ProtectedComponent'
import ChronicleDeletePopup from './ChronicleDeletePopup.tsx'
import ChronicleInvitePopup from './ChronicleInvitePopup.tsx'
import ChronicleLeavePopup from './ChronicleLeavePopup.tsx'
import RemovePlayerPopup from './removePlayerPopup.tsx'

const ChronicleDetailsPage = () => {
  const dispatch = useAppDispatch()
  const { chronicleId } = useParams<{ chronicleId: string }>()

  const id = parseInt(chronicleId, 10)
  const chronicle = useAppSelector((state) => getSpecificChronicle(state, id))
  const players = useAppSelector((state) => getPlayersForChronicle(state, id))
  const st = useAppSelector((state) => getStorytellerForChronicle(state, id))
  const is_st = useAppSelector((state) => amIStOfChronicle(state, id))

  useBetterDocumentTitle(chronicle.name)

  const onChange: TextFieldProps['onChange'] = (e) => {
    const { name, value } = e.target
    dispatch(updateChronicle(id, { [name]: value }))
  }

  if (chronicle === undefined) {
    return (
      <BlockPaper>
        <Typography paragraph>This Chronicle has not yet loaded.</Typography>
      </BlockPaper>
    )
  }

  const playerList = players.map((p) => (
    <Fragment key={p.id}>
      <Typography style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ flex: 1 }}>{p.display_name}</span>

        {is_st && (
          <RemovePlayerPopup chronicleId={chronicle.id} playerId={p.id} />
        )}
      </Typography>
      <Divider />
    </Fragment>
  ))

  return (
    <Grid container spacing={3}>
      {chronicle.notes !== '' && (
        <Grid item xs={12} md={8}>
          <BlockPaper>
            <MarkdownDisplay source={chronicle.notes} />
          </BlockPaper>
        </Grid>
      )}

      <Grid item xs={12} md={4}>
        <BlockPaper>
          <Typography variant="h5" style={{ display: 'flex' }}>
            <span style={{ flex: 1 }}>Players</span>
            {is_st && <ChronicleInvitePopup chronicleId={chronicle.id} />}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Storyteller: {st.display_name}
          </Typography>

          <Divider />

          {playerList}

          {!is_st && (
            <div style={{ marginTop: '1em' }}>
              <ChronicleLeavePopup chronicleId={chronicle.id} />
            </div>
          )}
        </BlockPaper>
      </Grid>

      {is_st && (
        <Grid item xs={12}>
          <BlockPaper>
            <Typography variant="subtitle1">ST Controls</Typography>

            <div>
              <TextField
                name="name"
                value={chronicle.name}
                label="Chronicle Name"
                style={{ width: '30em' }}
                onChange={onChange}
                margin="dense"
                inputProps={{
                  autocomplete: 'off',
                  'data-1p-ignore': 'true',
                  'data-lp-ignore': 'true',
                }}
              />
            </div>

            <TextField
              name="notes"
              label="Chronicle Notes"
              value={chronicle.notes}
              margin="dense"
              onChange={onChange}
              fullWidth
              multiline
            />
            <div style={{ marginTop: '1em' }}>
              <ChronicleDeletePopup chronicleId={chronicle.id} />
            </div>
          </BlockPaper>
        </Grid>
      )}
    </Grid>
  )
}

export default ProtectedComponent(ChronicleDetailsPage)
