<template>
    <div>
        <div v-if="hasResults">
            <v-row>
                <v-col cols="12" md="7">
                    <div class="mt-44">
                        <strong>{{results.title | shorten(90)}}</strong>
                    </div>
                    <div class="mt-4">
                        <strong>Uploaded By:</strong> <a class="text" target="_blank" :href="results.uploader_url">{{results.uploader}} </a>
                    </div>
                    <div class="mt-4">
                        <strong>Uploaded On:</strong> <span class="text">{{ results.upload_date | full_date}}</span>
                    </div>
                    <div class="mt-4">
                        <strong>Length:</strong> <span class="text">{{results.duration | full_length}}</span>
                    </div>
                    <div class="mt-4">
                        <strong>Links Expire On:</strong> <span class="text">{{results.formats[0].url | get_youtube_expiring_date}}</span>
                    </div>
                </v-col>
                <v-col cols="12" md="5" class="centered">
                    <v-img width="60%" v-if="results.thumbnail" :src="results.thumbnail"></v-img>
                    <v-img v-else src="/images/default_video_image.svg"></v-img>
                </v-col>
            </v-row>
            <v-row style="display: flex; justify-content: center">
                <v-col cols="12">
                    <twitter-formats-table :prop-formats="results.formats"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
  import TwitterFormatsTable from "./TwitterFormatsTable";
  export default {
    data() {
      return {}
    },
    components: {TwitterFormatsTable},
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
    .centered{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-end;
    }
</style>
