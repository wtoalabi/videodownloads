<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="videos"
            item-key="id"
            item-value="data"
            class="elevation-1"
            :search="search"
            :custom-filter="filterOnlyCapsText"
            loading-text="Loading Saved Videos..."
            :items-per-page="20"
            :loading="loading"
            must-sort
            no-data-text="No Video Saved Yet..."
        >
            <template v-slot:top>
                <v-text-field
                    v-model="search"
                    label="Search"
                    class="mx-4"
                ></v-text-field>
            </template>

            <template v-slot:item.video="{ item }">
                <a class="link"
                   :href="generateURL(item.data.url)">{{item.data.title | shorten(50)}}</a>
                <a class="ml-2" :href="item.data.url" target="_blank"><v-icon small>mdi-open-in-new</v-icon></a>
            </template>
            <template v-slot:item.time="{ item }">
                <span>{{item.data.time | format_date_from_timestamp}}</span>
            </template>

            <template v-slot:item.uploader="{ item }">
                <a class="link"
                   target="_blank"
                   :href="item.data.uploader_url">{{item.data.uploader | shorten(40)}}</a>
            </template>

        </v-data-table>
    </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch("getVideosFromStore");
      this.$store.commit("fakeVideoData")
    },
    data() {
      return {
        videos: [],
        search: '',
        headers: [
          {
            text: 'Video',
            align: 'start',
            sortable: false,
            value: 'video',
          },
          {
            text: 'Date',
            align: 'center',
            sortable: true,
            value: 'time',
          },
          {
            text: 'Uploader',
            align: 'start',
            sortable: false,
            value: 'uploader',
          },
        ]
      }
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        value = item.data.title.toString().toLowerCase();
        return search != null &&
          typeof search === 'string' &&
          value.toString().toLowerCase().indexOf(search) !== -1

      },
      generateURL(url) {
        return url;
      }
    },
    watch: {
      downloaded_videos() {
        this.videos = this.downloaded_videos
      }
    },
    computed: {
      loading(){
        return this.$store.state.loading;
      },
      downloaded_videos() {
        return this.$store.state.video.downloaded
      }
    }
  }

</script>
<style scoped lang="scss">
    .link {
        color: #447ff4 !important;
        font-weight: 900;
    }
</style>
