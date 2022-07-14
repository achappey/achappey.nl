import React from 'react';
import { Link, IPersonaSharedProps, Persona, PersonaPresence, PersonaSize } from '@fluentui/react';

export const Home: React.FunctionComponent = () => {
  const examplePersona: IPersonaSharedProps = {
    imageUrl: "https://achappey.nl/achappey.jpg",
    imageInitials: 'AB',
    text: 'Arthur Bleij',
    secondaryText: 'Full Stack Developer',
    tertiaryText: 'Azure, C#, React, Angular, Microsoft 365, Power Platform',
  };
  
  return (
    <div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size72}
        presence={PersonaPresence.busy}
        hidePersonaDetails={false}
        imageAlt="Arthur Bleij"
      />
          <p>Freelance, entrepreneurial, full stack developer. Avid follower of technology and passionate about code. Specialize in developing modern, responsive, cloud-based web applications.
          </p>
          <p>
            Skilled and experienced on a broad range of frameworks and stacks. Strong focus on delivering seamless integrated solutions and always try to leverage the used platforms and frameworks to the maximum.
          </p>
      <ul>
        <li>
          <li><Link href={"https://linkedin.com/achappey"} target={"_blank"}>LinkedIn</Link></li>
          <li><Link href={"https://twitter.com/achappey"} target={"_blank"}>Twitter</Link></li>
          <li><Link href={"https://github.com/achappey"} target={"_blank"}>GitHub</Link></li>
        </li>
      </ul>
    </div>
  );

}
