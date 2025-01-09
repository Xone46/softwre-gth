<template>
    <div class="table-intervention">

        <div class="retour">
          <button @click="retour">Retour</button>
        </div>

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
                    <th>Pays</th>
                    <th>Métier</th>
                </tr>
                <tr v-for="intervention in interventions" :key="intervention._id">
                    <td><input type="checkbox" v-model="interventionsSelect" :value="intervention._id" @change="selectIntervention"></td>
                    <td>{{ new Date(intervention.date).toLocaleDateString() }}</td>
                    <td>{{ intervention.numeroAffaire }}</td>
                    <td>{{ intervention.site }}</td>
                    <td>{{ intervention.etablissement }}</td>
                    <td>{{ intervention.repere }}</td>
                    <td>{{ intervention.adresse }}</td>
                    <td>{{ intervention.codePostal }}</td>
                    <td>{{ intervention.ville }}</td>
                    <td>{{ intervention.pays }}</td>
                    <td>{{ intervention.metier }}</td>
                </tr>
            </table>
        </div>

        <div class="actions">
            <button class="nouveau" @click="$emit('nouveau')" v-show="interventionsSelect.length === 0">Nouveau Site (Intervention)</button>
            <button class="ajouter" v-show="!flagInvertesment && interventionsSelect.length === 1" @click="ajouter">Ajouter (Appareil, équipement, installation)</button>
            <button class="modifier" v-show="!flagInvertesment && interventionsSelect.length === 1" @click="modifier">Modifier</button>
            <button class="supprimer" v-show="!flagInvertesment && interventionsSelect.length === 1" @click="supprimer">Supprimer</button>
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

        retour() {
            this.$router.push("/dashboard").catch(()=>{});
        },

        selectIntervention() {

            if(this.interventionsSelect.length === 0) {
                this.$emit('deleteTableIntervention');
            } else {
                this.apercu();
            }

        },

        modifier() {
            if(this.interventionsSelect.length === 1) {
                return this.$emit("modifier", this.interventionsSelect[0]);
            }
        },

        ajouter() {
            if (this.interventionsSelect.length === 1) {
                this.$router.push({ name: "observateurs", params: { interventionId: this.interventionsSelect[0] }})
            }
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
                    this.$emit("relaodTableObservateur");

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


                if(response.data.interventions) {
                    this.flagSpinner = false;
                    this.flagInvertesment = false;
                    this.interventions = response.data.interventions;
                }

                if(response.data.msg) {
                    this.flagSpinner = false;
                    this.flagInvertesment = true;
                    this.msgInvertesment = response.data.msg;
                }



            })
            .catch((error) => {
                // response error
                this.flagSpinner = false;
                this.flagInvertesment = true;
                this.msgInvertesment = error.response.data;
            });

    }
}
</script>
  
<style scoped>

.table-intervention {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
}

.retour {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  padding: 0;
}

.retour button {
    padding: 0;
    margin: 0;
    width : 100px;
    height : 40px;
    color: white;
    border: 0px;
    border-radius: 5px;
    background-color: #e21608;
    cursor: pointer;
}

.table-intervention h1 {
    border: 3px solid #000000;
    margin: 0;
    padding: 5px;
}

.sites {
    padding: 0;
    margin: 0;
    width: 95%;
    height: 150px;
    overflow-x: auto;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.table {
    padding: 0px;
    width: auto;
    height: auto;
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
    background-color: #040faa;
    color: white;
}

.actions {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
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
    background-color: #ff6a00;
}

.actions button:nth-child(4) {
    background-color: #e21608;
}

</style>