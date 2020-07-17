module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-combine-duplicated-selectors'),
        require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
            }]
        }),
    ],
};