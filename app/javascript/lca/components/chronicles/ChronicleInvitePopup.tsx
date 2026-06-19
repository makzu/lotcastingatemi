import { useState } from 'react'
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { FileCopy } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

import { regenChronicleInviteCode, updateChronicle } from '@lca/ducks/actions'
import { useAppDispatch, useAppSelector, useDialogLogic } from '@lca/hooks'
import { getSpecificChronicle } from '@lca/selectors/chronicle'

type ExposedProps = {
  chronicleId: number
}

const useStyles = makeStyles((_theme) => ({
  code: {},
}))

const ChronicleInvitePopup = ({ chronicleId }: ExposedProps) => {
  const dispatch = useAppDispatch()
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const [isCopied, setIsCopied] = useState(false)

  const chronicle = useAppSelector((state) =>
    getSpecificChronicle(state, chronicleId),
  )

  const handleDisable = () => {
    dispatch(updateChronicle(chronicleId, { invite_code: '' }))
    setIsCopied(false)
  }

  const handleRegen = () => {
    setIsCopied(false)
    dispatch(regenChronicleInviteCode(chronicleId))
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(chronicle.invite_code).then(() => {
      setIsCopied(true)
    })
  }

  const closeDialog = () => {
    setClosed()
    setIsCopied(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={setOpen}>
        Invite Player
      </Button>

      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle>Invite a Player</DialogTitle>
        <DialogContent>
          {chronicle.invite_code !== '' ? (
            <>
              <DialogContentText paragraph>
                Another player can join {chronicle.name} if they have this code.
              </DialogContentText>

              <DialogContentText>
                <ButtonBase
                  component="div"
                  onClick={copyToClipboard}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'text',
                  }}
                >
                  <span style={{ flex: '1', fontSize: '1.75em' }}>
                    {chronicle.invite_code}
                  </span>

                  <FileCopy />
                </ButtonBase>
              </DialogContentText>
              <DialogContentText variant="caption">
                {isCopied ? 'Copied! ✓' : 'Click to copy to clipboard'}
              </DialogContentText>
            </>
          ) : (
            <DialogContentText>
              This Chronicle is currently closed to new players. Click Make New
              Code to re-open.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button onClick={handleDisable}>Disable invitations</Button>
          <Button onClick={handleRegen}>Make new Code</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChronicleInvitePopup
