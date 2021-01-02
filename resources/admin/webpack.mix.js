const mix = require('laravel-mix');
let purgeCss = require('purgecss-webpack-plugin');
const LiveReloadPlugin = require('@kooneko/livereload-webpack-plugin');
let glob = require('glob-all');
const config = require('./webpack.config');


/*
 |--------------------------------------------------------------------------
 | Aliases
 |--------------------------------------------------------------------------
 */
mix.setPublicPath('../../public/admin/')
    .setResourceRoot('/admin');

if (mix.inProduction()) {
    mix.webpackConfig({
        watchOptions: {
            ignored: /node_modules/,
        },
        plugins: [

            new purgeCss({
                //whitelistPatterns: [/(nav).*/,/(bg).*/, /(btn).*/],
                paths: glob.sync([
                    path.join(__dirname, 'resources/admin/html/**/*.blade.php'),
                    path.join(__dirname, 'resources/admin/js/assets/**/*.vue'),
                ]),
                extractors: [
                    {
                        extractor: class {
                            static extract(content) {
                                return content.match(/[A-z0-9-:\/]+/g)
                            }
                        },
                        extensions: ['html', 'js', 'php', 'vue']
                    }
                ]
            })
        ]
    }).version()
}
mix.webpackConfig({
    plugins: [
        new LiveReloadPlugin({
            port: 22222
        })
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
})
mix.webpackConfig(config);
mix.js('../../resources/admin/js/admin.js', 'js')
    .sass('../../resources/admin/scss/admin.scss', 'css')
    .options({
        extractVueStyles: false,
        globalVueStyles: '../../resources/admin/scss/mixins.scss'
    })
    .disableSuccessNotifications();
