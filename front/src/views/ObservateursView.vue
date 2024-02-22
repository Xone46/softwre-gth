<template>
    <div class="observateurs">

        <h1>Nouvel Appareil, Equipement, Ou Installation</h1>

        <!-- start errors -->
        <ul v-if="flagError">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <!-- Fin errors -->

        <label for="Date">
            <h3>Date : <span class="start" v-if="observateur.date.length == 0">*</span></h3>
            <input type="date" v-model="observateur.date">
        </label>

        <label for="Numéro d'affaire">
            <h3>Numéro d'affaire : <span class="start" v-if="interventions.numeroAffaire.length == 0">*</span></h3>
            <input type="text" v-model="interventions.numeroAffaire">
        </label>

        <label for="Numéro d'affaire">
            <h3>Numéro de Site : <span class="start" v-if="interventions.site.length == 0">*</span></h3>
            <input type="number" v-model="interventions.site">
        </label>

        <label for="Etablissement">
            <h3>Établissement : <span class="start" v-if="interventions.etablissement.length == 0">*</span></h3>
            <input type="text" v-model="interventions.etablissement">
        </label>

        <label for="Repère">
            <h3>Repère : <span class="start" v-if="interventions.repere.length == 0">*</span></h3>
            <input type="text" v-model="interventions.repere">
        </label>

        <label for="Adresse">
            <h3>Adresse : <span class="start" v-if="interventions.adresse.length == 0">*</span></h3>
            <input type="text" v-model="interventions.adresse">
        </label>

        <label for="Code Postal">
            <h3>Code Postal : <span class="start" v-if="interventions.codePostal.length == 0">*</span></h3>
            <input type="text" v-model="interventions.codePostal">
        </label>

        <label for="Ville">
            <h3>Ville : <span class="start" v-if="interventions.ville.length == 0">*</span></h3>
            <input type="text" v-model="interventions.ville">
        </label>

        <label for="Métier">
            <h3>Métier : <span class="start" v-if="interventions.metier.length == 0">*</span></h3>
            <select v-model="interventions.metier">
                <option v-for="metier in metiers" :key="metier">{{ metier }}</option>
            </select>
        </label>




        <button class="valider" @click="valider">Valider</button>
        <button class="anuller" @click="$emit('anuller')">Anuller</button>
    </div>
</template>
  
<script>


export default {
    name: 'ObservateursView',
    data() {
        return {

        }
    },

    components: {
    },

    methods: {


    },

    created() {
    }
}
</script>
  
<style scoped>
.observateurs {
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