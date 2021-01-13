<template>
    <v-data-table
        :headers="headers"
        :items-per-page="formats.length"
        :items="formats"
        class="elevation-1"
        hide-default-footer
    >
        <template v-slot:item.format_id="{ item }">
            {{item.format_id}}
        </template>
        <template v-slot:item.height="{ item }">
            {{item.height}} / {{item.width}}
        </template>

        <template v-slot:item.download="{ item }">
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <a  target="_blank" :download="fileName" :href="item.url">
                        <v-icon>mdi-download</v-icon>
                    </a>
                </template>
                <span>You can click to download or right click to copy the link to your clipboard</span>
            </v-tooltip>
        </template>

    </v-data-table>
</template>
<script>
  //const byteSize = require('byte-size')
  import byteSize from 'byte-size'

  export default {
    mounted() {
    },
    props: {
      propFormats: {
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        headers: [
          {
            text: 'Format',
            align: 'start',
            sortable: false,
            value: 'format_id',
            width: '30%'
          },{
            text: 'Width/Width',
            align: 'start',
            sortable: false,
            value: 'height',
            width: '30%'
          },
          {text: 'Download', align: 'center', value: 'download', sortable: false},
        ],
      }
    },
    methods: {
      downloadVideo(item) {

        let anchor = document.createElement('a');
        anchor.href = item.url;
        anchor.target = '_blank';
        anchor.download = this.fileName;
        anchor.click();
      },
      formatSize(size) {
        let fSize = byteSize(size)
        return `${fSize.value} ${fSize.unit}`
      },
      getFormatType(type) {
        let selectedType = this.formatTypes[type];
        return selectedType || "Unknown";
      },
      getFormatTypeColor(type) {
        let selectedType = this.formatTypes[type];
        return selectedType === "Audio" ? "#E1BEE7" : selectedType === "Video" ? "#EF9A9A" : "grey"
      },
    },
    computed: {
      fileName() {
        return this.$store.state.video.results.title;
      },
      sortedFormats() {
        return _.orderBy(this.propFormats, ['filesize'], ['desc']).filter(function (format) {
          return format.filesize > 1;
        })
      },
      formats() {
        return this.propFormats;
        //return this.sortedFormats;
      },
    }
  }
</script>
<style scoped lang="scss">
    .expanded_column {
        display: flex;
        justify-content: space-evenly;
    }
</style>
