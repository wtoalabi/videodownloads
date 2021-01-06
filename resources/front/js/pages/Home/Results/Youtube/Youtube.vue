<template>
    <div :key="reload">
        <div v-if="hasResults">
            <v-row>
                <v-col cols="12" md="6">
                    <div class="mt-44">
                        <strong>{{results.title | shorten(90)}}</strong>
                    </div>
                    <div class="mt-4">
                        <v-chip v-for="(category, index) in results.categories" :color="chipColor()"
                                :key="index">{{category}}
                        </v-chip>
                    </div>
                    <div class="mt-4">
                        <strong>Uploaded By:</strong> <a class="text" :href="results.uploader_url">{{results.uploader}} </a>
                    </div>
                    <div class="mt-4">
                        <strong>Uploaded On:</strong> <span class="text">{{getFullDate}}</span>
                    </div>
                    <div class="mt-4">
                        <strong>Length:</strong> <span class="text">{{getFullLength}} minutes</span>
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="centered">
                    <v-img v-if="results.thumbnail" :src="results.thumbnail"></v-img>
                    <v-img width="50%" v-else src="/images/default_video_image.svg"></v-img>
                </v-col>
            </v-row>
            <v-row style="display: flex; justify-content: center">
                <v-col cols="12">
                    <formats-table/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>

  import FormatsTable from "./FormatsTable";

  export default {
    mounted() {
      console.log(this.results, "RESULT IN YOUTBE");
    },
    components: {FormatsTable},
    data() {
      return {
        reload: 0,
        chip_colors: [
          "#FF8A80",
          "#E3F2FD",
          "#EDE7F6",
          "#E1F5FE",
          "#E0F7FA",
          "#E0F2F1",
          "#FFF8E1",
          "#FFF3E0",
          "#ECEFF1",
          "#FBE9E7",
          "#FAFAFA"
        ]
      }
    },
    methods: {
      chipColor() {
        let rand = _.random(0, this.chip_colors.length);
        return this.chip_colors[rand];
      }
    },
    watch: {
      result() {
        this.reload++;
      }
    },
    computed: {
      hasResults() {
        return _.isNotEmpty(this.results);
      },
      results() {
        return this.$store.state.video.results
      },
      getFullDate() {
        let year = this.results.upload_date.substr(0, 4);
        let month = this.results.upload_date.substr(4, 2);
        let day = this.results.upload_date.substr(6, 2);
        return `${day} - ${month} - ${year}`;
      },
      getFullLength() {
        return (this.results.duration / 60).toFixed(2);
      }
    }
  }

</script>
<style scoped lang="scss">
    .centered {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .text {
        color: grey;
    }
</style>
