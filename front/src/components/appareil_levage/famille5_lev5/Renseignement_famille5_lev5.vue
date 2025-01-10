<template>
    <div>
        <div class="descriptions">
            <table border="1">

                <tr>
                    <td :class="[renseignement.constructeur.length != 0 ? 'saved' : 'not-saved']">Constructeur:</td>
                    <td><input type="text" @input="saisirConstructeur($event)" :value="renseignement.constructeur"
                            disabled></td>
                </tr>

                <tr>
                    <td :class="[renseignement.typeConstructeur.length != 0 ? 'saved' : 'not-saved']">Type constructeur
                        (Plaque):</td>
                    <td><input type="text" @input="saisirTypeConstructeur($event)"
                            :value="renseignement.typeConstructeur"></td>
                </tr>


                <tr>
                    <td :class="[renseignement.anneeMiseService.length != 0 ? 'saved' : 'not-saved']">Année de mise en
                        service (Plaque constructeur):</td>
                    <td><input type="text" @input="saisirAnneeMiseService($event)"
                            :value="renseignement.anneeMiseService"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.numeroSerie.length != 0 ? 'saved' : 'not-saved']">Numéro(s) de série
                        (plaque constructeur):</td>
                    <td><input type="text" @input="saisirNumeroSerie($event)" :value="renseignement.numeroSerie"
                            disabled></td>
                </tr>

                <tr>
                    <td :class="[renseignement.numeroInterne.length != 0 ? 'saved' : 'not-saved']">Numéro(s) interne(s):
                    </td>
                    <td>
                        <select @change="saisirNumeroInterne($event)" :value="renseignement.numeroInterne" disabled>
                            <option value="Avec Objet : ">Avec Objet</option>
                            <option value="Sans Objet">Sans Objet</option>
                        </select>
                    </td>
                    <td v-if="renseignement.numeroInterne == 'Avec Objet : '">
                        {{ renseignement.suiveNumeroInterne }}
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.localisation.length != 0 ? 'saved' : 'not-saved']">
                        Localisation de(s) l'appareil (s) lors de la visite:</td>
                    <td><input type="text" @input="saisirLocalistation($event)" :value="renseignement.localisation"
                            disabled></td>
                </tr>

                <tr>
                    <td :class="[renseignement.typeAppareil.length != 0 ? 'saved' : 'not-saved']">Type d'appareil:</td>
                    <td>
                        <select @change="saisirTypeAppareil($event)" :value="renseignement.typeAppareil">
                            <option value="Pont élévateur à 4 colonnes">Pont élévateur à 4 colonnes</option>
                            <option value="Pont élévateur à 2 colonnes">Pont élévateur à 2 colonnes</option>
                            <option value="Pont élévateur à pantographe">Pont élévateur à pantographe</option>
                            <option value="Pont élévateur à ciseau">Pont élévateur à ciseau</option>
                            <option value="Pont élévateur à parallélogramme">Pont élévateur à parallélogramme</option>
                            <option value="Pont élévateur à vérin porteur">Pont élévateur à vérin porteur</option>
                            <option value="Pont élévateur à colonnes indépendantes (Nombre)">Pont élévateur à colonnes indépendantes (Nombre)</option>
                            <option value="Pont élévateur mobile">Pont élévateur mobile</option>
                            <option value="Autre : ">Autre</option>
                        </select>
                    </td>
                    <td v-if="renseignement.typeAppareil == 'Autre : '">
                        <button :class="[renseignement.suiveTypeAppareil.length != 0 ? 'voir' : 'not-voir']"
                            @click="handelInsert('typeAppareil')">voir</button>
                    </td>

                    <td v-if="renseignement.typeAppareil == 'Pont élévateur à colonnes indépendantes (Nombre)'">
                        <button :class="[renseignement.suiveTypeAppareil.length != 0 ? 'voir' : 'not-voir']"
                            @click="handelInsert('typeAppareil')">voir</button>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.typeVerification.length != 0 ? 'saved' : 'not-saved']">Type de vérification: </td>
                    <td>
                        <select @change="saisirTypeVerification($event)" :value="renseignement.typeVerification">
                            <option v-for="(item) in listeTypeVerification" :key="item.index" :value="item.titre">{{ item.titre }}</option>
                        </select>
                    </td>

                    <td v-if="renseignement.typeVerification == 'Autre motif :'">
                            <button :class="[renseignement.suiveTypeVerification.length != 0 ? 'voir' : 'not-voir']" @click="handelInsert('typeVerification')">voir</button>
                    </td>

                    <td v-if="renseignement.typeVerification == 'Date de dernière vérification périodique :'">
                            <button :class="[renseignement.suiveTypeVerification.length != 0 ? 'voir' : 'not-voir']" @click="handelInsert('typeVerification')">voir</button>
                    </td>

                </tr>

                <tr>
                    <td :class="[renseignement.documentationTechniqueConstructeur.length != 0 ? 'saved' : 'not-saved']">Documentation technique constructeur (notice d'instructions, de montage, d'utilisation): </td>
                    <td>
                        <select @change="saisirDocumentationTechniqueConstructeur($event)" :value="renseignement.documentationTechniqueConstructeur">
                            <option value="Fournie">Fournie</option>
                            <option value="Non fournie">Non fournie</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.epreuves.length != 0 ? 'saved' : 'not-saved']">
                        Epreuves:
                    </td>

                    <td>
                        <select @change="saisirEpreuves($event)"  :value="renseignement.epreuves">
                            <option value="Réalisées dans le cadre de la mise ou remise en service de l'appareil">Réalisées dans le cadre de la mise ou remise en service de l’appareil</option>
                            <option value="Non réalisées dans le cadre de cette mission">Non réalisées dans le cadre de cette mission</option>
                        </select>
                    </td>

                </tr>


                <tr>
                    <td :class="[renseignement.essaischarge.length != 0 ? 'saved' : 'not-saved']">Essais en charge:</td>
                    <td>

                        <select @change="saisirEssaischarge($event)" :value="renseignement.essaischarge">
                            <option value="Réalisés lors des épreuves">Réalisés lors des épreuves
                            </option>
                            <option value="Réalisé avec la Charge maximale utile">Réalisé avec la Charge maximale utile
                            </option>
                            <option value="Réalisé sous charge de (kg) : ">Réalisé sous charge de (kg)</option>
                            <option value="Absence de charge pour réaliser les essais">Absence de charge pour réaliser
                                les essais</option>
                            <option value="Absence de tableau des charges pour réaliser les essais">Absence de tableau
                                des charges pour réaliser les essais</option>
                            <option value="Non réalisé. (Voir observation critique)">Non réalisé. (Voir observation critique)</option>
                        </select>
                    </td>
                    <td v-if="renseignement.essaischarge == 'Réalisé sous charge de (kg) : '">
                        <button :class="[renseignement.suiveEssaischarge.length != 0 ? 'voir' : 'not-voir']"
                            @click="handelInsert('essaischarge')">voir</button>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.examenMontageInstallation.length != 0 ? 'saved' : 'not-saved']">
                        Examen de montage et d'installation:
                    </td>

                    <td>
                        <select @change="saisirExamenMontageInstallation($event)" :value="renseignement.examenMontageInstallation">
                            <option value="Réalisées">Réalisées</option>
                            <option value="Voir observation(s)">Voir observation(s)</option>
                        </select>
                    </td>

                </tr>


                <tr>
                    <td :class="[renseignement.modification.length != 0 ? 'saved' : 'not-saved']">
                        Modification(s) apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l'appareil examiné:</td>
                    <td>
                        <select @change="saisirModification($event)" :value="renseignement.modification">
                            <option value="Sans objet">Sans objet</option>
                            <option value="Description : ">Description</option>
                        </select>
                    </td>
                    <td v-if="renseignement.modification == 'Description : '">
                        <button :class="[renseignement.suiveModification.length != 0 ? 'voir' : 'not-voir']"
                            @click="handelInsert('modification')">voir</button>
                    </td>
                </tr>




            </table>
        </div>

        <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Déjà enregistré" : "Non enregistré" }}
            </button>
        </div>

        <div class="reset">
            <button @click="reset">Reset</button>
        </div>

        <Insert v-if="falgInsert" :typeInsert="typeInsert" :valueInsert="valueInsert" @valider="valider" @annuler="annuler" />

    </div>
