<template>
  <div>
      <q-select
          filled
          v-model="model"
          :options="options"
          options-cover
          @input="selected"
          stack-label
          popup-content-class="pop-up-class"
          label="Select Category"
      />
  </div>
</template>

<script>
  export default {
    props:['options'],
    data() {
      return {
        model: null,

      }
    },
    methods: {
      selected(){
        this.$emit("selected", this.model);
      }
    },
    computed: {
      categories(){
        return this.options.map(c=>c.name);
      }
    }
  }

</script>
<style scoped>
    body > div.q-menu.scroll.pop-up-class{
        min-width: 320px;
    }
</style>
