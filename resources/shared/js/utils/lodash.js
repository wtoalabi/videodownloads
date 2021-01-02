import has from 'lodash-es/has'
import minBy from 'lodash-es/minBy'
import maxBy from 'lodash-es/maxBy'
import difference from 'lodash-es/difference'
import isEmpty from 'lodash-es/isEmpty'
import truncate from 'lodash-es/truncate'
import chunk from 'lodash-es/chunk'
import map from 'lodash-es/map'
import cloneDeep from 'lodash-es/cloneDeep'
import uniq from 'lodash-es/uniq';
import uniqBy from 'lodash-es/uniqBy';
import isUndefined from 'lodash-es/isUndefined';
import isObject from 'lodash-es/isObject';
import isArray from 'lodash-es/isArray';
import take from 'lodash-es/take';
import merge from 'lodash-es/merge';
import random from 'lodash-es/random';
import shuffle from 'lodash-es/shuffle';
import sortBy from 'lodash-es/sortBy';


let isNotEmpty = (value)=>{
  return ! isEmpty(value);
};

let isPercentage = (main, sub)=>{
    return Math.floor(((main-sub)/main) * 100)
}

let debouncedTimer = 0;
let debounce = (func, timeout) => {

    clearTimeout(debouncedTimer);

    debouncedTimer = setTimeout(() => {
        func();
    }, timeout)

};
export default {isObject, has,isEmpty, debounce, truncate, chunk, map, cloneDeep,uniq, minBy,maxBy,isNotEmpty, difference, uniqBy, isUndefined,isPercentage,isArray,take,merge, random,shuffle, sortBy}
