<template>
    <q-item>
        <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm text-weight-bold">Barcode</q-item-label>
        </q-item-section>
        <q-item-section >
            <q-item-label>
                <q-input v-model="barcode" v-if="editing" style="margin-top: -15px" @input="input"/>
                <span class="text-grey-8" v-else>{{barcode}}</span>
            </q-item-label>
        </q-item-section>

        <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
                <q-btn size="12px" flat dense round icon="edit" @click="clickToEdit"/>
            </div>
        </q-item-section>
    </q-item>
</template>

<script>
  export default {
    props: ['propBarcode','saved'],
    data() {
      return {
        editing: false,
        barcode: ''
      }
    },
    watch:{
      saved: function () {
        this.editing = false
      },
      propBarcode: function(){
        this.barcode = this.propBarcode
      }
    },
    methods: {
      clickToEdit(){
        this.editing = true
      },
      input(barcode){
        this.$emit("barcodeSelected",barcode,'bar_code')
      },
    },
    computed: {}
  }

</script>
