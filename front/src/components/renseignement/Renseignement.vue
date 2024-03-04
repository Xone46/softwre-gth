<template>
    <div>
        <div class="descriptions">
            <table>

                <tr>
                    <th>Constructeur</th>
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
                    <td :class="[renseignement.numeroSerie.length != 0 ? 'saved' : 'not-saved']">Numéro(s) de série (plaque
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
                    <td :class="[renseignement.typeAppareil.length != 0 ? 'saved' : 'not-saved']">Numéro(s) interne(s):</td>
                    <td v-html="renseignement.tagTypeAppareil" @input="getValueTypeAppareil"></td>
                    {{ renseignement.typeAppareilAutre }}
                </tr>


            </table>
        </div>

        <!-- <table class="renseignements">



            <tr>
                <label for="Type d'appareil">
                    <h3>Type d'appareil : <span class="start" v-if=" renseignement.typeAppareil.length == 0 ">*</span></h3>
                    <select v-model=" renseignement.typeAppareil ">
                        <option v-for="  item   in   typeAppareils  " :key=" item.id ">{{ item.titre }}</option>
                    </select>
                </label>
            </tr>

            <tr v-if=" renseignement.typeAppareil == 'Autre' ">
                <label for="Type d'appareil">
                    <h3>Le nom d'autre Type d'appareil : <span class="start"
                            v-if=" renseignement.autreTypeAppareil.length == 0 ">*</span></h3>
                    <input type="text" v-model=" renseignement.autreTypeAppareil ">
                </label>
            </tr>

         Start Mise en service -->

        <tr>
            <label for="Mise en service (Rapport de vérification avant mise ou remise en service)">
                <h3>Mise en service (Rapport de vérification avant mise ou remise en service) :<span class="start"
                        v-if="renseignement.miseEnService.length == 0">*</span></h3>
                <select v-model="renseignement.miseEnService">
                    <option v-for="  item   in   miseEnServiceTable  " :key="item.id">{{ item.titre }}</option>
                </select>
            </label>
        </tr>



        <tr v-if="renseignement.miseEnService == 'Présenté'">
            <label for="Epreuves de Mise en service (Rapport de vérification avant mise ou remise en service)">
                <h3>Epreuves : <span class="start" v-if="renseignement.epreuvemMiseEnService.length == 0">*</span>
                </h3>
                <select v-model="renseignement.epreuvemMiseEnService">
                    <option v-for="  item   in   epreuves  " :key="item.id">{{ item.titre }}</option>
                </select>
            </label>
        </tr>

        <tr v-if="renseignement.epreuvemMiseEnService == 'Réalisées' && renseignement.miseEnService == 'Présenté'">
            <label for="Réalisées Le">
                <h3>Réalisées Le : <span class="start" v-if="renseignement.realiseesMiseEnService.length == 0">*</span>
                </h3>
                <input type="date" v-model="renseignement.realiseesMiseEnService">
            </label>
        </tr>

        <!-- End Mise en Service -->


        <!-- Start Date de la dernière vérification périodique -->
        <tr>
            <label for="Date de la dernière vérification périodique">
                <h3>Date de la dernière vérification périodique : <span class="start"
                        v-if="renseignement.dateDerniereVerficationPeriodique.length == 0">*</span></h3>
                <select v-model="renseignement.dateDerniereVerficationPeriodique">
                    <option v-for="  item   in   dateDerniereVerficationPeriodiqueTable  " :key="item.id">{{ item.titre }}
                    </option>
                </select>
            </label>
        </tr>

        <tr v-if="renseignement.dateDerniereVerficationPeriodique == 'Présenté'">
            <label for="Epreuves">
                <h3>Epreuves : <span class="start"
                        v-if="renseignement.epreuveDateDerniereVerficationPeriodique.length == 0">*</span></h3>
                <select v-model="renseignement.epreuveDateDerniereVerficationPeriodique">
                    <option v-for="  item   in   epreuves  " :key="item.id">{{ item.titre }}</option>
                </select>
            </label>
        </tr>

        <tr
            v-if="renseignement.epreuveDateDerniereVerficationPeriodique == 'Réalisées' && renseignement.dateDerniereVerficationPeriodique == 'Présenté'">
            <label for="Réalisées Le">
                <h3>Réalisées Le : <span class="start"
                        v-if="renseignement.realiseesDateDerniereVerficationPeriodique.length == 0">*</span></h3>
                <input type="date" v-model="renseignement.realiseesDateDerniereVerficationPeriodique">
            </label>
        </tr>
        <!-- End Date de la dernière vérification périodique -->

        <tr>
            <label for="Essais en charge">
                <h3>Essais en charge: <span class="start" v-if="renseignement.essaischarge.length == 0">*</span></h3>
                <select v-model="renseignement.essaischarge">
                    <option v-for="  item   in   essaischarges  " :key="item.id">{{ item.titre }}</option>
                </select>
            </label>
        </tr>

        <tr v-if="renseignement.essaischarge == 'Réalisé sous charge de (kg) :'">
            <label for="Poids en kg">
                <h3>Poids en kg : <span class="start" v-if="renseignement.poidsKg.length == 0">*</span></h3>
                <input type="number" v-model="renseignement.poidsKg">
            </label>
        </tr>

        <tr>
            <label for="Modification(s) apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l'appareil examiné">
                <h3>Modification(s) apportée(s) ou autre(s) remarque(s) éventuelle(s) concernant l'appareil examiné:
                    <span class="start" v-if="renseignement.modification.length == 0">*</span>
                </h3>
                <select v-model="renseignement.modification">
                    <option v-for="  item   in   modifications  " :key="item.id">{{ item.titre }}</option>
                </select>
            </label>
        </tr>

        <tr v-if="renseignement.modification == 'Description'">
            <label for="Description">
                <h3>Description : <span class="start" v-if="renseignement.description.length == 0">*</span>
                </h3>
                <input type="text" v-model="renseignement.description">
            </label>
        </tr>



        <div class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <Insert v-if="falgInsert" :typeInsert="typeInsert" @valider="valider" @annuler="annuler" />

    </div>
</template>
  
<script>
import Renseignement from "@/requests/Renseignement"
import Insert from "@/components/models/Insert.vue"
export default {
    name: 'renseignement-component',
    data() {
        return {


            falgInsert: false,
            savedMode: false,

            renseignement: {

                tagTypeConstructeur: "<input type='text' value=''>",
                typeConstructeur: "",

                tagAnneeMiseService: "<input type='text' value=''>",
                anneeMiseService: "",

                tagNumeroSerie: "<input type='text' value=''>",
                numeroSerie: "",

                tagNumeroInterne: `
                <label>Sans objet<input type='radio' value='Sans objet' name='numeroInterne'/></label>
                <label>N°<input type='radio' value='N°' name='numeroInterne'/></label>
                `,
                numeroInterne: "",
                numeroInterneAutre: "",

                tagLocalisation: "<input type='text' value='' >",
                localisation: "",

                tagTypeAppareil:
                    `<label>Pont roulant<input type='radio' value='Pont roulant' name='typeAppareil'/></label>
                 <label>Poutre roulante<input type='radio' value='Poutre roulante' name='typeAppareil'/></label>
                 <label>Portique<input type='radio' value='Portique' name='typeAppareil' /></label>
                 <label>Semi portique<input type='radio' value='Semi portique' name='typeAppareil' /></label>
                 <label>Palan<input type='radio' value='Palan' name='typeAppareil' /></label>
                 <label>Treuil<input type='radio' value='Treuil' name='typeAppareil' /></label>
                 <label>Autre<input type='radio' value='Autre' name='typeAppareil' /></label>
                 `,
                typeAppareil: "",
                typeAppareilAutre: "",



                modification: "",
                description: "",
                essaischarge: "",
                miseEnService: "",
                epreuvemMiseEnService: "",
                dateDerniereVerficationPeriodique: "",
                realiseesMiseEnService: "",
                epreuveDateDerniereVerficationPeriodique: "",
                realiseesDateDerniereVerficationPeriodique: "",
                poidsKg: "",
                observateurId: ""
            },

            numeroInternes: [
                { id: 10001, titre: "Sans Object", status: false },
                { id: 10002, titre: "Avec Object", status: false },
            ],

            typeAppareils: [
                { id: 10003, titre: "Pont roulant", status: false },
                { id: 10004, titre: "Poutre roulante", status: false },
                { id: 10005, titre: "Portique", status: false },
                { id: 10006, titre: "Semi portique", status: false },
                { id: 10007, titre: "Palan", status: false },
                { id: 10008, titre: "Treuil", status: false },
                { id: 10009, titre: "Autre", status: true },
            ],

            essaischarges: [
                { id: 10010, titre: "Réalisé avec la Charge maximale utile", status: false },
                { id: 10011, titre: "Réalisé sous charge de (kg) :", status: true },
                { id: 10012, titre: "Absence de charge pour réaliser les essais", status: false },
                { id: 10013, titre: "Absence de tableau des charges pour réaliser les essais", status: false },
                { id: 10014, titre: "Non réalisé. Voir observation critique", status: false },
                { id: 10015, titre: "(Les 4 dernières options conduisent à faire une observation) ", status: false }
            ],

            modifications: [
                { id: 10016, titre: "Sans Object", status: false },
                { id: 10017, titre: "Description", status: false },
            ],

            miseEnServiceTable: [
                { id: 10018, titre: "Présenté", status: false },
                { id: 10019, titre: "Non Présenté", status: false }
            ],

            epreuves: [
                { id: 10020, titre: "Réalisées", status: false },
                { id: 10021, titre: "Absence de renseignement", status: false },
            ],

            dateDerniereVerficationPeriodiqueTable: [
                { id: 10022, titre: "Présenté", status: false },
                { id: 10023, titre: "Non Présenté", status: false },
            ],

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
                this.renseignement.typeAppareilAutre
            }

            if (type === "NumeroInterne") {
                this.renseignement.numeroInterne = `N°`;
                this.renseignement.numeroInterneAutre = event;
            }

            this.falgInsert = false;
        },

        annuler() {
            this.falgInsert = false;
        },

        getValueTypeConstructeur(event) {
            this.renseignement.typeConstructeur = event.target.value;
        },

        getValueAnneeMiseService(event) {
            this.renseignement.anneeMiseService = event.target.value;
        },

        getValueNumeroSerie(event) {
            this.renseignement.numeroSerie = event.target.value;
        },

        getValueNumeroInterne(event) {

            if (event.target.value === "N°") {
                this.falgInsert = true;
                this.typeInsert = "NumeroInterne";

            } else {
                this.renseignement.numeroInterne = event.target.value;
                this.renseignement.numeroInterneAutre = "";
            }
        },

        getValueLocalisation(event) {
            this.renseignement.localisation = event.target.value;
        },

        getValueTypeAppareil(event) {
            if (event.target.value === "Autre") {
                this.falgInsert = true;
                this.typeInsert = "TypeAppareil";
            } else {
                this.renseignement.typeAppareil = event.target.value;
                this.renseignement.typeAppareilAutre = "";
            }
        },

        sauvegarde() {

            this.renseignement.observateurId = this.observateurId;

            Renseignement.create(this.renseignement)
                .then((result) => {
                    if (result.data) {
                        console.log(result.data)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    },

    created() {

        Renseignement.select(this.observateurId)
            .then((result) => {
                if (result.data != null) {

                    this.renseignement.tagTypeConstructeur = this.renseignement.tagTypeConstructeur.replace("value=''", `value='${result.data.typeConstructeur}'`);
                    this.renseignement.typeConstructeur = result.data.typeConstructeur;

                    this.renseignement.tagAnneeMiseService = this.renseignement.tagAnneeMiseService.replace("value=''", `value='${result.data.anneeMiseService}'`);
                    this.renseignement.anneeMiseService = result.data.anneeMiseService;

                    this.renseignement.tagNumeroSerie = this.renseignement.tagNumeroSerie.replace("value=''", `value='${result.data.numeroSerie}'`);
                    this.renseignement.numeroSerie = result.data.numeroSerie;

                    this.renseignement.tagNumeroInterne = this.renseignement.tagNumeroInterne.replace(`value='${result.data.numeroInterne}'`, `value='${result.data.numeroInterne}' checked='checked'`);
                    this.renseignement.numeroInterne = result.data.numeroInterne;
                    this.renseignement.numeroInterneAutre = result.data.numeroInterneAutre;

                    this.renseignement.tagNumeroSerie = this.renseignement.tagLocalisation.replace("value=''", `value='${result.data.localisation}'`);
                    this.renseignement.localisation = result.data.localisation;


                }
            })
            .catch((error) => {
                console.log(error)
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