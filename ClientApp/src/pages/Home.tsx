import { FunctionComponent } from 'react';
import { makeStyles, Avatar } from '@fluentui/react-components';
import { Activities } from '../cards/Activities';
import { useTranslation } from 'react-i18next';
import { Albums } from '../cards/Albums';
import { ItemCard } from '../components/ItemCard';
import { Languages } from '../cards/Languages';
import { Socials } from '../cards/Socials';
import { me } from '../config/profile';
import { useProfiles } from '../hooks/useProfiles';
import { Duolingo, Lastfm } from '../config/types';

const useStyles = makeStyles({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gridAutoRows: "minmax(100px, auto)",
    '@media(min-width: 768px)': {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  avatar: {
    width: '60px',
    height: '60px'
  }
})

export const Home: FunctionComponent = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const profiles = useProfiles()
  const lastfmProfile = profiles?.find(a => a.network === Lastfm);
  const duolingoProfile = profiles?.find(a => a.network === Duolingo);

  const avatar = <Avatar name="Arthur Bleij"
    size={56}
    className={classes.avatar}
    image={{ src: me.image }}
    badge={{ status: 'busy' }}
  />

  const myDescription = <div>
    <div>
      {me.jobTitle}
    </div>
    <div>
      {me.specialties}
    </div>
  </div>

  return <div className={classes.wrapper}>
    <div>
      <ItemCard title={me.name} image={avatar}
        description={myDescription}>
        <div>
          <p>
            {t("PrimaryDescription")}
          </p>

          {t("SecondaryDescription")}
        </div>
      </ItemCard>

      <Activities />
    </div>
    <div>
      <Socials profiles={profiles} />
      <Languages profile={duolingoProfile} />
      <Albums profile={lastfmProfile} />
    </div>
  </div>
}
