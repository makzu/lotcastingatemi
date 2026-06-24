import { Link } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Help as HelpIcon } from '@material-ui/icons'

import { ListAttributeEditor } from '@lca/components/generic/ListAttributeEditor.tsx'
import { useDialogLogic } from '@lca/hooks/index.ts'
import type { Character } from '@lca/types/index.ts'
import AnimalFormFields from './AnimalFormFields.tsx'
import animalFormsList from './AnimalFormsList.tsx'

interface Props {
  character: Character
  onChange(): void
}

const AnimalFormsEditor = ({ character, onChange }: Props) => {
  const [isOpen, setOpen, setClosed] = useDialogLogic()
  const forms = animalFormsList(character.forms)

  return (
    <>
      <Typography variant="subtitle1">
        Animal Forms
        <Button onClick={setOpen}>Edit</Button>
      </Typography>
      <Typography>{forms.length ? forms : 'None'}</Typography>

      <Dialog open={isOpen} onClose={setClosed}>
        <DialogContent>
          <ListAttributeEditor
            label="Animal Forms"
            traitName="forms"
            trait={character.forms}
            Fields={AnimalFormFields}
            newObject={{
              form: `New Form ${character.forms.length + 1}`,
              qc_id: undefined,
            }}
            onChange={onChange}
          />
        </DialogContent>

        <DialogActions>
          <div style={{ flex: 1 }}>
            <IconButton component={Link} to={'/help/forms'} size="small">
              <HelpIcon />
            </IconButton>
          </div>
          <Button onClick={setClosed}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AnimalFormsEditor
