import { makeStyles, type Theme } from '@material-ui/core/styles'

export const styles = (_theme: Theme) => ({
  tabs: {
    flex: 1,
  },
  title: {},
})

export const useHeaderStyles = makeStyles(styles)
