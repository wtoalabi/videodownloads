<template>
    <div class="">
        <q-table
            :dense="$q.screen.xs"
            title="Reviews"
            :data="reviews"
            :columns="columns"
            row-key="id"
            :filter="filter"
            :loading="loading"
            loading-label="In a moment..."
            :pagination.sync="pagination"
            @request="paginateRequest"
            no-data-label="This product has no review, yet..."
            binary-state-sort
            :visible-columns="visibleColumns">
        </q-table>
    </div>
</template>

<script>
  import Requests from "../../../form/Requests";
  import pagination from "../../../form/pagination";

  export default {
    mixins: [Requests, pagination],
    data() {
      return {
        filter: '',
        listUrl: 'all-products',
        visibleColumns: ['customer', 'rating', 'review', 'order','date'],
        columns:[
          {
            name: 'customer',
            align: 'left',
            label: 'Customer',
            style: 'width:70px'
          },
          {
            name: 'rating',
            align: 'left',
            label: 'Rating',
            style: 'width:70px'
          },
          {
            name: 'review',
            align: 'left',
            label: 'Review',
            style: 'width:70px'
          },
          {
            name: 'order',
            align: 'left',
            label: 'Order',
            style: 'width:70px'
          },
          {
            name: 'date',
            align: 'left',
            label: 'Date',
            style: 'width:70px'
          },
        ],
      }
    },
    methods: {},
    computed: {
      reviews(){
        return [];
      }
    }
  }

</script>
