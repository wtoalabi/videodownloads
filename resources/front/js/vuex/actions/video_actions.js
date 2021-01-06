import Stateful from "../../../../shared/js/utils/form/MakeStatefulRequests";
export default {
    async processUrl(store, payload) {
        await Stateful("process-video", {
            action: "post",
            store,
            sendErrorDataBack: true,
            data:payload,
            mutator: "commitProcessedVideoData"
        })
    }
}
