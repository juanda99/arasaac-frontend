<div align="center">
  <img width=200 src="https://static.arasaac.org/images/arasaac-logo.png" alt="Arasaac logo" align="center" />
</div>
<br />

<div align="center"><h1>Arasaac project</h1></div>

<br />
<div align="center">
  <!-- Localization -->
  <a target="_blank" href="https://crowdin.com/project/arasaac"><img src="https://d322cqt584bo4o.cloudfront.net/arasaac/localized.svg"></a>
  <br/>
    <a target="_blank" href="https://arasaac.org/translators">Show project translation to your language</a>

</div>
<br />

<div align="center">
  <sub>Made with ❤︎ by <a href="https://twitter.com/juandawrite">juanda</a> and <a href="https://github.com/juanda99/arasaac-frontend/graphs/contributors">contributors</a></sub>
</div>


## What is Arasaac

[See website](https://arasaac.org)

Arasaac is a project that offers AAC symbols and resources to facilitate communication for those with some sort of problem in this area. 

It's used  worldwide by thousands of users. 


## Quick start
1. Install requirements:

  ```bash
  apt install libpng-dev apt install python-minimal
  ```

1. Clone this repo using `git clone https://github.com/juanda99/arasaac-frontend.git`
2. Run `npm install` to install dependencies<br />
3. Run `npm start` to see the app running at `http://localhost:3000`.*
  
  Our backend server is dockerized, you can install it locally: see [how to instal the backend server](https://github.com/juanda99/arasaac-docker) 

## Features and current status

- Pictograms
  - Search pictograms
  - Pictogram editor
  - Favorites

- Materials
  - Search materials
  - Material view
  - Upload materials (WIP)

- Learn AAC

- Online tools (WIP)

- Spanish Sign Language

- Developers
  - API docs

- Users
  - User login
  - User profile

- Terms of use
  
- About  us

## Technical summary
<dl>
<dt>React SPA based on <a href="https://github.com/mxstbr/react-boilerplate">React boilerplate</a></dt>
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


## Backend
Based on node.js and MongoDB, using Doocker and microservices.
[Show backend repo](https://github.com/juanda99/arasaac-docker)
## License

This project is licensed under the MIT license, Copyright (c) 2016 . For more information see `LICENSE.md`.

## Supporters
<img src="https://static.arasaac.org/images/logoAragon.jpg" alt="Gobierno de Aragón" align="left" />
<img src="https://static.arasaac.org/images/logo_fse.jpg" alt="European Union" align="right" />


