<template>
    <v-app-bar
        app
        clipped-left
        class="white--text"
        color="primary"
        dense
    >
        <v-app-bar-nav-icon color="secondary" @click="setDrawer"></v-app-bar-nav-icon>
        <div class="logo_container">
            <v-img
                width="100%"
                height="100%"
                src="/images/logo.svg"/>
        </div>
        <v-toolbar-title class="mr-10 align-center title">
            <a @click.prevent="go('/')" class="title">Video Downloads</a>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row
            class="row help"
            style="max-width: 650px; "
        >
            <a @click.prevent="go('help')">Help</a>
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

    a {
        color: #fff !important;
    }

    .title {
        font-size: 1rem !important;
        @include min-md-up {
            font-size: 1.2rem !important;
        }
        @include min-lg-up {
            font-size: 1.6rem !important;
        }
    }

    .row {
        justify-content: flex-end;
    }

    .help {
        padding: 5px;
    }
    .logo_container{
        width: 44px;
        height: 51px;
        margin-right: .5rem;
    }
</style>
<!--
<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
-->
