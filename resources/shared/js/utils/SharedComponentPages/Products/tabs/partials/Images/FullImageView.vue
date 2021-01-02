<template>
  <div>
      <q-dialog v-model="show" @hide="close">
          <q-card style="width: 900px; max-width: 80vw;">
              <q-img :src="image" ></q-img>
          </q-card>
          <!--<q-btn icon="close" flat round dense v-close-popup />-->
      </q-dialog>
  </div>
</template>

<script>
  export default {
    props:['image'],
    data() {
      return {
        show: true,
      }
    },
    methods: {
      close(){
        this.$emit("close")
      }
    },
    computed: {}
  }

</script>
