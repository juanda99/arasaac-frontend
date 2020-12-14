<div align="center">
  <img width=200 src="https://static.arasaac.org/images/arasaac-logo.png" alt="Arasaac logo" align="center" />
</div>
<br />

<div align="center"><strong>Arasaac beta website</strong></div>

<br />
<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/juanda99/arasaac-frontend">
    <img src="https://david-dm.org/juanda99/arasaac-frontend.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/juanda99/arasaac-frontend#info=devDependencies">
    <img src="https://david-dm.org/juanda99/arasaac-frontend/dev-status.svg" alt="devDependency Status" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/juanda99/arasaac-frontend">
    <img src="https://travis-ci.org/juanda99/arasaac-frontend.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
    <a href='https://coveralls.io/github/juanda99/arasaac-frontend?branch=master'><img src='https://coveralls.io/repos/github/juanda99/arasaac-frontend/badge.svg?branch=master' alt='Coverage Status' /></a>
  <!-- Localization -->
  <a target="_blank" href="https://crowdin.com/project/arasaac"><img src="https://d322cqt584bo4o.cloudfront.net/arasaac/localized.svg"></a>

</div>

<br />

<div align="center">
  <sub>Made with ❤︎ by <a href="https://twitter.com/juandawrite">juanda</a> and <a href="https://github.com/juanda99/arasaac-frontend/graphs/contributors">contributors</a></sub>
</div>


## What is Arasaac
Arasaac is a website that offers AAC symbols and resources to facilitate communication for those with some sort of problem in this area. [See current website](http://www.arasaac.org)

It's used  worldwide and everyday by thousands of users.[See website](https://arasaac.org)


## Quick start
1. Install requirements:

  ```bash
  apt install libpng-dev apt install python-minimal
  ```

1. Clone this repo using `git clone https://github.com/juanda99/arasaac-frontend.git`
2. Run `npm install` to install dependencies<br />
3. Run `npm start` to see the app running at `http://localhost:3000`.*
4. This app uses some backend points:
  - *static.arasaac.org* for getting static data files (pictogram images, materials)
  - *api.arasaac.org* for getting json data from the server
  - *privateapi.arasaac.org* for getting json data from the server
  - *auth.arasaac.org* for oauth2 authentication
  
  Our backend server is dockerized, you can install it locally: see [how to instal the backend server](https://github.com/juanda99/arasaac-docker) 

## Features and current status

- Pictograms
  - Search pictograms (Almost ready)
  - Download full catalog of pictos (Almost ready)

- Online Tools (Not started)

- Developers
  - API doc (WIP)

- Materials
  - Search materials (Almost ready)
  - Material view (Almost ready)
  - Upload materials (WIP)

- Users
  - User creation and login (Almost ready)
  - User roles (Not started)
  - Social logins (WIP)

- GUI Look and feel
  - Themes (Almost ready)
  - Tour guide (WIP)
  - General settings (WIP)

- [Translations](docs/translations.md) (WIP)



## Technical summary
<dl>
<dt>Boilerplate based on <a href="https://github.com/mxstbr/react-boilerplate">React boilerplate</a></dt>
  <dd>Using React, Redux, Immutable.js, Sagas and Reselect</dd>

  <dt>API with nodeJS and Express on the server side</dt>
  <dd>Swagger API framework for docs and MongoDB as database</dd>

  <dt>Presentation</dt>
  <dd>Material-ui</dd>

  <dt>Data</dt>
  <dd>MongoDB</dd>

  <dt>Crowdin</dt>
  <dd>For all the translations workflow</dd>

  <dt>Authentication</dt>
  <dd>JWT, user/password and social logins</dd>

</dl>

## License

This project is licensed under the MIT license, Copyright (c) 2016 . For more information see `LICENSE.md`.

## Supporters
<img src="http://arasaac.org/images/logoAragon.jpg" alt="Gobierno de Aragón" align="left" />
<img src="http://arasaac.org/images/logo_fse.jpg" alt="European Union" align="right" />


