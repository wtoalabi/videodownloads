import store from '../../vuex';
import playlist from "../fake/dumps/playlist";
import single from "../fake/dumps/single";
export default {
    commitProcessedVideoData(state, payload){
        state.video.results = JSON.parse(payload.data);
        store.dispatch("persistToLocalStore");
    },
    clearResults(state){
        state.video.results = {}
    },
    fakeVideoData(state){
        //state.video.results = single;
        state.video.results = playlist;
        //store.dispatch("persistToLocalStore");
        //console.log(single)
        //console.log(playlist)
        //state.video.results = single;
        /*
        */
    },
    saveIncomingURL(state, url){
        state.video.incomingURL = url
    },
    commitVideosFromStore(state, payload){
        console.log(payload,"COMITTTTITNGN")
        state.video.downloaded = payload
    }
}
