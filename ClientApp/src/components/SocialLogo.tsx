import { FunctionComponent } from 'react';
import { Image } from '@fluentui/react-components';
import { IProfile } from '../config/types';
import { useTheme } from '../hooks/useTheme';

interface ISocialLogo extends IProfile {
  width?: number
  height?: number
}

const profileToLogo = (profile: any) => {
  switch (profile.source) {
    case "DUOLINGO":
      return {
        logo: "/assets/images/Duolingo.svg"
      }
    case "LINKEDIN":
      return {
        logo: "/assets/images/LinkedIn.png"
      }
    case "TWITTER":
      return {
        logo: "/assets/images/Twitter.png"
      }
    case "LASTFM":
      return {
        logo: "/assets/images/Lastfm.png"
      }
    case "WAKATIME":
      return {
        logo: "/assets/images/WakaTime.png"
      }
    case "GITHUB":
      return {
        logo: "/assets/images/GitHub.png",
        darkLogo: "/assets/images/GitHub-dark.png"
      }

    default:
      return undefined
  }
}

export const SocialLogo: FunctionComponent<ISocialLogo> = (props) => {
  const { darkTheme } = useTheme()
  const profileLogo = profileToLogo(props);
  const logo = darkTheme && profileLogo?.darkLogo ? profileLogo.darkLogo : profileLogo?.logo ? profileLogo.logo : undefined;

  return <>
    {logo ?
      <Image src={logo}
        width={props.width}
        height={props.height}
      /> : props.source}
  </>
}
