<template>
    <div>
        <q-select
            filled
            v-model="selectedType"
            use-input
            @input="input"
            input-debounce="1000"
            label="Type"
            :options="filteredTypes"
            @filter="filter"
            :loading="loading"
            behavior="menu"
            autocomplete="false_material_type"
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
            <span class="text-primary" v-if="type">Current Type:</span><span class="text-black"> {{type}}</span>
        </div>
    </div>
</template>

<script>
  import Requests from "../../../../../form/Requests";

  export default {
    props: ['propType', 'saved','types'],
    mixins: [Requests],
    mounted() {
      this.options = this.types;
      this.type = this.propType;
    },
    data() {
      return {
        selectedType: '',
        type: '',
        options: [],
      }
    },
    methods: {
      filter(val, update) {
        this.selectedType = '';
        if (val === '') {
          update(() => {
            this.options = this.types
          });
          return
        }
        update(() => {
          const needle = val.toLowerCase();
          this.options = this.types.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        })
      },
      input() {
        let selectedTypeID = this.options.find((type) => type.name === this.selectedType).id;
        this.type = this.selectedType;
        this.$emit("materialTypeSelected", selectedTypeID, 'material_type_id');
      }
    },
    computed: {
      filteredTypes() {
        let options = [{'name': "None",'id': null}];
        this.options.forEach((option) => options.push(option));
        this.options = options;
        return this.options.map((a) => a.name)
      },
      material_types(){
        return []
      }
    }
  }

</script>
