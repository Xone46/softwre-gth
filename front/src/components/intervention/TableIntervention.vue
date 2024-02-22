<template>
    <div class="table-intervention">

        <h1>Interventions en cours</h1>
        <h2>Sites d'intervention</h2>

        <Spinner v-if="flagSpinner" />
        <Invertesment :msgInvertesment="msgInvertesment" v-if="flagInvertesment" />

        <div class="sites" v-if="!flagSpinner && !flagInvertesment">
            <table class="table-data">
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
                    <td><input type="checkbox" v-model="interventionsSelect" :value="intervention._id" @input="event => this.text = event.target.value"></td>
                    <td>{{ new Date(intervention.date).toLocaleDateString() }}</td>
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
            <button v-if="!flagInvertesment" @click="apercu()">Aperçu</button>
            <button v-if="!flagInvertesment">Modifier</button>
            <button v-if="!flagInvertesment" @click="ajouter()">Ajouter</button>
            <button v-if="!flagInvertesment" @click="supprimer()">Supprimer</button>
        </div>
        <Verified v-if="flagVerified" @confirmer="confirmer" @retirer="retirer" />
    </div>
</template>
  
<script>

import Interventions from "@/requests/Interventions"
import Spinner from 'vue-simple-spinner'
import Invertesment from "@/components/models/Invertesment.vue"
import Verified from "@/components/models/Verified.vue"
export default {
    name: 'table-intervention',
    data() {
        return {
            
            flagVerified: false,
            interventions: [],
            interventionsSelect: [],
            flagSpinner: true,
            flagInvertesment: false,
            msgInvertesment: null
        }
    },

    components: {
        Spinner,
        Invertesment,
        Verified
    },

    methods: {

        ajouter() {
            this.$router.push("/observateurs").catch(() => { });
        },

        apercu() {
            if (this.interventionsSelect.length === 1) {
                this.$emit('apercu', this.interventionsSelect[0]);
            }
        },

        supprimer() {

            if (this.interventionsSelect.length === 1) {
                this.flagVerified = true;
            }
        },

        confirmer() {
            Interventions.delete(this.interventionsSelect[0])
                .then(() => {

                    for (let i = 0; i < this.interventions.length; i++) {
                        if (String(this.interventions[i]._id) === String(this.interventionsSelect[0])) {
                            this.interventions.splice(i, 1);
                            break;
                        }
                    }

                    this.flagVerified = false;
                    this.interventionsSelect = [];

                })
                .catch((error) => {
                    console.log(error);
                });

        },

        retirer() {
            this.flagVerified = false;
        }
    },

    created() {

        Interventions.read()
            .then((response) => {
                // response succes
                this.flagSpinner = false;
                this.flagInvertesment = false;
                this.interventions = response.data;
            })
            .catch((error) => {
                // response error
                this.flagSpinner = false;
                this.flagInvertesment = true;
                this.msgInvertesment = error.response.data.msg;
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
    margin: 5px;
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
    background-color: #04AA6D;
}

.actions button:nth-child(3) {
    background-color: #04AA6D;
}
.actions button:nth-child(4) {
    background-color: #04AA6D;
}

.actions button:nth-child(5) {
    background-color: #e21608;
}
</style>