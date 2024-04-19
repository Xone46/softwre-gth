<template>
    <div>
        <div class="descriptions">
            <table border="1">

                <tr>
                    <th>Constructeurs</th>
                </tr>

                <tr>
                    <td :class="[renseignement.constructeur.length != 0 ? 'saved' : 'not-saved']">Constructeur</td>
                    <td>{{ renseignement.constructeur }}</td>
                </tr>

                <tr>
                    <td :class="[renseignement.typeConstructeur.length != 0 ? 'saved' : 'not-saved']">Type constructeur
                        (Plaque):</td>
                    <td v-html="renseignement.tagTypeConstructeur" @input="getValueTypeConstructeur"></td>
                </tr>


                <tr>
                    <td :class="[renseignement.anneeMiseService.length != 0 ? 'saved' : 'not-saved']">Année de mise en
                        service (Plaque constructeur):</td>
                    <td v-html="renseignement.tagAnneeMiseService" @input="getValueAnneeMiseService"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.numeroSerie.length != 0 ? 'saved' : 'not-saved']">Numéro(s) de série
                        (plaque
                        constructeur):</td>
                    <td v-html="renseignement.tagNumeroSerie" @input="getValueNumeroSerie"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.numeroInterne.length != 0 ? 'saved' : 'not-saved']">Numéro(s) interne(s):
                    </td>
                    <td v-html="renseignement.tagNumeroInterne" @input="getValueNumeroInterne"></td>
                    {{ renseignement.numeroInterneAutre }}
                </tr>

                <tr>
                    <td :class="[renseignement.localisation.length != 0 ? 'saved' : 'not-saved']">Localisation de(s)
                        l'appareil (s) lors de la visite:</td>
                    <td v-html="renseignement.tagLocalisation" @input="getValueLocalisation"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.typeAppareil.length != 0 ? 'saved' : 'not-saved']">Type d'appareil:</td>
                    <td v-html="renseignement.tagTypeAppareil" @input="getValueTypeAppareil"></td>
                    {{ renseignement.typeAppareilAutre }}
                </tr>

                <tr>
                    <td :class="[renseignement.miseEnServiceRapport.length != 0 ? 'saved' : 'not-saved']">Mise en
                        service (Rapport):</td>
                    <td v-html="renseignement.tagMiseEnServiceRapport" @input="getValueMiseEnServiceRapport"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.miseEnServiceEpreuves.length != 0 ? 'saved' : 'not-saved']">Mise en
                        service (Epreuves):</td>
                    <td v-html="renseignement.tagMiseEnServiceEpreuves" @input="getValueMiseEnServiceEpreuves"></td>
                    {{ renseignement.miseEnServiceEpreuvesAutre }}
                </tr>


                <tr>
                    <td :class="[renseignement.dateDerniereVerficationPeriodique.length != 0 ? 'saved' : 'not-saved']">
                        Date de la dernière vérification périodique:</td>
                    <td v-html="renseignement.tagDateDerniereVerficationPeriodique"
                        @input="getValueDateDerniereVerficationPeriodique"></td>
                    {{ renseignement.dateDerniereVerficationPeriodiqueAutre }}
                </tr>

                <tr>
                    <td
                        :class="[renseignement.dateDerniereVerficationPeriodiqueRapport.length != 0 ? 'saved' : 'not-saved']">
                        Date de la dernière vérification périodique (Rapport):</td>
                    <td v-html="renseignement.tagDateDerniereVerficationPeriodiqueRapport"
                        @input="getValueDateDerniereVerficationPeriodiqueRapport"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.essaischarge.length != 0 ? 'saved' : 'not-saved']">Essais en charge:</td>
                    <td v-html="renseignement.tagEssaischarge" @input="getValueEssaischarge"></td>
                </tr>


                <tr>
                    <td :class="[renseignement.modification.length != 0 ? 'saved' : 'not-saved']">Modification(s)
                        apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l'appareil examiné:</td>
                    <td v-html="renseignement.tagModification" @input="getValueModification"></td>
                    {{ renseignement.modificationAutre }}
                </tr>


            </table>
        </div>


        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>

        <Insert v-if="falgInsert" :typeInsert="typeInsert" @valider="valider" @annuler="annuler" />

    </div>
