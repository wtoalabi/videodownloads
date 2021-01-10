<template>
    <div>
        <v-row>
            <v-col cols="12" md="7">
                <div class="mt-44">
                    <strong>{{results.title | shorten(90)}}</strong>
                </div>
                <category-chips :results="results"></category-chips>
                <div class="mt-4">
                    <strong>Uploaded By:</strong> <a class="text" target="_blank" :href="results.uploader_url">{{results.uploader}} </a>
                </div>
                <div class="mt-4">
                    <strong>Playlist updated On:</strong> <span class="text">{{newestAddition.upload_date | full_date}}</span>
                </div>
                <div class="mt-4">
                    <strong>Playlist Videos:</strong> <span class="text">{{results.entries.length}}</span>
                </div>

                <div class="mt-4">
                    <strong>Total Playtime:</strong> <span class="text">{{getFullLength | full_length}}</span>
                </div>
                <div class="mt-4">
                    <strong>Links Expire On:</strong> <span class="text">{{results.entries[0].formats[0].url | get_youtube_expiring_date}}</span>
                </div>
            </v-col>
            <v-col cols="12" md="5" class="centered">
                <v-img v-if="newestAddition.thumbnail" :src="newestAddition.thumbnail"></v-img>
                <v-img width="50%" v-else src="/images/default_video_image.svg"></v-img>
            </v-col>
        </v-row>
        <v-row style="display: flex; justify-content: center">
            <v-col cols="12">
                <playlist-format-tabs/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
  import CategoryChips from "./partials/CategoryChips";
  import PlaylistFormatTabs from "../Formats/PlaylistFormatTabs";

  export default {
    data() {
      return {}
    },
    components: {CategoryChips, PlaylistFormatTabs},
    methods: {},
    computed: {
      results() {
        return this.$store.state.video.results
      },
      newestAddition(){
        let ordered = _.orderBy(this.results.entries, ['upload_date'],['desc']);
        return ordered[0];
      },
      newestAdditionDate(){

      },
      getFullLength(){
        return  this.results.entries.reduce(function(a,b){
          return a + b.duration
        },0)
      }
    }
  }

</script>
