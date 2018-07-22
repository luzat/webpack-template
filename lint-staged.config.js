module.exports = {
  '*.{js,jsx,mjs}': ['eslint --ext .js,.jsx,.mjs'],
  '*.{graphql,json,md}': ['prettier --list-different'],
  '*.{css,scss}': ['prettier --list-different', 'stylelint --cache'],
}
