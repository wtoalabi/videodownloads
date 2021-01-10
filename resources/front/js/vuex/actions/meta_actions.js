import Stateful from "../../../../shared/js/utils/form/MakeStatefulRequests";

export default {
    async loadMetaData(store) {
        await Stateful("meta-data", {
            store,
            mutator: "commitMetaData"
        })
    },
    cancelLoading(store){
        store.state.loading = false
        store.state.cancelToken.cancel();
    }
}
