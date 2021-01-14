<template>
    <div>
        <div v-if="hasResults">
            <v-row>
                <v-col cols="12" md="7">
                    <div class="mt-44">
                        <strong>{{results.title | shorten(90)}}</strong>
                    </div>
                    <div class="mt-4">
                        <strong>Uploaded By:</strong> <a class="text" target="_blank"
                                                         :href="results.uploader_url">{{results.uploader}} </a>
                    </div>
                </v-col>
                <v-col cols="12" md="5" class="centered">
                    <div class="image_container" v-if="results.thumbnail">
                        <v-img :src="results.thumbnail"></v-img>
                    </div>
                    <v-img v-else
                           src="/images/default_video_image.svg"></v-img>
                </v-col>
            </v-row>
            <v-row style="display: flex; justify-content: center">
                <v-col cols="12">
                    <facebook-formats-table :prop-formats="results.formats"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
  import FacebookFormatsTable from "./FacebookFormatsTable";

  export default {
    data() {
      return {}
    },
    components: {FacebookFormatsTable},
    methods: {},
    computed: {
      results() {
        return this.$store.state.video.results
      },
      hasResults() {
        return _.isNotEmpty(this.results);
      },
    }
  }

</script>
<style scoped lang="scss">
    .centered {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-end;
    }

    .image_container {
        width: 30%;
    }
</style>
