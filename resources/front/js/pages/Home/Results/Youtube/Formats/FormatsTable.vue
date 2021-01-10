<template>
    <v-data-table
        :headers="headers"
        :items-per-page="formats.length"
        :items="formats"
        class="elevation-1"
        hide-default-footer
    >
        <template v-slot:item.format="{ item }">
            {{reformatFormatTitle(item.format)}}
        </template>

        <template v-slot:item.ext="{ item }">
            <div class="expanded_column">
                <v-chip small>{{item.ext}}</v-chip>
                <v-chip small :color="getFormatTypeColor(item.format_id)">
                    {{getFormatType(item.format_id)}}
                </v-chip>
            </div>
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

        <template v-slot:item.filesize="{ item }">
            {{formatSize(item.filesize)}}
        </template>
    </v-data-table>
</template>
<script>
  //const byteSize = require('byte-size')
  import byteSize from 'byte-size'

  export default {
    mounted() {
      console.log(this.formats);
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
            value: 'format',
            width: '30%'
          },
          {text: 'Ext/Type', align: 'center', value: 'ext', sortable: false, width: "30%"},
          {text: 'Download', align: 'center', value: 'download', sortable: false},
          {text: 'Size', value: 'filesize', align: 'center', sortable: true},
        ],
        formatTypes: {
          160: "Video",
          249: "Audio",
          250: "Audio",
          278: "Video",
          133: "Video",
          242: "Video",
          140: "Audio",
          251: "Audio",
          134: "Video",
          243: "Video",
          135: "Video",
          244: "Video",
          18: "Video",
          136: "Video",
          247: "Video",
          248: "Video",
          137: "Video",
          271: "Video",
          313: "Video",
          302: "Video",
          303: "Video",
          298: "Video",
          299: "Video",

        }
      }
    },
    methods: {
      downloadVideo(item) {
        console.log(item, "ITEM");

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
      reformatFormatTitle(format) {
        return format.split("-")[1].trim()
      },
      getFormatType(type) {
        let selectedType = this.formatTypes[type];
        return selectedType || "Unknown";
      },
      getFormatTypeColor(type) {
        let selectedType = this.formatTypes[type];
        return selectedType === "Audio" ? "#E1BEE7" : selectedType === "Video" ? "#EF9A9A" : "grey"
      },
      download() {
        axios({
          url: 'https://source.unsplash.com/random/500x500',
          method: 'GET',
          responseType: 'blob'
        })
          .then((response) => {
            const url = window.URL
              .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'image.jpg');
            document.body.appendChild(link);
            link.click();
          })
      }
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
        return this.sortedFormats;
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
