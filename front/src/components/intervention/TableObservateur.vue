<template>
    <div class="table-objet-observateur">

        <h2>Appareil(s), équipement(s) ou installation(s) du site</h2>

        <Spinner v-if="flagSpinner" />
        <Invertesment :msgInvertesment="msgInvertesment" v-if="flagInvertesment" />

        <div class="sites" v-if="!flagSpinner && !flagInvertesment">
            <table class="table-data">
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Mission</th>
                    <th>Constructeur</th>
                    <th>N° De Série</th>
                    <th>N° Interne</th>
                    <th>Localisation</th>
                    <th>Contrôle</th>
                </tr>
                <tr v-for="observateur in observateurs" :key="observateur._id">
                    <td><input type="checkbox" v-model="observateursSelect" :value="observateur._id"></td>
                    <td>{{ new Date(observateur.date).toLocaleDateString() }}</td>
                    <td>{{ observateur.typeVerification }}</td>
                    <td>{{ observateur.categorieAppareil }}</td>
                    <td>{{ observateur.constructeur }}</td>
                    <td>{{ observateur.numeroSerie }}</td>
                    <td>{{ observateur.numeroInterne }}</td>
                    <td>{{ observateur.localisation }}</td>
                    <td>{{ observateur.marquage }}</td>
                </tr>
            </table>
        </div>
        <div class="actions">
            <button v-if="!flagInvertesment" @click="editer()">Editer</button>
            <button v-if="!flagInvertesment" @click="supprimer()">Supprimer</button>
        </div>
        <Verified v-if="flagVerified" @confirmer="confirmer" @retirer="retirer" />
    </div>
</template>
  
<script>

import Observateurs from "@/requests/Observateurs"
import Spinner from 'vue-simple-spinner'
import Invertesment from "@/components/models/Invertesment.vue"
import Verified from "@/components/models/Verified.vue"
export default {
    name: 'table-observateur',
    data() {
        return {
            flagVerified: false,
            observateurs: [],
            observateursSelect: [],
            flagSpinner: true,
            flagInvertesment: false,
            msgInvertesment: null
        }
    },

    props: {
        interventionId: String
    },

    components: {
        Spinner,
        Invertesment,
        Verified
    },

    methods: {

        editer() {
            if (this.observateursSelect.length === 1) {
                this.$router.push({ name: "formulaire", params: { id: this.observateursSelect[0] }})
            }
        },

        supprimer() {

            if (this.observateursSelect.length === 1) {
                this.flagVerified = true;
            }
        },

        confirmer() {
            Observateurs.delete(this.observateursSelect[0])
                .then(() => {

                    for (let i = 0; i < this.observateurs.length; i++) {
                        if (String(this.observateurs[i]._id) === String(this.observateursSelect[0])) {
                            this.observateurs.splice(i, 1);
                            break;
                        }
                    }

                    this.flagVerified = false;
                    this.observateursSelect = [];

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


        if (!this.interventionId) {

            Observateurs.read()
                .then((response) => {
                    // response succes
                    this.flagSpinner = false;
                    this.flagInvertesment = false;
                    this.observateurs = response.data;
                })
                .catch((error) => {
                    // response error
                    this.flagSpinner = false;
                    this.flagInvertesment = true;
                    this.msgInvertesment = error.response.data.msg;
                });
        }

        if (this.interventionId) {
            Observateurs.select(this.interventionId)
                .then((response) => {
                    this.flagSpinner = false;
                    this.flagInvertesment = false;
                    this.observateurs = response.data;
                })
                .catch((error) => {
                    this.flagSpinner = false;
                    this.flagInvertesment = true;
                    this.msgInvertesment = error.response.data.msg;
                });
        }




    }
}
</script>
  
<style scoped>
.table-objet-observateur {
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
    margin-top: 10px;
}

.actions button:nth-child(1) {
    background-color: #04AA6D;
}

.actions button:nth-child(2) {
    background-color: #04AA6D;
}

.actions button:nth-child(3) {
    background-color: #e21608;
}
</style>