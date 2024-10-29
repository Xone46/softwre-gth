<template>
  <div class="interventions">
    <FormIntervention v-if="flagFormIntervention" :interventionId="interventionId"  @anuller="closeFormIntervention" @table="closeFormIntervention" @close="close"/>
    <TableIntervention v-if="flagTableIntervention" @nouveau="openFormIntervention" @modifier="modifier" @apercu="apercu" @relaodTableObservateur="relaodTableObservateur" @deleteTableIntervention="deleteTableIntervention" />
    <TableObservateur v-if="flagTableObservateur" :interventionId="interventionId" @modifierObservateur="modifierObservateur" />
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
      interventionId: null,
      observateurId: null
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

    deleteTableIntervention() {
      this.flagTableObservateur = false;
      this.$nextTick(() => {
        this.flagTableObservateur = false;
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

    modifierObservateur(observateurId, interventionId) {
      this.$router.push({ name: "observateurs", params: { observateurId: observateurId, interventionId : interventionId } });
    },

    closeFormIntervention() {
      this.flagTableIntervention = true;
      this.flagFormIntervention = false;
      this.flagTableObservateur = true;
    },

    close() {
      this.flagTableIntervention = true;
      this.flagFormIntervention = false;
      this.flagTableObservateur = false;
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

.retour {
  width: 100%;
  display: flex;
  margin: 10px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center,
}

.retour button {
    padding: 10px;
    width : 100px;
    height : 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
    background-color: #e21608;
    cursor: pointer;
}

.retour button:hover {
    background-color: #910f06ad;
    cursor: pointer;
}

</style>