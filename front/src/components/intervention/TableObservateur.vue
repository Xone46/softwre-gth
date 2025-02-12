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
                    <th>Type de Vérification</th>
                    <th>Mission</th>
                    <th>Metier</th>
                    <th>Constructeur</th>
                    <th>N°Série</th>
                    <th>N°Interne</th>
                    <th>Localisation</th>
                    <!-- <th>Accompagnateur Client</th> -->
                    <!-- <th>Accompagnateur Inspecteur</th> -->
                    <th>Marquage</th>
                    <th>L'etat de verification</th>
                </tr>
                <tr v-for="observateur in observateurs" :key="observateur._id">
                    <td><input type="checkbox" v-if="!observateur.etat" v-model="observateursSelect" :value="observateur._id"></td>
                    <td>{{ new Date(observateur.date).toLocaleDateString() }}</td>
                    <td :title="observateur.typeVerification">{{ observateur.typeVerification.length > 20 ? String(observateur.typeVerification).substring(0, 25) + '...' : String(observateur.typeVerification) }}</td>
                    <td>{{ observateur.typeAppareil[1] }}</td>
                    <td>{{ observateur.metier }}</td>
                    <td>{{ observateur.constructeur }}</td>
                    <td>{{ observateur.numeroSerie }}</td>
                    <td>{{ observateur.numeroInterne }}</td>
                    <td>{{ observateur.localisation }}</td>
                    <!-- <td>{{ observateur.accompagnateurClient }}</td> -->
                    <!-- <td>{{ observateur.accompagnateurInspecteur }}</td> -->
                    <td>{{ observateur.marquage }}</td>
                    <td v-if="!observateur.etat"><button class="termine"
                            @click="terminer(observateur._id)">Envoyer</button></td>
                    <td v-if="observateur.etat">Déjà Envoyé</td>
                </tr>
            </table>
        </div>

        <div class="actions">

            <div class="left">
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="apercu">
                    Aperçu le Pré-rapport
                </button>
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="editer">
                    Editer
                </button>
            </div>

            <div class="right">
                <!-- <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="cacher">Cacher</button> -->
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1"
                    @click="modifier">Modifier</button>
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1"
                    @click="supprimer">Supprimer</button>
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
            msgError: null,
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
            this.msgError = "";
        },

        terminer(observateurId) {


            Observateurs.terminer(observateurId)
                .then((result) => {
                  
                    if (result.data.msg == true) {
                        const index = this.observateurs.findIndex((el) => el._id == observateurId);
                        this.observateurs[index].etat = true;
                    }

                    if(result.data.msg == false) {
                        alert("Le contrôle n'est pas entièrement terminé. Veuillez examiner toutes les entrées.")
                    }

                })
                .catch((error) => {
                    this.flagInvertesment = true;
                    this.msgInvertesment = error.response.data.msg;
                });

        },

        modifier() {
            if (this.observateursSelect.length === 1) {
                return this.$emit("modifierObservateur", this.observateursSelect[0], this.interventionId);
            }
        },

        cacher() {

            if (this.observateursSelect.length === 1) {
                Observateurs.cacher(this.observateursSelect[0])
                    .then((result) => {

                        if (result.data.msg == true) {
                            const index = this.observateurs.findIndex((el) => el._id == this.observateursSelect[0]);
                            this.observateurs.splice(index, 1);
                        }

                        if (result.data.msg == false) {
                            this.flagError = true;
                            this.msgError = result.data.content;
                        }

                    })
                    .catch((error) => {
                        this.flagInvertesment = true;
                        this.msgInvertesment = error.response.data.msg;
                    });
            }
        },

        editer() {

            if (this.observateursSelect.length === 1) {

                for (let i = 0; i < this.observateurs.length; i++) {
                    if (this.observateurs[i]._id == this.observateursSelect[0]) {
                        this.$router.push({ name: "formulaire", params: { id: this.observateursSelect[0], typeAppareil: this.observateurs[i].typeAppareil, interventionId: this.interventionId } });
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

            this.flagSpinner = true;
            Observateurs.apercu(this.observateursSelect[0], sessionStorage.getItem("id"))
                .then((result) => {
                    if (result) {
                        this.flagSpinner = false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
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

                    if (response.data.msg) {
                        this.flagSpinner = false;
                        this.flagInvertesment = true;
                        this.msgInvertesment = response.data.msg;
                    }

                    if (response.data.observateurs) {
                        this.flagSpinner = false;
                        this.flagInvertesment = false;
                        response.data.observateurs.forEach((el) => {
                            if (Boolean(el.cache) === false) {
                                this.observateurs.push(el);
                            }
                        });
                    }

                })
                .catch((error) => {
                    if (error) {
                        this.flagSpinner = false;
                        this.flagInvertesment = true;
                        this.msgInvertesment = error.response.data;
                    }
                });
        }





    }
}
</script>

<style scoped>

.table-objet-observateur {
    height: auto;
    background-color: #aaa;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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

.table-data {
    padding: 0px;
    width: auto;
    height: auto;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    display: block;
    max-width: -moz-fit-content;
    max-width: fit-content;
    margin: 0 auto;
    overflow-x: auto;
    white-space: nowrap;
}


.table-data tr {
    background-color: white;
}

.table-data tr:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.table-data th {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    background-color: #040faa;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
}

.table-data td,
.table-data th {
    border: 1px solid #ddd;
    padding: 8px;
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
    padding: 15px;
    color: white;
    border: 0px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: larger;
    color: white;
}

.actions button:hover {
    border: 1px solid white;
    transition: 1s;
}

.actions .left button:nth-child(1) {
    background-color: #eecb05;
}

.actions .left button:nth-child(2) {
    background-color: #0368ec;
}

/* .actions .right button:nth-child(1) {
    background-color: #f607ca;
} */

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
    border-radius: 5px;
}

</style>