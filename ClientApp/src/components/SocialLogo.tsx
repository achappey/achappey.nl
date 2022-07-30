import { FunctionComponent } from 'react';
import { Image } from '@fluentui/react-components';
import { useTheme } from '../hooks/useTheme';
import { Duolingo, GitHub, Lastfm, LinkedIn, Twitter, WakaTime } from '../config/types';

interface ISocialLogo {
  width?: number
  height?: number
  network: string
}

const profileToLogo = (profile: any) => {
  switch (profile.network) {
    case Duolingo:
      return {
        logo: "/assets/images/Duolingo.svg"
      }
    case LinkedIn:
      return {
        logo: "/assets/images/LinkedIn.png"
      }
    case Twitter:
      return {
        logo: "/assets/images/Twitter.png"
      }
    case Lastfm:
      return {
        logo: "/assets/images/Lastfm.png"
      }
    case WakaTime:
      return {
        logo: "/assets/images/WakaTime.png"
      }
    case GitHub:
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
      /> : props.network}
  </>
}
