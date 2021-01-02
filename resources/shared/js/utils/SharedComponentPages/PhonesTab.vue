<template>
    <div>
        <q-table
            title=""
            :data="phones"
            :columns="columns"
            row-key="id"
            :filter="filter"
            :loading="loading"
            loading-label="In a moment..."
            :pagination.sync="pagination"
            :no-data-label="noPhoneText"
            @request="paginateRequest"
            binary-state-sort
        >
            <template v-slot:body-cell-phone_number="props">
                <q-td :props="props">
                    {{props.row.prefix}}-{{ props.row.phone_number}}
                </q-td>
            </template>

            <template v-slot:body-cell-hotline="props">
                <q-td :props="props">
                    <q-icon name="brightness_1" :color="defaultIconColor(props.row)"/>
                </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="table-actions">
                    <div>
                        <q-tooltip :content-style="toolTipStyle">Edit Phone</q-tooltip>
                        <q-icon @click="showPhoneEditForm(props.row)" name="edit" style="font-size: 1.4rem;" class="text-primary
                        table-actions__item"></q-icon>
                    </div>
                    <div>
                        <q-tooltip :content-style="toolTipStyle">Delete Phone</q-tooltip>
                        <q-icon @click="showPhoneDeleteForm(props.row.id)" name="delete" style="font-size: 1.4rem;" class="text-primary
                        table-actions__item"></q-icon>
                    </div>
                </q-td>
            </template>
        </q-table>
        <q-dialog v-model="confirmDeletePhone" persistent >
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="block" color="red" text-color="white" />
                    <span class="q-ml-sm">Do you really want to delete this phone?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn pushed outline label="Delete" color="primary" v-close-popup @click="deletePhone" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="showEditForm" persistent>
            <q-card style="width:40rem">

                <q-card-section class="row items-center">
                    <div class="col-3">
                    <q-select color="primary"
                              v-model="form.prefix"
                              :options="['+234']"
                              label="Prefix">
                    </q-select>
                        <div v-if="errors.has('prefix')" class="errorMsg">
                            {{errors.get('prefix')}}
                        </div>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-8">
                    <q-input v-model="form.phone_number" label="Phone Number" />
                        <div v-if="errors.has('phone_number')" class="errorMsg">
                            {{errors.get('phone_number')}}
                        </div>
                    </div>
                </q-card-section>

                <q-card-section class="row items-center">
                    <div>Hotline?</div>
                    <q-toggle
                        v-model="form.hotline"
                        color="green"
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn pushed outline label="Edit" color="primary" @click="editPhone" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
  import Requests from "../../utils/form/Requests";
  import pagination from "../../utils/form/pagination";

  export default {
    mixins: [Requests, pagination],
    props:['phones','mutator','owner'],
    data() {
      return {
        filter: '',
        confirmDeletePhone: false,
        toBeDeletedPhoneID: '',
        showEditForm: false,
        columns: [{
          name: 'phone_number',
          required: true,
          label: 'Phone Number',
          align: 'left',
          field: row => row.phone_number,
          format: val => `${val}`,
          sortable: true,
          style: 'width:30%'
        },
          {
          name: 'hotline',
          label: 'Hotline',
          align: 'center',
          style: 'width:60%'
        },
          {
          name: 'actions',
          label: 'Actions',
          align: 'center',
        },
        ],
        toolTipStyle: {width: '8rem', textAlign: 'center'},
      }
    },
    methods: {
      defaultIconColor(phone) {
        return phone.hotline ? 'green' : 'grey';
      },
      showPhoneEditForm(phone){
        this.form = _.cloneDeep(phone);
        this.showEditForm = true;
      },
      editPhone(){
        this.makeRequest("phones",{
          showInnerLoading: true,
          action: "patch",
          mutator: this.mutator,
          store: this.$store,
          onSuccessCallback :()=>{
            this.showEditForm = false;
          }
        })
      },
      deletePhone(){
        this.makeRequest(`phones/${this.toBeDeletedPhoneID}`,{
          showInnerLoading: true,
          action: "delete",
          mutator: this.mutator,
          store: this.$store,
          onSuccessCallback:()=>{
          }
        })
      },
      showPhoneDeleteForm(phoneID){
        this.confirmDeletePhone = true;
        this.toBeDeletedPhoneID = phoneID;
      },
    },
    computed: {
      noPhoneText(){
        return `${this.owner} has no phone on record...`
      }
    }
  }

</script>

