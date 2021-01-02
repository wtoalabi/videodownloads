<template>
  <div>
      <a class="link" v-if="phones.length>0" @click="show=true">View phone numbers</a>
      <span v-else> No phone on record</span>
      <q-dialog v-model="show" >
          <q-card>
              <q-card-section class="row items-center">
                  <div class="text-h6">Phone number(s)</div>
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section class="phones">
                  <div class="phone" v-for="phone in phones">
                        <q-icon name="phone" color="black"/>
                        <div class="number">{{phone.prefix}}-{{ phone.phone_number}}</div>
                      <q-icon v-if="phone.hotline" name="check_circle" color="green"/>
                      <div v-else>
                          <q-space />
                      </div>
                  </div>

              </q-card-section>
          </q-card>
      </q-dialog>
  </div>
</template>

<script>
  export default {
    props: ['phones'],
    data() {
      return {
        show:false
      }
    },
    methods: {},
    computed: {}
  }

</script>
<style lang="scss" scoped>
    .phones{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .phone{
            border: 1px black dotted;
            padding: .5rem;
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-evenly;
            margin: .5rem 0;
        }
    }
</style>
