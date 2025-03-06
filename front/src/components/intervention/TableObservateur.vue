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
                    <th>Marquage</th>
                    <th>Status</th>
                </tr>
                <tr v-for="observateur in observateurs" :key="observateur._id">
                    <td><input v-if="observateur.cache == false" type="radio" @change="handelObservateursSelect(observateur._id, observateur.typeAppareil[0])" :value="observateur._id" name="observateurId"></td>
                    <td>{{ new Date(observateur.date).toLocaleDateString() }}</td>
                    <td :title="observateur.typeVerification">{{ observateur.typeVerification.length > 10 ?
                        String(observateur.typeVerification).substring(0, 10) + '...' :
                        String(observateur.typeVerification) }}</td>
                    <td :title="observateur.typeAppareil[1]">{{ observateur.typeAppareil[1].length > 10 ?
                        String(observateur.typeAppareil[1]).substring(0, 10) + '...' :
                        String(observateur.typeAppareil[1]) }}</td>
                    <td :title="observateur.metier">{{ observateur.metier.length > 10 ?
                        String(observateur.metier).substring(0, 10) + '...' : String(observateur.metier) }}</td>
                    <td>{{ observateur.constructeur }}</td>
                    <td>{{ observateur.numeroSerie }}</td>
                    <td>{{ observateur.numeroInterne }}</td>
                    <td>{{ observateur.localisation }}</td>

                    <td>{{ observateur.marquage }}</td>
                    <td v-if="!observateur.etat">
                        <!-- <button class="termine" @click="terminer(observateur._id)">Envoyer</button> -->
                        <font-awesome-icon icon="clock" class="clock" />
                    </td>
                    <td v-if="observateur.etat">
                        <font-awesome-icon icon="thumbs-up" class="thumbs-up" />
                    </td>
                </tr>
            </table>
        </div>

        <div class="actions">

            <div class="left">

                <button v-if="!flagInvertesment && this.observateursSelect.length === 1 && flagApercuRapport == true"
                    @click="apercu">
                    <font-awesome-icon icon="eye" />
                    <span>Aperçu le Pré-rapport</span>
                </button>

                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="editer">
                    <font-awesome-icon icon="list" />
                    <span>Éditer</span>
                </button>

            </div>

            <div class="right">

                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="modifier">
                    <font-awesome-icon icon="pencil" />
                    <span>Modifier</span>
                </button>

                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="supprimer">
                    <font-awesome-icon icon="trash" />
                    <span>Supprimer</span>
                </button>
<!-- 
                <button v-if="!flagInvertesment && this.observateursSelect.length === 1" @click="sauvgerder">
                    <font-awesome-icon icon="circle-check" />
                    <span>Terminer</span>
                </button> -->

            </div>

        </div>

        <Verified v-if="flagVerified" @confirmer="confirmer" @retirer="retirer" />
        <Error v-if="flagError" :msg="msgError" @annuller="annuller" />


    </div>
</template>

<script>

import FamilleCompletedOneLevOne from "@/requests/appareil_levage/famille1_lev1/completed"
import FamilleCompletedTowLevTow from "@/requests/appareil_levage/famille2_lev2/completed"
import FamilleCompletedTreeLevTree from "@/requests/appareil_levage/famille3_lev3/completed"
import FamilleCompletedFourLevFour from "@/requests/appareil_levage/famille4_lev4/completed"
import FamilleCompletedFiveLevFive from "@/requests/appareil_levage/famille5_lev5/completed"
import Observateurs from "@/requests/Observateurs"
import Spinner from 'vue-simple-spinner'
import Invertesment from "@/components/models/Invertesment.vue"
import Error from "@/components/models/Error.vue"
import Verified from "@/components/models/Verified.vue"

export default {
    name: 'table-observateur',
    data() {
        return {
            flagApercuRapport: false,
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

        handelObservateursSelect(observateurId, typeAppareil) {

            this.observateursSelect = [];
            this.observateursSelect.push(observateurId)
            this.flagApercuRapport = false;

            if (typeAppareil == "Famille 1 LEV1") {

                FamilleCompletedOneLevOne.checkAll(this.observateursSelect[0])
                    .then((result) => {
                        console.log(result.data)
                        if (result.data.status == true) {
                            this.flagApercuRapport = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }

            if (typeAppareil == "Famille 2 LEV2") {

                FamilleCompletedTowLevTow.checkAll(this.observateursSelect[0])
                    .then((result) => {
                        if (result.data.status == true) {
                            this.flagApercuRapport = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }

            if (typeAppareil == "Famille 3 LEV3") {

                FamilleCompletedTreeLevTree.checkAll(this.observateursSelect[0])
                    .then((result) => {
                        if (result.data.status == true) {
                            this.flagApercuRapport = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }

            if (typeAppareil == "Famille 4 LEV4") {

                FamilleCompletedFourLevFour.checkAll(this.observateursSelect[0])
                    .then((result) => {
                        if (result.data.status == true) {
                            this.flagApercuRapport = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }

            if (typeAppareil == "Famille 5 LEV5") {

                FamilleCompletedFiveLevFive.checkAll(this.observateursSelect[0])
                    .then((result) => {
                        if (result.data.status == true) {
                            this.flagApercuRapport = true;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        },

        annuller() {
            this.flagError = false;
            this.msgError = "";
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

        sauvgerder() {

            Observateurs.terminer(this.observateursSelect[0])
                .then((result) => {

                    if (result.data.msg == true) {
                        const index = this.observateurs.findIndex((el) => el._id == this.observateursSelect[0]);
                        this.observateurs[index].etat = true;
                    }

                    if (result.data.msg == false) {
                        alert("Le contrôle n'est pas entièrement terminé. Veuillez examiner toutes les entrées.")
                    }

                })
                .catch((error) => {
                    this.flagInvertesment = true;
                    this.msgInvertesment = error.response.data.msg;
                });
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
                                this.observateurs.push(el);
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
    height: 50%;
    background-color: #e7e7e74f;
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
    height: 250px;
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
    background-color: #35353d;
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

.actions button span {
    margin-left: 3px;
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

.actions .right button:nth-child(3) {
    background-color: #04AA6D;
}

.clock {
    color: #e21608;
}

.thumbs-up {
    color: #04AA6D;
}
</style>