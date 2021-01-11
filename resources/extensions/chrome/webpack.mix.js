const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Aliases
 |--------------------------------------------------------------------------
 */
mix.setPublicPath('./src/');
if (mix.inProduction()) {
    mix.webpackConfig({
        watchOptions: {
            ignored: /node_modules/,
        },
    }).version()
}
mix.webpackConfig({
    watchOptions: {
        ignored: /node_modules/,
    },
});
mix.js('./dev/js/extension.js', 'js');
mix.sass('./dev/styles/extension.scss', 'css')
    .disableSuccessNotifications();
