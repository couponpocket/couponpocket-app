module.exports = {
    extends: [
        '@clicksports/eslint-config-clicksports/reactrc',
        '@clicksports/eslint-config-clicksports/typescriptrc'
    ],
    parserOptions: {
        project: ['./tsconfig.json']
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
