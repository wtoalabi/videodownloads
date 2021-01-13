<template>
    <div>
        <v-list-item
            style="top:-8px"
            key="/home"
            link
            to="/"
        >
            <v-list-item-content>
                <v-list-item-title class="menu-list-item">
                <v-icon :color="activeColor">mdi-home</v-icon>
                    <div class="menu_title">Home</div>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {}
    },
    methods: {},
    computed: {
      activeColor(){
        if(this.$route.name === "Home"){
          return 'red'
        }
        return 'grey'
      }
    }
  }

</script>
