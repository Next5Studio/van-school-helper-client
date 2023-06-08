module.exports = {
    root: true,
    extends: ['next5studio/react-ts'],
    globals: {
        JSX: false,
        config: false
    },
    rules: {
        '@typescript-eslint/no-require-imports': 'off',
        'react/jsx-no-useless-fragment': 'warn'
    }
}
