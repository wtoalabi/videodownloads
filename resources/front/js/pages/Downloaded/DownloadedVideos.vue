<template>
    <div class="downloaded_videos">
        <v-data-table
            :headers="headers"
            :items="videos"
            item-key="id"
            item-value="data"
            class="elevation-1"
            :search="search"
            :custom-filter="filterOnlyCapsText"
            loading-text="Loading Saved Videos..."
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
                    <v-img class="thumb" v-if="item.data.service !== 'facebook'" height="100%"
                           width="100%" style="margin: auto"
                           :src="item.data.thumb"></v-img>
                    <v-img
                        v-else
                        align="center"
                        width="60px"
                        style="margin: auto"
                        :src="getServiceLogo(item.data.service)">
                    </v-img>
                </div>
            </template>

            <template v-slot:item.video="{ item }">

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <a
                            v-bind="attrs"
                            v-on="on"
                            class="link"
                            @click.prevent="go(item.data.url)"
                            href="">{{item.data.title |
                            shorten(35)}}</a>
                        <a class="ml-2" :href="item.data.url" target="_blank">
                            <v-icon small>mdi-open-in-new</v-icon>
                        </a>
                    </template>
                    <span>{{item.data.title}}</span>
                </v-tooltip>
            </template>
            <template v-slot:item.time="{ item }">
                <span>{{item.data.time | format_date_from_timestamp}}</span>
            </template>

            <template v-slot:item.service="{ item }">
                <div class="img-container">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-img
                                align="center"
                                v-bind="attrs"
                                v-on="on"
                                :src="getServiceLogo(item.data.service)">
                            </v-img>
                        </template>
                        <span>{{item.data.service}}</span>
                    </v-tooltip>
                </div>
            </template>

            <template v-slot:item.uploader="{ item }">
                <a class="link"
                   target="_blank"
                   :href="item.data.uploader_url">{{item.data.uploader | shorten(40)}}</a>
            </template>

        </v-data-table>
    </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch("getVideosFromStore");
      this.$store.commit("fakeVideoData");
    },
    data() {
      return {
        videos: [],
        search: '',
        headers: [
          {
            text: '',
            align: 'center',
            sortable: false,
            value: 'thumb',
          }, {
            text: '',
            align: 'start',
            sortable: false,
            value: 'video',
            width: '300px'
          },
          {
            text: 'Date Accessed',
            align: 'center',
            sortable: true,
            value: 'time',
          }, {
            text: 'Service',
            align: 'center',
            sortable: false,
            value: 'service',
          },
          {
            text: 'Uploader',
            align: 'center' +
              '',
            sortable: false,
            value: 'uploader',
          },
        ]
      }
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        let title = item.data.title;
        if (title) {
          value = item.data.title.toString().toLowerCase();
          return search != null &&
            typeof search === 'string' &&
            value.toString().toLowerCase().indexOf(search) !== -1
        }
      },
      go(url) {
        this.$router.push({path: '/', query: {url: url}})
      },
      getServiceLogo(service) {
        return `${location.origin}/images/icons/${service}.svg`;
      }
    },
    watch: {
      downloaded_videos() {
        this.videos = this.downloaded_videos
      }
    },
    computed: {
      loading() {
        return this.$store.state.loading;
      },
      downloaded_videos() {
        return this.$store.state.video.downloaded
      }
    }
  }

</script>
<style scoped lang="scss">
    .thumb_container {
        width: 100px;
        margin: .5rem 0;

        .thumb {
            margin: .5rem 0;
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

    .facebook_container {

    }

</style>
