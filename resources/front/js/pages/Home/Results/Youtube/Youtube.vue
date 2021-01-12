<template>
    <div :key="reload">
        <div v-if="hasResults">
            <component :is="videoType"></component>
        </div>
    </div>
</template>

<script>



  import Single from "./VideoTypes/Single";
  import Playlist from "./VideoTypes/Playlist";

  export default {
    mounted() {},
    components:{Single,Playlist},
    data() {
      return {
        reload: 0,

      }
    },
    methods: {

    },
    watch: {
      result() {
        this.reload++;
      }
    },
    computed: {
      hasResults() {
        return _.isNotEmpty(this.results);
      },
      results() {
        return this.$store.state.video.results
      },
      videoType(){
        return this.results.webpage_url_basename === 'playlist' ? "playlist" : "single"
      },
    }
  }

</script>
<style scoped lang="scss">
    .centered {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .text {
        color: grey;
    }
</style>
