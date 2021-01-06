export default {
    services: [
        "youtube",
        "twitter"
    ],
    validUrl: function (str) {
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    },
    isSupported: function (str) {
        let name = extractName(str);
        let selected_service = null;
        let f = this.services.some(function (service) {
            if(name.includes(service)){
                selected_service = service;
                return service;
            }
            return false;
        });
        return selected_service
    },
}

function extractName(url) {
    return url.split("://")[1] || url.split("www")[1]
}
