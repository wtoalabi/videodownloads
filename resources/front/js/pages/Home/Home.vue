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
                    sm="8"
                    md="8"
                >
                    <v-text-field
                        color="black"
                        @input="processInput"
                        outlined
                        label="Paste/Type the video url..."
                        clearable
                        rounded
                    >
                    </v-text-field>
                    <v-progress-linear
                        color="primary"
                        height="10"
                        striped
                        stream
                        indeterminate
                    ></v-progress-linear>
                </v-col>
            </v-row>
            <v-spacer/>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        video_url: ""
      }
    },
    methods: {
      processInput(text) {
        console.log(text, "TEXT")
      }
    },
    computed: {}
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
            width: 50%;
            margin: auto;

            .image {
                width: 100%;
                height: 100%;
            }
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
