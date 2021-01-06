export default {
    commitMetaData(state, payload) {
        state.loaded = true;
    },
    commitErrorData(state, error) {
        if (error.status === 504) {
            state.errorDataMessage = "Request timed out...Please try again later!";
        } else {
            state.errorDataMessage = error.data.message;
        }
    }
}
