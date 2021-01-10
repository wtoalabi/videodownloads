import Errors from "./Errors";

let errors = new Errors;


export default async function Stateful(url, {
    data = {},
    action = "get",
    stopLoadingBar = false,
    showNotification = false,
    sendErrorDataBack = false,
    showInnerLoading = false,
    mergeQueries = true,
    onSuccessCallback = () => {
    },
    onErrorCallback = () => {
    },
    mutator = null,
    store = null,
    load = true,
    state = null
} = {}) {

    /*
  if (action !== 'get' && mergeQueries) {
    let extraData = store.state.mergeAllQueries();
    data = {...extraData, ...data}
  }*/

    store.commit("startStateLoading");
    let page = 1;
    if (store.state.queries) {
        page = store.state.queries.pagination.queryPagination.page;
    }
    let prefixed = `${prefixedURL}/${url}`;
    let urlSuffix = page > 1 ? `?page=${page}` : ''
    if (store.state.mergeAllQueries && action !== 'get' && mergeQueries) {
        let extraData = store.state.mergeAllQueries();
        data = {...extraData, ...data}
    }
    await axios[action](`${prefixed}${urlSuffix}`, data,{
        cancelToken: store.state.cancelToken ? store.state.cancelToken.token : null,
    }).then(response => {
        store.commit("stopStateLoading");
        let data = response.data
        if (mutator) {
            store.commit(mutator, data);
            //updateQueryPagination(data.pagination, store, state)
        }else{
            console.log("nope");
        }
        showInnerLoading ? store.commit("stopLoading") : null;
        onSuccessCallback(data);
        if (showNotification) {
            store.commit("showNotification", [data.response, 'success'])
        }
    }).catch(errorData => {
        if (errorData.response && errorData.response.status === 403) {
            return;
        }
        if (sendErrorDataBack) {
            store.commit("commitErrorData", errorData.response);
        }
        store.commit("stopStateLoading");
        if (errorData.response) {
            errors.record(errorData.response.data.errors || errorData.response.data.message);
            onErrorCallback(errorData.response.data.message || errorData.response.data.errors);
        }

        /*errors.record(errorData.response.data.errors || errorData.response.data.message);
        onErrorCallback(errorData.response.data.message || errorData.response.data.errors);*/
        if (showNotification) {
            store.commit("showNotification", [errorData.response.data.message, 'error'])
        }
    })
}

function updateQueryPagination(pagination, store, state) {
    if (aps_globals._.isNotEmpty(pagination)) {
        store.commit("setQueryPagination", [pagination, state])
    }
}
