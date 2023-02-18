> **Warning** This project is a work-in-progress. Check back next week :)

<h1 align="center">✨ Devolio</h1>
<p align="center">
  <i>An aggregated portfolio and blog site for developers</i><br>
  <b>Demo: <a href="https://devolio.as93.net/">devolio.as93.net</a></b>
</p>
<p align="center">
  <a href="https://devolio.netlify.app">
    <!-- <img width="600" src="#" /> -->
  </a>
</p>


<details>
<summary><b>Contents</b></summary>

<!-- TOC start -->
- [**About**](#about)
  * [Intro](#intro)
  * [Pages](#pages)
    + [Portfolio](#portfolio)
    + [Blog](#blog)
    + [Contact](#contact)
    + [About](#about-1)
  * [Quality Gates](#quality-gates)
  * [Tech Stack](#tech-stack)
- [**Getting Started**](#getting-started)
  * [Developing](#developing)
  * [Deploying](#deploying)
  * [Configuring](#configuring)
    + [Basic Data](#basic-data)
    + [Secrets](#secrets)
    + [Styles](#styles)
    + [Languages](#languages)
    + [More](#more)
- [**Community**](#community)
  * [Report an Issue](#report-an-issue)
  * [Contributing](#contributing)
  * [Support](#support)
  * [Credits](#credits)
- [**License**](#license)
<!-- TOC end -->

</details>


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
<img width="600" src="https://i.ibb.co/PT6pWVD/Screenshot-from-2023-02-12-14-59-33.png?" />
</p>

#### Blog
The blog page displays posts that you've published. Data is fetched and aggregated from one or more RSS feeds defined in the config. Post content is rendered as HTML, as well as metadata including author, date, link to original and optional thumbnail.

Start typing to filter results, and use the keyboard to navigate posts.

There's also the option to include secondary feeds, which can be toggled by the user using the dropdown menu. This may be useful for including less important updates, without them cluttering up your main feed.

<p align="center">
<img width="600" src="https://i.ibb.co/2jv15CG/Screenshot-from-2023-02-12-15-01-59.png?" />
</p>
  
#### Contact
The contact page includes links to social profiles, a contact form, and space for GPG keys.

Hover over the social media links, to show relevant user stats, like follower count, karma/ rep, join date and more.

The contact form let's users write you a message, and include their name + mail address. Upon sending, the message will be emailed to you, using [EmailJS](https://emailjs.com).

There's also space for including PGP key, and links to encrypted messenger apps.

<p align="center">
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

### Deploying
- Fork the repo, then follow the steps above to clone and install dependencies
- Make any desired changes (see [Configuring](#configuring) below)
- Push changes to your repository
- Enable the build action, to deploy to a service of your choice

You can also build the site yourself `pnpm build`, then preview locally with `pnpm preview`.
To deploy, upload the output of `.sveltekit/output` to your server, or use an appropriate [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Quick Deploy
Use the 1-click deploy to get up and running in seconds.

#### Netlify

![[Deploy Devolio to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/lissy93/devolio)](https://img.shields.io/badge/Deploy-Netlify-%2330c8c9?style=for-the-badge&logo=netlify&labelColor=1e0e41 "Deploy Devolio to Netlify, via 1-Click Script")

#### Vercel
[![Deploy Devolio to Vercel](https://img.shields.io/badge/Deploy-Vercel-%23000000?style=for-the-badge&logo=vercel&labelColor=FFFFFF&logoColor=000000)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flissy93%2Fdevolio&env=GITHUB_TOKEN,TWITTER_TOKEN&project-name=devolio&repository-name=devolio_My-Developer-Portfolio "Deploy Devolio to Vercel, via 1-Click Script")

#### Render
[![Depoly Devolio to Render](https://img.shields.io/badge/Deploy-Render-%236c83fa?style=for-the-badge&logo=render&labelColor=1e0e41&logoColor=6c83fa)](https://render.com/deploy?repo=https://github.com/lissy93/devolio "Deploy Devolio to Render, via 1-Click Script")

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

### Support

### Credits

---

## License

> _**[Lissy93/Devolio](https://github.com/Lissy93/devolio)** is licensed under [MIT](https://gist.github.com/Lissy93/143d2ee01ccc5c052a17) © [Alicia Sykes](https://aliciasykes.com) 2022._<br>
> <sup align="right">For information, see <a href="https://tldrlegal.com/license/mit-license">TLDR Legal > MIT</a></sup>

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
