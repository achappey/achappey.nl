import { FunctionComponent } from 'react';
import { Button, makeStyles, Tooltip } from '@fluentui/react-components';
import { IosArrowLtr24Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  backButton: {
    paddingRight: "16px"
  }
})

interface IPageHeader {
  title: string
}

export const PageHeader: FunctionComponent<IPageHeader> = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return <div className={classes.header}>
    <div className={classes.backButton}>
      <Tooltip content={t("Back")}
        relationship="label">
        <Button onClick={() => navigate('/')}
          icon={<IosArrowLtr24Regular />}
        />
      </Tooltip>
    </div>
    <div>
      <h2>
        {props.title}
      </h2>
    </div>
  </div>
}
