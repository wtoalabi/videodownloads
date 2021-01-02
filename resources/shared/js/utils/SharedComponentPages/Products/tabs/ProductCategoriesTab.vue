<template>
    <div class="q-pa-md` row q-col-gutter-md">
        <div class="selected_category" v-if="selectedCategory.value">
            <span>{{selectedText}}:</span>
            <q-breadcrumbs class="text-grey" active-color="purple">
                <template v-slot:separator>
                    <q-icon
                        size="1.2em"
                        name="arrow_forward"
                        color="purple"
                    />
                </template>
                <q-breadcrumbs-el
                    :label="parent.name"
                    v-for="parent in selectedCategory.parents" :key="parent.id"/>
            </q-breadcrumbs>
        </div>
        <div v-else>
            Product has no category yet! <span class="text-primary">Start by selecting one below...</span>
        </div>
        <div class="primary-section">
            <div class="selector">
                <parent-category-selector
                    @selected="parent_selected">
                </parent-category-selector>
            </div>
            <div class="save-section">
                <q-btn :loading="loading" :disable="!newParentCategorySelected"
                       @click="saveCategory" label="Save Product Category"></q-btn>
            </div>
        </div>
    </div>
</template>

<script>
  import Requests from "../../../form/Requests";
  import ParentCategorySelector from "../../Categories/ParentCategory/ParentCategorySelector";

  export default {
    props: ['propCategory', 'propProductID','productMutator'],
    mixins: [Requests],
    components: {
      ParentCategorySelector
    },
    mounted() {
      this.setSelectedCategory(this.propCategory);
    },

    data() {
      return {
        selectedCategory: {
          new:'',
          parents:''
        },
        newParentCategorySelected: false
      }
    },
    methods: {
      parent_selected(category) {
        this.selectedCategory['new'] = category;
        this.newParentCategorySelected = true;
      },
      setSelectedCategory(category){
        this.selectedCategory = category;
      },
      saveCategory() {
        this.form['category'] = this.selectedCategory['new']['value'];
        this.makeRequest(`/product-categories/${this.propProductID}`, {
          action: "post",
          store: this.$store,
          mutator: this.productMutator,
          onSuccessCallback: ()=>{
            this.selectedCategory = ''
            this.setSelectedCategory(this.mainData.data.category)
          }
        });
      }
    },
    computed: {
      selectedText() {
        return this.newParentCategorySelected ? "Currently Selected Category" : "Current Category";
      }
    }
  }
</script>
<style lang="scss" scoped>
    .primary-section {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .selector {
            flex: 1;
        }

        .save-section {
            display: flex;
            align-items: flex-end;
        }
    }
    .selected_category{
        width: 100%;
    }
</style>