</template>

<script>
import Renseignement from "@/requests/Renseignement"
import Insert from "@/components/models/Insert.vue"
import Observateurs from "@/requests/Observateurs";
import Completed from "@/requests/completed";
export default {
    name: 'renseignement-component',
    data() {
        return {


            falgInsert: false,
            flagReset: false,

            renseignement: {

                constructeur : "",

                tagTypeConstructeur: "<input type='text' value=''>",
                typeConstructeur: "",


                tagAnneeMiseService: "<input type='text' value=''>",
                anneeMiseService: "",


                tagNumeroSerie: "<input type='text' value=''>",
                numeroSerie: "",


                tagNumeroInterne: `
                <label><input type='radio' value='Sans objet' name='numeroInterne'/>Sans objet</label>
                <label><input type='radio' value='N°' name='numeroInterne'/>N°</label>
                `,
                numeroInterne: "",
                numeroInterneAutre: "",


                tagLocalisation: "<input type='text' value='' >",
                localisation: "",


                tagTypeAppareil:
                    `<label><input type='radio' value='Pont roulant' name='typeAppareil'/>Pont roulant</label>
                 <label><input type='radio' value='Poutre roulante' name='typeAppareil'/>Poutre roulante</label>
                 <label><input type='radio' value='Portique' name='typeAppareil' />Portique</label>
                 <label><input type='radio' value='Semi portique' name='typeAppareil' />Semi portique</label>
                 <label><input type='radio' value='Palan' name='typeAppareil' />Palan</label>
                 <label><input type='radio' value='Treuil' name='typeAppareil' />Treuil</label>
                 <label><input type='radio' value='Autre' name='typeAppareil' />Autre</label>
                 `,
                typeAppareil: "",
                typeAppareilAutre: "",



                tagMiseEnServiceRapport:
                    `<label><input type='radio' value='Présenté' name='miseEnServiceRapport'/>Présenté</label>
                 <label><input type='radio' value='Non présenté' name='miseEnServiceRapport'/>Non présenté</label>
                 `,
                miseEnServiceRapport: "",



                tagMiseEnServiceEpreuves:
                    `<label><input type='radio' value='Réalisées le:' name='miseEnServiceEpreuves'/>Réalisées le:</label>
                 <label><input type='radio' value='Absence de renseignement' name='miseEnServiceEpreuves'/>Absence de renseignement</label>
                 `,
                miseEnServiceEpreuves: "",
                miseEnServiceEpreuvesAutre: "",


                tagDateDerniereVerficationPeriodique:
                    `<label><input type='radio' value='Absence de renseignement' name='dateDerniereVerficationPeriodique'/>Absence de renseignement</label>
                 <label><input type='radio' value='Effectuée le:' name='dateDerniereVerficationPeriodique'/>Effectuée le:</label>
                 `,
                dateDerniereVerficationPeriodique: "",
                dateDerniereVerficationPeriodiqueAutre: "",


                tagDateDerniereVerficationPeriodiqueRapport:
                    `<label><input type='radio' value='Présenté' name='dateDerniereVerficationPeriodiqueRapport'/>Présenté</label>
                 <label><input type='radio' value='Non présenté' name='dateDerniereVerficationPeriodiqueRapport'/>Non présenté</label>
                 `,
                dateDerniereVerficationPeriodiqueRapport: "",



                tagEssaischarge: `
                 <label><input type='radio' value='Réalisé avec la Charge maximale utile' name='essaischarge'/>Réalisé avec la Charge maximale utile</label>
                 <label><input type='radio' value='Réalisé sous charge de (kg):' name='essaischarge'/>Réalisé sous charge de (kg):</label>
                 <label><input type='radio' value='Absence de charge pour réaliser les essais' name='essaischarge'/>Absence de charge pour réaliser les essais</label>
                 <label><input type='radio' value='Absence de tableau des charges pour réaliser les essais' name='essaischarge'/>Absence de tableau des charges pour réaliser les essais</label>
                 <label>Palan<input type='radio' value='Non réalisé. Voir observation critique' name='essaischarge'/>Non réalisé. Voir observation critique</label>
                 <label>Treuil<input type='radio' value='(Les 4 dernières options conduisent à faire une observation)' name='essaischarge'/>(Les 4 dernières options conduisent à faire une observation) </label>
                 `,
                essaischarge: "",
                essaischargeAutre: "",


                tagModification: `
                 <label><input type='radio' value='Sans objet' name='modification' />Sans objet</label>
                 <label><input type='radio' value='Description:' name='modification' />Description:</label>
                `,
                modification: "",
                modificationAutre: "",

                observateurId: "",
                renseignementId: null
            }
        }
    },

    props: {
        observateurId: String
    },

    components: {
        Insert
    },

    methods: {

        valider(event, type) {

            if (type === "TypeAppareil") {

                this.renseignement.typeAppareil = `Autre`;
                this.renseignement.typeAppareilAutre = event;
            }

            if (type === "NumeroInterne") {
                this.renseignement.numeroInterne = `N°`;
                this.renseignement.numeroInterneAutre = event;
            }

            if (type === "Réalisé sous charge de (kg):") {
                this.renseignement.essaischarge = `Réalisé sous charge de (kg):`;
                this.renseignement.essaischargeAutre = event;
            }

            if (type === "Description:") {
                this.renseignement.modification = `Description:`;
                this.renseignement.modificationAutre = event;
            }

            if (type === "Effectuée le:") {
                this.renseignement.dateDerniereVerficationPeriodique = `Effectuée le:`;
                this.renseignement.dateDerniereVerficationPeriodiqueAutre = event;
            }

            if (type === "Réalisées le:") {
                this.renseignement.miseEnServiceEpreuves = `Réalisées le:`;
                this.renseignement.miseEnServiceEpreuvesAutre = event;
            }

            this.falgInsert = false;
            return this.sauvegarde();
        },

        annuler() {
            this.falgInsert = false;
        },

        getValueTypeConstructeur(event) {
            this.renseignement.typeConstructeur = event.target.value;
            return this.sauvegarde();
        },

        getValueAnneeMiseService(event) {
            this.renseignement.anneeMiseService = event.target.value;
            return this.sauvegarde();
        },

        getValueNumeroSerie(event) {
            this.renseignement.numeroSerie = event.target.value;
            return this.sauvegarde();
        },

        getValueNumeroInterne(event) {

            if (event.target.value === "N°") {
                this.falgInsert = true;
                this.typeInsert = "NumeroInterne";

            } else {
                this.renseignement.numeroInterne = event.target.value;
                this.renseignement.numeroInterneAutre = "";
                return this.sauvegarde();
            }

        },

        getValueLocalisation(event) {
            this.renseignement.localisation = event.target.value;
            return this.sauvegarde();
        },

        getValueTypeAppareil(event) {
            if (event.target.value === "Autre") {
                this.falgInsert = true;
                this.typeInsert = "TypeAppareil";
            } else {
                this.renseignement.typeAppareil = event.target.value;
                this.renseignement.typeAppareilAutre = "";
                return this.sauvegarde();
            }
        },

        getValueMiseEnServiceRapport() {
            this.renseignement.miseEnServiceRapport = event.target.value;
            return this.sauvegarde();
        },

        getValueMiseEnServiceEpreuves(event) {
            if (event.target.value === "Réalisées le:") {
                this.falgInsert = true;
                this.typeInsert = "Réalisées le:";
            } else {
                this.renseignement.miseEnServiceEpreuves = event.target.value;
                this.renseignement.miseEnServiceEpreuvesAutre = "";
                return this.sauvegarde();
            }
        },

        getValueDateDerniereVerficationPeriodique(event) {
            if (event.target.value === "Effectuée le:") {
                this.falgInsert = true;
                this.typeInsert = "Effectuée le:";
            } else {
                this.renseignement.dateDerniereVerficationPeriodique = event.target.value;
                this.renseignement.dateDerniereVerficationPeriodiqueAutre = "";
                return this.sauvegarde();
            }
        },

        getValueDateDerniereVerficationPeriodiqueRapport(event) {
            this.renseignement.dateDerniereVerficationPeriodiqueRapport = event.target.value;
            return this.sauvegarde();
        },

        getValueEssaischarge(event) {
            if (event.target.value === "Réalisé sous charge de (kg):") {
                this.falgInsert = true;
                this.typeInsert = "Réalisé sous charge de (kg):";
            } else {
                this.renseignement.essaischarge = event.target.value;
                this.renseignement.essaischargeAutre = "";
                return this.sauvegarde();
            }
        },

        getValueModification(event) {
            if (event.target.value === "Description:") {
                this.falgInsert = true;
                this.typeInsert = "Description:";
            } else {
                this.renseignement.modification = event.target.value;
                this.renseignement.modificationAutre = "";
                return this.sauvegarde();
            }
        },

        reset() {
            Renseignement.reset(this.observateurId)
                .then((result) => {

                    if (result.data) {

                        this.renseignement = {

                                constructeur : "",

                                tagTypeConstructeur: "<input type='text' value=''>",
                                typeConstructeur: "",


                                tagAnneeMiseService: "<input type='text' value=''>",
                                anneeMiseService: "",


                                tagNumeroSerie: "<input type='text' value=''>",
                                numeroSerie: "",


                                tagNumeroInterne: `
                                <label><input type='radio' value='Sans objet' name='numeroInterne'/>Sans objet</label>
                                <label><input type='radio' value='N°' name='numeroInterne'/>N°</label>
                                `,
                                numeroInterne: "",
                                numeroInterneAutre: "",


                                tagLocalisation: "<input type='text' value='' >",
                                localisation: "",


                                tagTypeAppareil:
                                    `<label><input type='radio' value='Pont roulant' name='typeAppareil'/>Pont roulant</label>
                                <label><input type='radio' value='Poutre roulante' name='typeAppareil'/>Poutre roulante</label>
                                <label><input type='radio' value='Portique' name='typeAppareil' />Portique</label>
                                <label><input type='radio' value='Semi portique' name='typeAppareil' />Semi portique</label>
                                <label><input type='radio' value='Palan' name='typeAppareil' />Palan</label>
                                <label><input type='radio' value='Treuil' name='typeAppareil' />Treuil</label>
                                <label><input type='radio' value='Autre' name='typeAppareil' />Autre</label>
                                `,
                                typeAppareil: "",
                                typeAppareilAutre: "",



                                tagMiseEnServiceRapport:
                                    `<label><input type='radio' value='Présenté' name='miseEnServiceRapport'/>Présenté</label>
                                <label><input type='radio' value='Non présenté' name='miseEnServiceRapport'/>Non présenté</label>
                                `,
                                miseEnServiceRapport: "",



                                tagMiseEnServiceEpreuves:
                                    `<label><input type='radio' value='Réalisées le:' name='miseEnServiceEpreuves'/>Réalisées le:</label>
                                <label><input type='radio' value='Absence de renseignement' name='miseEnServiceEpreuves'/>Absence de renseignement</label>
                                `,
                                miseEnServiceEpreuves: "",
                                miseEnServiceEpreuvesAutre: "",


                                tagDateDerniereVerficationPeriodique:
                                    `<label><input type='radio' value='Absence de renseignement' name='dateDerniereVerficationPeriodique'/>Absence de renseignement</label>
                                <label><input type='radio' value='Effectuée le:' name='dateDerniereVerficationPeriodique'/>Effectuée le:</label>
                                `,
                                dateDerniereVerficationPeriodique: "",
                                dateDerniereVerficationPeriodiqueAutre: "",


                                tagDateDerniereVerficationPeriodiqueRapport:
                                    `<label><input type='radio' value='Présenté' name='dateDerniereVerficationPeriodiqueRapport'/>Présenté</label>
                                <label><input type='radio' value='Non présenté' name='dateDerniereVerficationPeriodiqueRapport'/>Non présenté</label>
                                `,
                                dateDerniereVerficationPeriodiqueRapport: "",



                                tagEssaischarge: `
                                <label><input type='radio' value='Réalisé avec la Charge maximale utile' name='essaischarge'/>Réalisé avec la Charge maximale utile</label>
                                <label><input type='radio' value='Réalisé sous charge de (kg):' name='essaischarge'/>Réalisé sous charge de (kg):</label>
                                <label><input type='radio' value='Absence de charge pour réaliser les essais' name='essaischarge'/>Absence de charge pour réaliser les essais</label>
                                <label><input type='radio' value='Absence de tableau des charges pour réaliser les essais' name='essaischarge'/>Absence de tableau des charges pour réaliser les essais</label>
                                <label>Palan<input type='radio' value='Non réalisé. Voir observation critique' name='essaischarge'/>Non réalisé. Voir observation critique</label>
                                <label>Treuil<input type='radio' value='(Les 4 dernières options conduisent à faire une observation)' name='essaischarge'/>(Les 4 dernières options conduisent à faire une observation) </label>
                                `,
                                essaischarge: "",
                                essaischargeAutre: "",


                                tagModification: `
                                <label><input type='radio' value='Sans objet' name='modification' />Sans objet</label>
                                <label><input type='radio' value='Description:' name='modification' />Description:</label>
                                `,
                                modification: "",
                                modificationAutre: "",
                        },


                        this.flagReset = false;
                        this.$emit("menuStatusChicked");

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
                    if (result.data) {
                        this.flagReset = true;
                        this.renseignementId = result.data.renseignementId;
                        this.$emit("menuStatusChicked");
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

                            this.renseignement.tagLocalisation = this.renseignement.tagLocalisation.replace("value=''", `value='${result.data.localisation}'`);
                            this.renseignement.localisation = result.data.localisation;

                            this.renseignement.tagNumeroInterne = this.renseignement.tagNumeroInterne.replace(`value='N°'`, `value='N°' checked='checked'`);
                            this.renseignement.numeroInterne = "N°";
                            this.renseignement.numeroInterneAutre = result.data.numeroInterne;

                            this.renseignement.tagNumeroSerie = this.renseignement.tagNumeroSerie.replace("value=''", `value='${result.data.numeroSerie}'`);
                            this.renseignement.numeroSerie = result.data.numeroSerie;

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }


                if (result.data == true) {

                    Renseignement.select(this.observateurId)
                        .then((result) => {

                            this.renseignement.observateurId = this.observateurId;
                            this.flagReset = true;

                            this.renseignement.constructeur = result.data.renseignement.constructeur;


                            this.renseignement.tagTypeConstructeur = this.renseignement.tagTypeConstructeur.replace("value=''", `value='${result.data.renseignement.typeConstructeur}'`);
                            this.renseignement.typeConstructeur = result.data.renseignement.typeConstructeur;

                            this.renseignement.tagAnneeMiseService = this.renseignement.tagAnneeMiseService.replace("value=''", `value='${result.data.renseignement.anneeMiseService}'`);
                            this.renseignement.anneeMiseService = result.data.renseignement.anneeMiseService;

                            this.renseignement.tagNumeroSerie = this.renseignement.tagNumeroSerie.replace("value=''", `value='${result.data.renseignement.numeroSerie}'`);
                            this.renseignement.numeroSerie = result.data.renseignement.numeroSerie;

                            this.renseignement.tagNumeroInterne = this.renseignement.tagNumeroInterne.replace(`value='${result.data.renseignement.numeroInterne}'`, `value='${result.data.renseignement.numeroInterne}' checked='checked'`);
                            this.renseignement.numeroInterne = result.data.renseignement.numeroInterne;
                            this.renseignement.numeroInterneAutre = result.data.renseignement.numeroInterneAutre;

                            this.renseignement.tagLocalisation = this.renseignement.tagLocalisation.replace("value=''", `value='${result.data.renseignement.localisation}'`);
                            this.renseignement.localisation = result.data.renseignement.localisation;

                            this.renseignement.tagTypeAppareil = this.renseignement.tagTypeAppareil.replace(`value='${result.data.renseignement.typeAppareil}'`, `value='${result.data.renseignement.typeAppareil}' checked='checked`);
                            this.renseignement.typeAppareil = result.data.renseignement.typeAppareil;
                            this.renseignement.typeAppareilAutre = result.data.renseignement.typeAppareilAutre;

                            this.renseignement.tagMiseEnServiceRapport = this.renseignement.tagMiseEnServiceRapport.replace(`value='${result.data.renseignement.miseEnServiceRapport}'`, `value='${result.data.renseignement.miseEnServiceRapport}' checked='checked`);
                            this.renseignement.miseEnServiceRapport = result.data.renseignement.miseEnServiceRapport;

                            this.renseignement.tagMiseEnServiceEpreuves = this.renseignement.tagMiseEnServiceEpreuves.replace(`value='${result.data.renseignement.miseEnServiceEpreuves}'`, `value='${result.data.renseignement.miseEnServiceEpreuves}' checked='checked`);
                            this.renseignement.miseEnServiceEpreuves = result.data.renseignement.miseEnServiceEpreuves;
                            this.renseignement.miseEnServiceEpreuvesAutre = result.data.renseignement.miseEnServiceEpreuvesAutre;

                            this.renseignement.tagDateDerniereVerficationPeriodique = this.renseignement.tagDateDerniereVerficationPeriodique.replace(`value='${result.data.renseignement.dateDerniereVerficationPeriodique}'`, `value='${result.data.renseignement.dateDerniereVerficationPeriodique}' checked='checked`);
                            this.renseignement.dateDerniereVerficationPeriodique = result.data.renseignement.dateDerniereVerficationPeriodique;
                            this.renseignement.dateDerniereVerficationPeriodiqueAutre = result.data.renseignement.dateDerniereVerficationPeriodiqueAutre;

                            this.renseignement.tagDateDerniereVerficationPeriodiqueRapport = this.renseignement.tagDateDerniereVerficationPeriodiqueRapport.replace(`value='${result.data.renseignement.dateDerniereVerficationPeriodiqueRapport}'`, `value='${result.data.renseignement.dateDerniereVerficationPeriodiqueRapport}' checked='checked`);
                            this.renseignement.dateDerniereVerficationPeriodiqueRapport = result.data.renseignement.dateDerniereVerficationPeriodiqueRapport;

                            this.renseignement.tagEssaischarge = this.renseignement.tagEssaischarge.replace(`value='${result.data.renseignement.essaischarge}'`, `value='${result.data.renseignement.essaischarge}' checked='checked`);
                            this.renseignement.essaischarge = result.data.renseignement.essaischarge;
                            this.renseignement.essaischargeAutre = result.data.renseignement.essaischargeAutre;

                            this.renseignement.tagModification = this.renseignement.tagModification.replace(`value='${result.data.renseignement.modification}'`, `value='${result.data.renseignement.modification}' checked='checked`);
                            this.renseignement.modification = result.data.renseignement.modification;
                            this.renseignement.modificationAutre = result.data.renseignement.modificationAutre;

                            this.$emit("menuStatusChicked");

                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });



    }
}
</script>

<style scoped>
.renseignements {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
}


.renseignements th {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: white;
    background-color: blue;
}


.renseignements td {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: red;
    background-color: whitesmoke;
    padding: 20px;
}


label {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

label h3 {
    margin: 2px;
    color: red;
}

label input {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
}

label select {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
}


.sauvegarde {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.sauvegarde button {
    background-color: #040faa;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.reset {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.reset button {
    background-color: #aa1704;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.modifier {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.modifier button {
    background-color: #04AA6D;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
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