<template>
  <div>
      <q-badge color="transparent" transparent floating class="badge" v-if="unCompleted">
          <q-icon name="priority_high" style="font-size: 15px" color="red"></q-icon>
          <q-tooltip>
              The product is yet to be marked as completed...
          </q-tooltip>
      </q-badge>
  </div>
</template>

<script>
  export default {
    props:[
      'product'
    ],
    mounted(){

    },
    data() {
      return {}
    },
    methods: {},
    computed: {
      unCompleted(){
        return !this.product.completed
      }
    }
  }

</script>
<style scoped>
    .badge{
        top: -7px;
        right: -24px;
    }
</style>
