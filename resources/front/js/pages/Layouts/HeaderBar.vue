<template>
    <v-app-bar
        app
        clipped-left
        class="white--text"
        color="primary"
        dense
    >
        <v-app-bar-nav-icon color="secondary" @click="setDrawer"></v-app-bar-nav-icon>
        <v-icon
            class="mx-4"
            large
        >
            mdi-video-wireless-outline
        </v-icon>
        <v-toolbar-title class="mr-12 align-center">
            <span class="title ">Video Downloads</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row
            align="center"
            style="max-width: 650px"
        >
            <v-text-field
                :append-icon-cb="() => {}"
                placeholder="Search..."
                single-line
                append-icon="mdi-magnify"
                color="white"
                dark
                hide-details
            ></v-text-field>
        </v-row>
    </v-app-bar>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      setDrawer() {
        this.$store.commit("commitMiniDrawer", !this.$store.state.miniDrawer)
      },
      go(url){
        this.$router.push(url)
      },
      logout(){
        this.$store.dispatch("logout")
      }
    },
    computed: {}
  }

</script>
<style scoped lang="scss">
    .title{
        font-family: Oswald,serif;
    }
</style>
