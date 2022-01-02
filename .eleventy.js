module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addWatchTarget("src/assets/css")
    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
    }
}
