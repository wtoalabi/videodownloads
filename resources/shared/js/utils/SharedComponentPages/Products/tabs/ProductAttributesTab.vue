<template>
    <div>
        <q-list class="rounded-borders q-mt-sm" style="max-width: 100%">
            <q-item class="row items-center q-my-md">
                <div class="col-2">
                    <q-item-section top class="col-1 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">SKU</q-item-label>
                    </q-item-section>
                </div>
                <div class="col-10 flex" style="height: 3.5rem;">
                    <q-item-section class="">
                        <q-item-label>
                            <q-input
                                v-if="editing('sku')"
                                filled bottom-slots
                                v-model="form['sku']"
                                @input="clearError('sku')">
                                <template v-slot:hint>
                                    <div v-if="errors.has('sku')" class="text-red">
                                        {{errors.get('sku')}}
                                    </div>
                                </template>
                            </q-input>
                            <span class="text-grey-8" v-else>#{{form['sku']}}</span>
                        </q-item-label>
                    </q-item-section>
                </div>
                <q-item-section class="" style="" top side v-if="hasAttributes">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="edit('sku')"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-item class="row items-center q-my-md">
                <div class="col-6 row color">
                    <div class="col-4 color__title">Pick a color:</div>
                    <div class="color__picker col-7"
                         @click="showForm=true"
                         :style="{'border-color': form['attributes']['colors']}">
                        <q-icon name="colorize" class="cursor-pointer"></q-icon>
                    </div>
                    <div></div>
                    <q-dialog v-model="showForm">
                        <q-card style="width: 18rem;height: 25rem;">
                            <q-color
                                v-model="form['attributes']['colors']"
                                no-header no-footer class="my-picker"/>
                            <q-card-actions align="right">
                                <q-btn outline label="Done" @click="showForm=false"/>
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                </div>
                <div class="col-6 row justify-end">
                    <q-input color="orange" filled v-model="form['attributes']['size']"
                             label="Measurement">
                    </q-input>
                    <q-select class="q-ml-sm" outlined v-model="form['attributes']['sizeName']"
                              :options="['Meter','Kilogram']"/>
                </div>
            </q-item>
            <q-item class="row items-center q-my-md">
                <div class="col-2">
                    <q-item-section top class=" gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Stock</q-item-label>
                    </q-item-section>
                </div>
                <div class="col-10 flex" style="height: 3.5rem;">
                    <q-item-section class=" " style="">
                        <q-item-label>
                            <q-input
                                v-if="editing('stock')"
                                filled bottom-slots
                                v-model="form['stock']"
                                @input="clearError('stock')">
                                <template v-slot:append>
                                    <div class="stock_count">
                                        <q-btn round dense flat icon="expand_less"
                                               @click="increaseStock"/>
                                        <q-btn round dense flat icon="expand_more"
                                               @click="decreaseStock"/>
                                    </div>
                                </template>
                                <template v-slot:hint>
                                    <div v-if="errors.has('stock')" class="text-red">
                                        {{errors.get('stock')}}
                                    </div>
                                </template>
                            </q-input>
                            <span class="text-grey-8" v-else>{{form['stock']}}</span>
                        </q-item-label>
                    </q-item-section>
                </div>
                <q-item-section class="" style="" top side v-if="hasAttributes">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="edit('stock')"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-item class="row items-center q-my-md">
                <div class="col-2">
                    <q-item-section top class="gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Price</q-item-label>
                    </q-item-section>
                </div>
                <div class="col-10 flex" style="height: 3.5rem;">
                    <q-item-section class="" style="">
                        <q-item-label>
                            <div v-if="editing('price')">
                                <q-input
                                    filled bottom-slots
                                    prefix="₦"
                                    v-model="form['price']"
                                    @input="calculateSalesPrice"
                                >
                                    <template v-slot:hint>
                                        <span :class="{ lineThrough: hasSalesPrice}">{{form['price'] | naira(false) }}</span>
                                        <div v-if="errors.has('price')" class="text-red">
                                            {{errors.get('price')}}
                                        </div>
                                    </template>
                                </q-input>
                            </div>
                            <span class="text-grey-8" :class="{ lineThrough: hasSalesPrice}"
                                  v-else>{{form['price'] | naira(false) }}</span>
                        </q-item-label>
                    </q-item-section>
                </div>
                <q-item-section class="" style="" top side v-if="hasAttributes">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="edit('price')"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-item class="row items-center q-my-md">
                <div class="col-2">
                    <q-item-section top class="col-1 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Sales Price</q-item-label>
                    </q-item-section>
                </div>
                <div class="col-10 flex" style="height: 3.5rem;">
                    <q-item-section class="" style="">
                        <q-item-label>
                            <q-input
                                v-if="editing('sales_price')"
                                filled bottom-slots
                                prefix="₦"
                                v-model="form['sales_price']"
                                @input="calculateSalesPrice">
                                <template v-slot:hint>
                                    <div class="q-mb-sm">
                                        {{form['sales_price'] | naira(false) }}
                                    </div>
                                    <div v-if="errors.has('sales_price')" class="text-red q-mb-md">
                                        {{errors.get('sales_price')}}
                                    </div>
                                    <div v-if="salesPriceTooHigh.value" class="text-red">
                                        {{salesPriceTooHigh.message}}
                                    </div>
                                </template>
                            </q-input>
                            <span class="text-grey-8"
                                  v-else>{{form.sales_price | naira(false) }}</span>
                        </q-item-label>
                    </q-item-section>
                </div>
                <q-item-section class="" style="" top side v-if="hasAttributes">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="edit"
                               @click="edit('sales_price')"></q-btn>
                    </div>
                </q-item-section>
            </q-item>
            <q-item class="row items-center" style="margin-top: 28px;">
                <div class="col-2">
                    <q-item-section top class="col-1 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Total Price</q-item-label>
                    </q-item-section>
                </div>
                <div class="col-10 flex">
                    <div class="flex column">
                        <q-item-section class="">
                            <div>
                            <span class="text-primary text-weight-bold">
                                {{this.form['total_price'] | naira(false)}}
                            </span>
                                <span class="relative-position">
                                (incl Tax)
                                <q-badge
                                    @click="revealTaxDetail"
                                    color="transparent"
                                    transparent
                                    floating class="badge cursor-pointer">
                                <q-icon name="info" color="primary"></q-icon>
                            <q-tooltip>Tax breakdown...</q-tooltip>
                            </q-badge>
                            </span>
                            </div>
                        </q-item-section>
                    </div>
                </div>
            </q-item>
            <q-item class="row items-center q-pa-none">
                <div class="col-2">

                </div>
                <div class="col-10 flex">
                    <div v-if="showTaxInfo">
                        <div class="q-mb-md">
                            <q-chip>
                                <span class="text-bold q-mx-sm"> {{taxOfPrice | naira(false)}} </span> of
                                <span class="text-primary q-mx-sm"> {{calculatedPrice | naira(false)}}
                                    (
                                    <span v-if="hasSalesPrice">Sales Price</span>
                                    <span v-else>Normal Price</span>
                                    )
                                </span>
                                using
                                <span class="text-weight-bold q-ml-sm"> {{tax.percent}} </span>
                                % Value Added Tax: (Federal VAT)
                            </q-chip>
                        </div>
                    </div>
                </div>
            </q-item>
            <q-item class="action-section">
                <q-item-section top class="q-mt-md col-4 gt-sm">
                    <q-btn class="q-ma-xs" color="primary" :label="buttonText" @click="save"
                           :loading="loading"></q-btn>
                </q-item-section>
                <q-item-section top class="q-mt-md col-3 gt-sm" v-if="editingFields.length > 0">
                    <q-btn class="q-ma-xs" color="red" label="Cancel" @click="cancel"></q-btn>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>
  import Requests from "../../../form/Requests";

  export default {
    props: ['propAttributes', 'metas', 'propProductID', 'attributeMutator'],
    components: {},
    mixins: [Requests],
    mounted() {
      this.tax = this.metas['taxes'].find(tax => tax['name'].toLowerCase() === "vat")
      if (this.propAttributes) {
        this.attributes = _.cloneDeep(this.propAttributes);
        this.form = _.cloneDeep(this.propAttributes);
        this.calculateTotalPrice()
      }
    },
    data() {
      return {
        salesPriceTooHigh: {
          'value': false,
          'message': "Sales price cannot be higher than normal price..."
        },
        showForm: false,
        tax: undefined,
        totalPrice: undefined,
        taxOfPrice: undefined,
        form: {
          'total_price':0,
          'price': 0,
          'stock': 0,
          'sales_price': 0,
          'attributes': {
            'colors': '',
            'size': '',
            'sizeName': 'Kilogram'
          }
        },
        attributes: {},
        editedFields: [],
        editingFields: [],
        sales_price_too_high: null,
        showTaxInfo: false
      }
    },
    methods: {
      clickToEdit(field) {
        this.editedFields.push(field);
      },
      editing(field) {
        if (!this.propAttributes) {
          return true
        }
        return this.editingFields.includes(field)
      },
      edit(field) {
        this.editingFields.push(field);
      },
      incomingEvent(data, field) {
        this.attributes[field] = data;
        this.editedFields.push(field);
      },
      save() {
        this.form['product_id'] = this.propProductID;
        this.form['tax_id'] = this.tax['id'];
        this.editedFields = [];
        if (this.salesPriceTooHigh.value) return this.showAlert();
        this.makeRequest("product-variants", {
          action: this.hasAttributes ? "patch" : "post",
          store: this.$store,
          mutator: this.attributeMutator,
          showResponseMessage: true,
          onSuccessCallback: () => {
            this.cancel();
            this.clearTaxInfo();
            this.clearAll();
          }
        })
      },
      calculateSalesPrice() {
        this.clearError('price');
        this.clearError('sales_price');
        let sales_price = Number.parseFloat(this.form['sales_price']);
        let price = Number.parseFloat(this.form['price']);
        this.salesPriceTooHigh.value = sales_price > price;
        this.calculateTotalPrice();
      },
      calculateTotalPrice() {
        let price = Number.parseFloat(this.form['sales_price']) || Number.parseFloat(this.form['price']);
        this.taxOfPrice = price * this.tax['point'];
        this.form['total_price'] = this.taxOfPrice + price;


      },
      revealTaxDetail(){
        this.showTaxInfo= !this.showTaxInfo;
        this.calculateTotalPrice()
      },
      clearTaxInfo() {
        this.taxOfPrice = null;
        this.totalPrice = null;
        this.showTaxInfo = false
      },
      clearError(field) {
        this.errors.clear(field)
      },
      cancel() {
        this.$nextTick(() => {
          this.form = _.cloneDeep(this.propAttributes);
        });
        this.editingFields = [];
      },
      increaseStock() {
        this.form['stock']++;
      },
      decreaseStock() {
        if (this.form['stock'] >= 1) {
          this.form['stock']--
        }
      },
      showAlert() {
        this.$q.dialog({
          title: 'Sales price is higher than normal price',
          message: 'Do you want to use sales price? If not, turn it to 0'
        })
      }
    },
    computed: {
      hasAttributes() {
        return _.isNotEmpty(this.propAttributes)
      },
      disableButton() {
        return this.editedFields.length === 0;
      },
      buttonColor() {
        return this.disableButton ? "grey" : "primary"
      },
      buttonText() {
        return this.hasAttributes ? "Edit Attributes" : "Create Attributes";
      },
      calculatedPrice() {
        return this.hasSalesPrice ? this.form['sales_price'] : this.form['price'];
      },
      hasSalesPrice(){
        return Number.parseFloat(this.form['sales_price']) > 0;
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
        justify-content: space-between;
        margin-top: 2rem;
    }

    .stock_count {
        display: flex;
        flex-direction: column;
    }

    .badge{
        top: -7px;
        right: -24px;
    }
    .color {
        .color__title {
            display: flex;
            align-items: center;
        }

        .color__picker {
            flex: 1;
            border: solid grey 5px;
            display: flex;
            justify-content: center;
            cursor: pointer;
            padding: 3px;
            align-items: center;
            margin-right: 1.2rem;
        }
    }
    .lineThrough{
        text-decoration: line-through;
    }
</style>
