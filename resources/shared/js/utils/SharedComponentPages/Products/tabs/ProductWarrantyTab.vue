<template>
    <div>
        <q-list class="rounded-borders" style="max-width: 100%">
            <q-item>
                <q-item-section top class="col-3 gt-sm full-width">
                    <q-item-label class="q-mt-sm text-weight-bold warranty-title"> Product Warranty
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-3 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Types</q-item-label>
                </q-item-section>

                <q-item-section style="flex:4">
                    <q-item-label>
                        <q-select

                            v-if="editing('warranty_type_id')"
                            filled
                            v-model="selectedType"
                            use-input
                            @input="inputType"
                            label="Available Warranty Types"
                            :options="options"
                            @filter="filter"
                            behavior="menu"
                            autocomplete="false_product_warrant">

                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                        No results
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                        <span class="text-grey-8" v-else>{{form['type']}}</span>
                        <div v-if="errors.has('warranty_type_id')" class="errorMsg">
                            {{errors.get('warranty_type_id')}}
                        </div>
                    </q-item-label>
                </q-item-section>

                <q-item-section style="flex:1" top side v-if="hasWarranty">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="edit('warranty_type_id')"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-3 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Period</q-item-label>
                </q-item-section>

                <q-item-section style="flex:4">
                    <q-item-label>
                        <q-input
                            @input="clearError('period')"
                            suffix="Months"
                            v-if="editing('period')"
                            v-model="form['period']"
                            filled
                            autogrow></q-input>
                        <span class="text-grey-8" v-else>{{form['period']}} Months</span>
                        <div v-if="errors.has('period')" class="errorMsg">
                            {{errors.get('period')}}
                        </div>
                    </q-item-label>
                </q-item-section>

                <q-item-section style="flex:1" top side v-if="hasWarranty">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="edit('period')"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-3 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Warranty Text <p
                        class="text-weight-light">(Warranty Text)</p>
                    </q-item-label>
                </q-item-section>
                <q-item-section style="flex:4">
                    <q-item-label>
                        <q-input
                            type="textarea"
                            @input="clearError('warranty_text')"
                            v-if="editing('warranty_text')"
                            v-model="form['warranty_text']"
                            filled></q-input>
                        <span class="text-grey-8" v-else>{{form['warranty_text']}}</span>
                        <div v-if="errors.has('warranty_text')" class="errorMsg">
                            {{errors.get('warranty_text')}}
                        </div>
                    </q-item-label>
                </q-item-section>
                <q-item-section style="flex:1" top side v-if="hasWarranty">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="edit('warranty_text')"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-3 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Address <p
                        class="text-weight-light">(Fulfilment Center)</p>
                    </q-item-label>
                </q-item-section>
                <q-item-section style="flex:4">
                    <q-item-label>
                        <q-input
                            type="textarea"
                            @input="clearError('warranty_address')"
                            v-if="editing('warranty_address')"
                            v-model="form['warranty_address']" filled>
                        </q-input>
                        <span class="text-grey-8" v-else>{{form['warranty_address']}}</span>
                        <div v-if="errors.has('warranty_address')" class="errorMsg">
                            {{errors.get('warranty_address')}}
                        </div>
                    </q-item-label>
                </q-item-section>

                <q-item-section style="flex:1" top side v-if="hasWarranty">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="edit('warranty_address')"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-item class="action-section" v-if="">
                <q-item-section top class="q-mt-md col-3 gt-sm">
                    <q-btn class="q-ma-xs" color="primary" :label="buttonText" @click="save"
                           :loading="loading"></q-btn>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>
  import Requests from "../../../form/Requests";

  export default {
    props: ['propWarranty', 'propProductID', 'productWarrantiesMutator','types'],
    mixins: [Requests],
    mounted() {
      this.options = _.cloneDeep(this.types);
      if(this.propWarranty){
        this.form = _.cloneDeep(this.propWarranty);
      }
    },
    data() {
      return {
        showModal: false,
        form:{},
        options: [],
        warranty: {},
        selectedType: '',
        editingFields: [],
      }
    },
    methods: {
      editing(field) {
        if(!this.propWarranty){
          return true
        }
        return this.editingFields.includes(field)
      },
      edit(field) {
        this.editingFields.push(field);
      },
      inputType(type) {
        this.selectedType = type;
        this.clearError('warranty_type_id');
      },
      save() {
        this.form['product_id'] = this.propProductID;
        this.form['warranty_type_id'] = this.selectedType.id || this.propWarranty.warranty_type_id;
        this.makeRequest("warranties", {
          action: this.hasWarranty ? 'patch' : 'post',
          store: this.$store,
          mutator: this.productWarrantiesMutator,
          onSuccessCallback: () => {
            this.cancel();
            this.editingFields = [];
            this.form = this.mainData.data
          },
        })
      },
      filter(val, update) {
        if (val === '') {
          update(() => {
            this.selectedType = '';
            this.options = this.types
          })
          return
        }
        this.selectedType = '';
        update(() => {
          const needle = val.toLowerCase();
          this.options = this.types.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      show() {
        this.showModal = true;
      },
      cancel() {
        this.showModal = false
      },
      clearError(field){
        this.errors.clear(field)
      }
    },
    computed: {
      modalWidth() {
        return this.$store.state.modalWidth();
      },
      hasWarranty(){
        return _.isNotEmpty(this.propWarranty)
      },
      buttonText(){
        return this.hasWarranty ? "Edit Warranty" : "Create Warranty";
      }
    }
  }

</script>
<style lang="scss">
    .warranty-title {
        font-size: 1.5rem;
    }

    .action-section {
        display: flex;
        justify-content: flex-end;
    }

    .no-warranty {
        border: 1px dotted;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        height: 9rem;
    }
</style>
