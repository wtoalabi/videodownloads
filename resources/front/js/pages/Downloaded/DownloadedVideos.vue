<template>
    <div>
        <h1>Downloaded Videos</h1>
        {{downloaded_videos}}
    </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch("getVideosFromStore");
    },
    data() {
      return {
        videos: []
      }
    },
    methods: {},
    watch: {},
    computed: {
      downloaded_videos() {
        return this.$store.state.video.downloaded
      }
    }
  }

</script>
