<template>
    <div class="home">
        <div class="fill-height main">
            <v-spacer/>
            <v-row>
                <v-col
                    cols="12"
                    sm="8"
                    md="8"
                >
                    <v-text-field
                        color="black"
                        @input="processInput"
                        outlined
                        label="Paste/Type the video url..."
                        clearable
                        rounded
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-spacer/>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        video_url: ""
      }
    },
    methods: {
      processInput(text) {
        console.log(text, "TEXT")
      }
    },
    computed: {}
  }

</script>
<style scoped lang="scss">
    .home {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .row {
            display: flex;
            justify-content: center;
        }

        .main {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    }
</style>
