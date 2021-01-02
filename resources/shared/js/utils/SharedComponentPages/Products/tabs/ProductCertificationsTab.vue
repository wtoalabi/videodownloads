<template>
    <div class="q-pa-md column q-col-gutter-md">
        <q-option-group
            class="group-option"
            v-model="list"
            :options="certifications"
            color="green"
            type="checkbox"></q-option-group>
        <div class="save-section">
            <q-btn color="primary" :loading="loading" @click="saveCertifications" label="Save Certifications"></q-btn>
        </div>
        </div>
</template>

<script>
  import Requests from "../../../form/Requests";

  export default {
    props: ['propCertifications','propProductID','propProductCertifications','mutateProductCertification'],
    mixins:[Requests],
    mounted(){
      this.certifications = this.propCertifications;
      this.list = this.propProductCertifications.map(cert=>cert.id)
    },
    data() {
      return {
        list:[],
        certifications: []
      }
    },
    methods: {
      saveCertifications(){
        this.form['product_id'] = this.propProductID;
        this.form['certifications'] = this.list;
        this.makeRequest("product_certifications",{
          action: "patch",
          store: this.$store,
          mutator: this.mutateProductCertification
        })
      },
    },
    computed: {
    }
  }

</script>
<style lang="scss" scoped>
    .group-options{
        width: 100%;
        display: flex;
        flex-flow: row;
    }
    .group-options> div{
        width: 25%;
    }
    .save-section{
        display: flex;
        justify-content: flex-end;
    }
</style>
