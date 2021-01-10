import store from '../../vuex';
import playlist from "../fake/dumps/playlist";
import single from "../fake/dumps/single";
export default {
    commitProcessedVideoData(state, payload){
        state.video.results = JSON.parse(payload.data);
        console.log(state.video.results,"RESULT!!!!!!!!!!!");
        store.dispatch("persistToLocalStore");
    },
    clearResults(state){
        state.video.results = {}
    },
    fakeVideoData(state){
        state.video.results = playlist;
        store.dispatch("persistToLocalStore");
        //state.video.results = single;
        /*
        console.log(single)
        console.log(playlist)*/
    },
    saveIncomingURL(state, url){
        state.video.incomingURL = url
    },
    commitVideosFromStore(state, payload){
        state.video.downloaded = payload
    }
}
