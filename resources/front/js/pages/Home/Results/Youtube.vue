<template>
    <div :key="reload">
        <div v-if="hasResults">
            <h1>Youtube!</h1>
            <div>{{results}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    mounted() {
      console.log(this.results, "RESULT IN YOUTBE");
    },
    data() {
      return {
        reload: 0,
      }
    },
    methods: {},
    watch:{
      result(){
        this.reload++;
      }
    },
    computed: {
      hasResults(){
        return _.isNotEmpty(this.results);
      },
      results() {
        return this.$store.state.video.results
      }
    }
  }

</script>
