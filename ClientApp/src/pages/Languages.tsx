import { FunctionComponent } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useLanguages } from '../hooks/useLanguages';
import { Language } from '../cards/Language';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';

const useStyles = makeStyles({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridAutoRows: "minmax(100px, auto)",
    '@media(min-width: 600px)': {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    '@media(min-width: 768px)': {
      gridTemplateColumns: "repeat(5, 1fr)",
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
      {languageItems}
    </div>
  </>
}
