<template>
    <div>
        <q-select
            filled
            v-model="selectedBrand"
            use-input
            @input="input"
            input-debounce="1000"
            label="Brand"
            :options="filteredBrands"
            @filter="filter"
            :loading="loading"
            behavior="menu"
            autocomplete="false_brand"
        >
            <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                        No results
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
        <div class="q-my-sm text-bold">
            <span class="text-primary" v-if="brand">Current Brand:</span><span class="text-black"> {{brand}}</span>
        </div>
    </div>
</template>

<script>
  import Requests from "../../../../../form/Requests";

  export default {
    props: ['propBrand', 'brands'],
    mixins: [Requests],
    mounted() {
      this.options = this.brands;
      this.brand = this.propBrand;
    },
    data() {
      return {
        selectedBrand: '',
        brand: '',
        options: [],
      }
    },
    methods: {
      filter(brandName, update) {
        this.form['brand_name'] = brandName;
        this.selectedBrand = '';
        if (brandName === '') {
          update(() => {

          });
          return
        }
        update(() => {
          this.searchBrands();
        })
      },
      searchBrands() {
        this.makeRequest("get-all-brands", {
          action: "post",
          showResponseMessage: false,
          onSuccessCallback: () => {
            this.loading = false;
            if(_.isNotEmpty(this.mainData.data)){
              this.options = this.mainData.data
            }
            this.disabled = false
          }
        })
      },
      input() {
        let selectedBrandID = this.options.find((brand) => brand.name === this.selectedBrand).id;
        this.brand = this.selectedBrand;
        this.$emit("brandSelected", selectedBrandID, 'brand_id');
      }
    },
    computed: {
      filteredBrands() {
        let options = [{'name': "None",'id': null}];
        this.options.forEach((option) => options.push(option));
        this.options = options;

        return this.options.map((a) => a.name)
      },
    }
  }

</script>
