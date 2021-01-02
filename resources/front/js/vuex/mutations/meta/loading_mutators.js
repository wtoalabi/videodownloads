export default {
    setTitle(state, payload){
        let title = payload
        title = `${title} ${title ? '|' : ''} Video Downloads`
        document.title = title;
    },
    commitMiniDrawer(state, payload) {
        state.miniDrawer = payload
    },
    startStateLoading(state){
        state.requestIsSuccessful = false;
        return state.loading = true;
    },
    stopLoading(){},
    stopStateLoading(state, errors){
        return state.loading = false;
    },
}
