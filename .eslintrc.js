module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": [
        "eslint-config-airbnb",
        "airbnb",
        "eslint:recommended"

],
    "rules": {
        "indent": [
            "error",
            4
        ],

        "no-unused-vars": ["error", {"vars": "local", "args": "none"}],

        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
