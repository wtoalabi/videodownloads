<template>
    <div id="app">
            <v-app id="inspire">
                <header-bar/>
                <menu-list />
                <v-main>
                    <div class="ma-3 fill-height mt-5">
                        <router-view v-if="loaded"/>
                        <page-loader v-else></page-loader>
                    </div>
                </v-main>
            </v-app>
    </div>
</template>

<script>
    import MenuList from './Layouts/Menu/MenuList'
    import PageLoader from '../utils/PageLoader.vue';
    import HeaderBar from "./Layouts/HeaderBar";
  export default {
    mounted() {
      this.$store.dispatch("loadMetaData")
    },
    components: {PageLoader, HeaderBar, MenuList},
    props: {
      source: String,
    },
    data() {
      return {
        drawer: null,
      }
    },
    methods: {
      setDrawer() {},
    },
    computed: {
      loaded() {
        return this.$store.state.loaded;
      },
    },
    meta() {
      let title = this.$store.state.title;
      return {
        title: `${title} ${title ? '|' : ''} Video Downloads`
      }
    },
  }

</script>
<style scoped lang="scss">

</style>
