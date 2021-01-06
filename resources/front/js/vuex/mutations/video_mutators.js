import playlist from "../fake/dumps/playlist";
import single from "../fake/dumps/single";
export default {
    commitProcessedVideoData(state, payload){
        state.video.results = JSON.parse(payload.data);
    },
    clearResults(state){
        state.video.results = {}
    },
    fakeVideoData(state){
        state.video.results = single;
    }
}
