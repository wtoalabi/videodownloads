let localforage = require('localforage');
export default {
    async getItem(name){
        let response = await localforage.getItem(name);
        return JSON.parse(response);
    },
    async setItem(item, name){
        return localforage.setItem(name, JSON.stringify(item)).then().catch(function (err) {
        });
    },
    async clearItem(name){
        await localforage.removeItem(name)
    },
}
