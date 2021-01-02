<template>
    <div>
        <loader v-if="loadingData"></loader>
        <q-list class="rounded-borders q-mt-sm" v-else style="max-width: 100%">
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Merchant</q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-item-label>
                        <router-link class="link-color" :to="`/merchants/${product.merchant_id}`">
                            {{product.merchant_name}}
                        </router-link>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Name</q-item-label>
                </q-item-section>

                <q-item-section>
                    <q-item-label>
                        <q-input v-model="product.name" v-if="editing('name')"
                                 style="margin-top: -15px"/>
                        <span class="text-grey-8" v-else>{{product.name}}</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="clickToEdit('name')"/>
                    </div>
                </q-item-section>
            </q-item>
            <div v-if="errors.has('name')" class="errorMsg">
                {{errors.get('name')}}
            </div>
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Slug</q-item-label>
                </q-item-section>

                <q-item-section>
                    <q-item-label>
                        <q-input v-model="product.slug" v-if="editing('slug')"
                                 style="margin-top: -15px"/>
                        <span class="text-grey-8" v-else>{{product.slug}}</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="clickToEdit('slug')"/>
                    </div>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Short Description</q-item-label>
                </q-item-section>

                <q-item-section>
                    <q-item-label>
                        <q-input
                            v-if="editing('short_description')"
                            v-model="product.short_description"
                            filled
                            autogrow
                        />
                        <span class="text-grey-8" v-else>{{product.short_description}}</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="clickToEdit('short_description')"/>
                    </div>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Long Description</q-item-label>
                </q-item-section>
                <q-item-section style="flex:4">
                    <q-item-label>
                        <q-input
                            v-if="editing('long_description')"
                            v-model="product.long_description"
                            filled
                            autogrow
                        />
                        <span class="text-grey-8" v-else>{{product.long_description}}</span>
                    </q-item-label>
                </q-item-section>
                <q-item-section style="flex:1" top side>
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="clickToEdit('long_description')"/>
                    </div>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Brands</q-item-label>
                </q-item-section>
                <q-item-section class="col-8 gt-sm">
                    <brands
                        :propBrand="propProduct.brand"
                        @brandSelected="incomingEvent"
                        :brands="metas.brands"/>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Product Material: </q-item-label>
                </q-item-section>
                <q-item-section class="col-8 gt-sm">
                    <material-type
                        :propType="propProduct.material_type"
                        @materialTypeSelected="incomingEvent"
                        :types="metas.material_types"
                        :saved="saved"/>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Product Origin</q-item-label>
                </q-item-section>
                <q-item-section class="col-8 gt-sm">
                    <origin :propOrigin="propProduct.origin" @countrySelected="incomingEvent"
                            :saved="saved"/>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Product Line</q-item-label>
                </q-item-section>
                <q-item-section class="col-8 gt-sm">
                    <product-line
                        :product_line="propProduct.product_line"
                        @lineSelected="incomingEvent"
                        :saved="saved"
                        :prop_product_lines="propProduct.merchant_product_lines">
                    </product-line>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Product Conditions</q-item-label>
                </q-item-section>
                <q-item-section class="col-8 gt-sm">
                    <product-condition
                        :condition="propProduct.condition"
                        @conditionSelected="incomingEvent" :saved="saved">
                    </product-condition>
                </q-item-section>
            </q-item>

            <product-barcode :propBarcode="product.bar_code"
                             @barcodeSelected="incomingEvent" :saved="saved">
            </product-barcode>
            <q-item>
                <q-item-section top class="col-2 gt-sm">
                    <q-item-label class="q-mt-sm text-weight-bold">Status</q-item-label>
                </q-item-section>

                <q-item-section>
                    <q-item-label>
                        <q-toggle
                            @input="clickToEdit('status')"
                            v-model="product.status"
                            color="green"
                        />
                    </q-item-label>
                </q-item-section>
            </q-item>
            <div class="time-picker-row">
                <div>
                    <time-input fielda="from_date" :showTitle="true" :timestamp="product.from_date"
                                @dateSelected="incomingEvent">
                    </time-input>
                </div>
                <div>
                    <time-input :showTitle="true" field="to_date" :timestamp="product.to_date"
                                @dateSelected="incomingEvent">
                    </time-input>
                </div>
            </div>
            <q-item class="action-section">
                <q-item-section top class="col-2 gt-sm">
                    <q-btn :color="buttonColor" label="Save Details" @click="save"
                           :loading="loading" :disable="disableButton"></q-btn>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>
  import Requests from "../../../form/Requests";
  import Brands from "./partials/Details/Brands";
  import Origin from "./partials/Details/Origin";
  import ProductLine from "./partials/Details/ProductLine";
  import ProductCondition from "./partials/Details/ProductCondition";
  import ProductBarcode from "./partials/Details/ProductBarcode";
  import TimeInput from "./partials/Details/TimeInput";
  import MaterialType from "./partials/Details/MaterialType";
  import loader from '~/utils/loader'

  export default {
    props: ['propProduct','metas'],
    components: {Origin, Brands, ProductLine, ProductCondition, ProductBarcode, TimeInput,MaterialType,loader},
    mixins: [Requests],
    mounted() {
      this.product = _.cloneDeep(this.propProduct);
      this.$nextTick(()=>{
      })
    },
    data() {
      return {
        product: {},
        editedFields: [],
        saved: false,
      }
    },
    methods: {
      editing(profileField) {
        return this.editedFields.includes(profileField)
      },
      clickToEdit(field) {
        this.editedFields.push(field);
      },
      incomingEvent(data, field) {
        this.product[field] = data;
        this.editedFields.push(field);
      },
      save() {
        this.form = this.product;
        this.saved = false
        this.editedFields = [];
        this.makeRequest("products", {
          action: "patch",
          store: this.$store,
          mutator: "commitProduct",
          showResponseMessage: true,
          onSuccessCallback: () => {
            this.saved = true;
            this.form = this.product;
          }
        })
      }
    },
    computed: {
      loadingData() {
        return _.isEmpty(this.product)
      },
      disableButton() {
        return this.editedFields.length === 0;
      },
      buttonColor() {
        return this.disableButton ? "grey" : "primary"
      }
    },
  }

</script>
<style lang="scss" scoped>
    .time-picker-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .action-section {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
    }
</style>
