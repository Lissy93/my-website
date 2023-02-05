> **Warning** This project is a work-in-progress. Check back next week :)

<h1 align="center">✨ Devolio</h1>
<p align="center">
  <i>An aggregated portfolio and blog site for developers</i><br>
  <b>Demo: <a href="https://devolio.as93.net/">devolio.as93.net</a></b>
</p>
<p align="center">
  <a href="https://devolio.netlify.app">
    <img width="600" src="#" />
  </a>
</p>


## About

#### Intro
Devolio is a self-hosted developer homepage, where you can showcase your projects, blog posts, coding stats and more.<br>
Data fetched from existing sources (GitHub, RSS, Dev.to etc), so there's no backend to manage.<br>
It's easy to make it your own, with custom styles and a simple config file.<br>

#### Quality Gates
✅ Localized with multi-language support<br>
✅ Unit tested<br>
✅ Fast load speeds<br>
✅ Server-side rendering for good SEO<br>
✅ Meets accessibility standards<br>
✅ Fully responsive<br>

#### Tech Stack
Built with Svelte, using SvelteKit (1.0.0) and written in TypeScript.
The build system is Vite/ Rollup, with dependencies managed with PNPM.
Standards implemented with ESLint and Prettier, with testing done using Vitest and Playwright.
Styles are composed in SCSS with CSS variables for theming.
There's an optional Dockerfile with a Deno web server.


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
- Make any desired changes
  - Edit the main config, in [`config.ts`](#)
  - Add any API keys to [`.env`](#)
  - Modify the theme within [`styles/`](#)
- Push changes to your repository
- Enable the build action, to deploy to a service of your choice

You can also build the site yourself `pnpm build`, then preview locally with `pnpm preview`.
To deploy, upload the output of `.sveltekit/output` to your server, or use an appropriate [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Report an Issue
Found something that's not working? [Open an issue](https://github.com/Lissy93/devolio/issues/new/choose), and describe the problem, steps to reproduce alond with expected and actual output. If relevant, also include details about your environment. I'll try and fix / respond to any tickets within 48-hours.

## Contributing
Contributions of any kind are very welcome, and would be much appreiciated.
For Code of Conduct, see [Contributor Convent](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

To get started, fork the repo, make your changes, add, commit and push the code, then come back here to open a pull request. If you're new to GitHub or open source, [this guide](https://www.freecodecamp.org/news/how-to-make-your-first-pull-request-on-github-3#let-s-make-our-first-pull-request-) or the [git docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) may help you get started, but feel free to reach out if you need any support.

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
