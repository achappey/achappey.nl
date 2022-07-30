import { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Profile } from '../cards/Profile';
import { useProfiles } from '../hooks/useProfiles';

const useStyles = makeStyles({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gridAutoRows: "minmax(100px, auto)",
    '@media(min-width: 600px)': {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    '@media(min-width: 768px)': {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
})

export const Profiles: FunctionComponent = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const profiles = useProfiles()

  const profileItems = profiles?.map(y => <Profile key={y.source} {...y} />)

return <>
    <PageHeader title={t('Networks')} />

    <div className={classes.wrapper}>
      {profileItems}
    </div>
  </>
}
