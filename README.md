# webpack-template

Initial code base for an internally used Webpack project template.

## Features
 
- CSS
  - PostCSS
    - autoprefixer
    - cssnano
    - postcss-preset-env
  - SCSS
  - stylelint
- HTML
  - Pug templating
- JavaScript
  - Babel 7
  - ESlint
  - Flow
  - prettier
- Webpack 4
  - production/development builds
  - source maps everywhere
  - webpack-serve
- yarn
  - actually currently required for terser

Code splitting is mostly ignored.

I'm open for suggestions.

## To be addressed

- evaluating the template in practice
- tuning linting rules
- testing
  - Jest?
  - unit testing
  - coverage
  - E2E
- commitlint
- CONTRIBUTING.md
- allow most pieces to be included from an external repository 
  - externalize configuration presets where possible (eslint, ...)
- releases
  - consider ideas from webpack-defaults
- CI
  - Travis?
- project generation
