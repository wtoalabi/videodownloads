<template>
    <div>
        <q-btn elevated rounded color="primary" label="Add New License" class="q-my-lg"
               icon="add" @click="show"></q-btn>
        <q-dialog
            v-model="showModal"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down">
            <q-card :style="modalWidth" class="bg-primary text-white">
                <div>
                    <q-bar>
                        <q-space/>
                        <q-btn dense flat icon="minimize" @click="maximizedToggle = false"
                               :disable="!maximizedToggle">
                            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">
                                Minimize
                            </q-tooltip>
                        </q-btn>
                        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true"
                               :disable="maximizedToggle">
                            <q-tooltip v-if="!maximizedToggle"
                                       content-class="bg-white text-primary">
                                Maximize
                            </q-tooltip>
                        </q-btn>
                        <q-btn dense flat icon="close" v-close-popup>
                            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                        </q-btn>
                    </q-bar>
                    <q-card-section class="form">
                        <div><h3 class="text-primary q-mb-lg">New License</h3></div>
                        <div class="row">
                            <div class="col-6">
                                <q-input type="textarea"
                                         :autofocus="!this.form.description"
                                         @input="errors.clear('description')"
                                         :class="{'is-invalid': errors.has('description')}"
                                         clearable filled color="primary"
                                         v-model="form.description" label="Description"
                                />
                                <div v-if="errors.has('description')" class="errorMsg">
                                    {{errors.get('description')}}
                                </div>
                            </div>
                            <div class="col-5 offset-1">
                                <q-input type="textarea"
                                         @input="errors.clear('licensor_details')"
                                         :class="{'is-invalid': errors.has('licensor_details')}"
                                         clearable clear-icon="close" filled color="primary"
                                         v-model="form.licensor_details" label="Licensor Details"
                                />
                                <div v-if="errors.has('licensor_details')" class="errorMsg">
                                    {{errors.get('licensor_details')}}
                                </div>
                            </div>
                        </div>
                        <div class="row q-my-lg">
                            <div class="col-6">
                                <div class="row justify-between">
                                    <h6 class="text-black text-size">License Starts From:</h6>
                                    <div>
                                    <time-input :onlyDate="true"
                                                field="from_date"
                                                class="time-picker"
                                                style="width: 18.6rem"
                                                :timestamp="form.from_date_normal"
                                                @dateSelected="incomingDate">
                                    </time-input>
                                        <div v-if="errors.has('from_date')" class="errorMsg">
                                            {{errors.get('from_date')}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5 offset-1">
                                <div class="row justify-between">
                                    <h6 class="text-black text-size">License Stays Active Until:</h6>
                                    <div>
                                    <time-input :onlyDate="true"
                                                field="to_date"
                                                :timestamp="form.from_date_normal"
                                                @dateSelected="incomingDate">
                                    </time-input>
                                        <div v-if="errors.has('to_date')" class="errorMsg">
                                            {{errors.get('to_date')}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row q-my-lg">
                            <div class="col-6">
                                <div class="row justify-between">
                                    <h6 class="text-black flex items-center text-size">Upload a license:</h6>
                                    <q-uploader
                                        @added="licenseUploaded"
                                        multiple
                                        batch
                                        style="max-width: 300px; color:black"
                                    />
                                </div>
                            </div>
                            <div class="col-5 offset-1">
                                <div class="row justify-end content-end full-height">
                                    <q-btn flat color="primary" label="Cancel" v-close-popup
                                           @click="cancel"/>
                                    <q-btn outline color="primary" label="Create License"
                                           @click="addLicense" :loading="loading"/>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-actions align="right" class="text-primary">

                    </q-card-actions>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
  import Requests from "../../../../../form/Requests";
  import TimeInput from "../Details/TimeInput";

  export default {
    props: ['propProduct','productMutator'],
    mixins: [Requests],
    components: {TimeInput},
    data() {
      return {
        showModal: false,
        maximizedToggle: true,
        uploadedLicense: []
      }
    },
    methods: {
      show() {
        this.showModal = true;
        this.$nextTick(() => {
          let timepicker = document.querySelector('.time-picker > div');
          if (timepicker) {
            timepicker.style.width = "100%"
          }
        })
      },
      beforeHide() {
      },
      incomingDate(date,type) {
        this.form[type] = date;

      },
      licenseUploaded(uploaded){
        this.uploadedLicense = [];
        uploaded.forEach((each)=>{
          this.uploadedLicense.push(each)
        });
      },
      addLicense() {
        let formData = this.prepareFormData();
        this.makeRequest("licenses",{
          data: formData,
          action: "post",
          store: this.$store,
          mutator: this.productMutator,
          onSuccessCallback:()=>{
            this.showModal = false
          }
        })
      },
      cancel() {
        this.$emit("hide")
      },
      prepareFormData(){
        let formData = new FormData();
        for (let i = 0; i < this.uploadedLicense.length; i++) {
          formData.append('license', this.uploadedLicense[i]);
        }
        formData.append('product_id', this.propProduct.id);
        this.form['description'] ? formData.append('description', this.form['description'] ) : null;
        this.form['licensor_details'] ? formData.append('licensor_details', this.form['licensor_details']): null;
        this.form['from_date'] ? formData.append('from_date', this.form['from_date']): null;
        this.form['to_date'] ? formData.append('to_date', this.form['to_date']): null;

        return formData;
      },
    },
    computed: {
      modalWidth() {
        return this.$store.state.modalWidth();
      },
    }
  }

</script>
<style scoped>
    .form {
        background: white;
    }
    .text-size{
        font-size: 1.1rem;
    }
</style>
