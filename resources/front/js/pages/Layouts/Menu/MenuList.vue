<template>
    <div>
        <v-navigation-drawer
            height="100%"
            absolute
            app
            clipped
            v-model="drawer"
            :mini-variant.sync="miniDrawer"
        >
            <v-list dense>
                <home_menu />
                <my_videos_menu />
                <install_menu />
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import home_menu from "./menus/home_menu"
    import my_videos_menu from "./menus/my_videos_menu"
    import install_menu from "./menus/install_menu"

  export default {
    props: {
      mobile: {
        default: true,
      },
    },
    mounted() {},
    components: {home_menu,my_videos_menu,install_menu},
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
        set: function () {},
        get: function () {
          return this.$store.state.miniDrawer;
        },
      },
    },
  };
</script>
