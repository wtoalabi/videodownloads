<template>
    <div>
        <v-list-item
            style="top:-8px"
            key="downloaded_videos"
            link
        >
            <v-list-item-content>
                <v-list-item-title class="menu-list-item">
                <v-icon>mdi-video-image</v-icon>
                    <div class="menu_title">Install Extension</div>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
  export default {
    name: "downloaded_videos",
    data() {
      return {}
    },
    methods: {},
    computed: {}
  }

</script>
