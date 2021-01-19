<template>
    <div>
        <div v-if="twitterID">
            <videos-table></videos-table>
        </div>
        <div v-else>
            <v-alert
                style="text-align: center"
                text
                prominent
                type="error"
                icon="mdi-twitter"
            >
                <b>You need to be directed here by twitter to get these content...</b>
                <br/>
                <br />
                :(
            </v-alert>
        </div>
    </div>
</template>

<script>
  import VideosTable from "./VideosTable";

  export default {

    async mounted() {
      console.log(this.twitterID,"MOUNTING")
      if (!this.twitterID) {
        await this.$store.commit("setTwitterID", this.$route.query.id);
      } else {
      }
    },
    data() {
      return {}
    },
    components:{VideosTable},
    methods: {},
    computed: {
      twitterID() {
        return this.$store.state.video.twitterID
      },
    }
  }

</script>
