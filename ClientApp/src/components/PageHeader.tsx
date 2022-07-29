import { FunctionComponent } from 'react';
import { Button, makeStyles } from '@fluentui/react-components';
import { IosArrowLtr24Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between"
  },
  backButton: {
    paddingRight: "8px",
    '@media(min-width: 768px)': {
      paddingRight: "16px"
    },
  }
})


interface IPageHeader {
  title: string
}

export const PageHeader: FunctionComponent<IPageHeader> = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()

  return <div className={classes.header}>
      <div>
        <h2>
          {props.title}
        </h2>

      </div>
      <div className={classes.backButton}>
        <Button onClick={() => navigate('/')} icon={<IosArrowLtr24Regular />} />
      </div>
    </div>
}
