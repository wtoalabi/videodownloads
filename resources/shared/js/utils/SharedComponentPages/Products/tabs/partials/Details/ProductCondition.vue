<template>
    <div>
        <q-select
            filled
            v-model="selectedCondition"
            use-input
            @input="input"
            label="Condition"
            :options="filteredOptions"
            @filter="filter"
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
            <span class="text-primary"
                  v-if="selectedCondition">Currently Selected Condition:</span><span
            class="text-black"> {{selectedCondition}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['condition', 'saved'],
    mounted() {
      this.filteredOptions = this.options;
      if(this.condition){
        this.selectedCondition = this.condition
      }
    },
    data() {
      return {
        editing: false,
        selectedCondition: '',
        options: [
          'New',
          'Refurbished',
          'Used'
        ],
        filteredOptions:[]
      }
    },
    watch: {
      saved: function () {
        this.editing = false
      },
      condition: function () {
        this.selectedCondition = this.condition
      }
    },
    methods: {
      filter(val, update) {
        if (val === '') {
          update(() => {
            this.filteredOptions = this.options;
          })
          return
        }
        this.selectedCondition = '',
          update(() => {
            const needle = val.toLowerCase()
            this.filteredOptions = this.options.filter(v => v.toLowerCase().indexOf(needle) > -1)
          })
      },
      clickToEdit() {
        this.editing = true
      },
      input(condition) {
        this.$emit("conditionSelected", condition, 'condition')
      },
    },
    computed: {}
  }

</script>
