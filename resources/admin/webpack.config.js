const path = require('path')

module.exports = {
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            'node_modules': path.join(__dirname, 'node_modules'),
            '@': path.resolve(__dirname, '../../resources/admin/js/'),
            '~': path.resolve(__dirname, '../../resources/shared/js/')
        }
    },
};
