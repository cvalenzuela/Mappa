const users = [{
  caption: 'User1',
  image: '/test-site/img/docusaurus.svg',
  infoLink: 'https://www.facebook.com',
  pinned: true,
}];

const siteConfig = {
  title: 'Mappa.js',
  tagline: 'A canvas wrapper for Maps ',
  url: 'https://cvalenzuela.github.io',
  baseUrl: '/Mappa/',
  projectName: 'Mappa',
  headerLinks: [
    { doc: 'getting-started', label: 'Getting Started' },
    { doc: 'api-mappa', label: 'API Reference' },
    { doc: 'examples-google-maps', label: 'Examples' },
    { doc: 'introduction-to-web-maps', label: 'Tutorials' },
    { href: 'https://github.com/cvalenzuela/Mappa', label: 'Star' },
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/logo.png',
  footerIcon: 'img/logo.png',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#48b19b',
    secondaryColor: '#2e404e',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: '',
  organizationName: 'cvalenzuela',
  highlight: {
    theme: 'dracula',
  },
  scripts: [
    '/Mappa/js/stars.js',
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/addons/p5.dom.min.js',
    '/Mappa/js/mappa.min.js',
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/cvalenzuela/Mappa',
};

module.exports = siteConfig;
