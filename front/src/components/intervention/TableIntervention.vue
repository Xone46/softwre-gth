<template>
    <div class="table-intervention">
        
        <h1>Interventions en cours</h1>
        <h2>Sites d'intervention</h2>

        <Spinner v-if="flagSpinner"/>

        <div class="sites">
            <table class="table-data" v-if="!flagSpinner">
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>N° Affaire</th>
                    <th>Site</th>
                    <th>Etablissement</th>
                    <th>Repère</th>
                    <th>Adresse</th>
                    <th>Code Postal</th>
                    <th>Ville</th>
                    <th>Métier</th>
                </tr>
                <tr v-for="intervention in interventions" :key="intervention._id">
                    <td><input type="checkbox" v-model="intervention._id"></td>
                    <td>{{ intervention.date }}</td>
                    <td>{{ intervention.numeroAffaire }}</td>
                    <td>{{ intervention.site }}</td>
                    <td>{{ intervention.etablissement }}</td>
                    <td>{{ intervention.repere }}</td>
                    <td>{{ intervention.adresse }}</td>
                    <td>{{ intervention.codePostal }}</td>
                    <td>{{ intervention.ville }}</td>
                    <td>{{ intervention.metier }}</td>
                </tr>
            </table>
        </div>
        <div class="actions">
            <button @click="$emit('nouveau')">Nouveau Site (Intervention)</button>
            <button>Modifier</button>
            <button>Supprimer</button>
        </div>

    </div>
</template>
  
<script>

import Interventions from "@/requests/Interventions"
import Spinner from 'vue-simple-spinner'

export default {
    name: 'table-intervention',
    data() {
        return {
            interventions: [],
            flagSpinner : true
        }
    },

    components: {
        Spinner
    },

    created() {

        Interventions.read()
            .then((response) => {
                if (response) {
                    this.flagSpinner = true;
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
.table-intervention {
    width: 100%;
}

.sites {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 200px;
    overflow-x: auto;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.table {
    padding: 0px;
    width: 100%;
    height: 300px;
}

.table-data {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
}

.table-data td,
.table-data th {
    border: 1px solid #ddd;
    padding: 8px;
}

.table-data tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table-data tr:hover {
    background-color: #ddd;
    cursor: pointer;
}

.table-data th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}

.textarea {
    width: 100%;
}

.actions {
    display: flex;
    flex-direction: row;
}

.actions button {
    margin-left: 5px;
    margin-right: 5px;
    padding: 10px;
    color: white;
    border: 0px;
    cursor: pointer;
    border-radius: 5px;
}

.actions button:nth-child(1) {
    background-color: #04AA6D;
}

.actions button:nth-child(2) {
    background-color: #dfe208;
}

.actions button:nth-child(3) {
    background-color: #e21608;
}
</style>