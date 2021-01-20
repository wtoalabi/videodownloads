<template>
  <div class="twitter_videos_table">
    <v-data-table
      show-expand
      :single-expand="true"
      :headers="headers"
      :items="videos"
      item-key="id"
      item-value="data"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      loading-text="Loading Videos..."
      :items-per-page="20"
      :loading="loading"
      disable-sort
      no-data-text="No Video Saved Yet..."
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>

      <template v-slot:item.thumb="{ item }">
        <div class="thumb_container">
          <v-img
            align="center"
            width="60px"
            style="margin: auto"
            :src="getServiceLogo('twitter')"
          >
          </v-img>
        </div>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="row">
            <v-chip v-for="(format, index) in item.formats" :key="index">
              <a :href="format.url" target="_blank">
                {{ format.format }}
              </a>
            </v-chip>
          </div>
        </td>
      </template>

      <template v-slot:item.title="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <a
              target="_blank"
              v-bind="attrs"
              v-on="on"
              :href="item.webpage_url"
              class=""
            >
              {{ item.title | shorten(35) }}</a
            >
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.timestamp="{ item }">
        <span>{{ item.timestamp | format_date_from_timestamp(1000) }}</span>
      </template>

      <template v-slot:item.uploader="{ item }">
        <a class="link" target="_blank" :href="item.uploader_url">{{
          item.uploader | shorten(40)
        }}</a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  mounted() {
    if (_.isNotEmpty(this.twitter_videos)) {
      this.videos = this.twitter_videos;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "",
          align: "center",
          sortable: false,
          value: "thumb",
        },
        {
          text: "",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "Date Uploaded",
          align: "center",
          sortable: true,
          value: "timestamp",
        },
        {
          text: "Uploader",
          align: "center",
          sortable: false,
          value: "uploader",
        },
        {
          text: "Download Links",
          value: "data-table-expand",
          width: "15%",
          align: "center",
        },
      ],
      videos: [],
      search: "",
    };
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      let title = item.title;
      if (title) {
        value = item.title.toString().toLowerCase();
        return (
          search != null &&
          typeof search === "string" &&
          value.toString().toLowerCase().indexOf(search) !== -1
        );
      }
    },
    getServiceLogo(service) {
      return `${location.origin}/images/icons/${service}.svg`;
    },
    go(url) {
      this.$router.push({ path: "/", query: { url: url } });
    },
  },
  watch: {
    twitter_videos() {
      this.videos = this.twitter_videos;
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    twitter_videos() {
      return this.$store.state.video.twitter_video_downloads;
    },
  },
};
</script>
<style scoped lang="scss">
.row {
  justify-content: space-around;
  margin: 0.51rem;

  span {
    cursor: pointer;
    margin: 0.2rem;
  }
}

.thumb_container {
  width: 100px;
  margin: 0.5rem 0;

  .thumb {
    margin: 0.5rem 0;
  }
}

.link {
  color: #447ff4 !important;
  font-weight: 900;
}

.img-container {
  margin: auto;
  justify-content: center;
  display: flex;
  width: 25%;
}
</style>
