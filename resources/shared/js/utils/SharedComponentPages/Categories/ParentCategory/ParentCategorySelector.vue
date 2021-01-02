<template>
    <div style="max-width: 300px">
        <div class="q-gutter-md">
            <template v-for="child in parents">
                <component
                    is="single-category-selector"
                    :key="child"
                    :options="options[child]"
                    @selected="selected"
                ></component>
            </template>
            <q-spinner-hourglass
                class="spinner"
                color="primary"
                size="2em"
                v-if="loading"
            />
        </div>
    </div>
</template>

<script>

  import SingleCategorySelector from "./SingleCategorySelector";
  import Requests from "~/utils/form/Requests";

  export default {
    mixins: [Requests],
    mounted(){
      this.getTopCategories()
    },
    components:{SingleCategorySelector},
    data () {
      return {
        options: {},
        parents:[],
        selectedCategories: {},
        selectedCategory: {},
      }
    },

    methods: {
      selected(category){
        this.selectedCategory = category.value;
        this.filterCategories();
        this.$emit("selected",category);
        this.getCategoryChildren(category.value)

      },
      getTopCategories(){
        if(_.isEmpty(this.options.top)){
          this.request('top');
        }
      },
      getCategoryChildren(id){
        this.request(id)
      },
      request(categoryID){
        this.form['category'] = categoryID;
        this.makeRequest("/category-children",{
          action: 'post',
          showResponseMessage: false,
          onSuccessCallback: ()=>{
              this.options[categoryID] = this.mainData;
                this.loading =false;
            this.pushChildren(categoryID,this.mainData)
          },
        })
      },
      pushChildren(id,data){
        if(_.isNotEmpty(data)) {
          this.parents.push(id)
          this.selectedCategories[id] = data
        }
      },
      filterCategories(){
        for (let category in this.selectedCategories) {
          this.selectedCategories[category].forEach((each)=> {
            if (each.value === this.selectedCategory) {
              let indexOfSelectedCategory = this.parents.findIndex((parent)=>{
                return parent == category
              });
            if(indexOfSelectedCategory >= 0){
              this.parents.splice(indexOfSelectedCategory+1);
            }
            }
          })
        }
      }
    },
    computed:{
    }
  }
</script>
<style scoped>
    .spinner{
        display: flex;
        width: 100%;
        justify-content: center;
    }
</style>
