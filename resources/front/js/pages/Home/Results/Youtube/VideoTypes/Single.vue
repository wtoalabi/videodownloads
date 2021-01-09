<template>
  <div>
      <v-row>
          <v-col cols="12" md="6">
              <div class="mt-44">
                  <strong>{{results.title | shorten(90)}}</strong>
              </div>
              <category-chips :results="results"></category-chips>
              <div class="mt-4">
                  <strong>Uploaded By:</strong> <a class="text" target="_blank" :href="results.uploader_url">{{results.uploader}} </a>
              </div>
              <div class="mt-4">
                  <strong>Uploaded On:</strong> <span class="text">{{ results.upload_date | full_date}}</span>
              </div>
              <div class="mt-4">
                  <strong>Length:</strong> <span class="text">{{results.duration | full_length}}</span>
              </div>
          </v-col>
          <v-col cols="12" md="6" class="centered">
              <v-img v-if="results.thumbnail" :src="results.thumbnail"></v-img>
              <v-img width="50%" v-else src="/images/default_video_image.svg"></v-img>
          </v-col>
      </v-row>
      <v-row style="display: flex; justify-content: center">
          <v-col cols="12">
              <formats-table :prop-formats="results.formats"/>
          </v-col>
      </v-row>
  </div>
</template>

<script>
  import FormatsTable from "../Formats/FormatsTable";
  import CategoryChips from "./partials/CategoryChips";
  export default {
    components: {FormatsTable, CategoryChips},
    data() {
      return {}
    },
    methods: {},
    computed: {
      results() {
        return this.$store.state.video.results
      },
    }
  }

</script>
