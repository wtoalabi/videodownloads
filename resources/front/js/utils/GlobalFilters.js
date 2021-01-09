import Vue from 'vue';
let humanize = require('humanize-duration');

Vue.filter('shorten', function (value, length) {
    return _.truncate(value, {length});
});
Vue.filter('full_date', function (date) {
    let year = date.substr(0, 4);
    let month = date.substr(4, 2);
    let day = date.substr(6, 2);
    return `${day} - ${month} - ${year}`;
})

Vue.filter('full_length', function (duration) {
    return humanize(duration*1000);
});
