import store from '../../vuex';
import playlist from "../fake/dumps/playlist";
import single from "../fake/dumps/single";
import twitter from "../fake/dumps/twitter/twitter";

export default {
    commitProcessedVideoData(state, payload) {
        state.video.results = JSON.parse(payload.data);
        console.log(state.video.results, "RESULTS");
        //console.log(JSON.parse(payload.data))
        store.dispatch("persistToLocalStore");
    },
    clearResults(state) {
        state.video.results = {}
        state.errorDataMessage = null
    },
    fakeVideoData(state) {
        //state.video.results = single;
        // state.video.results = twitter;
        store.commit("commitCancelToken");
        //store.dispatch("persistToLocalStore");
        //console.log(single)
        //console.log(twitter)
        //state.video.results = single;
        /*
        */
    },
    saveIncomingURL(state, url) {
        //console.log(url);
        state.video.incomingURL = url
    },
    commitVideosFromStore(state, payload) {
        state.video.downloaded = payload
    },
    setTwitterID(state, twitterID) {
        state.video.twitterID = twitterID
        store.dispatch("getUserTwitterVideos", {twitterID})
    },
    commitTwitterVideoData(state, payload){
        state.video.twitter_video_downloads = payload.data
    }
}
