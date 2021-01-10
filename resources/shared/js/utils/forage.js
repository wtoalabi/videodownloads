let localforage = require('localforage');
export default {
    async getItem(name) {
        let response = await localforage.getItem(name);
        return JSON.parse(response);
    },
    async setItem(name, item) {
        return localforage.setItem(name, JSON.stringify(item)).then().catch(function (err) {
        });
    },
    async updateItem(itemName, data) {
        let existing = await this.getItem(itemName);
        if (existing) {
            existing[data.time] = data;
        } else {
            existing = {
                [data.time]: data,
            };
        }
        await this.setItem(itemName, existing);
    },
    async clearItem(name) {
        await localforage.removeItem(name)
    },
    async allKeys() {
        await localforage.keys();
    },
}
