import { Link } from 'react-router-dom'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material'
import { Help as HelpIcon } from '@mui/icons-material'

import ListAttributeEditor from 'components/generic/ListAttributeEditor'
import { useDialogLogic } from 'hooks'
import type { Character } from 'types'
import AnimalFormFields from './AnimalFormFields'
import animalFormsList from './AnimalFormsList'

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
            character={character}
            trait="forms"
            Fields={AnimalFormFields}
            newObject={{ form: '' }}
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
