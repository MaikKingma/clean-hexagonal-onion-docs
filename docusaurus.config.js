// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Clean Hexagonal Onion with a Dash of DDD in Spring',
  tagline: 'Javaland Workshop Day - 23.03.2023',
  url: 'https://www.the-experts.nl',
  baseUrl: '/clean-hexagonal-onion-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'the/experts', // Usually your GitHub org/user name.
  projectName: 'clean-hexagonal-onion-service', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/MaikKingma/clean-hexagonal-onion-docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true
    },
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    navbar: {
      title: 'Javaland Workshop',
      hideOnScroll: true,
      logo: {
        alt: 'the/experts.',
        src: 'img/theexperts_ZwartOranje.png',
        srcDark: 'img/theexperts_WitOranje.png',
        width: 130,
        height: 32,
      },
      items: [
        {
          href: 'https://github.com/MaikKingma/clean-hexagonal-onion-service',
          target: '_blank',
          label: 'GitHub',
          position: 'right',
        },
        // {
        //   href: 'https://docs.google.com/presentation/d/1xoGRcQx9E_19msC_-rYQdrEVwVN0L30fNDiupI4bcBY/edit?usp=sharing',
        //   target: '_blank',
        //   label: 'Slides',
        //   position: 'right',
        // },
        {
          type: 'dropdown',
          label: 'About',
          position: 'right',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/maik-kingma/',
              target: '_blank',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/maikkingma',
              target: '_blank',
            },
            {
              label: 'Blog',
              href: 'https://blog.the-experts.nl/maikkingma',
              target: '_blank',
            },
            {
              label: 'Company',
              href: 'https://www.the-experts.nl',
              target: '_blank',
            }
          ],
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Maik Kingma, the/experts.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/github'),
      additionalLanguages: ['java', 'graphql'],
      defaultLanguage: 'java',
    },
  },
};

module.exports = config;
