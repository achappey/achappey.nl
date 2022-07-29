import { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useLanguages } from '../hooks/useLanguages';
import { Language } from '../cards/Language';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
import { LanguageActivities } from '../cards/LanguageActivities';

const useStyles = makeStyles({
  languageWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridAutoRows: "minmax(100px, auto)",
    '@media(min-width: 600px)': {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    '@media(min-width: 768px)': {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  languages: {
    flexBasis: "100%",
    '@media(min-width: 768px)': {
      flexBasis: "80%",
    },
  },
  activity: {
    flexBasis: "100%",
    '@media(min-width: 768px)': {
      flexBasis: "20%",
    },

  }
})

export const Languages: FunctionComponent = () => {
  const classes = useStyles()
  const languages = useLanguages()
  const { t } = useTranslation()

  const languageItems = languages?.map(y => <Language {...y} />)

  return <>
    <PageHeader title={t('Languages')} />

    <div className={classes.wrapper}>
      <div className={classes.languages}>
        <div className={classes.languageWrapper}>
          {languageItems}
        </div>
      </div>
      <div className={classes.activity}>
        <LanguageActivities />
      </div>
    </div>
  </>
}
