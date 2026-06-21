import type { ChangeEvent } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import MoteCommittmentEditor from '@lca/components/characterEditor/editors/MoteCommitmentEditor.tsx'
import { updateCharacter, updateQc } from '@lca/ducks/actions/index.ts'
import useAppDispatch from '@lca/hooks/UseAppDispatch.ts'
import useDialogLogic from '@lca/hooks/UseDialogLogic.ts'
import type { Character, QC } from '@lca/types/index.ts'

interface ExposedProps {
  character: Character | QC
  qc?: boolean
}

const MoteCommitmentPopup = (props: ExposedProps) => {
  const dispatch = useAppDispatch()
  const { character, qc } = props
  const [isOpen, setOpen, setClosed] = useDialogLogic()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = character
    const trait = { [e.target.name]: e.target.value }
    dispatch(qc ? updateQc(id, trait) : updateCharacter(id, trait))
  }

  return (
    <>
      <Button onClick={setOpen}>Committments...</Button>
      <Dialog open={isOpen} onClose={setClosed}>
        <DialogContent>
          <MoteCommittmentEditor
            character={character}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setClosed}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MoteCommitmentPopup
