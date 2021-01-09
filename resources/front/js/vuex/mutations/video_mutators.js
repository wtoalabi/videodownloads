import playlist from "../fake/dumps/playlist";
import single from "../fake/dumps/single";
export default {
    commitProcessedVideoData(state, payload){
        state.video.results = JSON.parse(payload.data);
        console.log(state.video.results,"RESULT!!!!!!!!!!!")
    },
    clearResults(state){
        state.video.results = {}
    },
    fakeVideoData(state){
        state.video.results = playlist;
        console.log(single)
        console.log(playlist)
    }
}
