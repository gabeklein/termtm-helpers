const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "ScrollMagic": "scrollmagic/scrollmagic/minified/ScrollMagic.min.js",
        "animation.gsap": "scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js",
        "debug.addIndicators": 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
    }, 
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "lib"),
        library: "[name]",
        libraryTarget: "window"
    },
    mode: "production",
    resolve: {
        modules: [
            path.resolve(__dirname, "node_modules")
        ]
    },
    externals: {
        ScrollMagic: "ScrollMagic",
        TweenLite: "TweenLite",
        TimelineLite: "TimelineLite",
        TweenMax: "TweenMax",
        TimelineMax: "TimelineMax",
    }
}