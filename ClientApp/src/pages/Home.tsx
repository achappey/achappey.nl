import { FunctionComponent } from 'react';
import { IPersonaSharedProps, mergeStyleSets, Persona, PersonaPresence, PersonaSize, Shimmer, Stack, StackItem, VerticalDivider } from '@fluentui/react';
import { useMediaQuery } from 'usehooks-ts';
import { useLanguages } from '../hooks/useLanguages';
import { LanguageFlag } from '../components/LanguageFlag';
import { Activities } from '../components/Activities';
import { useTranslation } from 'react-i18next';
import { Albums } from '../components/Albums';

const styles = mergeStyleSets({
  flags: {
    minWidth: 50,
    paddingBottom: 8
  },
  card: {
    paddingRight: 16,
    paddingBottom: 16
  },
  hero: {
    fontSize: "larger"
  }
})


export const Home: FunctionComponent = () => {
  const largeScreen = useMediaQuery('(min-width: 768px)')
  const languages = useLanguages();
  const { t } = useTranslation();

  const size: PersonaSize = largeScreen ? PersonaSize.size72 : PersonaSize.size56;

  const me: IPersonaSharedProps = {
    imageUrl: "/assets/images/achappey.jpg",
    imageInitials: 'AB',
    text: 'Arthur Bleij',
    secondaryText: 'Full Stack Developer',
    tertiaryText: 'Azure, C#, React, Angular, Microsoft 365, Power Platform',
  };

  const flags = languages?.map(a => <StackItem key={a.code} className={styles.flags}>
    <LanguageFlag name={a.name} code={a.code} />
  </StackItem>);


  return (
    <Stack horizontal={true}>
      <StackItem grow={1}>
        <Stack>
          <StackItem>
            <Persona
              {...me}
              size={size}
              presence={PersonaPresence.busy}
              hidePersonaDetails={false}
              imageAlt="Arthur Bleij"
            />
          </StackItem>
          <StackItem className={styles.card}>
            <p className={styles.hero}>
              {t("PrimaryDescription")}
            </p>
            <p className={styles.hero}>
              {t("SecondaryDescription")}
            </p>
          </StackItem>
          <StackItem>
            <Stack horizontal={true}>
              <StackItem className={styles.card}>
                <Activities />
              </StackItem>
              {largeScreen &&
                <StackItem className={styles.card} >
                  <Albums />
                </StackItem>}
            </Stack>
          </StackItem>

          {!largeScreen &&
            <StackItem className={styles.card} >
              <Albums />
            </StackItem>}
        </Stack>
      </StackItem>
      <StackItem>
        <Stack>{flags ? flags : <Shimmer width={50} />}</Stack>
      </StackItem>
    </Stack>
  );

}
