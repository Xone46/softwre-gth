<template>
  <div class="interventions">
    <FormIntervention v-if="flagFormIntervention" @anuller="closeFormIntervention()"/>
    <TableIntervention v-if="flagTableIntervention" @nouveau="openFormIntervention()"/>
  </div>
</template>

<script>

import FormIntervention from "@/components/intervention/FormIntervention.vue"
import TableIntervention from "@/components/intervention/TableIntervention"

export default {
  name: 'InterventionsView',
  data() {
    return {
        flagFormIntervention : false,
        flagTableIntervention : true
    }
  },

  components : {
    FormIntervention,
    TableIntervention
  },

  methods : {

    openFormIntervention() {
        this.flagTableIntervention = false;
        this.flagFormIntervention = true;
    },

    closeFormIntervention() {
        this.flagTableIntervention = true;
        this.flagFormIntervention = false;
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