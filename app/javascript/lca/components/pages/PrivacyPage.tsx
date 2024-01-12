import Typography from '@mui/material/Typography'

import BlockPaper from 'components/shared/BlockPaper'

const PrivacyPage = () => (
  <BlockPaper>
    <Typography variant="h5" gutterBottom>
      Privacy Policy and Legal Mumbo-Jumbo
    </Typography>

    <Typography variant="subtitle1">Information collection and use</Typography>
    <Typography paragraph>
      Let&apos;s cut straight to the chase: Lot-Casting Atemi saves your email
      address when you use the &apos;log in with Google&apos; link. It&apos;s
      needed for the login function to work. No other personal information is
      stored or collected. Addresses are not sent to other players.
    </Typography>
    <Typography paragraph>
      I will never use your email address for anything other than
      authentication. Period. Your personal information will never be sold or
      otherwise transferred to anyone else, except in the case where LCA changes
      hosting providers (and then only as needed to facilitate that transfer),
      or when compelled to by a court order or something.
    </Typography>

    <Typography variant="subtitle1">Cookies</Typography>
    <Typography paragraph>
      Lot-Casting Atemi uses Cookies and similar techniques to help the site
      work better. If you have Cookies disabled, portions of the site might not
      work.
    </Typography>

    <Typography variant="subtitle1">Service Providers</Typography>
    <Typography
      paragraph
      component="a"
      href="https://www.heroku.com/policy/security"
    >
      This data is stored on Heroku database servers. Heroku has its own set of
      security and privacy policies that apply to it.
    </Typography>

    <Typography variant="subtitle1">Links to Other Sites</Typography>
    <Typography paragraph>
      There are a few links to other sites in the app. Those other sites are not
      operated by me and have their own privacy policies and so on
    </Typography>

    <Typography variant="subtitle1">Changes to this Policy</Typography>
    <Typography paragraph>
      This privacy policy might update from time to time, so if you&apos;re
      concerned by these sorts of things you can periodically check this page
      for any changes.
    </Typography>

    <Typography paragraph>
      Lot-Casting Atemi is a passion project, provided to the public for free.
      It comes with no warranty or guarantee or anything.
    </Typography>

    <Typography paragraph>
      Exalted is owned by White Wolf Publishing AB and published by Onyx Path.
    </Typography>
  </BlockPaper>
)

export default PrivacyPage
