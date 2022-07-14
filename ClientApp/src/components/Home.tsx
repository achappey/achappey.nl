import React from 'react';
import { IPersonaSharedProps, Persona, PersonaPresence, PersonaSize, Stack, StackItem } from '@fluentui/react';
import { useMediaQuery } from 'usehooks-ts';
import { useLanguages } from '../hooks/useLanguages';
import { LanguageFlag } from './LanguageFlag';

export const Home: React.FunctionComponent = () => {
  const matches = useMediaQuery('(min-width: 768px)')
  const { languages } = useLanguages();

  const size: PersonaSize = matches ? PersonaSize.size72 : PersonaSize.size56;

  const examplePersona: IPersonaSharedProps = {
    imageUrl: "https://achappey.nl/achappey.jpg",
    imageInitials: 'AB',
    text: 'Arthur Bleij',
    secondaryText: 'Full Stack Developer',
    tertiaryText: 'Azure, C#, React, Angular, Microsoft 365, Power Platform',
  };

  const flags = languages?.map(a => <StackItem key={a.code}
    style={{ minWidth: 50, paddingBottom: 8 }}>
    <LanguageFlag name={a.name} code={a.code} />
  </StackItem>);

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
        </Stack>
      </StackItem>
      <StackItem>
        <Stack>{flags}</Stack>
      </StackItem>
    </Stack>
  );

}
