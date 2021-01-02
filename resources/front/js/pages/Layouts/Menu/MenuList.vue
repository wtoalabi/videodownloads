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
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import home_menu from "./menus/home_menu"

  export default {
    props: {
      mobile: {
        default: true,
      },
    },
    mounted() {},
    components: {home_menu},
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
