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
                    <td :class="[renseignement.localisation.length != 0 ? 'saved' : 'not-saved']">Localisation de(s)
                        l'appareil (s) lors de la visite:</td>
                    <td><input type="text" @input="saisirLocalistation($event)" :value="renseignement.localisation"
                            disabled></td>
                </tr>

                <tr>
                    <td :class="[renseignement.typeAppareil.length != 0 ? 'saved' : 'not-saved']">Type d'appareil:</td>
                    <td>
                        <select @change="saisirTypeAppareil($event)" :value="renseignement.typeAppareil">
                            <option value="Elévateur Gerbeur a conducteur porté">Elévateur Gerbeur a conducteur porté</option>
                            <option value="Elévateur Gerbeur a conducteur accompagnant">Elévateur Gerbeur a conducteur accompagnant</option>
                            <option value="Elévateur gerbeur tout terrain">Grues d'atelier (non motorisée)</option>
                            <option value="De manutention automoteur à conducteur porté">(porteur, tracteur, pousseur</option>
                            <option value="Potences (Non motorisées)">Potences (Non motorisées)</option>
                            <option value="Autre : ">Autre</option>
                        </select>
                    </td>
                    <td v-if="renseignement.typeAppareil == 'Autre : '">
                        <button :class="[renseignement.suiveTypeAppareil.length != 0 ? 'voir' : 'not-voir']"
                            @click="handelInsert('typeAppareil')">voir</button>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.miseEnServiceRapport.length != 0 ? 'saved' : 'not-saved']">(Mise en
                        service) Rapport de vérification avant mise ou remise en service: </td>
                    <td>
                        <select @change="saisirMiseEnServiceRapport($event)"
                            :value="renseignement.miseEnServiceRapport">
                            <option value="Présenté">Présenté</option>
                            <option value="Non présenté">Non présenté</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.miseEnServiceEpreuves.length != 0 ? 'saved' : 'not-saved']">(Mise en service) Epreuves: </td>
                    <td>
                        <select @change="saisirMiseEnServiceEpreuves($event)"
                            :value="renseignement.miseEnServiceEpreuves">
                            <option value="Réalisées le : ">Réalisées le</option>
                            <option value="Absence de renseignement">Absence de renseignement</option>
                        </select>
                    </td>
                    <td v-if="renseignement.miseEnServiceEpreuves == 'Réalisées le : '">
                        <button :class="[renseignement.suiveMiseEnServiceEpreuves.length != 0 ? 'voir' : 'not-voir']"
                            @click="handelInsert('miseEnServiceEpreuves')">voir</button>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.dateDerniereVerficationPeriodique.length != 0 ? 'saved' : 'not-saved']">
                        Date de la dernière vérification périodique:
                    </td>

                    <td>
                        <select @change="saisirDateDerniereVerficationPeriodique($event)"
                            :value="renseignement.dateDerniereVerficationPeriodique">
                            <option value="Absence de renseignement">Absence de renseignement</option>
                            <option value="Effectuée le : ">Effectuée le</option>
                        </select>
                    </td>

                    <td v-if="renseignement.dateDerniereVerficationPeriodique == 'Effectuée le : '">
                        <button
                            :class="[renseignement.suiveDateDerniereVerficationPeriodique.length != 0 ? 'voir' : 'not-voir']"
                            @click="handelInsert('dateDerniereVerficationPeriodique')">voir</button>
                    </td>

                    <td v-if="renseignement.dateDerniereVerficationPeriodique == 'Effectuée le : '">
                        <select @change="saisirRapport($event)" :value="renseignement.rapport">
                            <option value="Rapport : Présenté">Rapport : Présenté</option>
                            <option value="Rapport : Non présenté">Rapport : Non présenté</option>
                        </select>
                    </td>
                </tr>


                <tr>
                    <td :class="[renseignement.essaischarge.length != 0 ? 'saved' : 'not-saved']">Essais en charge:</td>
                    <td>

                        <select @change="saisirEssaischarge($event)" :value="renseignement.essaischarge">
                            <option value="Réalisé avec la Charge maximale utile">Réalisé avec la Charge maximale utile
                            </option>
                            <option value="Réalisé sous charge de (kg) : ">Réalisé sous charge de (kg)</option>
                            <option value="Absence de charge pour réaliser les essais">Absence de charge pour réaliser
                                les essais</option>
                            <option value="Absence de tableau des charges pour réaliser les essais">Absence de tableau
                                des charges pour réaliser les essais</option>
                            <option value="Non réalisé. Voir observation critique">Non réalisé. Voir observation
                                critique</option>
                        </select>
                    </td>
                    <td v-if="renseignement.essaischarge == 'Réalisé sous charge de (kg) : '">
                        <button :class="[renseignement.suiveEssaischarge.length != 0 ? 'voir' : 'not-voir']"
                            @click="handelInsert('essaischarge')">voir</button>
                    </td>
                </tr>


                <tr>
                    <td :class="[renseignement.modification.length != 0 ? 'saved' : 'not-saved']">Modification(s)
                        apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l’appareil examiné:</td>
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

