
module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jest": true
  },
  "plugins": [
    "jsx-a11y",
    "react",
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-uses-vars": [
      2
    ],
    "react/prop-types": [2, { "ignore": ["t"]}],
    "import/extensions": [
      0
    ],
    "import/no-unresolved": "off",
    "no-console": [
      "error",
      {
        "allow": [
          "warn",
          "error",
          "info"
        ]
      }
    ],
    "react/react-in-jsx-scope": [
      0
    ],
    "react/jsx-curly-spacing":  [2, {"when": "never", "children": true}]
  },
  "extends": [
    "airbnb-base",
    "plugin:compat/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "settings": {
    "react": {
      "version": "16.8"
    },
    "polyfills": [
      "Promise",
      "fetch",
      "Object.assign",
      "Object.values",
      "Array.from"
    ]
  }
};
