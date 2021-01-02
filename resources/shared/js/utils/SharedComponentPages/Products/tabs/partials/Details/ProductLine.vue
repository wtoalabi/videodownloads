<template>
    <div>
        <q-select
            filled
            v-model="selectedLine"
            use-input
            @input="input"
            label="Product Line"
            :options="filteredLines"
            @filter="filter"
            option-value="id"
            option-label="name"
            behavior="menu"
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
            <span class="text-primary" v-if="selectedLine.id">Currently Selected Product Line:</span>
            <span class="text-black"> {{selectedLine.name}}</span>
        </div>
    </div>
</template>

<script>
  import Requests from "../../../../../form/Requests";

  export default {
    props: ['product_line', 'prop_product_lines', 'saved'],
    mixins: [Requests],
    async mounted() {
        this.productLines = this.prop_product_lines
      if(this.product_line && _.isNotEmpty(this.productLines)){
        this.selectedLine = this.productLines.find(line=>line.id === this.product_line);
      }
    },
    data() {
      return {
        editing: false,
        selectedLine: {
          id:null
        },
        options: [],
        linesObject: {},
        productLines: [],
      }
    },
    watch: {
      saved: function () {
        this.editing = false
      },
    },
    methods: {
      filter(val, update) {
        if (val === '') {
          update(() => {
            this.options = this.productLines;
          })
          return
        }
        this.selectedLine = '';
          update(() => {
            const needle = val.toLowerCase()
            this.options = this.productLines.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
          })
      },
      clickToEdit() {
        this.editing = true
      },
      input(line) {
        this.$emit("lineSelected", line.id, 'product_line')
      },
    },
    computed: {
      filteredLines() {
        let options = [{'name': "None",'id': null}];
        this.options.forEach((option) => options.push(option));
        return options;
      },
    }
  }

</script>
