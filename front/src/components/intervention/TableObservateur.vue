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
                    <th>Accompagnateur</th>
                    <th>Type de Vérification</th>
                    <th>L état de Vérification</th>
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
                    <td v-if="!observateur.etat"><button class="termine" @click="terminer(observateur._id)">Je termine</button></td>
                </tr>
            </table>
        </div>

        <div class="actions">
            <div class="left">
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="apercu">Aperçu le Pré-rapport</button>
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="editer">Editer le Pré-rapport</button>

            </div>
            <div class="right">
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="modifier">Modifier (Appareil, équipement, installation)</button>
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="supprimer">Supprimer (Appareil, équipement, installation)</button>
            </div>
        </div>
        <Verified v-if="flagVerified" @confirmer="confirmer" @retirer="retirer" />
        <Error v-if="flagError" :msg="msgError" @annuller="annuller" />


    </div>
</template>

<script>

import Observateurs from "@/requests/Observateurs"
import Spinner from 'vue-simple-spinner'
import Invertesment from "@/components/models/Invertesment.vue"
import Error from "@/components/models/Error.vue"
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
            flagError: false,
            msgError : null,
            msgInvertesment: null
        }
    },

    props: {
        interventionId: String
    },

    components: {
        Spinner,
        Invertesment,
        Verified,
        Error
    },

    methods: {

        annuller() {
            this.flagError = false;
        },

        terminer(observateurId) {
            Observateurs.terminer(observateurId)
            .then(() => {
                const index = this.observateurs.findIndex((el) => el._id == observateurId);
                this.observateurs.splice(index , 1);
            })  
            .catch((error) => {
                this.flagInvertesment = true;
                this.msgInvertesment =  error.response.data.msg;
            }); 
        },

        modifier() {
            if(this.observateursSelect.length === 1) {
                return this.$emit("modifierObservateur", this.observateursSelect[0]);
            }
        },

        editer() {
            if (this.observateursSelect.length === 1) {

                for (let i = 0; i < this.observateurs.length; i++) {
                    if (this.observateurs[i]._id == this.observateursSelect[0]) {
                        this.$router.push({ name: "formulaire", params: { id: this.observateursSelect[0], categorieAppareil: this.observateurs[i].categorieAppareil } });
                        break;
                    }
                }
            }
        },

        supprimer() {
            if (this.observateursSelect.length === 1) {
                this.flagVerified = true;
            }
        },

        confirmer() {
            Observateurs.delete(this.observateursSelect[0])
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error)
                });


            for (let i = 0; i < this.observateurs.length; i++) {
                if (String(this.observateurs[i]._id) === String(this.observateursSelect[0])) {
                    this.observateurs.splice(i, 1);
                    break;
                }
            }

            this.flagVerified = false;
            this.observateursSelect = [];

        },

        retirer() {
            this.flagVerified = false;
        },

        apercu() {
            const index = this.observateurs.find((el) => el._id === this.observateursSelect[0])
            if(index.etat == false) {
                 this.flagError = true;
                 this.msgError = "Toutes les informations doivent d'abord être remplies pour pouvoir télécharger";
            } else {
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
            }

        },

        send() {
            this.flagSpinner = true;

            Observateurs.send(this.observateursSelect[0], this.interventionId, sessionStorage.getItem("id"))
                .then((result) => {
                    if (result) {
                        this.flagSpinner = false
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    created() {

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


.textarea {
    width: 100%;
}

.actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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


.actions .left button:nth-child(1) {
    background-color: #04AA6D;
}

.actions .left button:nth-child(2) {
    background-color: #0300c7;
}
.actions .right button:nth-child(1) {
    background-color: #ff6a00;
}

.actions .right button:nth-child(2) {
    background-color: #e21608;
}

.termine {
    background-color: #04AA6D;
    color: white;
    border: 0px;
    cursor: pointer;
    padding: 5px;
}


</style>