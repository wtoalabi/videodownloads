<template>
    <div>
        <div class="no-license" v-if="propProduct.licenses.length < 1">
            <div class="">
                Product has no license...
            </div>
            <div v-if="showForm">
                <new-license-form
                    :propProduct="propProduct"
                    :productMutator="productMutator"
                ></new-license-form>
            </div>
        </div>
        <div v-else>
            <new-license-form
                v-if="showForm"
                class="flex justify-end"
                :propProduct="propProduct"
                :productMutator="productMutator"
            ></new-license-form>
            <q-list :disabled="disableLicense(license)" class="rounded-borders q-mt-sm license"
                    style="max-width: 100%" v-for="(license, index) in propProduct.licenses"
                    :key="index">
                <q-item>
                    <q-item-section top class="gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold license-title"> {{`License
                            #${index+1}`}}
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">License Description
                        </q-item-label>
                    </q-item-section>

                    <q-item-section style="flex:4">
                        <q-item-label>
                            <q-input
                                v-if="editing('description',license)"
                                v-model="license.description"
                                filled
                                autogrow></q-input>
                            <span class="text-grey-8" v-else>{{license.description}}</span>
                        </q-item-label>
                    </q-item-section>

                    <q-item-section style="flex:1" top side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="12px" flat dense round icon="edit"
                                   @click="edit('description',license)"></q-btn>
                        </div>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Licensor Details
                        </q-item-label>
                    </q-item-section>

                    <q-item-section style="flex:4">
                        <q-item-label>
                            <q-input
                                v-if="editing('licensor_details',license)"
                                v-model="license.licensor_details"
                                filled
                                autogrow></q-input>
                            <span class="text-grey-8" v-else>{{license.licensor_details}}</span>
                        </q-item-label>
                    </q-item-section>

                    <q-item-section style="flex:1" top side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="12px" flat dense round icon="edit"
                                   @click="edit('licensor_details',license)"></q-btn>
                        </div>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Starts from:
                        </q-item-label>
                    </q-item-section>

                    <q-item-section style="flex:4">
                        <q-item-label>
                            <time-input :onlyDate="true" v-if="editing('from_date',license)"
                                        field="from_date"
                                        :timestamp="license.from_date_normal"
                                        @dateSelected="incomingDate">
                            </time-input>

                            <div class="" v-else>
                                {{license.from_date}}
                            </div>

                        </q-item-label>
                    </q-item-section>

                    <q-item-section style="flex:1" top side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="12px" flat dense round icon="edit"
                                   @click="edit('from_date',license)"></q-btn>
                        </div>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Until:
                        </q-item-label>
                    </q-item-section>

                    <q-item-section style="flex:4">
                        <q-item-label>
                            <time-input :onlyDate="true" v-if="editing('to_date',license)"
                                        field="to_date"
                                        :timestamp="license.to_date_normal"
                                        @dateSelected="incomingDate">
                            </time-input>

                            <div class="" v-else>
                                {{license.to_date}}
                            </div>

                        </q-item-label>
                    </q-item-section>

                    <q-item-section style="flex:1" top side>
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="12px" flat dense round icon="edit"
                                   @click="edit('to_date',license)"></q-btn>
                        </div>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Uploaded on
                        </q-item-label>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>
                            <span class="text-grey-8">{{license.created_at}}</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">Updated on
                        </q-item-label>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>
                            <span class="text-grey-8">{{license.updated_at}}</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm text-weight-bold">License File
                        </q-item-label>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>
                            <span class="text-grey-8"></span>
                            <q-chip v-if="license.extension" clickable color="teal" text-color="white"
                                    icon="cloud_download"><a @click="downloadFile" class="downloader" :href="license.path">License.{{license.extension}}</a>
                            </q-chip>
                            <div v-else>No File Uploaded</div>
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section top class="q-mt-md col-2 gt-sm action-button">
                        <div>
                            <q-dialog v-model="confirmDelete" persistent>
                                <q-card>
                                    <q-card-section class="row items-center">
                                        <q-avatar icon="block" color="red" text-color="white"/>
                                        <span class="q-ml-sm">Do you really want to delete this license?</span>
                                    </q-card-section>

                                    <q-card-actions align="right">
                                        <q-btn flat label="Cancel" color="primary" v-close-popup/>
                                        <q-btn pushed outline label="Delete" color="primary" v-close-popup
                                               @click="deleteLicense(license.id)"/>
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>
                            <q-btn class="q-ma-xs" color="red" label="Delete License"
                                   @click="confirmDelete=true"
                                   :loading="loading">
                            </q-btn>
                        </div>
                        <div v-if="showSaveButton(license)">
                            <q-btn class="q-ma-xs" color="red-13" label="Cancel" flat
                                   @click="cancelSave"></q-btn>
                            <q-btn class="q-ma-xs" color="primary" label="Save License"
                                   @click="saveLicense"
                                   :loading="loading"></q-btn>
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </div>
</template>

<script>
  import Requests from "../../../form/Requests";
  import TimeInput from "./partials/Details/TimeInput";
  import NewLicenseForm from "./partials/License/NewLicenseForm";

  export default {
    props: ['propProduct', 'productMutator', 'licenseMutator','showForm'],
    mixins: [Requests],
    components: {TimeInput, NewLicenseForm},
    mounted() {
    },
    data() {
      return {
        currentLicense: '',
        currentField: '',
        clickedToEdit: false,
        editedFields: [],
        confirmDelete:false
      }
    },
    methods: {
      editing(field, license) {
        return this.editedFields.includes(field) && this.currentLicense.id === license.id
      },
      edit(field, license) {
        this.currentField = field;
        this.currentLicense = license;
        this.clickedToEdit = true;
        this.editedFields.push(field);
      },
      showSaveButton(license) {
        return license.id === this.currentLicense.id;
      },
      saveLicense() {
        this.form = this.currentLicense;
        this.form['product_id'] = this.propProduct.id
        this.makeRequest("licenses", {
          action: "patch",
          store: this.$store,
          mutator: this.licenseMutator,
          onSuccessCallback: () => {
            this.cancelSave();
            this.editedFields = []
          }
        })
      },
      disableLicense(license) {
        if (this.clickedToEdit) {
          return this.currentLicense.id !== license.id
        } else {
          return false;
        }
      },
      cancelSave() {
        this.clickedToEdit = false;
        this.currentLicense = '';
        this.currentField = '';
      },
      deleteLicense(licenseID){
        this.makeRequest(`licenses/${licenseID}`,{
          action: "delete",
          store: this.$store,
          mutator: this.productMutator,
        })
      },
      incomingDate(date, field) {
        this.currentLicense[field] = date
      },
      downloadFile(a) {
        a.target.click();
      },
    },
    computed: {}
  }

</script>
<style lang="scss" scoped>
    .downloader {
        text-decoration: none;
        color: white;
    }

    .no-license {
        border: 1px dotted;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-content: center;
        align-items: center;
    }

    .license {
        .license-title {
            font-size: 1.5rem;
            margin: .6rem 0;
        }

        padding: .5rem;
        margin: .5rem;
        border: 1px dotted;
        border-radius: 10px;
    }

    .action-button {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }
</style>
