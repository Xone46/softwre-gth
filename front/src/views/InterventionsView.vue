<template>
  <div class="interventions">
    <FormIntervention v-if="flagFormIntervention" @anuller="closeFormIntervention()" @table="closeFormIntervention()" />
    <TableIntervention v-if="flagTableIntervention" @nouveau="openFormIntervention()" @apercu="apercu" />
    <TableObservateur v-if="flagTableObservateur" :interventionId="interventionId" />
  </div>
</template>

<script>

import FormIntervention from "@/components/intervention/FormIntervention.vue"
import TableIntervention from "@/components/intervention/TableIntervention"
import TableObservateur from "@/components/intervention/TableObservateur.vue"

export default {
  name: 'InterventionsView',
  data() {
    return {
      flagFormIntervention: false,
      flagTableIntervention: true,
      flagTableObservateur: true,
      interventionId: null
    }
  },

  components: {
    FormIntervention,
    TableIntervention,
    TableObservateur
  },

  methods: {

    apercu(value) {
      this.interventionId = value;
      this.flagTableObservateur = false;
      this.$nextTick(() => {
        this.flagTableObservateur = true;
      });
    },

    openFormIntervention() {
      this.flagTableIntervention = false;
      this.flagFormIntervention = true;
      this.flagTableObservateur = false;
    },

    closeFormIntervention() {
      this.flagTableIntervention = true;
      this.flagFormIntervention = false;
      this.flagTableObservateur = true;
    }

  },

  created() {
  }
}
</script>

<style scoped>
.interventions {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>