</template>

<script>

import Renseignement from "@/requests/appareil_levage/famille5_lev5/Renseignement"
import Completed from "@/requests/appareil_levage/famille5_lev5/completed";
import Observateurs from "@/requests/Observateurs"
import Insert from "@/components/models/Insert.vue"

export default {
    name: 'renseignement-component',
    data() {
        return {
            counter_watched: 0,
            watched_sauvegarder: false,
            falgInsert: false,
            flagReset: false,
            listeTypeVerification : [
                { 
                    index : 0,
                    status : false,
                    titre : "Mise en service"
                },
                { 
                    index : 1,
                    status : false,
                    titre : "Préalable a la remise en service"
                },
                { 
                    index : 2,
                    status : false,
                    titre : "A la suite d'un démontage et remontage"
                },
                { 
                    index : 3,
                    status : false,
                    titre : "Autre motif :",
                    content : " "
                },
                { 
                    index : 4,
                    status : false,
                    titre : "Date de dernière vérification périodique :", 
                    contsent : " "
                },
            ],

            renseignement: {

                constructeur: "",
                typeConstructeur: "",
                anneeMiseService: "",
                numeroSerie: "",
                numeroInterne: "",
                suiveNumeroInterne: "",
                localisation: "",
                typeAppareil: "",
                suiveTypeAppareil: "",
                typeVerification: "",
                suiveTypeVerification : "",
                documentationTechniqueConstructeur : "",
                epreuves : "",
                essaischarge: "",
                suiveEssaischarge : "",
                examenMontageInstallation : "",
                modification: "",
                suiveModification: "",
                observateurId: "",

            },

            renseignementId: null
        }
    },

    props: {
        observateurId: String
    },

    components: {
        Insert
    },

    watch: {
        renseignement: {
            handler() {
                const count = this.counter_watched++;
                if (count != 0) {
                    this.watched_sauvegarder = false;
                }

                this.notEmpty();
            },
            deep: true
        }
    },

    methods: {

        checkProperties() {

            if (this.renseignement.constructeur == "") {
                return false;
            }

            if (this.renseignement.typeConstructeur == "") {
                return false;
            }

            if (this.renseignement.anneeMiseService == "") {
                return false;
            }

            if (this.renseignement.numeroSerie == "") {
                return false;
            }

            if (this.renseignement.numeroInterne == "") {
                return false;
            }

            if (this.renseignement.localisation == "") {
                return false;
            }

            if (this.renseignement.typeAppareil == "") {
                return false;
            }

            if (this.renseignement.typeVerification == "") {
                return false;
            }

            if (this.renseignement.documentationTechniqueConstructeur == "") {
                return false;
            }

            if (this.renseignement.epreuves == "") {
                return false;
            }

            if (this.renseignement.essaischarge == "") {
                return false;
            }

            if (this.renseignement.examenMontageInstallation == "") {
                return false;
            }

            if (this.renseignement.modification == "") {
                return false;
            }

            return true;

        },

        notEmpty() {
            this.$emit("changeColorRenseignement_famille5_lev5", this.checkProperties())
        },


        handelInsert(value) {

            if (value == "typeAppareil") {
                this.valueInsert = this.renseignement.suiveTypeAppareil;
            }

            if (value == "essaischarge") {
                this.valueInsert = this.renseignement.suiveEssaischarge;
            }

            if (value == "modification") {
                this.valueInsert = this.renseignement.suiveModification;
            }

            if (value == "typeVerification") {
                this.valueInsert = this.renseignement.suiveTypeVerification;
            }


            this.typeInsert = value;
            this.falgInsert = true;
        },

        saisirConstructeur(e) {
            this.renseignement.constructeur = e.target.value;
        },

        saisirTypeConstructeur(e) {
            this.renseignement.typeConstructeur = e.target.value;
        },

        saisirAnneeMiseService(e) {
            this.renseignement.anneeMiseService = e.target.value;
        },

        saisirNumeroSerie(e) {
            this.renseignement.numeroSerie = e.target.value;
        },

        saisirNumeroInterne(e) {
            this.renseignement.numeroInterne = e.target.value;
        },

        saisirLocalistation(e) {
            this.renseignement.localisation = e.target.value;
        },

        saisirTypeAppareil(e) {
            this.renseignement.typeAppareil = e.target.value;
            if(this.renseignement.typeAppareil != "Autre")  {
                this.renseignement.suiveTypeAppareil = "";
            }
        },

        saisirTypeVerification(e) {

            this.renseignement.typeVerification = e.target.value;

            if(this.renseignement.typeVerification != "Autre motif :")  {
                this.renseignement.suiveTypeVerification = "";
            }
            
            if(this.renseignement.typeVerification != "Date de dernière vérification périodique :")  {
                this.renseignement.suiveTypeVerification = "";
            }
        },

        saisirDocumentationTechniqueConstructeur(e) {
            this.renseignement.documentationTechniqueConstructeur = e.target.value;
        },

        saisirEpreuves(e) {
            this.renseignement.epreuves = e.target.value;
        },

        saisirEssaischarge(e) {
            this.renseignement.essaischarge = e.target.value;
            if(this.renseignement.essaischarge == "Réalisé sous charge de (kg) : ") {
                this.renseignement.suiveEssaischarge = "";
            }
        },

        saisirExamenMontageInstallation(e) {
            this.renseignement.examenMontageInstallation = e.target.value;
        },

        saisirModification(e) {
            this.renseignement.modification = e.target.value;
            if(this.renseignement.modification == "Description : ") {
                this.renseignement.suiveModification = "";
            }
        },


        valider(event, type) {


            if (type == "typeAppareil") {
                this.renseignement.suiveTypeAppareil = event;
            }

            if (type == "essaischarge") {
                this.renseignement.suiveEssaischarge = event;
            }

            if (type == "modification") {
                this.renseignement.suiveModification = event;
            }

            if (type == "typeVerification") {
                this.renseignement.suiveTypeVerification = event;
            }

            this.falgInsert = false;
        },

        annuler() {
            this.falgInsert = false;
        },


        reset() {

            Renseignement.reset(this.observateurId)
                .then((result) => {

                    if (result.data == true) {

                        this.renseignement.typeConstructeur = "",
                        this.renseignement.anneeMiseService = "",
                        this.renseignement.typeAppareil = "",
                        this.renseignement.suiveTypeAppareil = "",
                        this.renseignement.typeVerification = "",
                        this.renseignement.suiveTypeVerification = "",
                        this.renseignement.documentationTechniqueConstructeur = "",
                        this.renseignement.epreuves = "",
                        this.renseignement.essaischarge = "",
                        this.renseignement.suiveEssaischarge = "",
                        this.renseignement.examenMontageInstallation = "",
                        this.renseignement.modification = "",
                        this.renseignement.suiveModification = "",
                        this.renseignement.observateurId = "",

                        this.flagReset = false;
                        this.watched_sauvegarder = false;
                        this.$emit("changeColorRenseignement_famille5_lev1", false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        sauvegarde() {

            this.renseignement.observateurId = this.observateurId;
            Renseignement.create(this.renseignement)
                .then((result) => {
                    if (result) {
                        this.watched_sauvegarder = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    },

    created() {

        Completed.checkRenseignement(this.observateurId)
            .then((result) => {

                if (result.data == false) {

                    Observateurs.selected(this.observateurId)
                        .then((result) => {

                            this.renseignement.constructeur = result.data.constructeur;
                            this.renseignement.localisation = result.data.localisation;
                            this.renseignement.numeroSerie = result.data.numeroSerie;

                            if (result.data.numeroInterne != null) {
                                this.renseignement.numeroInterne = "Avec Objet : ";
                                this.renseignement.suiveNumeroInterne = result.data.numeroInterne;
                            }


                            if (result.data.numeroInterne == null || result.data.numeroInterne == "" ||  String(result.data.numeroInterne).toLocaleLowerCase() == "sans objet") {
                                this.renseignement.numeroInterne = "Sans Objet";
                                this.renseignement.suiveNumeroInterne = "";
                            }

                            this.watched_sauvegarder = false;

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }


                if (result.data == true) {

                    Renseignement.select(this.observateurId)
                        .then((result) => {

                            this.renseignement.constructeur = result.data.renseignement.constructeur;
                            this.renseignement.typeConstructeur = result.data.renseignement.typeConstructeur;
                            this.renseignement.anneeMiseService = result.data.renseignement.anneeMiseService;
                            this.renseignement.numeroSerie = result.data.renseignement.numeroSerie;
                            this.renseignement.numeroInterne = result.data.renseignement.numeroInterne;
                            this.renseignement.suiveNumeroInterne = result.data.suiveNumeroInterne;
                            this.renseignement.localisation = result.data.renseignement.localisation;
                            this.renseignement.typeAppareil = result.data.renseignement.typeAppareil;
                            this.renseignement.suiveTypeAppareil = result.data.renseignement.suiveTypeAppareil;
                            this.renseignement.typeVerification = result.data.renseignement.typeVerification;
                            this.renseignement.suiveTypeVerification = result.data.renseignement.suiveTypeVerification;
                            this.renseignement.documentationTechniqueConstructeur = result.data.renseignement.documentationTechniqueConstructeur;
                            this.renseignement.epreuves = result.data.renseignement.epreuves;
                            this.renseignement.essaischarge = result.data.renseignement.essaischarge;
                            this.renseignement.suiveEssaischarge = result.data.renseignement.suiveEssaischarge;
                            this.renseignement.examenMontageInstallation = result.data.renseignement.examenMontageInstallation;
                            this.renseignement.modification = result.data.renseignement.modification;
                            this.renseignement.suiveModification = result.data.renseignement.suiveModification;
                            this.renseignement.observateurId = result.data.renseignement.observateurId;
                            this.watched_sauvegarder = true;

                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }

                this.watched_sauvegarder = true;
                return this.notEmpty();
            })
            .catch((error) => {
                console.log(error);
            });


    }
}
</script>

<style scoped>

.descriptions table {
    border-collapse: collapse;
    border: none;
}

tr {
    border-top: 1px solid #141293;
}

tr:first-child {
    border-top: none;
}

td {
    text-align: start;
    border: none !important;
    padding-top: 3px;
    padding-bottom: 3px;
}

td {
    font-size: larger;
}

input , select {
    height: 30px;
    padding: 5px;
    font-size: large;
}

td button {
    height: 30px;
    width : 80px;
    border: 0px;
    color: white;
}

.voir {
    background-color: green;
}

.not-voir {
    background-color: red;
}

.sauvegarder , .reset {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-top: 5px;
}

.sauvegarder .watch {
    background-color: green;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .watch:hover {
    background-color: rgb(2, 49, 2);
}

.sauvegarder .not-watch {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .not-watch:hover {
    background-color: rgb(84, 1, 1);
}


.reset button {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
}


.reset button:hover {
    background-color: rgb(84, 1, 1);
}

.reset button:hover {
    background-color: rgb(84, 1, 1);
}

td:nth-child(2) {
    display: flex;
    flex-direction: column;
}

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

</style>