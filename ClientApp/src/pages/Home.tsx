import React from 'react';
import { ActivityItem, Icon, IPersonaSharedProps, Persona, PersonaPresence, PersonaSize, Stack, StackItem } from '@fluentui/react';
import { useMediaQuery } from 'usehooks-ts';
import { useLanguages } from '../hooks/useLanguages';
import { LanguageFlag } from '../components/LanguageFlag';
import ReactTimeAgo from 'react-time-ago';

export const Home: React.FunctionComponent = () => {
  const matches = useMediaQuery('(min-width: 768px)')
  const { languages, activeLanguage } = useLanguages();

  const size: PersonaSize = matches ? PersonaSize.size72 : PersonaSize.size56;

  const examplePersona: IPersonaSharedProps = {
    imageUrl: "/assets/images/achappey.jpg",
    imageInitials: 'AB',
    text: 'Arthur Bleij',
    secondaryText: 'Full Stack Developer',
    tertiaryText: 'Azure, C#, React, Angular, Microsoft 365, Power Platform',
  };

  const flags = languages?.map(a => <StackItem key={a.code}
    style={{ minWidth: 50, paddingBottom: 8 }}>
    <LanguageFlag name={a.name} code={a.code} />
  </StackItem>);

  activeLanguage?.calendar?.sort((a: any, b: any) => {
    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
  });

  const activity = activeLanguage?.calendar?.slice(0, 20).map((a: any) => {
    const skill = activeLanguage?.skills?.find((z: any) => z.id == a.skill);
    const activityDescription = [
      <span key={a.dateTime}> {`${activeLanguage?.language} ${a.eventType}: ${skill.name}`} </span>
    ];

    return <StackItem key={a.dateTime}>
      <ActivityItem activityDescription={activityDescription}
        timeStamp={<ReactTimeAgo date={a.dateTime} />}
        activityIcon={<Icon iconName={'Education'} />} />
    </StackItem>
  });

  return (
    <Stack horizontal={true}>
      <StackItem grow={1}>
        <Stack>
          <StackItem>
            <Persona
              {...examplePersona}
              size={size}
              presence={PersonaPresence.busy}
              hidePersonaDetails={false}
              imageAlt="Arthur Bleij"
            />
          </StackItem>
          <StackItem>
            <p>Freelance, entrepreneurial, full stack developer. Avid follower of technology and passionate about code. Specialize in developing modern, responsive, cloud-based web applications.
            </p>
            <p>
              Skilled and experienced on a broad range of frameworks and stacks. Strong focus on delivering seamless integrated solutions and always try to leverage the used platforms and frameworks to the maximum.
            </p>
          </StackItem>
          <StackItem>
            <h4>Activity</h4>
            <Stack>{activity}</Stack>
          </StackItem>
        </Stack>
      </StackItem>
      <StackItem>
        <Stack>{flags}</Stack>
      </StackItem>
    </Stack>
  );

}
