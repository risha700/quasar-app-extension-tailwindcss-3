/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf (conf) {
    conf.css.push('../extensions/tailwindcss/tailwind.css')
}

module.exports = function (api) {
    api.compatibleWith('quasar', '^1.0.0 || ^2.0.0 || ^2.11.5')
    api.compatibleWith('@quasar/app', '^1.0.0 || ^2.0.0 || ^3.0.0')
    api.compatibleWith('postcss', '^8.4.19') 

    api.chainWebpack((cfg, {isClient, isServer}, api) => {
        const plugins = [
            require('tailwindcss')(api.resolve.src('extensions/tailwindcss/tailwind.config.js')),
            require('autoprefixer'),
        ];

        cfg.module
            .rule('tailwind')
                .test(/\.css$/)
                .include
                    .add(api.resolve.src('extensions/tailwindcss'))
                    .end()
                .use('postcss')
                    .loader('postcss-loader')
                    .options({postcssOptions: {
                        ident: 'postcss',
                        plugins: plugins
                    }})
                    .end()
    })

    api.extendQuasarConf(extendConf)
}
