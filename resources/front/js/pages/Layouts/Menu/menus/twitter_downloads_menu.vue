<template>
    <div>
        <v-list-item
            :disabled="!twitterID"
            style="top:-8px"
            key="twitter_downloads"
            link
            to="/twitter_downloads"
        >
            <v-list-item-content>
                <v-list-item-title class="menu-list-item">
                <v-icon>mdi-video-image</v-icon>
                    <div class="menu_title" v-if="twitterID">Twitter Downloads</div>
                    <div class="menu_title" style="text-decoration: line-through" v-else>Twitter Downloads</div>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
  export default {
    name: "extension_menu",
    data() {
      return {}
    },
    methods: {},
    computed: {
      twitterID(){
        return this.$store.state.video.twitterID
      }
    }
  }

</script>
