<template>
    <div>
        <v-list-item
            style="top:-8px"
            key="downloaded_videos"
            link
            to="downloaded_videos"
        >
            <v-list-item-content>
                <v-list-item-title class="menu-list-item">
                    <v-icon :color="activeColor">mdi-check-outline</v-icon>
                    <div class="menu_title">Downloaded Videos</div>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
  export default {
    name: "DownloadedVideos",
    data() {
      return {}
    },
    methods: {},
    computed: {
      activeColor() {
        if (this.$route.name === "DownloadedVideos") {
          return 'red'
        }
        return 'grey'
      }
    }
  }

</script>
