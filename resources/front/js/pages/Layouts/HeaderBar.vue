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
        <v-toolbar-title class="mr-10 align-center title">
            <span class="title ">Video Downloads</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row
            class="row help"
            style="max-width: 650px; "
        >
            <small>Help</small>
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
      go(url) {
        this.$router.push(url)
      },
      logout() {
        this.$store.dispatch("logout")
      }
    },
    computed: {}
  }

</script>
<style scoped lang="scss">
    @import "~/scss/mixins";

    .title {
        font-size: 1rem !important;
        @include min-md-up {
            font-size: 1.4rem !important;
        }
        @include min-lg-up {
            font-size: 1.8rem !important;
        }
    }

    .row {
        justify-content: flex-end;
    }

    .help {
        padding: 5px;
    }
</style>
