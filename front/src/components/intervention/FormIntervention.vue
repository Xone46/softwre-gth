<template>
    <div class="form-intervention">

        <h1>Création d'une nouvelle d'intervention</h1>

        <label for="Date d'intervention">
            <h3>Date d'intervention : <span class="start" v-if="interventions.date.length == 0">*</span></h3>
            <input type="date" v-model="interventions.date">
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

import Interventions from "@/requests/Interventions"


export default {
    name: 'table-intervention',
    data() {
        return {
            interventions: {
                date : "",
                numeroAffaire : "",
                site : "",
                etablissement : "",
                repere : "",
                adresse : "",
                codePostal : "",
                ville : "",
                metier : ""
            },

            metiers : [
                "Electricite",
                "Levage",
                "Accessoires de Levage",
                "Ascenseur",
                "Escaliers Mécanique – Trottoirs Roulantes",
                "Machines Et Engins De Chantier",
                "Porte & Portail",
                "Quai Niveleur "
            ]
        }
    },

    components: {

    },

    methods: {

        valider() {
            console.log(this.intervention);
        }
    },

    created() {

        Interventions.read()
            .then((response) => {
                if (response) {
                    this.interventions = response.data.result;
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
}
</script>
  
<style scoped>
.form-intervention {
    width :100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items : center; 
}

.form-intervention label {
    width :80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items : flex-start; 
}
.form-intervention h3 {
    margin: 3px;
}

.form-intervention label input {
    width : 100%;
    height : 40px;
    margin-top : 5px;
    margin-bottom : 5px;
}
.form-intervention label select {
    width : 100%;
    height : 40px;
    margin-top : 5px;
    margin-bottom : 5px;
}



.form-intervention button {
    padding: 10px;
    width : 40%;
    height : 40px;
    color: white;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0px;
    border-radius: 5px;
}

.valider {
    background-color: #04AA6D;
    cursor: pointer;
}

.anuller {
    background-color: #f00e06;
    cursor: pointer;
}

.start {
    color: red;
}

</style>