<template>
    <div>
        <div class="descriptions">
            <table border="1">
                
                <tr>
                    <td :class="[renseignement.constructeur.length != 0 ? 'saved' : 'not-saved']">Constructeur</td>
                    <td><input type="text" @input="saisirConstructeur($event)" :value="renseignement.constructeur"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.typeConstructeur.length != 0 ? 'saved' : 'not-saved']">Type constructeur
                        (Plaque):</td>
                    <td><input type="text" @input="saisirTypeConstructeur($event)" :value="renseignement.typeConstructeur"></td>
                </tr>


                <tr>
                    <td :class="[renseignement.anneeMiseService.length != 0 ? 'saved' : 'not-saved']">Année de mise en
                        service (Plaque constructeur):</td>
                    <td><input type="text" @input="saisirAnneeMiseService($event)" :value="renseignement.anneeMiseService"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.numeroSerie.length != 0 ? 'saved' : 'not-saved']">Numéro(s) de série (plaque constructeur):</td>
                    <td><input type="text" @input="saisirnumeroSerie($event)" :value="renseignement.numeroSerie"></td>
                </tr>

                <tr>
                    <td :class="[renseignement.numeroInterne.length != 0 ? 'saved' : 'not-saved']">Numéro(s) interne(s):</td>
                    <td>
                        <select v-model="renseignement.numeroInterne">
                            <option value="Avec Objet">Avec Objet</option>
                            <option value="Sans Objet">Sans Objet</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.localisation.length != 0 ? 'saved' : 'not-saved']">Localisation de(s)
                        l'appareil (s) lors de la visite:</td>
                    <td><input type="text" @input="saisirLocalistation($event)" :value="renseignement.localisation"></td>
                </tr>

    
                <tr>
                    <td :class="[renseignement.typeAppareil.length != 0 ? 'saved' : 'not-saved']">Type d'appareil:</td>
                    <td>
                        <select :value="renseignement.typeAppareil">
                            <option value="Poutres roulantes (non motorisée)">Poutres roulantes (non motorisée)</option>
                            <option value="Palans manuels">Palans manuels</option>
                            <option value="Grues d'atelier (non motorisée)">Grues d'atelier (non motorisée)</option>
                            <option value="Sapines">Sapines</option>
                            <option value="Potences (Non motorisées)">Potences (Non motorisées)</option>
                            <option value="Treuils manuels">Treuils manuels</option>
                            <option value="Crics et vérins">Crics et vérins</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.miseEnServiceRapport.length != 0 ? 'saved' : 'not-saved']">(Mise en service) Rapport de vérification avant mise ou remise en service: </td>
                    <td>
                        <select :value="renseignement.miseEnServiceRapport">
                            <option value="Présenté">Présenté</option>
                            <option value="Non présenté">Non présenté</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.miseEnServiceEpreuves.length != 0 ? 'saved' : 'not-saved']">(Mise en service) Epreuves: </td>
                    <td>
                        <select :value="renseignement.miseEnServiceEpreuves">
                            <option value="Réalisées le">Réalisées le</option>
                            <option value="Absence de renseignement">Absence de renseignement</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td :class="[renseignement.dateDerniereVerficationPeriodique.length != 0 ? 'saved' : 'not-saved']">Date de la dernière vérification périodique:</td>
                    <td>

                        <select :value="renseignement.dateDerniereVerficationPeriodique">
                            <option value="Absence de renseignement">Absence de renseignement</option>
                            <option value="Effectuée le">Effectuée le</option>
                        </select>

                        <select :value="renseignement.rapport">
                            <option value="Rapport : Présenté">Rapport : Présenté</option>
                            <option value="Rapport : Non présenté">Rapport : Non présenté</option>
                        </select>

                    </td>
                </tr>


                <tr>
                    <td :class="[renseignement.essaischarge.length != 0 ? 'saved' : 'not-saved']">Essais en charge:</td>
                    <td>

                        <select :value="renseignement.essaischarge">
                            <option value="Réalisé avec la Charge maximale utile">Réalisé avec la Charge maximale utile</option>
                            <option value="Réalisé sous charge de (kg):">Réalisé sous charge de (kg)</option>
                            <option value="Absence de charge pour réaliser les essais">Absence de charge pour réaliser les essais</option>
                            <option value="Absence de tableau des charges pour réaliser les essais">Absence de tableau des charges pour réaliser les essais</option>
                            <option value="Non réalisé. Voir observation critique">Non réalisé. Voir observation critique</option>
                        </select>

                    </td>
                </tr>


                <tr>
                    <td :class="[renseignement.modification.length != 0 ? 'saved' : 'not-saved']">Modification(s) apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l’appareil examiné:</td>
                    <td>
                        <select :value="renseignement.modification">
                            <option value="Sans objet">Sans objet</option>
                            <option value="Description">Description</option>
                        </select>
                    </td>
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

import Renseignement from "@/requests/appareil_levage/famille1_lev1/Renseignement"
import Completed from "@/requests/appareil_levage/famille1_lev1/completed";
import Observateurs from "@/requests/Observateurs"
import Insert from "@/components/models/Insert.vue"

export default {
    name: 'renseignement-component',
    data() {
        return {


            falgInsert: false,
            flagReset: false,

            renseignement: {

                constructeur : "",
                typeConstructeur: "",
                anneeMiseService: "",
                numeroSerie: "",
                numeroInterne: "",
                localisation: "",
                typeAppareil: "",
                miseEnServiceRapport: "",
                miseEnServiceEpreuves: "",
                dateDerniereVerficationPeriodique: "",


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
            this.falgInsert = false;
            return this.sauvegarde();
        },

        annuler() {
            this.falgInsert = false;
        },


        reset() {
            Renseignement.reset(this.observateurId)
                .then((result) => {

                    if (result.data) {

                        this.renseignement = {
                                constructeur : "",
                                typeConstructeur: "",
                                anneeMiseService: "",
                                numeroSerie: "",
                                numeroInterne: "",
                                localisation: "",
                                typeAppareil: "",
                                typeAppareilAutre: "",
                                miseEnServiceRapport: "",
                                miseEnServiceEpreuves: "",
                                dateDerniereVerficationPeriodique: "",
                                essaischarge: "",
                                modification: "",
                        },

                        this.flagReset = false;
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
                            this.renseignement.numeroInterne = result.data.numeroInterne;
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
                            this.renseignement.constructeur  =  result.data.constructeur;
                            this.renseignement.typeConstructeur =  result.data.typeConstructeur;
                            this.renseignement.anneeMiseService =  result.data.anneeMiseService;
                            this.renseignement.numeroSerie =  result.data.numeroSerie;
                            this.renseignement.numeroInterne =  result.data.numeroInterne;
                            this.renseignement.localisation =  result.data.localisation;
                            this.renseignement.typeAppareil =  result.data.typeAppareil;
                            this.renseignement.miseEnServiceRapport =  result.data.miseEnServiceRapport;
                            this.renseignement.miseEnServiceEpreuves =  result.data.miseEnServiceEpreuves;
                            this.renseignement.dateDerniereVerficationPeriodique =  result.data.dateDerniereVerficationPeriodique;
                            this.renseignement.essaischarge =  result.data.essaischarge;
                            this.renseignement.modification =  result.data.modification;
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


  .descriptions table {
    border-collapse: collapse;
    border: none;
  }

  tr {
    border-top: 1px solid black;
  }

  tr:first-child {
    border-top: none;
  }

  td {
    text-align: start;
    border: none !important;
    padding-top: 10px;
    padding-bottom: 10px;
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
    background-color: #ff6a00;
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