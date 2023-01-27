import { Grid, Typography } from '@mui/material'

import animalFormsList from 'components/characterEditor/editors/AnimalFormsList'
import MarkdownDisplay from 'components/shared/MarkdownDisplay'
import BlockPaper from 'components/shared/BlockPaper'
import ProtectedComponent from 'containers/ProtectedComponent'
import { getSpecificCharacter } from 'ducks/selectors'
import { useAppSelector, useDocumentTitle, useIdFromParams } from 'hooks'
import { XpLogEntry } from 'types'
import { solarXpName, spentSolarXp, spentXp } from 'utils/calculated'
import CharacterLoadError from '../CharacterLoadError'

const xpTable = (log: XpLogEntry[]) =>
  log.map((l, i) => (
    <tr key={`${l.label}_${i}`}>
      <td style={{ textAlign: 'right' }}>{l.points}:</td>
      <td style={{ width: '100%' }}>{l.label}</td>
    </tr>
  ))

const BioFullPage = () => {
  const id = useIdFromParams()
  const character = useAppSelector((state) => getSpecificCharacter(state, id))
  useDocumentTitle(`${character?.name} Bio | Lot-Casting Atemi`)

  /* Escape hatch */
  if (character == null) {
    return <CharacterLoadError />
  }

  const forms = animalFormsList(character.forms)

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Bio/Misc</Typography>
        </Grid>

        <Grid item xs={12}>
          <BlockPaper>
            <MarkdownDisplay source={character.description} />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <BlockPaper>
            {character.type !== 'Character' && (
              <Typography paragraph>
                Iconic Anima: {character.anima_display || 'Not specified'}
              </Typography>
            )}
            <Typography paragraph>
              Lore Background: {character.lore_background || 'Not specified'}
            </Typography>
            <Typography paragraph>
              Native Language: {character.native_language}
            </Typography>

            {character.tell && (
              <Typography paragraph>Tell: {character.tell}</Typography>
            )}
            {character.totem && (
              <Typography paragraph>Totem: {character.totem}</Typography>
            )}
            {forms.length > 0 ? (
              <Typography paragraph>Forms: {forms}</Typography>
            ) : null}
          </BlockPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <BlockPaper>
            <div style={{ textAlign: 'center' }}>
              {character.portrait_link ? (
                <a
                  href={character.portrait_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={character.portrait_link}
                    style={{
                      display: 'block',
                      margin: 'auto',
                      maxWidth: '100%',
                    }}
                  />
                </a>
              ) : (
                <Typography>No portrait</Typography>
              )}
            </div>
          </BlockPaper>
        </Grid>

        <Grid item xs={12}>
          <BlockPaper>
            <Typography variant="subtitle1">
              Inventory/Other Equipment
            </Typography>
            <MarkdownDisplay source={character.equipment || 'None'} />
            <Typography variant="subtitle1">Notes</Typography>
            <MarkdownDisplay source={character.notes} />
          </BlockPaper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <BlockPaper>
            <Typography variant="subtitle1">XP</Typography>
            <Typography component="table">
              <tbody>{xpTable(character.xp_log)}</tbody>
            </Typography>
            <Typography>
              Earned: {character.xp_total}, Spent: {spentXp(character)},
              Remaining: {character.xp_total - spentXp(character)}
            </Typography>
          </BlockPaper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <BlockPaper>
            <Typography variant="subtitle1">
              {solarXpName(character) + ' XP'}
            </Typography>
            <Typography component="table">
              <tbody>{xpTable(character.xp_log_solar)}</tbody>
            </Typography>
            <Typography>
              Earned: {character.xp_solar_total}, Spent:{' '}
              {spentSolarXp(character)}, Remaining:{' '}
              {character.xp_solar_total - spentSolarXp(character)}
            </Typography>
          </BlockPaper>
        </Grid>
      </Grid>
    </>
  )
}

export default ProtectedComponent(BioFullPage)
