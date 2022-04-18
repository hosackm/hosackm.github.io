var pages = require("gh-pages");

pages.publish(
  'public', // path to public directory
  {
    branch: 'gh-pages',
    repo: 'https://github.com/hosackm/hosackm.github.io.git',
    user: {
      name: 'Matt Hosack',
      email: 'hosack.matt@gmail.com'
    },
    dotfiles: true
  },
  () => {
    console.log('Deploy Complete!');
  }
);