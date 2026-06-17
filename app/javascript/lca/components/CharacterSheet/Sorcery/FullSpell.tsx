import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core'
import type { AccordionProps } from '@material-ui/core/Accordion'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandMore } from '@material-ui/icons'

import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import type { Spell } from '@lca/types'
import SpellSummaryBlock from './SpellSummaryBlock'

const useStyles = makeStyles((_theme) => ({
  expandedSummary: {
    marginBottom: '-20px',
  },
}))

interface Props {
  spell: Spell
  isOpen: boolean
  setOpenSpell: React.Dispatch<React.SetStateAction<number>>
}

const FullSpellDisplay = ({ spell, isOpen, setOpenSpell }: Props) => {
  const classes = useStyles()
  const id = `spell-accordion-${spell.id}`
  const handleChange: AccordionProps['onChange'] = (_e, isExpanded) => {
    setOpenSpell(isExpanded ? spell.id : 0)
  }

  return (
    <Accordion
      expanded={isOpen}
      TransitionProps={{ unmountOnExit: true }}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        id={`${id}-header`}
        aria-controls={`${id}-content`}
        classes={{ expanded: classes.expandedSummary }}
      >
        <div>
          <Typography variant="h6">{spell.name}</Typography>
          <SpellSummaryBlock spell={spell} isOpen={isOpen} />
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div>
          <Typography component="div">
            <div>
              <strong>Circle:</strong>&nbsp;
              <span className="capitalize">{spell.circle}</span>
            </div>
            <div>
              <strong>Cost:</strong> {spell.cost}&nbsp;
            </div>
            <div>
              <strong>Keywords:</strong>&nbsp;
              <span className="capitalize">
                {spell.keywords.join(', ') || 'None'}
              </span>
            </div>
            <div>
              <strong>Duration:</strong> &nbsp;
              <span className="capitalize">{spell.duration}</span>
            </div>
          </Typography>

          <MarkdownDisplay source={spell.body} />

          {spell.ref !== '' && (
            <Typography variant="caption">Ref: {spell.ref}</Typography>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default FullSpellDisplay
