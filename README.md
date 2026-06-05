# 10⁹ · ONEBILLIONSECONDS.IO

**[onebillionseconds.io](https://onebillionseconds.io/)** — Enter your birthday.
Get the exact date you crossed — or will cross — one billion seconds alive.

> One billion seconds = **31 years · 251 days · 7 hours · 46 minutes · 40 seconds**

---

## STACK

| Layer              | Tool                            |
|--------------------|---------------------------------|
| Framework          | [Astro 6](https://astro.build)  |
| Language           | TypeScript                      |
| Styling            | Tailwind CSS 4 · IBM Plex Mono  |
| Hosting            | Cloudflare Pages                |
| Deploy CLI         | Wrangler 4                      |
| Package manager    | Bun                             |

---

## DEVELOPMENT

```bash
bun install       # install deps
bun run dev       # dev server · localhost:4321
bun run build     # production build → dist/
bun run deploy    # build + wrangler pages deploy --branch main
bun run links     # check for broken links post-deploy
```

---

## DEVELOPMENT JOURNAL

**GOAL · Create a website to show how long ago was one billion seconds.**

* **2021/12/12**
    * Bought domain name [onebillionseconds.io](https://onebillionseconds.io)
* **2021/12/15**
    * [Created repo](1cb32d76ad74a860ca3a50a864f5f9466a02e4a7)
    * Decided to use [Eleventy](https://www.11ty.dev/) as static site generator
    * Made hello world
    * Create AWS account for hosting
* **2021/12/18**
    * Made barebones webpack config
    * Compiled luxo.js as datetime lib
    * Create minimal website that shows when one billion seconds ago is (#1)
    * Setup AWS Amplify for static site hosting
    * Setup GitHub hooks for automated builds
        * Troubleshot a bunch. Turned out company VPN had newer npm packages not in the public registry.
        * Fixed by excluding `package-lock.json` (#2) from the repo and generating during build.
    * Setup PR preview builds — very cool!
* **2021/12/19**
    * Troubleshoot custom domain setup. No luck!
        * Also bought [onebillionseconds.co](https://onebillionseconds.co) to test a different domain provider. Still doesn't work.
* **2021/12/23**
    * Setup repo to transpile React. Guide was bringing in way too much stuff. Will pare it down later. Didn't actually write any React components.
* **2022/01/01**
    * Slowed down by an OS update today.
    * Fix issues with `package-lock.json` (#3)
    * Troubleshot custom domain issues again — found the solution!
        * I needed to setup a Route 53 hosted zone first. Never mentioned in the Amplify docs.
* **2022/01/02**
    * Researched CSS frameworks. Decided on [Bulma](https://bulma.io/).
        * Tinkered with a few layouts (#4)
* **2022/02/04**
    * Decided against React, then backtracked.
    * Add React webpack config, implemented React components to make date widgets live (#5)
* **2022/02/06**
    * Add more date widgets — basically wrap up the design!
    * Asked friends for help with the jokes.
    * Add Google Analytics to see the 2 people that will use the site.
    * It's live!
* **2022/02/08**
    * Write development journal!
* **2026/06/05**
    * Complete ground-up rewrite. The Eleventy/webpack/React/AWS stack was stale — swapped it all out.
    * New stack: **Astro 6 · TypeScript · Tailwind CSS 4 · Cloudflare Pages · Bun**.
    * Extracted all time math into a pure, DOM-free library (`src/lib/onebillion.ts`).
    * Rebuilt the UI from scratch: live seconds ticker, life bar, orbit visualisation.
    * Added a 5-scene explainer — `10⁰` (one blink) through `10¹²` (the ice age) — to make the scale tangible.
    * Dropped AWS Amplify + webpack + React. Hosting moves to Cloudflare Pages; no more build pipeline gymnastics.
    * Deploy is now one command: `bun run deploy`.