import Vue from 'vue';
let humanize = require('humanize-duration');
let dateFormat = require("dateformat");

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


Vue.filter('get_youtube_expiring_date', function(url, multiplier=1000){
    let dateInDigits = parseInt(getParameterByName("expire", url))*multiplier;
    return dateFormat(dateInDigits,"dddd, mmm dS, yyyy, h:MM:ss TT");
    function getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
});
