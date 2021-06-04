module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                corejs: 3,
                useBuiltIns: 'entry',
            },
        ],
        '@babel/preset-react',
        '@babel/preset-flow',
    ];
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: 3,
                regenerator: true,
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
