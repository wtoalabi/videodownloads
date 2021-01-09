<template>
    <div>
        <v-expansion-panels>
            <v-expansion-panel
                v-for="(video,i) in entries"
                :key="i"
                @click="active(video)"
            >
                <v-expansion-panel-header>
                    <div class="mr-3" style="flex:0">
                        <v-chip color="#FFCCBC">{{video.playlist_index}}</v-chip>
                    </div>
                    <div>
                        {{video.title | shorten(80)}}
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-alert text color="info" style="text-align: center">
                        <h3 style="font-size: .7rem">
                            {{video.title}}
                        </h3>
                    </v-alert>
                    <formats-table :prop-formats="video.formats"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
  import FormatsTable from "./FormatsTable";

  export default {
    data() {
      return {
        current_video_index: null,
        current_video: null,
      }
    },
    components:{FormatsTable},
    methods: {
      active(video) {
        let clickedVideo = video.playlist_index;
        if (clickedVideo !== this.current_video_index) {
          this.current_video = video;
          this.current_video_index = video.playlist_index;
        }
      }
    },
    computed: {
      entries() {
        return this.$store.state.video.results.entries
      }
    }
  }

</script>
