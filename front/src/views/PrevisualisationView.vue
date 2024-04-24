<template>
    <div class="observations">
        <button @click="retour">Retour</button>
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
                    <th>Accompagnateur</th>
                    <th>Type de Vérification</th>
                    <th>L'etat de Vérification</th>
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
                    <td>{{ observateur.accompagnateur }}</td>
                    <td>{{ observateur.marquage }}</td>
                    <td v-if="observateur.etat">Verrouillé</td>
                </tr>
            </table>
        </div>

        <div class="actions">
            <button v-if="!flagInvertesment" @click="apercu">Aperçu</button>
            <button v-if="!flagInvertesment" @click="supprimer">Supprimer</button>
            <button v-if="!flagInvertesment" @click="send">Transférer</button>
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
    name: 'ObservationView',
    data() {
        return {
            errors: [],
            flagError: false,

            flagVerified: false,
            observateurs: [],
            observateursSelect: [],
            flagSpinner: true,
            flagInvertesment: false,
            msgInvertesment: null
        }
    },

    components: {
        Invertesment,
        Verified,
        Spinner
    },

    props: {
        interventionId: String
    },

    methods: {

        retour() {
         this.$router.push("/dashboard").catch(()=>{});
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
        },

        apercu() {
            this.flagSpinner = true;
            Observateurs.apercu(this.observateursSelect[0], sessionStorage.getItem("id"))
            .then((result) => {
                if (result) {
                 this.flagSpinner = false
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },

        send() {
            this.flagSpinner = true;

            Observateurs.send(this.observateursSelect[0], sessionStorage.getItem("id"))
                .then((result) => {
                    if (result) {
                        console.log(result)
                        this.flagSpinner = false
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    created() {

        Observateurs.readTerminer()
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
}
</script>

<style scoped>

.observations {
    width: 100%;
}

.observations button {
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
    display: block;
    max-width: -moz-fit-content;
    max-width: fit-content;
    margin: 0 auto;
    overflow-x: auto;
    white-space: nowrap;
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

.actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
    background-color: red;
}

.actions button:nth-child(3) {
    background-color: #f3a108;
}

.actions button:nth-child(4) {
    background-color: #0847f3;
}

</style>