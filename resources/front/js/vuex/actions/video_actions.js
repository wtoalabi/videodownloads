import Stateful from "../../../../shared/js/utils/form/MakeStatefulRequests";
export default {
    async processUrl(store, payload) {
        await Stateful("process-video", {
            action: "post",
            store,
            sendErrorDataBack: true,
            data:payload,
            mutator: "commitProcessedVideoData"
        });
    },
    async persistToLocalStore(store, payload){
        let url = store.state.video.results.webpage_url;
        let title = store.state.video.results.title;
        let time = Date.now();
        let data = {url,title,time};

        await forage.updateItem("downloaded",data);
    },
    getVideosFromStore(store){
        return forage.getItem("downloaded").then(downloaded=>{
            let data = Object.entries(downloaded).map(function(data){
                return {
                    id: data[0],
                    data: data[1]
                }
            })
            store.commit("commitVideosFromStore", data)
        });
    }
}