import Renseignement from "@/requests/appareil_levage/famille3_lev3/Renseignement"
import Completed from "@/requests/appareil_levage/famille3_lev3/completed";
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
                miseEnServiceRapport: "",
                miseEnServiceEpreuves: "",
                suiveMiseEnServiceEpreuves: "",
                dateDerniereVerficationPeriodique: "",
                suiveDateDerniereVerficationPeriodique: "",
                rapport: "",
                essaischarge: "",
                suiveEssaischarge: "",
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
                if (count != 0 && count != 1) {
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

            if (this.renseignement.miseEnServiceRapport == "") {
                return false;
            }

            if (this.renseignement.miseEnServiceEpreuves == "") {
                return false;
            }

            if (this.renseignement.dateDerniereVerficationPeriodique == "") {
                return false;
            }

            if (this.renseignement.essaischarge == "") {
                return false;
            }

            if (this.renseignement.modification == "") {
                return false;
            }

            return true;
        },

        notEmpty() {
            this.$emit("changeColorRenseignement_famille1_lev1", this.checkProperties())
        },

        handelInsert(value) {

            if (value == "numeroInterne") {
                this.valueInsert = this.renseignement.suiveNumeroInterne;
            }

            if (value == "typeAppareil") {
                this.valueInsert = this.renseignement.suiveTypeAppareil;
            }

            if (value == "miseEnServiceEpreuves") {
                this.valueInsert = this.renseignement.suiveMiseEnServiceEpreuves;
            }

            if (value == "dateDerniereVerficationPeriodique") {
                this.valueInsert = this.renseignement.suiveDateDerniereVerficationPeriodique;
            }

            if (value == "essaischarge") {
                this.valueInsert = this.renseignement.suiveEssaischarge;
            }

            if (value == "modification") {
                this.valueInsert = this.renseignement.suiveModification;
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

        saisirMiseEnServiceRapport(e) {
            this.renseignement.miseEnServiceRapport = e.target.value;
        },

        saisirMiseEnServiceEpreuves(e) {
            this.renseignement.miseEnServiceEpreuves = e.target.value;
            if(this.renseignement.miseEnServiceEpreuves != "Réalisées le : ")  {
                this.renseignement.suiveMiseEnServiceEpreuves = "";
            }
        },

        saisirDateDerniereVerficationPeriodique(e) {
            this.renseignement.dateDerniereVerficationPeriodique = e.target.value;
            if(this.renseignement.dateDerniereVerficationPeriodique != "Effectuée le :")  {
                this.renseignement.suiveDateDerniereVerficationPeriodique = "";
            }
             
        },

        saisirRapport(e) {
            this.renseignement.rapport = e.target.value;
        },

        saisirEssaischarge(e) {
            this.renseignement.essaischarge = e.target.value;
            if(this.renseignement.essaischarge == "Réalisé sous charge de (kg) : ") {
                this.renseignement.suiveEssaischarge = "";
            }
        },

        saisirModification(e) {
            this.renseignement.modification = e.target.value;
            if(this.renseignement.modification == "Description : ") {
                this.renseignement.suiveModification = "";
            }
        },


        valider(event, type) {

            if (type == "numeroInterne") {
                this.renseignement.suiveNumeroInterne = event;
            }

            if (type == "typeAppareil") {
                this.renseignement.suiveTypeAppareil = event;
            }

            if (type == "miseEnServiceEpreuves") {
                this.renseignement.suiveMiseEnServiceEpreuves = event;
            }

            if (type == "dateDerniereVerficationPeriodique") {
                this.renseignement.suiveDateDerniereVerficationPeriodique = event;
            }

            if (type == "essaischarge") {
                this.renseignement.suiveEssaischarge = event;
            }

            if (type == "modification") {
                this.renseignement.suiveModification = event;
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
                        this.renseignement.numeroInterne = "",
                        this.renseignement.typeAppareil = "",
                        this.renseignement.suiveTypeAppareil = "",
                        this.renseignement.miseEnServiceRapport = "",
                        this.renseignement.miseEnServiceEpreuves = "",
                        this.renseignement.suiveMiseEnServiceEpreuves = "",
                        this.renseignement.dateDerniereVerficationPeriodique = "",
                        this.renseignement.suiveDateDerniereVerficationPeriodique = "",
                        this.renseignement.rapport = "",
                        this.renseignement.essaischarge = "",
                        this.renseignement.suiveEssaischarge = "",
                        this.renseignement.modification = "",
                        this.renseignement.suiveModification = "",

                        this.flagReset = false;
                        this.watched_sauvegarder = false;
                        this.$emit("changeColorRenseignement_famille_ac1", false);
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
                            this.renseignement.suiveNumeroInterne = result.data.renseignement.suiveNumeroInterne;
                            this.renseignement.localisation = result.data.renseignement.localisation;
                            this.renseignement.typeAppareil = result.data.renseignement.typeAppareil;
                            this.renseignement.suiveTypeAppareil = result.data.renseignement.suiveTypeAppareil;
                            this.renseignement.miseEnServiceRapport = result.data.renseignement.miseEnServiceRapport;
                            this.renseignement.miseEnServiceEpreuves = result.data.renseignement.miseEnServiceEpreuves;
                            this.renseignement.suiveMiseEnServiceEpreuves = result.data.renseignement.suiveMiseEnServiceEpreuves;
                            this.renseignement.dateDerniereVerficationPeriodique = result.data.renseignement.dateDerniereVerficationPeriodique;
                            this.renseignement.suiveDateDerniereVerficationPeriodique = result.data.renseignement.suiveDateDerniereVerficationPeriodique;
                            this.renseignement.rapport = result.data.renseignement.rapport;
                            this.renseignement.essaischarge = result.data.renseignement.essaischarge;
                            this.renseignement.suiveEssaischarge = result.data.renseignement.suiveEssaischarge;
                            this.renseignement.modification = result.data.renseignement.modification;
                            this.renseignement.suiveModification = result.data.renseignement.suiveModification;
                            this.renseignement.observateurId = result.data.renseignement.observateurId;
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

.sauvegarder .not-watch {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}


.reset button {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
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