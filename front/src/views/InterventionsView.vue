<template>
  <div class="interventions">
    <button @click="retour">Retour</button>
    <FormIntervention v-if="flagFormIntervention" :interventionId="interventionId" @anuller="closeFormIntervention()" @table="closeFormIntervention()" />
    <TableIntervention v-if="flagTableIntervention" @nouveau="openFormIntervention()" @modifier="modifier" @apercu="apercu" @relaodTableObservateur="relaodTableObservateur" />
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
      flagTableObservateur: false,
      interventionId: null
    }
  },

  components: {
    FormIntervention,
    TableIntervention,
    TableObservateur
  },

  methods: {

    relaodTableObservateur() {
      this.flagTableObservateur = false;
      this.$nextTick(() => {
        this.flagTableObservateur = true;
      });
    },

    retour() {
        this.$router.push("/dashboard").catch(()=>{});
    },

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

    modifier(value) {
      this.interventionId = value;
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