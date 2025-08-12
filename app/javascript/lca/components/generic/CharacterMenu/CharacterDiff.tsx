import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { Character } from 'types'

interface Props {
  oldCharacter: Character
  newCharacter: Character
  onConfirm: () => void
  onCancel: () => void
}

const getDifferences = (oldObj: any, newObj: any, path: string = '') => {
  let differences: { key: string; oldValue: any; newValue: any }[] = []

  for (const key in newObj) {
    if (key === 'updated_at' || key === 'created_at' || key === 'id') continue

    const oldVal = oldObj ? oldObj[key] : undefined
    const newVal = newObj[key]
    const currentPath = path ? `${path}.${key}` : key

    if (typeof newVal === 'object' && newVal !== null && !Array.isArray(newVal)) {
      differences = differences.concat(getDifferences(oldVal, newVal, currentPath))
    } else if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      differences.push({
        key: currentPath,
        oldValue: JSON.stringify(oldVal),
        newValue: JSON.stringify(newVal),
      })
    }
  }

  return differences
}

const CharacterDiff = ({ oldCharacter, newCharacter, onConfirm, onCancel }: Props) => {
  const differences = getDifferences(oldCharacter, newCharacter)

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="md" fullWidth>
      <DialogTitle>Confirm Import</DialogTitle>
      <DialogContent>
        {differences.length === 0 ? (
          <p>No changes detected.</p>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Old Value</TableCell>
                <TableCell>New Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {differences.map(({ key, oldValue, newValue }) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell><code>{oldValue}</code></TableCell>
                  <TableCell><code>{newValue}</code></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color="primary" disabled={differences.length === 0}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CharacterDiff
