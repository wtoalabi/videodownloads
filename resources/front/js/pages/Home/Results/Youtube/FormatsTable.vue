<template>
    <v-data-table
        :headers="headers"
        :items="formats"
        class="elevation-1"
        hide-default-footer
        disable-sort
    ></v-data-table>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Format',
            align: 'start',
            sortable: false,
            value: 'format',
          },
          { text: 'Download', value: 'download' },
          { text: 'Size', value: 'size' },
        ],
        formats: [
          {
            format: 'Frozen Yogurt',
            download: 159,
            fat: 6.0,
            size: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            format: 'Ice cream sandwich',
            download: 237,
            fat: 9.0,
            size: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            format: 'Eclair',
            download: 262,
            fat: 16.0,
            size: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            format: 'Cupcake',
            download: 305,
            fat: 3.7,
            size: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            format: 'Gingerbread',
            download: 356,
            fat: 16.0,
            size: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            format: 'Jelly bean',
            download: 375,
            fat: 0.0,
            size: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            format: 'Lollipop',
            download: 392,
            fat: 0.2,
            size: 98,
            protein: 0,
            iron: '2%',
          },
          {
            format: 'Honeycomb',
            download: 408,
            fat: 3.2,
            size: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            format: 'Donut',
            download: 452,
            fat: 25.0,
            size: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            format: 'KitKat',
            download: 518,
            fat: 26.0,
            size: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
  }
</script>
