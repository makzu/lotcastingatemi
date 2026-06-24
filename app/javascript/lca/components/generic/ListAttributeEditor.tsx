import type React from 'react'
import type { ReactNode } from 'react'
import { arrayMove as move } from '@dnd-kit/helpers'
import { DragDropProvider } from '@dnd-kit/react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import ContentRemoveCircle from '@material-ui/icons/RemoveCircle'

import type { Character } from '@lca/types/index.ts'

export type ListAttributeFieldTypes = {
  character: Object
  trait: Object
  onChange: Function
  classes: Object
}

interface SortableProps {
  id: string
  index: number
  children: ReactNode
}
const Sortable = ({ id, index, children }: SortableProps) => {
  const { ref } = useSortable({ id, index })

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center' }}>
      {children}
    </div>
  )
}

type ArrayProperties<T> = {
  [K in keyof T as T[K] extends unknown[] ? K : never]: T[K]
}

type ArrayAttributeNames<T> = keyof ArrayProperties<T>

interface Props<T extends ArrayAttributeNames<Character>> {
  trait: Character[T]
  traitName: T
  label: string
  Fields: React.ComponentType<ListAttributeFieldTypes>
  newObject: Character[T][number]
  onChange: (e: { target: { name: string; value: any } }) => void
}
export const ListAttributeEditor = <T extends ArrayAttributeNames<Character>>(
  props: Props<T>,
) => {
  const { label, trait, newObject, onChange, traitName, Fields } = props

  const change = (value: typeof trait) => {
    onChange({ target: { name: traitName, value } })
  }

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newTrait = structuredClone(trait)
    const { name } = e.target
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    if (typeof newTrait[i] === 'string') newTrait[i] = val
    else newTrait[i][name] = val

    change(newTrait)
  }

  const handleRemove = (i: number) => {
    const newTrait = structuredClone(trait)

    newTrait.splice(i, 1)

    change(newTrait)
  }

  const handleAdd = () => {
    onChange({
      target: { name: traitName, value: [...trait, newObject] },
    })
  }

  const formFields = trait.map((t, i) => (
    <Sortable key={JSON.stringify(t)} id={JSON.stringify(t)} index={i}>
      <Typography component="div" style={{ marginRight: '8px' }}>
        <DragHandleIcon onClick={(e) => e.preventDefault()} />
      </Typography>

      <Fields trait={t} classes={{}} onChange={(e) => handleChange(i, e)} />

      <IconButton
        onClick={() => {
          handleRemove(i)
        }}
      >
        <ContentRemoveCircle />
      </IconButton>
    </Sortable>
  ))

  return (
    <div>
      <Typography variant="subtitle1" style={{ display: 'flex' }}>
        <span style={{ flex: 1 }}>{label}</span>
        {/* {showCount && (
        <span className={classes.countLabel}>
          &nbsp;({trait.length} total)
        </span>
      )} */}
        <Button onClick={handleAdd}>
          Add &nbsp;
          <ContentAddCircle />
        </Button>
      </Typography>

      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return

          const { source } = event.operation
          if (isSortable(source)) {
            if (source.index === source.initialIndex) {
              return
            }

            const newTrait = move(trait, source.initialIndex, source.index)

            change(newTrait)
          }
        }}
      >
        {formFields}
      </DragDropProvider>
    </div>
  )
}

export default ListAttributeEditor
