
const NativeStyles = require("@expressive-react/modify-native");
const transformExpressiveReact = require("@expressive-react/babel-plugin-transform-xjs").default;
const inferReactComponent = require("@expressive-react/babel-plugin-auto-extends").default;

module.exports = {
  "presets": [
    [ "@babel/env", {
        "targets": {
            "node": "current"
        },
        "modules": false
    }],
    "@babel/react",
    "expressive-enhancements"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    [inferReactComponent, {
      activeOnMethodDo: true
    }],
    [transformExpressiveReact, {
        reactEnv: "native",
        modifiers: [
            NativeStyles
        ]
    }],
  ],
  "sourceMaps": "inline",
  "compact": false
}