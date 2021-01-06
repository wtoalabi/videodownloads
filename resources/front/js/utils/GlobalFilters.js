import Vue from 'vue';

Vue.filter('shorten', function(value, length){
    return _.truncate(value, { length });
});
