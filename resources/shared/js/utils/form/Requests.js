import Errors from './Errors';
import ErrorMessages from './errorMessages';
import {scrollToTop} from "../helpers";

export default {
    mounted() {
        this.newForm = _.cloneDeep(this.form)
    },
    data() {
        return {
            mergeQueries_temp: true,
            mainData: [],
            newForm: {},
            loading: false,
            form: {},
            errors: new Errors,
        }
    },
    methods: {
        makeRequest(url, {
            data = this.form,
            action = "get",
            stopLoadingBar = false,
            showResponseMessage = true,
            showInnerLoading = false,
            mergeQueries=false,
            onSuccessCallback = () => {
            },
            onErrorCallback = () => {
            },
            mutator = null,
            store = null,
            load = true,
        } = {}) {

            if (store && store.state.mergeAllQueries && action !== 'get' && mergeQueries) {
                let extraData = store.state.mergeAllQueries();
                data = {...extraData, ...data}
            }
            showInnerLoading ? this.startInnerLoading() : void
                this.startLoading(stopLoadingBar, load);
            return axios[action](url, data).then(response => {
                if (showInnerLoading) {
                    this.stopInnerLoading();
                }
                this.handleSuccess(response.data['message'], showResponseMessage);
                this.mainData = response.data;
                if (mutator && store) {
                    store.commit(mutator, this.mainData);
                }
                onSuccessCallback(this.mainData);
            }).catch((error) => {
                if (showInnerLoading) {
                    this.stopInnerLoading();
                }
                return this.handleError(error, onErrorCallback, showResponseMessage);
            })
        },

        handleSuccess(response, showResponseMessage) {
            this.clearForm();
            this.errors.clearAll();
            if (showResponseMessage) {
                scrollToTop();
                this.showMessage({response: response})
            }
            setTimeout(() => {
                this.loading = false;

            }, 500);
        },

        handleError(error, onErrorCallback, showResponseMessage) {
            if (typeof error.response.data.errors === 'object') {
                this.errors.record(error.response.data.errors)
            }
            onErrorCallback();
            //let status = this.getStatusCode(error)
            if (showResponseMessage) {
                scrollToTop();
                let message = error.response.data['message'];
                let response = message.length < 1 ? "Error has occurred!" : message;
                this.showMessage({
                    response: response,
                    color: 'negative',
                    icon: 'thumb_down'
                });
                console.log(error.response.data.errors)
            }
            this.loading = false;
        },

        showMessage({response = "Success!", color = 'primary', icon = "thumb_up"} = {}) {
            if (this.$q) {

                this.$q.notify({
                    message: response,
                    color: color,
                    position: 'bottom-left',
                    actions: [
                        {label: "Dismiss", color: 'white', icon: icon},
                    ]
                })
            }
        },
        startLoading(stopLoadingBar = false, load) {
            if (stopLoadingBar) {
                this.removeLoadingBar()
            }
            this.loading = load;
        },
        append(form) {
            this.form = new FormData();
            for (let key in form) {
                this.form.append(key, form[key])
            }
        },
        removeLoadingBar() {
            let loadingBar = document.querySelector(".q-loading-bar");
            if (loadingBar) {
                loadingBar.remove()
            }
        },
        clearForm() {
            this.form = _.cloneDeep(this.newForm);
            if (typeof this.clear === "function") {
                this.clear();
            }
        },
        getStatusCode(error) {
            return error.response.status
        },
        startInnerLoading() {
            const spinner = Quasar.components.QSpinnerDots
            this.$q.loading.show({
                spinner,
                spinnerColor: 'primary',
                messageColor: 'black',
                backgroundColor: 'secondary',
                message: ''
            })
        },
        stopInnerLoading() {
            if (this.$q) {
                this.$q.loading.hide()
            }
        }

    },
    computed: {},
    beforeDestroy() {
        if (this.$q) {
            this.$q.loading.hide()
        }
    }
}
