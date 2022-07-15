import React from 'react';
import { ActivityItem, Icon, IPersonaSharedProps, Persona, PersonaPresence, PersonaSize, Shimmer, ShimmerElementsGroup, ShimmerElementType, Stack, StackItem } from '@fluentui/react';
import { useMediaQuery } from 'usehooks-ts';
import { useLanguages } from '../hooks/useLanguages';
import { LanguageFlag } from '../components/LanguageFlag';
import ReactTimeAgo from 'react-time-ago';
import { useActivities } from '../hooks/useActivities';

const sourceToIcon = (source: string) => {
  switch (source) {
    case "GITHUB":
      return "ProductRelease";
    case "DUOLINGO":
      return "Education";
    case "WAKATIME":
      return "Code";
    default:
      return "";
  }
}

export const Home: React.FunctionComponent = () => {
  const matches = useMediaQuery('(min-width: 768px)')
  const languages = useLanguages();
  const activities = useActivities();

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

  const activity = activities?.slice(0, 25).map((a: any) => {
    const activityDescription = [
      <span key={a.id}> {a.title} </span>
    ];

    return <StackItem key={a.id}>
      <ActivityItem activityDescription={activityDescription}
        timeStamp={<ReactTimeAgo date={a.createdAt} />}
        activityIcon={<Icon iconName={sourceToIcon(a.source)} />} />
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
            <p>
              Freelance, entrepreneurial, full stack developer. Avid follower of technology and passionate about code. Specialize in developing modern, responsive, cloud-based web applications.
            </p>
            <p>
              Skilled and experienced on a broad range of frameworks and stacks. Strong focus on delivering seamless integrated solutions and always try to leverage the used platforms and frameworks to the maximum.
            </p>
          </StackItem>
          <StackItem>
            <h4>Activity</h4>
            <Stack>{activity ? activity : <Shimmer width={150} />}</Stack>
          </StackItem>
        </Stack>
      </StackItem>
      <StackItem>
        <Stack>{flags ? flags : <Shimmer width={50} />}</Stack>
      </StackItem>
    </Stack>
  );

}
