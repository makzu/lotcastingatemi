import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography
} from '@material-ui/core'
import { Help as HelpIcon } from '@material-ui/icons'

import ListAttributeEditor from 'components/generic/ListAttributeEditor'
import { useDialogLogic } from 'hooks'
import { Character } from 'types'
import AnimalFormFields from './AnimalFormFields'
import animalFormsList from './AnimalFormsList'

const LcaLink = ({ to, ...props }: any) => <Link to={to} {...props} />
const LinkIconButton = (props: {
  to: string
  children: React.ReactNode
  size: string
}) => <IconButton component={LcaLink} {...props} />

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
            <LinkIconButton to={'/help/forms'} size="small">
              <HelpIcon />
            </LinkIconButton>
          </div>
          <Button onClick={setClosed}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AnimalFormsEditor
