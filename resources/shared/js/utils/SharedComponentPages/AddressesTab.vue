<template>
    <div>
        <q-table
            title=""
            :data="addresses"
            :columns="columns"
            row-key="id"
            :filter="filter"
            :loading="loading"
            loading-label="In a moment..."
            :pagination.sync="pagination"
            :no-data-label="noAddressText"
            @request="paginateRequest"
            :visible-columns="visibleColumns"
            binary-state-sort
        >
            <template v-slot:top>
                <div class="table-top">
                    <q-select
                        v-model="visibleColumns"
                        multiple
                        outlined
                        dense
                        options-dense
                        :display-value="$q.lang.table.columns"
                        emit-value
                        map-options
                        :options="columns"
                        option-value="name"
                        style="min-width: 150px; margin-top: 0px"
                    />
                </div>
            </template>
            <template v-slot:body-cell-address="props">
                <q-td :props="props">
                    {{props.row.address | shorten(40)}}
                    <q-icon class="q-ml-sm" name="brightness_1"
                            :color="defaultIconColor(props.row.is_default)"/>
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="table-actions">
                    <div>
                        <q-tooltip :content-style="toolTipStyle">Edit Address</q-tooltip>
                        <q-icon @click="showAddressEditForm(props.row)" name="edit"
                                style="font-size: 1.4rem;" class="text-primary
                        table-actions__item"></q-icon>
                    </div>
                    <div>
                        <q-tooltip :content-style="toolTipStyle">Delete Address</q-tooltip>
                        <q-icon @click="showAddressDeleteForm(props.row.id)" name="delete"
                                style="font-size: 1.4rem;" class="text-primary
                        table-actions__item"></q-icon>
                    </div>

                </q-td>
            </template>
        </q-table>
        <q-dialog v-model="showEditForm" persistent>
            <q-card style="width:40rem">
                <q-card-section class="">
                    <q-item>
                        <q-item-section class="col-3">
                            <q-item-label class="q-mt-sm text-weight-bold">Address:</q-item-label>
                        </q-item-section>
                        <q-item-section class="col-9">
                            <q-item-label>
                                <q-input
                                    v-model="form.address"
                                    style="height: 5rem"
                                    filled
                                    type="textarea"
                                />
                                <div v-if="errors.has('address')" class="errorMsg">
                                    {{errors.get('address')}}
                                </div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-card-section>
                <q-card-section class="">
                    <q-item>
                        <q-item-section class="col-3">
                            <q-item-label class="q-mt-sm text-weight-bold">Additional Address:
                            </q-item-label>
                        </q-item-section>
                        <q-item-section class="col-9">
                            <q-item-label>
                                <q-input
                                    v-model="form.additional_address"
                                    filled
                                    style="height: 4rem"
                                    type="textarea"
                                />
                                <div v-if="errors.has('additional_address')" class="errorMsg">
                                    {{errors.get('additional_address')}}
                                </div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="col-3">
                            <q-item-label class="q-mt-sm text-weight-bold full-height column" style="justify-content: space-evenly">
                                <div>{{form.state}}</div>
                                <div>{{form.lga}}</div>
                            </q-item-label>
                        </q-item-section>
                        <q-item-section class="col-9">
                            <state-selector @selected="LGASelected"></state-selector>
                            <div v-if="errors.has('lga')" class="errorMsg">
                                {{errors.get('lga')}}
                            </div>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="col-3">
                            <q-item-label class="q-mt-sm text-weight-bold">City:
                            </q-item-label>
                        </q-item-section>
                        <q-item-section class="col-9">
                            <div class="row items-center">
                                <div class="col-6">
                                    <q-item-label>
                                        <q-input
                                            v-model="form.city"
                                            filled
                                        />
                                        <div v-if="errors.has('additional_address')" class="errorMsg">
                                            {{errors.get('additional_address')}}
                                        </div>
                                    </q-item-label>
                                </div>
                                <div class="col-5 q-ml-md">
                                    <span>Default?</span>
                                    <q-toggle
                                        v-model="form.is_default"
                                        color="green"
                                    />
                                </div>
                            </div>
                        </q-item-section>
                    </q-item>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup/>
                    <q-btn pushed outline label="Edit" color="primary" @click="editAddress"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="confirmDeleteAddress" persistent >
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="block" color="red" text-color="white" />
                    <span class="q-ml-sm">Do you really want to delete this address?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn pushed outline label="Delete" color="primary" v-close-popup @click="deleteAddress" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
  import Requests from "../form/Requests";
  import pagination from "../form/pagination";
  import StateSelector from "../../helpers/StateSelector";

  export default {
    props:['mutator','addresses','owner'],
    mixins: [Requests, pagination],
    components: {StateSelector},
    data() {
      return {
        selectedAddressID: '',
        confirmDeleteAddress: false,
        showEditForm: false,
        visibleColumns: ['address', 'state', 'city', 'lga', 'is_default', 'actions'],
        filter: '',
        columns: [
          {
            name: 'address',
            required: true,
            label: 'Address',
            align: 'left',
            field: row => row.address,
            format: val => `${val}`,
            sortable: true,
            style: 'width: 45%',
          },
          {
            name: 'additional_address',
            label: 'Additional Address',
            align: 'left',
            field: 'additional_address',
          }, {
            name: 'lga',
            label: 'LGA',
            required: true,
            align: 'left',
            field: 'lga',
            style: 'width: 13%',
          }, {
            name: 'state',
            label: 'State',
            align: 'left',
            required: true,
            style: 'width: 13%',
            field: 'state',
          }, {
            name: 'city',
            label: 'City',
            align: 'left',
            field: 'city',
            style: 'width: 13%',
            required: true,
          },
          {
            name: 'actions',
            label: 'Actions',
            required: true,
            align: 'center',
          },
        ],
        toolTipStyle: {width: '8rem', textAlign: 'center'},
      }
    },
    methods: {
      defaultIconColor(isDefault) {
        return !!isDefault ? 'green' : 'grey';
      },
      showAddressEditForm(address) {
        this.form = _.cloneDeep(address);
        this.showEditForm = true;
      },
      showAddressDeleteForm(address) {
        this.confirmDeleteAddress = true;
        this.selectedAddressID = address;
      },
      deleteAddress(){
        this.makeRequest(`address/${this.selectedAddressID}`,{
          showInnerLoading: true,
          mutator: this.mutator,
          action: "delete",
          store: this.$store,
          onSuccessCallback:()=>{
          }
        })
      },
      editAddress() {
        this.makeRequest("address",{
          showInnerLoading: true,
          action: "patch",
          mutator: this.mutator,
          store: this.$store,
          onSuccessCallback :()=>{
            this.showEditForm = false;
          }
        })
      },
      LGASelected(selectedObject) {
        this.form['lga'] = selectedObject['lga'];
        this.form['state'] = selectedObject['state'];
      }
    },
    computed:{
      noAddressText(){
        return `${this.owner} has no address on record...`
      }
    }
  }

</script>
