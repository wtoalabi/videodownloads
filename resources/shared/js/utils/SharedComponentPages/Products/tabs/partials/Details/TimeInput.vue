<template>
    <div class="date-row">
     <span v-if="showTitle" class="date-title">Active {{type}}</span>
    <q-input filled v-model="date">
        <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale" ref="qDateProxy">
                    <q-date v-model="date" :mask="mask" @input="changeDate"></q-date>
                </q-popup-proxy>
            </q-icon>
        </template>

        <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer" v-if="!onlyDate">
                <q-popup-proxy transition-show="scale" transition-hide="scale" ref="qTimeProxy">
                    <q-time v-model="date" mask="YYYY-MM-DD HH:mm:ss"  @input="changeTime"></q-time>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
    </div>
</template>

<script>
  export default {
    props:['timestamp','field','showTitle','onlyDate'],

    data() {
      return {
        date: this.timestamp,
      }
    },
    watch:{
      timestamp: function () {
        this.date = this.timestamp
      }
    },
    methods: {
      changeDate(value) {
        this.emit(value);
        return this.$refs.qDateProxy.hide();
      },
      changeTime(value) {
        this.emit(value);
        return this.$refs.qTimeProxy.hide();
      },
      emit(value){
        this.$emit("dateSelected", value, this.field);
      }
    },
    computed: {
      mask(){
        return this.onlyDate ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"
      },
      type(){
        return this.field === 'to_date' ? "Till" : "From"
      }
    }
  }

</script>
<style lang="scss" scoped>
    .date-row{
        display: flex;
        align-items: center;
        .date-title{
            padding: 1rem;
            font-weight: 900;
        }
    }
</style>
