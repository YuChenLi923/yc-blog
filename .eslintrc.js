module.exports = {
    parser: 'babel-eslint',
    env: {
        // 预定义的全局变量，这里是浏览器环境
        browser: true,
    },
    extends: "standard",
    rules: {
        "semi": ["error", "always"],
        "one-var": 0,
        "indent": 0 ,
        "space-before-function-paren": ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
        "no-unused-vars": 0,
        "no-unused-expressions": 0,
        "no-multiple-empty-lines": 0
    }
};
