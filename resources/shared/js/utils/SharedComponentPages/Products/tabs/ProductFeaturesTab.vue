<template>
    <div>
        <div v-if="propProduct.features.length > 0">
            <h6 class="q-my-md">Current Features:</h6>
            <q-markup-table dark class="bg-grey-8">
                <thead>
                <tr>
                    <th class="text-left border" style="width: 250px">Feature</th>
                    <th class="text-left values-title">Values</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="feature in propProduct.features">
                    <td class="text-left border">
                        <div class="features__title">
                            <span class="features__title-name">{{feature.name}}</span>
                            <span class="features__title-type">Type: {{feature.type}}</span>
                            <span class="features__title-group"> Group: {{feature.group}}</span>
                        </div>
                    </td>
                    <td class="text-left">
                        <q-chip style="font-size: 0.75rem" v-for="(value, index) in feature.values"
                                :key="index">{{value}}
                        </q-chip>
                    </td>
                </tr>
                </tbody>
            </q-markup-table>
        </div>
        <h6 class="q-my-md">Add/Update Features:</h6>
        <q-select
            v-model="selectedFeatureGroup"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="groupOptions"
            option-value="id"
            option-label="name"
            @input="loadFeatureType"
            @filter="filterGroups"
            hint="Select a relevant Feature Group"
            label="Feature Group"
        >
            <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                        No results
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
        <q-select
            v-if="featureTypes.length>0"
            v-model="selectedFeatureType"
            fill-input
            input-debounce="0"
            :options="featureTypes"
            option-value="id"
            option-label="name"
            @input="loadFeatureList"
            label="Feature Type"
            hint="Select a feature type depending on the product"
        >
            <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                        No results
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
        <div class="spinning">
            <q-spinner-hourglass
                class="spinner"
                color="primary"
                size="2em"
                v-if="loading"
            />
        </div>
        <div v-if="showFeatureList" class="q-my-lg">
            <q-tree class="col-12 col-sm-6"
                    ref="selected_features"
                    :nodes="featuresList"
                    node-key="label"
                    no-nodes-label="..."
                    :ticked.sync="ticked"
                    @update:ticked="featureTicked"
                    tick-strategy="leaf"
                    accordian
            />
        </div>
        <div class="row justify-between q-my-lg">
            <div align="left" class="text-red">
                <q-btn label="Remove All Features" @click="confirmDelete=true" v-if="hasFeatures"/>
            </div>
            <div align="right" class="text-primary">
                <q-btn outline label="Save Features" @click="save"
                       :disable="!hasTickedFeature"/>
            </div>
        </div>
        <q-dialog v-model="confirmDelete" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="block" color="red" text-color="white"/>
                    <span class="q-ml-sm">Do you really want to remove all features?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup/>
                    <q-btn pushed outline label="Delete" color="primary" v-close-popup
                           @click="removeAll"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
  import Requests from "../../../form/Requests";

  export default {
    props: ['propProduct', 'featureGroupMutator', 'productMutator'],
    mixins: [Requests],
    components: {},
    mounted() {
      this.getFeaturesGroup();
      this._mergeCurrentFeatures();
    },
    data() {
      return {
        confirmDelete : false,
        selectedType: '',
        hasTickedFeature: false,
        expanded: [],
        ticked: [],
        selectedFeatureType: [],
        selectedFeatureGroup: [],
        featureTypes: [],
        featuresList: [],
        groupOptions: this.featureGroupTypes,
        newTicked: [],
        mergedFeatures: [],
        mergedCurrentFeatures: []
      }
    },

    methods: {
      featureTicked() {
        this.hasTickedFeature = true;
      },
      save() {
        this.form['features'] = {};
        this.form['features'] = this.mapTickedFeatures();
        this.form['product_id'] = this.propProduct['id'];
        this.form['feature_types_id'] = this.selectedType['id'];
        this.makeRequest("product_features", {
          action: "patch",
          showResponseMessage: true,
          store: this.$store,
          mutator: this.productMutator,
          onSuccessCallback: () => {
            if(this.remove){
              this.remove = false;
              this.selectedFeatureGroup = [];
              this.featureTypes = [];
              this.featuresList = [];
              this.ticked = [];
            }
            this.$store.state.scrollTop();
            this.hasTickedFeature = false;
            this.$nextTick(() => {
              if (this.$refs.selected_features) {
                this.$refs.selected_features.collapseAll();
              }
            })
          }
        });
      },
      removeAll(){
        this.form['removeAll'] = true;
        this.remove = true;
        this.save();
      },
      getFeaturesGroup() {
        this.makeRequest("feature-group-types", {
          action: "get",
          showResponseMessage: false,
          mutator: this.featureGroupMutator,
          store: this.$store,
        })
      },
      filterGroups(val, update) {
        update(() => {
          const needle = val.toLowerCase();
          this.groupOptions = this.featureGroupTypes.filter(v => v['name'].toLowerCase().indexOf(needle) > -1)
        })
      },
      loadFeatureType(group) {
        this.featureTypes = [];
        this.selectedFeatureType = [];
        this.featureTypes = this.featureGroupTypes.find(d => d.id === group.id).types;
      },
      loadFeatureList(type) {
        this.selectedType = type;
        this.form['type_id'] = type.id;
        this.featuresList = [];
        this.makeRequest("features-by-type", {
          action: 'post',
          showResponseMessage: false,
          onSuccessCallback: () => {
            this.featuresList = this.mainData;
            this.loading = false;
            this._mergeAllFeatures();
            this.ticked = []
          }
        })
      },
      _mergeAllFeatures() {
        this.featuresList.forEach((feature) => {
          this.mergedFeatures.push(...feature.children)
        })
      },
      _mergeCurrentFeatures() {
        this.propProduct.features.forEach(feature => {
          if (feature) {
            this.mergedCurrentFeatures.push(...feature.values);
          }
        });
        this.ticked = this.mergedCurrentFeatures;
      },
      _fillTickedFeatures({filterLabel = true} = {}) {
        let result = [];
        this.mergedFeatures.find(feature => {
          if (this.ticked.includes(feature['label'])) {
            result.push(filterLabel ? feature['label'] : feature)
          }
        });
        return result;
      },

      mapTickedFeatures() {
        let features = {};
        let ticked = this._fillTickedFeatures({filterLabel: false});
        ticked.forEach(function (node) {
          let key = node.key.split("_")[0];
          if (!features[key]) {
            features[key] = {'values': []}
          }
          _.uniq(features[key]['values'].push(node.label))
        });
        return features;
      }
    },
    computed: {
      featureGroupTypes() {
        return this.$store.state.features.group_types
      },
      showFeatureList() {
        return _.isNotEmpty(this.selectedFeatureType);
      },
      hasFeatures(){
        return _.isNotEmpty(this.propProduct.features)
      }
    }
  }

</script>

<style scoped lang="scss">
    .spinning {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .values-title {
        padding: 0 5rem;
    }

    .border {
        border-right: grey 1px solid !important;
    }

    .features__title {
        display: flex;
        flex-direction: column;

        .features__title-name {
            font-size: 1rem;
        }

        .features__title-type, .features__title-group {
            font-size: .6rem;
            color: #eee;
        }
    }
</style>
