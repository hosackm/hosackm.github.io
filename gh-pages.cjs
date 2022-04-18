var pages = require("gh-pages");

pages.publish(
  'build',
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