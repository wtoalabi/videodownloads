<template>
  <div class="">
      <q-table
          title=""
          :data="tickets"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :loading="loading"
          loading-label="In a moment..."
          :pagination.sync="pagination"
          :no-data-label=noTicketText
          @request="paginateRequest"
          binary-state-sort
      >
      </q-table>
  </div>
</template>

<script>
  import Requests from "../form/Requests";
  import pagination from "../form/pagination";

  export default {
    mixins:[Requests, pagination],
    props: ['tickets','owner'],
    data() {
      return {
        filter: '',
        columns: [{
          name: 'ticket_title',
          required: true,
          label: 'Ticket',
          align: 'left',
          sortable: true
        },{
          name: 'date',
          required: true,
          label: 'Date Created',
          align: 'left',
          sortable: true
        },{
          name: 'assigned_to',
          required: true,
          label: 'Assigned To',
          align: 'left',
          sortable: true
        },{
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
          sortable: true
        },
        ],
      }
    },
    methods: {},
    computed: {
      noTicketText(){
        return `${this.owner} has no ticket`
      }
    }
  }

</script>
