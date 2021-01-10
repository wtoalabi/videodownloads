import Stateful from "../../../../shared/js/utils/form/MakeStatefulRequests";
import video_getters from "../getters/video_getters";

export default {
    async processUrl(store, payload) {
        store.commit("commitCancelToken");
        await Stateful("process-video", {
            action: "post",
            store,
            sendErrorDataBack: true,
            data: payload,
            mutator: "commitProcessedVideoData"
        });
    },
    async persistToLocalStore(store, payload) {
        let video =  store.state.video.results;
        let url = video.webpage_url;
        let title = video.title;
        let time = Date.now();
        let uploader = video.uploader;
        let uploader_url = video.uploader_url;
        let data = {url, title, time, uploader, uploader_url};

        if(video.webpage_url_basename === "playlist"){
            data['thumb'] = video.entries[0].thumbnail;
        }else{
            data['thumb'] = video.thumbnail
        }

        await forage.updateItem("downloaded", data);
    },
    getVideosFromStore(store) {
        return forage.getItem("downloaded").then(downloaded => {
            if (downloaded) {
                let data = _.orderBy(Object.entries(downloaded).map(function (data) {
                    return {
                        id: data[0],
                        data: data[1]
                    }
                }),["id"],["desc"])
                store.commit("commitVideosFromStore", data)
            }
        });
    }
}
