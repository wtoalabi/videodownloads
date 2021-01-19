<template>
    <div class="menu_list">
        <v-navigation-drawer
            height="100%"
            absolute
            app
            clipped
            v-model="drawer"
        >
            <v-list dense class="list">
                <home_menu/>
                <downloaded_videos_menu/>
                <twitter_downloads v-if="twitterID"/>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
  import home_menu from "./menus/home_menu"
  import downloaded_videos_menu from "./menus/downloaded_videos_menu"
  import twitter_downloads from "./menus/twitter_downloads_menu"

  export default {
    props: {
      mobile: {
        default: true,
      },
    },
    mounted() {
    },
    components: {home_menu, downloaded_videos_menu, twitter_downloads},
    data() {
      return {
        dialog: false,
        drawer: true,
      };
    },
    methods: {},
    watch: {
      miniDrawer: function () {
        this.drawer = true;
      },
    },
    computed: {
      miniDrawer: {
        set: function () {
        },
        get: function () {
          return this.$store.state.miniDrawer;
        },
      },
      twitterID() {
        return this.$store.state.video.twitterID
      }
    },
  };
</script>
<style scoped lang="scss">

    .menu_list {
        .list {
            margin-top: 35px;
            @media (min-width: 1280px) {
            margin-top: 0 !important;
            }
        }
    }
</style>
