<template>
  <div class="interventions">
    <div class="retour">
      <button @click="retour">Retour</button>
    </div>
    <FormIntervention v-if="flagFormIntervention" :interventionId="interventionId"  @anuller="closeFormIntervention()" @table="closeFormIntervention()" />
    <TableIntervention v-if="flagTableIntervention" @nouveau="openFormIntervention()" @modifier="modifier" @apercu="apercu" @relaodTableObservateur="relaodTableObservateur" />
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

    modifierObservateur(value) {
      this.observateurId = value;
      this.$router.push({ name: "observateurs", params: { observateurId: this.observateurId } });
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

.retour {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center
}

.retour button {
    padding: 10px;
    width : 40%;
    height : 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
    background-color: #04AA6D;
    cursor: pointer;
}

</style>