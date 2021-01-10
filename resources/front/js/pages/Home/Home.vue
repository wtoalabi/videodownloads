<template>
    <div class="home">
        <div class="fill-height main">
            <div class="image_container">
                <v-img
                    class="image"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    src="/images/download_video.svg"
                ></v-img>
            </div>
            <v-row>
                <v-col
                    cols="12"
                    sm="10"
                    md="10"
                >
                    <div v-if="showErrorMessage">
                        <v-alert
                            text
                            rounded
                            type="error"
                        >
                            {{errorMessage}}
                        </v-alert>
                    </div>
                    <v-text-field
                        v-model="inputText"
                        @click:clear="clear"
                        auto
                        color="black"
                        @input="processInput"
                        outlined
                        label="Paste/Type the video url..."
                        clearable
                        rounded
                    >
                    </v-text-field>
                    <div v-if="loading">
                        <v-progress-linear
                            color="primary"
                            height="10"
                            striped
                            stream
                            indeterminate
                        />
                        <div class="processing_text">
                            Processing Video...please wait and stay on this page!
                        </div>
                    </div>
                    <component :is="service"></component>
                </v-col>
            </v-row>
            <v-spacer/>
        </div>
    </div>
</template>

<script>
  import validations from "./url_validations";
  import Youtube from "./Results/Youtube/Youtube"

  export default {
    mounted() {
      this.$store.commit("fakeVideoData")
    },
    beforeRouteLeave(a,b,next){
      this.$store.dispatch("cancelLoading");
      next();
    },
    components: {Youtube},
    data() {
      return {
        reloadWithResult: 0,
        inputText: "",
        service: "youtube",
        result: {},
        errorMessage: "",
        showErrorMessage: false,
        video_url: ""
      }
    },
    methods: {
      processInput(url) {
        if (url) {
          this.clear();
          this.showErrorMessage = false;
          if (url.length === 0) {
            return this.showErrorMessage = false;
          }
          if (this.isValidUrl(url)) {
            this.$store.dispatch("processUrl", {url, 'service': this.service});
            this.showErrorMessage = false;
            return;
          }
          this.showErrorMessage = true;
        }
      },
      isValidUrl(text) {
        if (validations.validUrl(text)) {
          let service = validations.isSupported(text);
          if (service) {
            this.service = service;
            return true;
          } else {
            this.errorMessage = "This service is not currently being supported..."
          }
        } else {
          this.errorMessage = "The url is not a valid URL..."
        }
        return false;
      },
      clear() {
        this.showErrorMessage = false;
        this.errorMessage = "";
        this.$store.commit("clearResults");
        this.result = "";
        this.video_url = "";
      }
    },
    watch: {
      serverError() {
        this.errorMessage = this.serverError;
        this.showErrorMessage = true;
        console.log(this.serverError)
      },
      results() {
        this.reloadWithResult++;
        this.inputText = "";
      },
      incomingURL(){
        this.inputText =  this.incomingURL
        this.processInput(this.inputText)
      }
    },
    computed: {
      loading() {
        return this.$store.state.loading;
      },
      serverError() {
        return this.$store.state.errorDataMessage;
      },
      results() {
        return this.$store.state.video.result;
      },
      incomingURL(){
        return this.$store.state.video.incomingURL
      }
    }
  }

</script>
<style scoped lang="scss">
    @import "~/scss/mixins";

    .home {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .row {
            display: flex;
            justify-content: center;
        }

        .main {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .image_container {
            width: 30%;
            margin: auto;

            .image {
                width: 100%;
                height: 100%;
            }
        }

        .error {
            color: red;
        }

        .processing_text {
            text-align: center;
            margin-top: 1rem;
        }

        /*.image {
            margin: auto;
            height: 9px;
            width: 191px;
            @media (min-width: 360px) {
                width: 234px;
                height: 0;
            }
            @media (min-width: 419px) {
                width: 235px;
                height: 0;
            }
            @media (min-width: 414px) and (min-height: 896px) {

            }
            @media (min-width: 600px) {

            }
            @media (min-width: 768px) {

            }
            @media (min-width: 834px) {
            }
            @media (min-width: 1024px) {
                width: 538px;
                height: 150px;
            }
            @media (min-width: 1280px) {
                width: 238px;
            }
            @media (min-width: 1440px) {
                width: 276px;
            }
            @media (min-width: 1680px) {
                width: 334px;
            }
            @media (min-width: 1920px) {
                width: 356px;
            }
            @media (min-width: 2560px) {
                width: 500px;
            }
            @media (min-width: 2565px) {
                width: 25%;
            }
        }*/
    }
</style>
