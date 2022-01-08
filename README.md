# oneb

Project site: [OneBillionSeconds.io](https://onebillionseconds.io/)

# Developement Journal

Goal: **Create a website to show how long ago was one billion seconds**

* 2021/12/12
    * Bought domain name [onebillionseconds.io](https://onebillionseconds.io)
* 2021/12/15
    * [Created repo](1cb32d76ad74a860ca3a50a864f5f9466a02e4a7)
    * Decided to use [eleventy](https://www.11ty.dev/) framework as static site generator
    * Made hello world
    * Create AWS account for hosting
* 2021/12/18
    * Made barebones webpack config
    * Compiled luxo.js as datetime lib
    * Ceate minimal website that shows when one billion ago is (#1)
    * Setup aws account with amplify for static site hosting
    * Setup github hooks for automated builds
        * Trouleshooted a bunch. Turned out that company VPN has newer versions of NPM packages that are not available in the normal registry.
        * Fixed it by not including `package-lock.json` (#2) in repo and generating during build.
    * Setup PR prevview builds, very cool!
* 2021/12/19
    * Troubleshoot custom domain setup. Not luck!
        * Also bough [onebillionseconds.co](https://onebillionseconds.co) to see if the problem was with other domain name provider. Still doesn't work.
* 2021/12/23
    * Setup repo to transpile react. I used a guide that was bringing in way too much stuff. Will pair it down later on. Didn't actually write any react components.
* 2022/01/01
    * Slowed down by OS updated today.
    * Fix issues with `packages-json.lock` #3
    * Troubleshot custom domain issues again, and found solution!
        * I needed to setup a Route 53 hosted zon for the domain first! This was never mentioned in the amplify docs.
* 2022/01/02
    * Research CSS frameworks to make website a bit more polished. Decided on [bulma](https://bulma.io/).
        * Read a little on how to use it and tinkered with a few layouts #4
* 2022/02/04
    * I decided against using react, but then backtracked.
    * Add react webpack config, and implemented react componenets to make date widgets live #5
* 2022/02/06
    * Add more date widgets, and basically wrap up the design!
    * Asked friends for help with the jokes.
    * Add google analytics to see the 2 people that will use the website!
    * It's live!
* 2022/02/08
    * Write development journal!


