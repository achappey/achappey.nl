import { FunctionComponent } from 'react';
import { Image } from '@fluentui/react-components';
import { ISocialProfile } from '../config/types';
import { useTheme } from '../hooks/useTheme';

interface ISocialLogo extends ISocialProfile {
  width?: number
  height?: number
}

export const SocialLogo: FunctionComponent<ISocialLogo> = (props) => {
  const { darkTheme } = useTheme()
  const logo = darkTheme && props.darkLogo ? props.darkLogo : props.logo

  return <Image src={logo}
    width={props.width}
    height={props.height}
  />
}
