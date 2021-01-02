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
mix.setPublicPath('../../public/front/')
    .setResourceRoot('/front');

if (mix.inProduction()) {
    mix.webpackConfig({
        watchOptions: {
            ignored: /node_modules/,
        },
        plugins: [

            new purgeCss({
                //whitelistPatterns: [/(nav).*/,/(bg).*/, /(btn).*/],
                paths: glob.sync([
                    path.join(__dirname, 'resources/front/html/**/*.blade.php'),
                    path.join(__dirname, 'resources/front/js/assets/**/*.vue'),
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
            port: 33333
        })
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
})
mix.webpackConfig(config);
mix.options({
    // Don't perform any css url rewriting by default
    processCssUrls: false,
});
mix.js('../../resources/front/js/front.js', 'js').vue({ version: 2 });
mix.sass('../../resources/front/scss/front.scss', 'css')
    .options({
        extractVueStyles: false,
        globalVueStyles: '../../resources/front/scss/mixins.scss'
    })
    .disableSuccessNotifications();
