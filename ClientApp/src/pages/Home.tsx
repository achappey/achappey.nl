import React from 'react';
import { IPersonaSharedProps, Persona, PersonaPresence, PersonaSize, Shimmer, Stack, StackItem } from '@fluentui/react';
import { useMediaQuery } from 'usehooks-ts';
import { useLanguages } from '../hooks/useLanguages';
import { LanguageFlag } from '../components/LanguageFlag';
import { Activities } from '../components/Activities';
import { useTranslation } from 'react-i18next';


export const Home: React.FunctionComponent = () => {
  const matches = useMediaQuery('(min-width: 768px)')
  const languages = useLanguages();
  const { t } = useTranslation();
  
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
              {t("PrimaryDescription")}
            </p>
            <p>
              {t("SecondaryDescription")}
            </p>
          </StackItem>
          <StackItem>
            <Activities />
          </StackItem>
        </Stack>
      </StackItem>
      <StackItem>
        <Stack>{flags ? flags : <Shimmer width={50} />}</Stack>
      </StackItem>
    </Stack>
  );

}
