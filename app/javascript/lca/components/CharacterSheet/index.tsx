import { Route, Routes } from 'react-router-dom'

import ProtectedComponent from '@/containers/ProtectedComponent'
import { fetchCharacterIfNecessary } from '@/ducks/entities/character'
import { useAppDispatch, useIdFromParams } from '@/hooks'
import CharacterSheet from '../characters/CharacterSheet'
import CharmFullPage from '../characters/charms/'
import BioPage from './Bio'
import MeritPage from './Merits'
import SorceryPage from './Sorcery'

const CharacterSheetWrapper = () => {
  const id = useIdFromParams()
  const dispatch = useAppDispatch()
  dispatch(fetchCharacterIfNecessary(id))

  return (
    <Routes>
      <Route path="merits" element={<MeritPage />} />
      <Route path="charms" element={<CharmFullPage />} />
      {/* <Route path="charmss" element={ <CharmPage /> } /> */}
      <Route path="sorcery" element={<SorceryPage />} />
      <Route path="bio" element={<BioPage />} />
      <Route path="/" element={<CharacterSheet />} />
    </Routes>
  )
}

export default ProtectedComponent(CharacterSheetWrapper)
