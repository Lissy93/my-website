<h1 align="center">✨ Devolio</h1>
<p align="center">
  <i>An aggregated portfolio and blog site for developers</i><br>
  <b>Demo: <a href="https://devolio.as93.net/">devolio.as93.net</a></b>
</p>
<p align="center">
  <a href="https://devolio.netlify.app">
    <img width="600" src="https://i.ibb.co/jbzfSzs/Screenshot-from-2023-02-20-16-59-37.png" />
  </a>
</p>

<details>
<summary><b>Contents</b></summary>

<!-- TOC start -->

- [**About**](#about)
  - [Intro](#intro)
  - [Pages](#pages)
    - [Portfolio](#portfolio)
    - [Blog](#blog)
    - [Contact](#contact)
    - [About](#about-1)
  - [Quality Gates](#quality-gates)
  - [Tech Stack](#tech-stack)
- [**Getting Started**](#getting-started)
  - [Developing](#developing)
  - [Deploying](#deploying)
  - [Configuring](#configuring)
    - [Basic Data](#basic-data)
    - [Secrets](#secrets)
    - [Styles](#styles)
    - [Languages](#languages)
    - [More](#more)
- [**Community**](#community)
  - [Report an Issue](#report-an-issue)
  - [Contributing](#contributing)
  - [Support](#support)
  - [Credits](#credits)
- [**License**](#license)
<!-- TOC end -->

</details>

<sub>A tutorial, for to this project is available on **[DEV.to](https://dev.to/lissy93/sveltekit-10-build-an-blog-fetching-posts-from-your-dev-profile-29f)**</sub>

<sup>A mirror is available at **[codeberg.org/alicia/devolio](https://codeberg.org/alicia/devolio)**</sup>

## About

### Intro

Devolio is a self-hosted developer homepage, where you can showcase your projects, blog posts, coding stats and more.<br>
Data fetched from existing sources (GitHub, RSS, Dev.to etc), so there's no backend to manage.<br>
It's easy to make it your own, with custom styles and a simple config file.<br>

### Pages

The app is split into several pages: [Portfolio](#portfolio) | [Blog](#blog) | [Contact](#contact) | [About](#about-1)

#### Portfolio

The portfolio page displays the projects you've built. Data is fetched from your GitHub profile.

Each project can include: name, description, thumbnail, language, star/fork/issue count, license, size, date create/updated and links to the repo and project website. Featured projects can be made to span multiple cells, in order to display more info. When a thumbnail is present, the user can hover over the card to view full details.

You can add or override any project data in the config file, as well as manually add more projects.

<p align="center">
  <img width="800" src="https://i.ibb.co/nmwLZTr/projects-page.gif" />
</p>

#### Blog

The blog page displays posts that you've published. Data is fetched and aggregated from one or more RSS feeds defined in the config. Post content is rendered as HTML, as well as metadata including author, date, link to original and optional thumbnail.

Start typing to filter results, and use the keyboard to navigate posts.

There's also the option to include secondary feeds, which can be toggled by the user using the dropdown menu. This may be useful for including less important updates, without them cluttering up your main feed.

<p align="center">
<img width="800" src="https://i.ibb.co/XVC9YZy/blog-page-gif.gif" />
</p>
  
#### Contact
The contact page includes links to social profiles, a contact form, and space for GPG keys.

Hover over the social media links, to show relevant user stats, like follower count, karma/ rep, join date and more.

The contact form let's users write you a message, and include their name + mail address. Upon sending, the message will be emailed to you, using [EmailJS](https://emailjs.com).

There's also space for including PGP key, and links to encrypted messenger apps.

<p align="center">
  <img width="400" src="https://i.ibb.co/xSvJRbZ/social-previews.gif" />
  <img width="600" src="https://i.ibb.co/Chm3LCD/Screenshot-from-2023-02-12-15-00-01.png?" />
</p>
  
#### About
The about page has space for a short bio, profile image, and work experience.

<p align="center">
<img width="600" src="https://i.ibb.co/mvWCZHq/Screenshot-from-2023-02-12-15-02-20.png??" />
</p>

### Features

### Quality Gates

✅ Localized with multi-language support<br>
✅ Unit tested<br>
✅ Fast load speeds<br>
✅ Server-side rendering for good SEO<br>
✅ Meets accessibility standards<br>
✅ Fully responsive<br>

### Tech Stack

Built with Svelte, using SvelteKit (1.0.0) and written in TypeScript.
The build system is Vite/ Rollup, with dependencies managed with PNPM.
Standards implemented with ESLint and Prettier, with testing done using Vitest and Playwright.
Styles are composed in SCSS with CSS variables for theming.
There's an optional Dockerfile with a Deno web server.

---

## Getting Started

### Developing

```bash
# 1. Clone the repo and cd into it (update username if you've forked)
git clone git@github.com:Lissy93/devolio.git && cd devolio

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm run dev -- --open
```

### Manual Deploy

- Fork the repo, then follow the steps above to clone and install dependencies
- Make any desired changes (see [Configuring](#configuring) below)
- Push changes to your repository
- Enable the build action, to deploy to a service of your choice

You can also build the site yourself `npm run build`, then either run `node build` to start the server, or use an appropriate [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Quick Deploy

Use the 1-click deploy to get up and running in seconds.

[![Depoly Devolio to Netlify](https://img.shields.io/badge/Deploy-Netlify-%2330c8c9?style=for-the-badge&logo=netlify&labelColor=1e0e41 'Deploy Devolio to Netlify, via 1-Click Script')](https://app.netlify.com/start/deploy?repository=https://github.com/lissy93/devolio 'Deploy Devolio to Render, via 1-Click Script')

[![Depoly Devolio to Render](https://img.shields.io/badge/Deploy-Render-%236c83fa?style=for-the-badge&logo=render&labelColor=1e0e41&logoColor=6c83fa)](https://render.com/deploy?repo=https://github.com/lissy93/devolio 'Deploy Devolio to Render, via 1-Click Script')

[![Deploy Devolio to Railway](https://img.shields.io/badge/Deploy-Railway-%23853bce?style=for-the-badge&logo=railway&labelColor=1e0e41&logoColor=853bce)](https://railway.app/new/template/hROvhb 'Deploy Devolio to Railway, via 1-Click Script')

[![Deploy Devolio to Vercel](https://img.shields.io/badge/Deploy-Vercel-%23ffffff?style=for-the-badge&logo=vercel&labelColor=1e0e41)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flissy93%2Fdevolio&env=GITHUB_TOKEN,TWITTER_TOKEN&project-name=devolio&repository-name=devolio_My-Developer-Portfolio 'Deploy Devolio to Vercel, via 1-Click Script')

### Docker Deploy

There's a multi-arch [`Dockerfile`](https://github.com/Lissy93/devolio/blob/master/Dockerfile) published on DockerHub under [`lissy93/devolio`](https://hub.docker.com/r/docker/lissy93/devolio) using [this workflow](https://github.com/Lissy93/devolio/blob/master/.github/workflows/docker-build-publish.yml)

To run the container directly from DockerHub or GHCR, use: `docker run -p 3000:80 lissy93/devolio`

Alternatively, use the [`docker-compose.yml`](https://github.com/Lissy93/devolio/blob/master/docker-compose.yml) as a template, and run `docker compose up`

[![Test on PWD](https://img.shields.io/badge/Try-Play_with_Docker-%232496ED?style=for-the-badge&logo=docker&labelColor=1e0e41)](https://labs.play-with-docker.com/?stack=https://raw.githubusercontent.com/Lissy93/devolio/master/docker-compose.yml 'Deploy Devolio to PWD, via 1-Click Script')

<details>
<summary>Config</summary>

_You can pass in your own [`config.ts`](https://github.com/Lissy93/devolio/blob/master/src/helpers/config.ts) with `-v ./my-config.ts:/app/src/helpers/config.ts`, and rebuild with `docker exec -it [container-id] yarn build` where container ID can be found with `docker ps`)_

</details>

### Configuring

#### Basic Data

All site data is located in [`config.ts`](https://github.com/Lissy93/devolio/blob/master/src/helpers/config.ts). Here you can specify site name, URLs to RSS feeds, GitHub username to fetch projects from, contact details, etc.

#### Secrets

Sensitive data, like API keys are set as environmental variables. These can either be set in the [`.env`](https://github.com/Lissy93/devolio/blob/master/.env) file, or in the admin panel for your hosting provider (e.g. for Netlify: Site settings --> Environmental Variables)

Accepted Values

- `GITHUB_TOKEN` - A scoped API key for fetching repositories, and displaying social stats on the contact page. Optional, but you may experience rate limits if not specified
- `TWITTER_TOKEN` - Bearer token for showing follower count on the contact page.

#### Styles

Style values are managed with CSS variables, for easy configuration. These values are defined in the SCSS files within [`styles/`](https://github.com/Lissy93/devolio/tree/master/src/styles). For more advanced theming, you can edit the content of the `<style>` blocks within individual routes and components.

Variables are split into the following files:

- `color-palette.scss` - Colors
- `dimensions.scss` - Sizes
- `media-queries.scss` - Breakpoints
- `typography.scss` - Fonts

#### Languages

The app is fully translatable, with all hard-coded copy located in [`locales`](#). The users language can be detected automatically based on browser/ OS preference, or manually set using the dropdown in the UI. To add a new language, simply create a new file named by your locale's ISO code, populate the contents (use `en` as a template), then import it in [`app`](#).

Currently, the following languages are supported:

- English (`en-GB`)

#### More

If you'd like to configure anything else, then it should be pretty straight-forward by directly editing the specific routes or components. If you need any help with any of this, feel free to raise an issue :)

---

## Community

### Report an Issue

Found something that's not working? [Open an issue](https://github.com/Lissy93/devolio/issues/new/choose), and describe the problem, steps to reproduce alond with expected and actual output. If relevant, also include details about your environment. I'll try and fix / respond to any tickets within 48-hours.

### Contributing

Contributions of any kind are very welcome, and would be much appreciated.
For Code of Conduct, see [Contributor Convent](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

To get started, fork the repo, make your changes, add, commit and push the code, then come back here to open a pull request. If you're new to GitHub or open source, [this guide](https://www.freecodecamp.org/news/how-to-make-your-first-pull-request-on-github-3#let-s-make-our-first-pull-request-) or the [git docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) may help you get started, but feel free to reach out if you need any support.

[![Submit a PR](https://img.shields.io/badge/Submit_a_PR-GitHub-%23060606?style=for-the-badge&logo=github&logoColor=fff)](https://github.com/Lissy93/devolio/compare)

### Support

[![Sponsor Lissy93 on GitHub](https://img.shields.io/badge/Sponsor_on_GitHub-Lissy93-%23ff4dda?style=for-the-badge&logo=githubsponsors&logoColor=ff4dda)](https://github.com/sponsors/Lissy93)

### Credits

#### Sponsors

<!-- readme: sponsors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/peng1can">
            <img src="https://avatars.githubusercontent.com/u/225854?v=4" width="80;" alt="peng1can"/>
            <br />
            <sub><b>Peng1can</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/emlazzarin">
            <img src="https://avatars.githubusercontent.com/u/1141361?u=714e3487a3f2e0df721b01a0133945f075d3ff68&v=4" width="80;" alt="emlazzarin"/>
            <br />
            <sub><b>Eddy Lazzarin</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/AnandChowdhary">
            <img src="https://avatars.githubusercontent.com/u/2841780?u=ca8e292b15abcc6cddaeae0abded0115c51b4789&v=4" width="80;" alt="AnandChowdhary"/>
            <br />
            <sub><b>Anand Chowdhary</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/davidpaulyoung">
            <img src="https://avatars.githubusercontent.com/u/3418369?v=4" width="80;" alt="davidpaulyoung"/>
            <br />
            <sub><b>David Young</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/k-rol">
            <img src="https://avatars.githubusercontent.com/u/4050412?u=1162510eec7b7aeb31d4c7c65d51d4f773d823b0&v=4" width="80;" alt="k-rol"/>
            <br />
            <sub><b>Carol Ouellet</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/bile0026">
            <img src="https://avatars.githubusercontent.com/u/5022496?u=aec96ad173c0ea9baaba93807efa8a848af6595c&v=4" width="80;" alt="bile0026"/>
            <br />
            <sub><b>Zach Biles</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/UlisesGascon">
            <img src="https://avatars.githubusercontent.com/u/5110813?u=3c41facd8aa26154b9451de237c34b0f78d672a5&v=4" width="80;" alt="UlisesGascon"/>
            <br />
            <sub><b>Ulises Gascón</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/bmcgonag">
            <img src="https://avatars.githubusercontent.com/u/7346620?u=2a0f9284f3e12ac1cc15288c254d1ec68a5081e8&v=4" width="80;" alt="bmcgonag"/>
            <br />
            <sub><b>Brian McGonagill</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/vlad-timofeev">
            <img src="https://avatars.githubusercontent.com/u/11474041?v=4" width="80;" alt="vlad-timofeev"/>
            <br />
            <sub><b>Vlad Timofeev</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/iJasonWade">
            <img src="https://avatars.githubusercontent.com/u/12824479?u=8fa860e47bed4f84c8ff70cb2691d77edbb43d8f&v=4" width="80;" alt="iJasonWade"/>
            <br />
            <sub><b>Jason Ash</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/DRXAquosus">
            <img src="https://avatars.githubusercontent.com/u/45409262?v=4" width="80;" alt="DRXAquosus"/>
            <br />
            <sub><b>DRXAquosus</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ratty222">
            <img src="https://avatars.githubusercontent.com/u/92832598?u=137b65530cbd5f5af9c24cde51baa6cc77cc934b&v=4" width="80;" alt="ratty222"/>
            <br />
            <sub><b>Brent</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/jtfinley72">
            <img src="https://avatars.githubusercontent.com/u/96497997?v=4" width="80;" alt="jtfinley72"/>
            <br />
            <sub><b>Jtfinley72</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: sponsors -end -->

#### Contributors

<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/Lissy93">
            <img src="https://avatars.githubusercontent.com/u/1862727?v=4" width="80;" alt="Lissy93"/>
            <br />
            <sub><b>Alicia Sykes</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->

#### Stargazers

[![Recent Star Gazers](https://reporoster.com/stars/dark/Lissy93/devolio)](https://github.com/Lissy93/devolio/stargazers)

---

## Status

[![🐳 Build + Publish Multi-Platform Image](https://github.com/Lissy93/devolio/actions/workflows/docker-build-publish.yml/badge.svg)](https://github.com/Lissy93/devolio/actions/workflows/docker-build-publish.yml) [![🏷️ Tag new Versions](https://github.com/Lissy93/devolio/actions/workflows/tag-versions.yml/badge.svg)](https://github.com/Lissy93/devolio/actions/workflows/tag-versions.yml) [![🪞 Mirror to Codeberg](https://github.com/Lissy93/devolio/actions/workflows/sync-mirror.yml/badge.svg)](https://github.com/Lissy93/devolio/actions/workflows/sync-mirror.yml) [![💓 Inserts Contributor & Sponsors](https://github.com/Lissy93/devolio/actions/workflows/insert-contributors.yml/badge.svg)](https://github.com/Lissy93/devolio/actions/workflows/insert-contributors.yml)

---

## License

> _**[Lissy93/Devolio](https://github.com/Lissy93/devolio)** is licensed under [MIT](https://gist.github.com/Lissy93/143d2ee01ccc5c052a17) © [Alicia Sykes](https://aliciasykes.com) 2022._<br> > <sup align="right">For information, see <a href="https://tldrlegal.com/license/mit-license">TLDR Legal > MIT</a></sup>

<details>
<summary>Expand License</summary>

```
The MIT License (MIT)
Copyright (c) Alicia Sykes <alicia@omg.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sub-license, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included install
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANT ABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

</details>

---

<!-- License + Copyright -->
<p  align="center">
  <i>© <a href="https://aliciasykes.com">Alicia Sykes</a> 2023</i><br>
  <i>Licensed under <a href="https://gist.github.com/Lissy93/143d2ee01ccc5c052a17">MIT</a></i><br>
  <a href="https://github.com/lissy93"><img src="https://i.ibb.co/4KtpYxb/octocat-clean-mini.png" /></a><br>
  <sup>Thanks for visiting :)</sup>
</p>

<!-- Dinosaur -->
<!--
                        . - ~ ~ ~ - .
      ..     _      .-~               ~-.
     //|     \ `..~                      `.
    || |      }  }              /       \  \
(\   \\ \~^..'                 |         }  \
 \`.-~  o      /       }       |        /    \
 (__          |       /        |       /      `.
  `- - ~ ~ -._|      /_ - ~ ~ ^|      /- _      `.
              |     /          |     /     ~-.     ~- _
              |_____|          |_____|         ~ - . _ _~_-_
-->
