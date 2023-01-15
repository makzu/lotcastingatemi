import * as React from 'react'
import { connect } from 'react-redux'

import { Button, Grid } from '@material-ui/core'

import DivWithFilterDrawer from 'components/shared/DivWithFilterDrawer'
import { State } from 'ducks'
import {
  getNativeCharmsForCharacter,
  getSpecificCharacter,
} from 'ducks/entities'
import { useDialogLogic } from 'hooks'
import { RouteWithIdProps as RouteProps } from 'types/util'
import CharacterLoadError from '../CharacterLoadError'
import CharmFilter from './CharmFilter/'
import CharmList from './CharmList'
import { initialFilters, reducer } from './useCharmFilters'
import useDocumentTitle from 'hooks/UseDocumentTitle'

interface StateProps {
  id: number
  name?: string
}

const CharmPage = (props: StateProps) => {
  const [filters, setfilters] = React.useReducer(reducer, initialFilters)
  useDocumentTitle(`${props.name} Charms | Lot-Casting Atemi`)

  if (props.name == null) {
    return <CharacterLoadError />
  }

  return (
    <DivWithFilterDrawer>
      <div>
        Charms!{' '}
        <CharmFilter id={props.id} filters={filters} setfilters={setfilters} />
      </div>

      <CharmList type="native" id={props.id} filters={filters} />

      <CharmList type="martialArts" id={props.id} filters={filters} />

      <CharmList type="evocation" id={props.id} filters={filters} />

      <CharmList type="spirit" id={props.id} filters={filters} />
    </DivWithFilterDrawer>
  )
}

const mapState = (state: State, props: RouteProps) => {
  const id = parseInt(props.match.params.id, 10)

  return { id, name: (getSpecificCharacter(state, id) || { name: null }).name }
}

export default connect(mapState)(CharmPage)
