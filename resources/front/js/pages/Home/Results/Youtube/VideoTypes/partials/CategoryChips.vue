<template>
  <div>
      <div class="mt-4">
          <v-chip v-for="(category, index) in results.categories" :color="chipColor()"
                  :key="index">{{category}}
          </v-chip>
      </div>
  </div>
</template>

<script>
  export default {
    props: ['results'],
    data() {
      return {
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
    computed: {}
  }

</script>
